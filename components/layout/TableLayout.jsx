import { use } from "react";
import Table from "../ui/Table";
import PaginationLayout from "./PaginationLayout";

export default function TableLayout({
  data,
  columns,
  MobileRow,
  DesktopRow,
  emptyMessage,
}) {
  const { data: tableData, pagination } = use(data);

  return (
    <>
      <Table
        data={tableData}
        columns={columns}
        emptyMessage={emptyMessage || "No transactions found."}
        renderDesktopRow={(item) => <DesktopRow key={item.id} item={item} />}
        renderMobileRow={(item) => <MobileRow key={item.id} item={item} />}
      />

      <PaginationLayout data={pagination} />
    </>
  );
}
