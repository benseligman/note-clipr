class RemoveUnusedColumnsFromNotes < ActiveRecord::Migration
  def up
    remove_column :notes, :location
    remove_column :notes, :url
    remove_column :notes, :author
  end

  def down
    add_column :notes, :location, :string, :null => false
    add_column :notes, :url, :string, :null => false
    add_column :notes, :author, :string, :null => false
  end
end
