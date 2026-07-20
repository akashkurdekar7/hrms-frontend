import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
  Tooltip,
  Chip,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  Add,
  Search,
  Edit,
  Delete,
  Close,
} from "@mui/icons-material";
import {
  employeeApi,
  type Employee,
  type EmployeeDto,
} from "../../services/employeeApi";
import { departmentApi } from "../../services/departmentApi";
import type { Department } from "../../services/employeeApi";
import toast from "react-hot-toast";

const emptyForm: EmployeeDto = {
  firstName: "",
  lastName: "",
  email: "",
  departmentId: 0,
  designation: "",
  salary: 0,
};

const EmployeePage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Dialog state
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<EmployeeDto>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Confirm-delete state
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const res = searchTerm
        ? await employeeApi.search(searchTerm)
        : await employeeApi.getAll();
      setEmployees(res.data);
    } catch {
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  const fetchDepartments = useCallback(async () => {
    try {
      const res = await departmentApi.getAll();
      setDepartments(res.data);
    } catch {
      /* ignore — departments dropdown will be empty */
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  /* ---- search debounce ---- */
  useEffect(() => {
    const timer = setTimeout(() => fetchEmployees(), 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  /* ---- CRUD handlers ---- */
  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setOpen(true);
  };

  const openEdit = (emp: Employee) => {
    setEditingId(emp.id);
    setForm({
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      departmentId: emp.department?.id ?? 0,
      designation: emp.designation,
      salary: emp.salary,
    });
    setError("");
    setOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await employeeApi.update(editingId, form);
        toast.success("Employee updated");
      } else {
        await employeeApi.create(form);
        toast.success("Employee created");
      }
      setOpen(false);
      fetchEmployees();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Something went wrong";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await employeeApi.delete(deleteId);
      toast.success("Employee deleted");
      setDeleteId(null);
      fetchEmployees();
    } catch {
      toast.error("Failed to delete employee");
    }
  };

  /* ---- DataGrid columns ---- */
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    { field: "firstName", headerName: "First Name", flex: 1, minWidth: 120 },
    { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 120 },
    { field: "email", headerName: "Email", flex: 1.3, minWidth: 180 },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      minWidth: 130,
      renderCell: (params) => (
        <Chip
          label={params.row.department?.name ?? "—"}
          size="small"
          variant="outlined"
          color="primary"
        />
      ),
    },
    { field: "designation", headerName: "Designation", flex: 1, minWidth: 130 },
    {
      field: "salary",
      headerName: "Salary",
      flex: 0.8,
      minWidth: 110,
      renderCell: (params) =>
        `₹${Number(params.value).toLocaleString("en-IN")}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              color="primary"
              onClick={() => openEdit(params.row)}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => setDeleteId(params.row.id)}>
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Employees
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your workforce
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={openCreate}
          sx={{
            background: "linear-gradient(135deg, #6366f1, #0ea5e9)",
            "&:hover": {
              background: "linear-gradient(135deg, #4f46e5, #0284c7)",
            },
          }}>
          Add Employee
        </Button>
      </Box>

      {/* Search */}
      <TextField
        placeholder="Search by name or email..."
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2, width: { xs: "100%", sm: 340 } }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "text.secondary", fontSize: 20 }} />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* DataGrid */}
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}>
        <DataGrid
          rows={employees}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          disableRowSelectionOnClick
          autoHeight
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f8fafc",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f1f5f9",
            },
          }}
        />
      </Box>

      {/* ---- Create / Edit Dialog ---- */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          {editingId ? "Edit Employee" : "Add New Employee"}
          <IconButton size="small" onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
              mt: 1,
            }}>
            <TextField
              label="First Name"
              required
              value={form.firstName}
              onChange={(e) =>
                setForm((p) => ({ ...p, firstName: e.target.value }))
              }
            />
            <TextField
              label="Last Name"
              required
              value={form.lastName}
              onChange={(e) =>
                setForm((p) => ({ ...p, lastName: e.target.value }))
              }
            />
            <TextField
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              sx={{ gridColumn: "1 / -1" }}
            />
            <TextField
              label="Department"
              select
              required
              value={form.departmentId || ""}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  departmentId: Number(e.target.value),
                }))
              }>
              {departments.map((d) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Designation"
              required
              value={form.designation}
              onChange={(e) =>
                setForm((p) => ({ ...p, designation: e.target.value }))
              }
            />
            <TextField
              label="Salary"
              type="number"
              required
              value={form.salary || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, salary: Number(e.target.value) }))
              }
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            startIcon={saving ? <CircularProgress size={16} /> : undefined}>
            {editingId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ---- Delete Confirmation ---- */}
      <Dialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        maxWidth="xs"
        fullWidth>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this employee? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteId(null)} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeePage;
