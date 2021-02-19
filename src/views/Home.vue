<template>
  <v-container id="contents" fluid>
    <v-row>
      <v-col>
        <content id="materialChart" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <content id="pieChart" />
      </v-col>
      <v-col>
        <content id="columnChart" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { GoogleCharts } from "google-charts";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapState(["statisticsInfos"]),

    //...mapGetters(["getStatisticsInfosCnt"]),
    ...mapGetters({
      CeoCnt: "getStatisticsInfosCnt",
    }),
  },

  created() {
    axios.get("http://3.34.172.205:3000/trade-datas").then((response) => {
      const TradeInfosAndStatisticsInfos = response.data;

      const stockTradeInfos = TradeInfosAndStatisticsInfos[0];
      const statisticsInfos = TradeInfosAndStatisticsInfos[1];

      //mutations 1st - this.setStatisticsInfos(statisticsInfos);
      //mutations 2st - this.$store.commit("setStatisticsInfos", statisticsInfos);
      this.$store.commit("setStockTradeInfos", stockTradeInfos);

      //actions 1st this.$store.dispatch("setStatisticsInfos", statisticsInfos);
      this.setStatisticsInfos(statisticsInfos);

      GoogleCharts.load(this.drawChart, {
        packages: ["bar", "corechart"],
      });
    });
  },

  methods: {
    //mutations 1st - ...mapMutations(["setStatisticsInfos"]),
    ...mapActions(["setStatisticsInfos"]),

    drawChart() {
      this.drawMaterialChart();
      this.drawPieChart();
      this.drawColumnChart();
    },

    drawMaterialChart() {
      let materialChartData = null;
      let materialChartOption = null;

      materialChartData = new google.visualization.DataTable();
      materialChartData.addColumn("string", "Trader(CEO) Name");
      materialChartData.addColumn("number", "지난 5년간 총 거래량");
      materialChartData.addColumn("number", "최근 3회 거래량");
      materialChartData.addColumn("number", "최신 거래량");

      for (let statisticsInfo of this.statisticsInfos) {
        materialChartData.addRows([
          [
            statisticsInfo.traderName,
            statisticsInfo.totalTradeStock,
            statisticsInfo.recentThreeTradeStock,
            statisticsInfo.recentTradeStock,
          ],
        ]);
      }

      materialChartOption = {
        title:
          "World TOP " + this.CeoCnt + " Tech Company CEO's 자사 주식거래량",
        titleTextStyle: {
          color: "navy",
          fontSize: 30,
          bold: true,
        },
        subtitle: "애플, 구글, 마이크로 소프트, 테슬라, 페이스북",
        width: 1640,
        height: 385,
        backgroundColor: "#F2F3F4",
      };

      const materialChart = new google.charts.Bar(
        document.getElementById("materialChart")
      );

      materialChart.draw(
        materialChartData,
        google.charts.Bar.convertOptions(materialChartOption)
      );
    },

    drawPieChart() {
      let pieChartData = null;
      let pieChartOption = null;

      pieChartData = new google.visualization.DataTable();
      pieChartData.addColumn("string", "Trader(CEO) Name");
      pieChartData.addColumn("number", "최신 거래량");

      for (let statisticsInfo of this.statisticsInfos) {
        pieChartData.addRows([
          [statisticsInfo.traderName, statisticsInfo.recentTradeStock],
        ]);
      }

      pieChartOption = {
        title: "최신 거래량 비교",
        titleTextStyle: {
          color: "navy",
          fontSize: 25,
          bold: true,
        },
        width: 800,
        height: 350,
        is3D: true,
        legend: { alignment: "center" },
        backgroundColor: {
          fillOpacity: 0.5,
        },
      };

      const pieChart = new google.visualization.PieChart(
        document.getElementById("pieChart")
      );

      pieChart.draw(pieChartData, pieChartOption);
    },

    drawColumnChart() {
      let columnChartData = null;
      let columnChartOption = null;

      columnChartData = new google.visualization.DataTable();
      columnChartData.addColumn("string", "Trader(CEO) Name");
      columnChartData.addColumn("number", "최근 3회 거래량 / 총 거래량");
      columnChartData.addColumn({ role: "style" });

      for (let statisticsInfo of this.statisticsInfos) {
        columnChartData.addRows([
          [
            statisticsInfo.traderName,
            statisticsInfo.recentThreeTradeStock /
              statisticsInfo.totalTradeStock,
            "#28B463",
          ],
        ]);
      }

      columnChartOption = {
        title: "총 거래량 대비 최근 3회 거래량",
        titleTextStyle: {
          color: "navy",
          fontSize: 25,
          bold: true,
        },
        animation: {
          startup: true,
          easing: "in",
          duration: 700,
        },
        width: 800,
        height: 350,
        colors: ["#28B463", "blue"],
        backgroundColor: {
          fillOpacity: 0.5,
        },
      };

      const columnChart = new google.visualization.ColumnChart(
        document.getElementById("columnChart")
      );

      columnChart.draw(columnChartData, columnChartOption);
    },
  },
};
</script>

<style>
#contents {
  position: relative;
  z-index: 1;
}

#contents:after {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  content: "";
  background: url("../assets/NYSE.jpg");
  background-size: 100%;
  top: 0;
  left: 0;
  opacity: 0.3;
}
</style>
