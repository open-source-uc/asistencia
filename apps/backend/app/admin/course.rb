ActiveAdmin.register Course do
  permit_params :name, :enabled, :slug

  index do
    selectable_column
    id_column
    column :name
    column :enabled
    column :slug
    actions
  end

  filter :name
  filter :enabled

  form do |f|
    f.inputs do
    f.input :name
    f.input :enabled
    f.input :slug
    end
    f.actions
  end

  show do
    attributes_table do
      row :name
      row :enabled
      row :slug

      panel "Students" do
        table_for course.students do
          column :id
          column :attendance_codes do |o|
            span(o.attendance_codes.map { |c| status_tag(c) })
          end
        end
      end

      panel "Activities" do
        table_for course.activities do
          column :name
          column :date
        end
      end
    end
  end
end
