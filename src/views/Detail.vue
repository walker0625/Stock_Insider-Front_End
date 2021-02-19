<template>
  <v-container id="contents" fluid>
    <v-row>
      <v-col>
        <content id="lineChart" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <content id="totalLineChart" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GoogleCharts } from "google-charts";
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },

  created() {
    this.setTradeInfos();
  },

  watch: {
    $route() {
      this.setTradeInfos();
    },
  },

  computed: {
    ...mapState(["stockTradeInfos"]),
    ...mapState(["selectedTraderInfos"]),

    ...mapGetters({
      TradeCnt: "getSelectedTraderInfosCnt",
    }),
  },

  methods: {
    setTradeInfos() {
      let traderInfos = this.stockTradeInfos.filter((stockTradeInfo) => {
        return stockTradeInfo.traderName === this.$route.params.traderName;
      });

      this.$store.commit("setSelectedTraderInfos", traderInfos);

      GoogleCharts.load(this.drawChart, {
        packages: ["line", "corechart"],
      });
    },

    drawChart() {
      this.drawLineChart();
      this.drawTotalLineChart();
    },

    drawLineChart() {
      let lineChartData = null;
      let lineChartOption = null;
      let tradeDates = [];
      let maxStockAmount = 0;
      let maxStockPrice = 0;

      lineChartData = new google.visualization.DataTable();
      lineChartData.addColumn("string", "거래일(년-월-일)");
      lineChartData.addColumn("number", "주식 거래량(주)");
      lineChartData.addColumn("number", "주식 가격($)");

      for (let traderInfo of this.selectedTraderInfos) {
        tradeDates.push(traderInfo.tradeDate);

        if (maxStockAmount < traderInfo.stockAmount) {
          maxStockAmount = traderInfo.stockAmount;
        }

        if (maxStockPrice < traderInfo.stockPrice) {
          maxStockPrice = traderInfo.stockPrice;
        }

        lineChartData.addRows([
          [traderInfo.tradeDate, traderInfo.stockAmount, traderInfo.stockPrice],
        ]);
      }

      lineChartOption = {
        title:
          this.$route.params.traderName +
          "'s 가격 대비 거래량 추세 (지난 5년간 총 " +
          this.TradeCnt +
          "회 거래)",

        titleTextStyle: {
          color: "navy",
          fontSize: 30,
          bold: true,
        },

        series: {
          0: { targetAxisIndex: 0 },
          1: { targetAxisIndex: 1 },
        },

        vAxes: {
          0: {
            title: "주식 거래량(주)",
            viewWindow: {
              max: maxStockAmount * 1.2,
            },
          },
          1: {
            title: "주식 가격($)",
            viewWindow: {
              max: maxStockPrice * 1.2,
            },
          },
        },

        hAxis: {
          ticks: tradeDates,
        },

        animation: {
          startup: true,
          easing: "in",
          duration: 700,
        },

        width: 1640,
        height: 375,
        backgroundColor: {
          fillOpacity: 0.5,
        },
      };

      const lineChart = new google.visualization.LineChart(
        document.getElementById("lineChart")
      );

      lineChart.draw(lineChartData, lineChartOption);
    },

    drawTotalLineChart() {
      let lineChartData = null;
      let lineChartOption = null;

      lineChartData = new google.visualization.DataTable();
      lineChartData.addColumn("string", "거래일(년-월-일)");
      lineChartData.addColumn("number", "총 거래금액($)");

      for (let traderInfo of this.selectedTraderInfos) {
        lineChartData.addRows([[traderInfo.tradeDate, traderInfo.totalAmount]]);
      }

      lineChartOption = {
        title:
          this.$route.params.traderName +
          "'s 총 거래금액(가격 x 거래량) 추세 (지난 5년간 총 " +
          this.TradeCnt +
          "회 거래)",

        titleTextStyle: {
          color: "navy",
          fontSize: 30,
          bold: true,
        },

        animation: {
          startup: true,
          easing: "in",
          duration: 700,
        },
        width: 1640,
        height: 360,
        colors: ["#28B463", "blue"],
        backgroundColor: {
          fillOpacity: 0.5,
        },
      };

      const lineChart = new google.visualization.LineChart(
        document.getElementById("totalLineChart")
      );

      lineChart.draw(lineChartData, lineChartOption);
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
