import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getOverview } from "../../../services/apiService";

import "./DashBoard.scss";
const DashBoard = () => {
  const [dataOverview, setDataOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    let res = await getOverview();
    if (res && res.EC === 0) {
      setDataOverview(res.DT);
      //process chart data
      let Us = 0,
        Qz = 0,
        Qs = 0,
        As = 0;

      Us = res?.DT?.users?.total ?? 0;
      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0;

      const data = [
        {
          name: "Users",
          Us: Us,
        },
        {
          name: "Quizzes",
          Qz: Qz,
        },
        {
          name: "Questions",
          Qs: Qs,
        },
        {
          name: "Answers",
          As: As,
        },
      ];
      setDataChart(data);
    }
  };
  console.log(dataOverview);
  return (
    <div className="dashboard-container container">
      <div className="mb-3 fw-bold fs-2">Dashboard</div>
      <div className="content">
        <div className="c-left">
          <div className="child">
            <span className="text-1">Total users</span>
            <span className="text-2">
              {dataOverview && dataOverview.users && dataOverview.users.total
                ? dataOverview.users.total
                : 0}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total quizzes</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuiz
                ? dataOverview.others.countQuiz
                : 0}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total questions</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuestions
                ? dataOverview.others.countQuestions
                : 0}
            </span>
          </div>
          <div className="child">
            <span className="text-1"> Total answers</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countAnswers
                ? dataOverview.others.countAnswers
                : 0}
            </span>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width="95%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={dataChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              <YAxis />
              {/* <Tooltip /> */}
              <Legend />
              <Bar dataKey="Us" fill="#7FFF00" />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#fcb12a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
