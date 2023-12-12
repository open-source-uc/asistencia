class AddSlugToActivity < ActiveRecord::Migration[7.0]
  disable_ddl_transaction!

  def change
    add_column :activities, :slug, :string
    add_index :activities, :slug, unique: true, algorithm: :concurrently
  end
end
