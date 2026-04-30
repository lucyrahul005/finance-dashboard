import { useFinance } from "../context/FinanceContext";

const RoleSwitcher = () => {
  const { role, setRole } = useFinance();

  return (
    <select
      className="border px-3 py-2 rounded-lg"
      value={role}
      onChange={(e) => setRole(e.target.value)}
    >
      <option value="viewer">Viewer</option>
      <option value="admin">Admin</option>
    </select>
  );
};

export default RoleSwitcher;
