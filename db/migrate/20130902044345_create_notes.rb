class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.integer :notebook_id, :null => false
      t.string :title
      t.string :location
      t.string :url
      t.string :author
      t.text :body

      t.timestamps
    end

    add_index :notes, :notebook_id
  end
end
