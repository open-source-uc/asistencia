ActiveAdmin.register Student do
  permit_params :course_id, attendance_codes: []

  controller do
    before_action :strip_whitespace, only: [:create, :update]

    private

    def strip_whitespace
      params[:student][:attendance_codes]&.reject!(&:blank?)
    end
  end

  index do
    selectable_column
    id_column
    column :course_id
    column :attendance_codes do |o|
      span(o.attendance_codes.map { |c| status_tag(c) })
    end
  end

  show do
    attributes_table do
      row :course_id
      row :attendance_codes do |o|
        span(o.attendance_codes.map { |c| status_tag(c) })
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :course
      f.input :attendance_codes, as: :tags
    end
    f.actions
  end
end
