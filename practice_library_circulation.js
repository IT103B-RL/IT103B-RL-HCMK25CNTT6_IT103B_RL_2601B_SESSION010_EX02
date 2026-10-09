let circulationLogs = [
  { logId: "LOG01", studentCode: "SV01", bookIsbn: "978-01", status: "BORROWING", fineAmount: 0 },
  { logId: "LOG02", studentCode: "SV02", bookIsbn: "978-02", status: "RETURNED", fineAmount: 15000, daysPassed: 35 },
  { logId: "LOG03", studentCode: "SV03", bookIsbn: "978-03", status: "BORROWING", fineAmount: 0 }
];

// 1. Mượn sách mới (Create)
const studentCode = "SV04";
const bookIsbn = "978-04";

if (studentCode && bookIsbn) {
  circulationLogs.push({
    logId: `LOG0${circulationLogs.length + 1}`,
    studentCode,
    bookIsbn,
    status: "BORROWING",
    fineAmount: 0
  });
}

// 2. Trả sách & Tính phạt (Update)
const returnLogId = "LOG01";
const isLost = false;
const overdueDays = 3;

circulationLogs = circulationLogs.map(log => {
  if (log.logId !== returnLogId) return log;

  if (isLost) {
    return { ...log, status: "LOST", fineAmount: 200000, daysPassed: 0 };
  }
  return { ...log, status: "RETURNED", fineAmount: overdueDays * 5000, daysPassed: 0 };
});

// 3. Xoá nhật ký quá 30 ngày (Delete)
circulationLogs = circulationLogs.filter(log => 
  log.status === "BORROWING" || (log.daysPassed || 0) <= 30
);

// 4. Báo cáo (Read)
const borrowingCount = circulationLogs.filter(log => log.status === "BORROWING").length;
const totalFine = circulationLogs.reduce((sum, log) => sum + log.fineAmount, 0);

console.log("+--------+----------+-----------+------------+------------+");
console.log("| Mã GD  | Mã SV    | ISBN      | Trạng Thái | Phạt (VNĐ) |");
console.log("+--------+----------+-----------+------------+------------+");

circulationLogs.forEach(({ logId, studentCode, bookIsbn, status, fineAmount }) => {
  const id = logId.padEnd(6);
  const sv = studentCode.padEnd(8);
  const isbn = bookIsbn.padEnd(9);
  const st = status.padEnd(10);
  const fine = String(fineAmount).padStart(10);
  console.log(`| ${id} | ${sv} | ${isbn} | ${st} | ${fine} |`);
});

console.log("+--------+----------+-----------+------------+------------+");
console.log(`Đang mượn: ${borrowingCount} cuốn | Tổng tiền phạt: ${totalFine} VNĐ`);