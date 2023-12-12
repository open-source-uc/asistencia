class AddSlugToCourse < ActiveRecord::Migration[7.0]
  disable_ddl_transaction!
  
  def change
    add_column :courses, :slug, :string
    add_index :courses, :slug, unique: true, algorithm: :concurrently
  end
end
