ActiveAdmin.register User do
  permit_params :email, :password, :password_confirmation

  index do
    selectable_column
    column :email
    actions
  end

  show do
    attributes_table do
      row :email
      row :authentication_token

      panel "Courses" do
        table_for user.courses do
          column :name
        end
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :email
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end
end
