import { 
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer,
} from 'recharts';

export interface ChartData{
  name: string;
  value: number;
}

export interface ChartProp{
  data: ChartData[];
  domain?: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const PieGraph: React.FC<ChartProp> = ({data}) => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart data={data}>
        <Tooltip />
          <Pie type="monotone" 
          dataKey="value" 
          cx="50%"
          label={({ name, value }) => `${name}: ${value}`}>

          {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}

  </Pie>
      </PieChart>
    </ResponsiveContainer>
  );

export const BarGraph: React.FC<ChartProp> = ({data, domain=0}) => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[domain, 'auto']} />
        <Tooltip />
          <Bar type="monotone" dataKey="value" fill={COLORS[1]} />
      </BarChart>
    </ResponsiveContainer>
  );


