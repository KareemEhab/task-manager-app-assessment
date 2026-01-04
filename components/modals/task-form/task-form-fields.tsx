import { CategoriesInput } from "@/components/common/categories-input/categories-input";
import { SimpleDatePicker } from "@/components/common/date-picker/simple-date-picker";
import { Dropdown } from "@/components/common/dropdown/dropdown";
import { Input } from "@/components/common/input/input";
import { TaskPriority, TaskStatus } from "@/types/tasks";
import { TaskFormData, TaskFormErrors } from "@/utils/task-validation";

type TaskFormFieldsProps = {
  formData: TaskFormData;
  errors: TaskFormErrors;
  onFieldChange: (field: keyof TaskFormData, value: any) => void;
  minimumDate?: Date;
  scrollViewRef?: React.RefObject<any>; // For auto-scrolling dropdowns
};

const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

const statusOptions = [
  { label: "Upcoming", value: "upcoming" },
  { label: "In Process", value: "in-progress" },
  { label: "In Review", value: "in-review" },
  { label: "Completed", value: "completed" },
];

export function TaskFormFields({
  formData,
  errors,
  onFieldChange,
  minimumDate,
  scrollViewRef,
}: TaskFormFieldsProps) {
  return (
    <>
      <Input
        label="Task Title"
        placeholder="Enter Task Title"
        value={formData.title}
        onChangeText={(text) => onFieldChange("title", text)}
        error={errors.title}
      />

      <Input
        label="Description (Optional)"
        placeholder="Enter task description..."
        value={formData.description}
        onChangeText={(text) => onFieldChange("description", text)}
        error={errors.description}
        variant="textarea"
      />

      <SimpleDatePicker
        label="Due Date"
        value={formData.dueDate}
        onChange={(date) => onFieldChange("dueDate", date)}
        error={errors.dueDate}
        minimumDate={minimumDate}
      />

      <Input
        label="Assign To (Optional)"
        placeholder="Enter email address"
        value={formData.assignedTo || ""}
        onChangeText={(text) => onFieldChange("assignedTo", text)}
        error={errors.assignedTo}
        type="text"
        keyboardType="email-address"
      />

      <CategoriesInput
        label="Categories"
        categories={formData.categories}
        onChange={(categories) => onFieldChange("categories", categories)}
        error={errors.categories}
      />

      <Dropdown
        label="Priority"
        value={formData.priority}
        options={priorityOptions}
        onChange={(value) => onFieldChange("priority", value as TaskPriority)}
        error={errors.priority}
        scrollViewRef={scrollViewRef}
      />

      <Dropdown
        label="Status"
        value={formData.status}
        options={statusOptions}
        onChange={(value) => onFieldChange("status", value as TaskStatus)}
        error={errors.status}
        scrollViewRef={scrollViewRef}
      />
    </>
  );
}
