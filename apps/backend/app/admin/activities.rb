ActiveAdmin.register Activity do
  permit_params :name, :course_id, :description, :date, :slug

  index do
    selectable_column
    id_column
    column :course
    column :name
    clumn :slug
  end

  show do
    attributes_table do
      row :course
      row :name
      row :description
      row :date
      row :slug
    end
  end

  form do |f|
    f.inputs do
      f.input :course
      f.input :name
      f.input :description
      f.input :date
      f.input :slug
    end
    f.actions
  end
end
