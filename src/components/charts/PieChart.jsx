
import {
  PieChart,
  Pie,
  Label,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../../App.css";
import { useGetTasksQuery } from "../../features/api/apiSlice";
import { useCallback } from "react";

const PieChartComponent = ({isMobile}) => {

      const {data = [], isLoading, isError} = useGetTasksQuery(); 
     
    //Count Methods
    const totalTask = useCallback(() => {
      const totalVal = data.length;
      return totalVal; 
    }, [data])
  
    const totalPendingTask = useCallback(() => {
      const filterData = data.filter((e) => e.status === 'to-do');
      const totalVal = filterData.length;
      return totalVal;
    }, [data])
  
    const totalInProgressTask = useCallback(() => {
      const filterData = data.filter((e) => e.status === 'in-progress');
      const totalVal = filterData.length;
      return totalVal;
    }, [data])
  
      const totalCompletedTask = useCallback(() => {
      const filterData = data.filter((e) => e.status === 'Completed');
      const totalVal = filterData.length;
      return totalVal;
    }, [data])

  const chartData = [
    { namep: "Total", value: totalTask(), fill: "#4d2bcf" },
    { namep: "Running", value: totalInProgressTask(), fill: "#eb00e7ff" },
    { namep: "Pending", value: totalPendingTask(), fill: "#FFBB28" },
    { namep: "Completed", value: totalCompletedTask(), fill: "#FF8042" },
  ];

  const MyPie = () => (
    <Pie
      data={chartData}
      dataKey="value"
      nameKey="namep"
      outerRadius="80%"
      innerRadius="55%"
      isAnimationActive={false}
    />
  );



  return (
    <>
      <ResponsiveContainer height="100%" width="100%">
        <PieChart>
          <MyPie />
          <Label position="center" fill="#666"></Label>
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: "1rem" }} />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default PieChartComponent;
