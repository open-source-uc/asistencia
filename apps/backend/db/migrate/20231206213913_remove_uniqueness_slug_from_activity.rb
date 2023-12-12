class RemoveUniquenessSlugFromActivity < ActiveRecord::Migration[7.0]
  def change
    remove_index :activities, :slug
    change_column_null :activities, :description_ciphertext, true
  end
end
