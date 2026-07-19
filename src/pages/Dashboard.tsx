const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold">Total Employees</h3>
          <p className="text-4xl mt-4">120</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold">Departments</h3>
          <p className="text-4xl mt-4">8</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold">Active Projects</h3>
          <p className="text-4xl mt-4">15</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
