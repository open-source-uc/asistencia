ActiveAdmin.register Attendance do
  permit_params :student_id, :activity_id, :user_id

  index do
    selectable_column
    id_column
    column :student
    column :activity
    column :user
  end

  form do |f|
    f.inputs do
      f.input :student
      f.input :activity
      f.input :user
    end
    f.actions
  end
end
