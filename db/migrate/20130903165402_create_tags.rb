class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :user_id, :null => false
      t.string :body, :null => false

      t.timestamps
    end

    add_index :tags, :user_id
    add_index :tags, :body
    add_index :tags, [:user_id, :body], :unique => true
  end
end
