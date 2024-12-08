import { useState, useEffect } from "react"
import { AgCharts } from 'ag-charts-react';

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      prepareChartData();
      preparePieChartData();
    }
  }, [transactions]);

  const preparePieChartData = () => {
    // Create a map to store category totals
    const categoryTotals = new Map();

    // Process each transaction
    transactions.forEach(transaction => {
      const category = transaction.category || 'Uncategorized';
      const currentTotal = categoryTotals.get(category) || 0;
      categoryTotals.set(category, currentTotal + transaction.price);
    });

    // Convert map to array and calculate percentages
    const total = Array.from(categoryTotals.values()).reduce((a, b) => a + b, 0);
    const pieData = Array.from(categoryTotals, ([category, amount]) => ({
      category,
      amount: parseFloat(amount.toFixed(2)),
      percentage: parseFloat(((amount / total) * 100).toFixed(1))
    }));

    setPieChartData(pieData);
  };

  const pieChartOptions = {
    title: {
      text: 'Sales Distribution by Category',
    },
    subtitle: {
      text: 'Percentage of Total Sales Amount',
    },
    data: pieChartData,
    series: [{
      type: 'pie',
      angleKey: 'amount',
      labelKey: 'category',
      innerRadiusRatio: 0.5,
      fills: [
        '#4f46e5', '#7c3aed', '#2563eb', '#db2777', '#dc2626',
        '#ea580c', '#d97706', '#65a30d', '#0d9488', '#0284c7'
      ],
      calloutLabelKey: 'category',
      sectorLabelKey: 'percentage',
      tooltipRenderer: (params) => {
        return {
          content: `${params.datum.category}: $${params.datum.amount.toLocaleString()} (${params.datum.percentage}%)`,
        };
      },
    }],
    legend: {
      position: 'right',
      item: {
        paddingY: 15,
      },
    },
  };

  const prepareChartData = () => {
    // Create a map to store monthly totals
    const monthlyTotals = new Map();

    // Process each transaction
    transactions.forEach(transaction => {
      const date = new Date(transaction.dateOfSale);
      const monthYear = date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
      
      const currentTotal = monthlyTotals.get(monthYear) || 0;
      monthlyTotals.set(monthYear, currentTotal + transaction.price);
    });

    // Convert map to array and sort by date
    const chartDataArray = Array.from(monthlyTotals, ([month, total]) => ({
      month,
      total: parseFloat(total.toFixed(2))
    })).sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA - dateB;
    });

    setChartData(chartDataArray);
  };

  const [chartOptions, setChartOptions] = useState({
    title: {
      text: 'Monthly Sales Overview',
    },
    subtitle: {
      text: 'Total Sales Amount by Month',
    },
    data: [],
    series: [{
      type: 'bar',
      xKey: 'month',
      yKey: 'total',
      fill: '#4f46e5',
      tooltip: {
        renderer: (params) => {
          return {
            content: `$${params.datum.total.toLocaleString()}`,
          };
        },
      },
    }],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: {
          text: 'Month',
        },
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: 'Sales Amount ($)',
        },
        label: {
          formatter: (params) => {
            return '$' + params.value.toLocaleString();
          },
        },
      },
    ],
    legend: {
      enabled: false,
    },
  });

  useEffect(() => {
    setChartOptions(prev => ({
      ...prev,
      data: chartData
    }));
  }, [chartData]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:3050/api/transactions');
      const data = await response.json();
      setTransactions(data.data);
      setFilteredTransactions(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  const [currentSer, setCurrentSer] = useState('monthlyDetail');

  if (currentSer == 'monthlyDetail') {
    return (
      <div className="container mx-auto p-4">
        <div className="flex gap-3 mb-6">
          <button onClick={() => setCurrentSer('Pie chart')} className="bg-blue-500 text-white px-3 py-1 rounded">Pie chart</button>
          <button onClick={() => setCurrentSer('barGraph')} className="bg-blue-500 text-white px-3 py-1 rounded">Bar Graph</button>
          <h1 className="text-xl font-bold">MonthlyDetail</h1>
        </div>
        <div>
          <div className="selectMonth"></div>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Sale</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sold</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center">Loading...</td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center">No transactions found</td>
                  </tr>
                ) : (
                  transactions.map((transaction, index) => (
                    <tr key={transaction._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction._id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{transaction.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{transaction.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">${transaction.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(transaction.dateOfSale).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.sold ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  } else if (currentSer == 'barGraph') {
    return (
      <div className="container mx-auto p-4">
        <div className="flex gap-3 mb-6">
          <button onClick={() => setCurrentSer('monthlyDetail')} className="bg-blue-500 text-white px-3 py-1 rounded">Monthly Detail</button>
          <button onClick={() => setCurrentSer('Pie chart')} className="bg-blue-500 text-white px-3 py-1 rounded">Pie chart</button>
          <h1 className="text-xl font-bold">Bar Graph</h1>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <div style={{ width: '100%', height: '500px' }}>
              <AgCharts options={chartOptions} />
            </div>
          )}
        </div>
      </div>
    )
  } else if (currentSer == 'Pie chart') {
    return (
      <div className="container mx-auto p-4">
        <div className="flex gap-3 mb-6">
          <button onClick={() => setCurrentSer('monthlyDetail')} className="bg-blue-500 text-white px-3 py-1 rounded">Monthly Detail</button>
          <button onClick={() => setCurrentSer('barGraph')} className="bg-blue-500 text-white px-3 py-1 rounded">Bar Graph</button>
          <h1 className="text-xl font-bold">Category Distribution</h1>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <div style={{ width: '100%', height: '600px' }}>
              <AgCharts options={pieChartOptions} />
            </div>
          )}
        </div>
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pieChartData.map((item) => (
              <div key={item.category} className="p-4 border rounded-lg">
                <div className="font-medium">{item.category}</div>
                <div className="text-sm text-gray-600">
                  ${item.amount.toLocaleString()} ({item.percentage}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home