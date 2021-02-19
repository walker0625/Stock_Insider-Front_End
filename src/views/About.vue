<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-img
          src="@/assets/peterLynch.jpg"
          width="800"
          height="800"
          max-width="800"
          max-height="770"
          contain
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
      <v-col>
        <v-card class="mx-auto" max-width="800">
          <v-img
            src="@/assets/peterLynchQuote.png"
            height="250"
            max-width="800"
            max-height="300"
            contain
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-card-text class="text-center">
            <div>
              <p class="normal">
                내부자(CEO, CTO, CFO...)들은 다양한 이유로 자사의 주식을 팔 수
                있다. <br />
                하지만 그들이 자사 주식을 사는 이유는 오직 하나다. : <br />
              </p>
              <p class="special">
                자사 주식이 오를 것이라 생각하기 때문이다. <br />
              </p>
              <a
                class="light"
                href="https://namu.wiki/w/%ED%94%BC%ED%84%B0%20%EB%A6%B0%EC%B9%98"
                target="_blank"
              >
                - 피터 린치 - <br /><br />
              </a>
            </div>

            <div>
              <p class="normal">
                본 웹사이트는
                <a href="https://www.secform4.com/" target="_blank">
                  https://www.secform4.com/
                </a>
                의 내부자 주식거래 Data를 <br />
                수집(매일 AM 06:00) / 가공(분류, 통계)하여
                <a href="https://developers.google.com/chart" target="_blank">
                  Google Charts
                </a>
                로 시각화하고 있습니다. <br /><br />
              </p>
              <p class="light">
                <v-icon>mdi-alert-circle</v-icon>
                &lt; ps &gt;
                <v-icon>mdi-alert-circle</v-icon>
                <br />
                거래량은 BUY/SELL을 모두 포함하고 있으며<br />
                SELL이 더욱 빈번히 발생하여 BUY보다 많습니다. <br />
                차트의 DATA는 거래의 활동성으로 참고 바랍니다.
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.normal {
  color: #505359;
  font-size: 20px;
  line-height: 2;
}

.special {
  color: #1e6ae8;
  font-size: 27px;
  font-weight: bold;
}

.light {
  color: #85878d;
  font-size: 17px;
  line-height: 2;
}
</style>
