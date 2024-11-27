import React, { useState } from "react";
import { Segmented } from "antd";
import { AdminPage } from "./Components/AdminPage";


const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string | number>('Панель администрирования');

  return (
    <>
      <div style={{padding: '40px 0', width: '100%', display: 'flex', justifyContent: 'center'}}>
        <Segmented options={['Панель администрирования', 'Настройка интерфейса']} value={selectedPage} onChange={setSelectedPage} />
      </div>
      {selectedPage === 'Панель администрирования' ? <AdminPage /> : null}
    </>
  );
};

export default App;
