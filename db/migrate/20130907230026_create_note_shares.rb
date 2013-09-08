class CreateNoteShares < ActiveRecord::Migration
  def change
    create_table :note_shares do |t|
      t.integer :note_id, :null => false
      t.timestamps
    end

    add_index :note_shares, :note_id, :unique => true
  end
end
