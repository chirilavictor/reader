# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

speed_seeds = [
  {delay: 20000, animal: "slug", blurb: "Slugs are awesome!"},
  {delay: 18000, animal: "sloth", blurb: "Sloths are awesome!"},
  {delay: 15000, animal: "turtle", blurb: "Turtles are awesome!"},
  {delay: 12000, animal: "snake", blurb: "Snakes are awesome!"},
  {delay: 9000, animal: "lizard", blurb: "Lizards are awesome!"},
  {delay: 7000, animal: "mouse", blurb: "Mice are awesome!"},
  {delay: 5000, animal: "rabbit", blurb: "Rabbits are awesome!"},
  {delay: 3000, animal: "dog", blurb: "Dogs are awesome!"},
  {delay: 2000, animal: "horse", blurb: "Horses are awesome!"},
  {delay: 1000, animal: "cheetah", blurb: "Cheetahs are awesome!"},
  {delay: 500, animal: "peregrine falcon", blurb: "Peregrine falcons are awesome!"},
  {delay: 0, animal: "Read manually", blurb: "Click arrows to read the story."}
]

speed_seeds.each { |item| Speed.create(item) }