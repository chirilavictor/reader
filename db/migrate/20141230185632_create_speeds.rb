class CreateSpeeds < ActiveRecord::Migration
  def change
    create_table :speeds do |t|
      t.string :animal
      t.string :blurb
      t.integer :delay

      t.timestamps
    end
  end
end
