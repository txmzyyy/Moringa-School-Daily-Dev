import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>Daily Dev</h1>
      </header>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;