import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export interface ChartData{
  name: string;
  value: number;
}

export interface ChartProp{
  data: ChartData[];
  domain?: number;
}


export const BarGraph: React.FC<ChartProp> = ({data, domain=0}) => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[domain, 'auto']} />
        <Tooltip />
          <Bar type="monotone" dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );


