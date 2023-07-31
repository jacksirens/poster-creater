import { useState } from "react";
import { get } from "axios";
import { format } from "date-fns";
import _ from "lodash";
import { Radio, RadioGroup } from "zent";
import { toPng } from "html-to-image";

const getWeekStr = (date) => {
  const week = ["日", "一", "二", "三", "四", "五", "六"];
  return week[date.getDay()];
};

function mergeArraysByKey(array1, array2, key) {
  let grouped = _.groupBy(array1.concat(array2), key);
  return _.map(grouped, (group) => _.assign.apply(_, group));
}

export function downloadBase64Image(base64String, fileName) {
  const link = document.createElement("a");
  link.href = base64String;
  link.download = fileName;
  link.click();
}

const getWeatherImgByIconDay = (iconDay) => {
  switch (iconDay.toString()) {
    case "100":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/Ftk19JKB_qYjbgO-4GB_6nKLXbD1.png";
    case "101":
    case "102":
    case "103":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/FvxdSi2ZAcveEQL6XdXrBEfip2p_.png";
    case "104":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/Fnlj1Z0eIMJWdDlE9I-NBdxR55Wo.png";
    case "300":
    case "301":
    case "302":
    case "303":
    case "304":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/Ftqk5Xwl26G5_xTOfvg7bzPms2p8.png";
    case "305":
    case "309":
    case "314":
    case "399":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/FrobFAn5OLQoZnsnx9CBIyHMqTrZ.png";
    case "306":
    case "315":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/FoX7ij4gDQPeMJv0tdbKZ5HH7c0q.png";
    case "307":
    case "316":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/Ft2oh0Xr0Wmsr7VABKN-D5cuw6jw.png";
    case "308":
    case "317":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/Fpv92CDw-oPEtglZvCOXfL0svymz.png";
    case "310":
    case "311":
    case "312":
    case "318":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/FlwgwIZKbgYvidHx1y0PLPXOzW2p.png";
    case "313":
    case "404":
    case "405":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/FpexEyEq_cdBrzMTudTOS6P_jYpY.png";
    case "400":
    case "408":
    case "499":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/Fkk1h8TyxqwxLOLNTelq08-h7rh0.png";
    case "401":
    case "409":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/Fl4ojMIEEhDufBwUiE6_bqxqmLb8.png";
    case "402":
    case "410":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/FvIhDxJ4uAnAgQ0mdQYVN0ug0NLF.png";
    case "403":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/FrlPHyArYGayYS_qfo0JTmfpdlcJ.png";
    case "406":
    case "407":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/Fu2moLSd7usM7DqQVaBjpaLrrEX5.png";
    case "500":
    case "501":
    case "502":
    case "509":
    case "510":
    case "511":
    case "512":
    case "513":
    case "514":
    case "515":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/FpBbuDB9COxRBGUjq5GO_uVKj758.png";
    case "503":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/FgOC4IeNsIbI-WVd9fji1Y-UM_b2.png";
    case "504":
    case "507":
    case "508":
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/FmGbl54EUiEJ5aPbOHZGvUmPb1hT.png";
    default:
      return "https://img01.yzcdn.cn/upload_files/2023/07/31/Ftk19JKB_qYjbgO-4GB_6nKLXbD1.png";
  }
};

const Page = () => {
  const [daily, setDaily] = useState([]);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("");

  const currentValue = list.find((item) => item.performanceId === selected);

  useState(() => {
    Promise.all([
      get(
        "https://devapi.qweather.com/v7/weather/7d?location=101210109&key=536f0333e42f40bca3c44f43f91f921e"
      ),
      get(
        "https://devapi.qweather.com/v7/air/5d?location=101210109&key=536f0333e42f40bca3c44f43f91f921e"
      ),
    ]).then(([{ data: weatherData }, { data: airData }]) => {
      const resData = mergeArraysByKey(
        weatherData.daily,
        airData.daily,
        "fxDate"
      );
      console.log(resData, "res data");
      setDaily(resData.slice(1, 6));
    });
    get(
      `https://yanchu.maoyan.com/myshow/ajax/channelPage/wonderPerfs?p=1&s=20&ct=9&st=15&optimus_risk_level=71&optimus_code=10&uuid=35d7d0a375f841e295c2011ac803c6e4a158458781335150377&sellChannel=1&cityId=3&lng=120.08712448460645&lat=30.25695654285865&token=4f9f9e09ce1a1d6e47d46662e1b2d4effcfb02b5c2547988c95f1a0f70223eeeb8231e298cf2eca624aeb48179142e56e14c63aff9345ca10c03a18ba9dbb7b1&yodaReady=h5&csecplatform=4&csecversion=2.1.0`
    ).then(({ data }) => setList(data.data));
  }, []);

  const exportImg = () => {
    toPng(document.querySelector("#poster-container")).then((imgData) => {
      downloadBase64Image(imgData, "output.png");
    });
  };

  return (
    <div className="flex">
      <div>
        <button onClick={exportImg}>导出</button>
        <div className="scale">
          <div
            id="poster-container"
            style={{
              width: 1448,
              height: 1086,
              background: `url("https://img01.yzcdn.cn/upload_files/2023/07/31/FgxVIPCD5BtWgeaRkv88w6DrZrJj.png") no-repeat center center`,
              backgroundSize: "contain",
            }}
          >
            <div className="flex weather-container">
              {daily.map((item) => {
                return (
                  <div className="weather-item">
                    <div className="weather-time-title">
                      <div className="weather-time-week">
                        周{getWeekStr(new Date(item.fxDate))}
                      </div>
                      <div className="weather-time-date">
                        {format(new Date(item.fxDate), "M.D")}
                      </div>
                    </div>
                    <div className="weather-item-desc">
                      <img
                        className="weather-item-icon"
                        width={150}
                        src={getWeatherImgByIconDay(item.iconDay)}
                        alt="天气"
                      />
                      <div>
                        {item.tempMin} ~ {item.tempMax}°C
                      </div>
                      <div>
                        {item.windDirDay} {item.windScaleDay}级
                      </div>
                      <div>
                        PM2.5{" "}
                        <span
                          style={{
                            marginLeft: 8,
                          }}
                        >
                          {item.category || "良"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {currentValue ? (
              <div className="shower-container flex">
                <div
                  className="shower-item-img"
                  style={{
                    backgroundImage: `url("${currentValue.posterUrl}")`,
                  }}
                ></div>
                <div className="shower-item-text">
                  <div>名称：{currentValue.name}</div>
                  <div>时间：{currentValue.showTimeRange}</div>
                  <div>地点：{currentValue.address}</div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <RadioGroup
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="scroll-container"
      >
        {list.map((item) => {
          return (
            <Radio className="flex" value={item.performanceId}>
              <div
                style={{
                  display: "inline-block",
                }}
              >
                <div className="flex">
                  <div className="list-item-img">
                    <img width={75} src={item.posterUrl} alt="天气" />
                  </div>
                  <div>
                    <div>名称：{item.name}</div>
                    <div>时间：{item.showTimeRange}</div>
                    <div>地点：{item.address}</div>
                  </div>
                </div>
              </div>
            </Radio>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default Page;
