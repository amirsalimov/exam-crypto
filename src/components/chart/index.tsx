import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { useStateManagment } from "../../contextState/state";
import ChartTimeLine from "../timeline";

interface SeriesData {
  name: string;
  data: { x: Date; y: number }[];
}

const Chart = ({ id }: { id: string }) => {
  const { state } = useStateManagment();
  const [series, setSeries] = useState<SeriesData[]>([]);
  const [activeButton, setActiveButton] = useState<number>(1);
  const [options] = useState<ApexCharts.ApexOptions>({
    chart: {
      type: "area",
      stacked: false,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: `Coin Price Movement`,
      align: "left",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return val.toFixed(2);
        },
      },
      title: {
        text: `Price (${state.currency})`,
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val: number) {
          return val.toFixed(2);
        },
      },
    },
  });

  const fetchData = async (days: number) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
        {
          params: {
            vs_currency: state.currency,
            days: days.toString(),
          },
        }
      );

      const prices = response.data.prices.map((price: [number, number]) => {
        return { x: new Date(price[0]), y: price[1] };
      });

      setSeries([
        {
          name: "Price",
          data: prices,
        },
      ]);
    } catch (error) {
      console.error("Error fetching data from CoinGecko:", error);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [id, state.currency]);

  const handleButtonClick = (days: number) => {
    fetchData(days);
    setActiveButton(days);
  };

  return (
    <div className="w-full h-full flex flex-col  pt-5 sm:pt-8 lg:pl-10 gap-5">
      <ReactApexChart options={options} series={series} type="area" height="" />
      <ChartTimeLine
        activeButton={activeButton}
        handleButtonClick={handleButtonClick}
      />
    </div>
  );
};

export default Chart;
