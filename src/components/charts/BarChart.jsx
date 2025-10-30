import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Dummy data for the week
const data = [
  { name: "Mon", tasksCompleted: 12 },
  { name: "Tue", tasksCompleted: 5 },
  { name: "Wed", tasksCompleted: 9 },
  { name: "Thu", tasksCompleted: 15 },
  { name: "Fri", tasksCompleted: 7 },
  { name: "Sat", tasksCompleted: 3 },
  { name: "Sun", tasksCompleted: 6 },
];

const BarChartComponent = ({isMobile}) => {
  return (
    <ResponsiveContainer width={isMobile ? "100%" : "80%"} aspect={1.6}>
      <BarChart
        data={data}
        margin={{ top: 50, right: 30, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip cursor={{ fill: "rgba(77, 43, 207, 0.1)" }} />

        <Bar
          dataKey="tasksCompleted"
          fill="#4d2bcf"
          name="Tasks Completed"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
