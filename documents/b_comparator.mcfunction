# setup all necessary scoreboards
scoreboard objectives add b_comparator dummy
scoreboard players set @p b_comparator -1

# standard price (from future generator), this is only set, if T_cost and G_cost do not exist
execute unless score T_cost b_comparator >= 0 Numbers run scoreboard players set T_cost b_comparator 0
execute unless score G_cost b_comparator >= 0 Numbers run scoreboard players set G_cost b_comparator 19
execute unless score item_amount b_comparator >= 0 Numbers run scoreboard players set item_amount b_comparator 7

# calculate price in Groschen
scoreboard players operation price b_comparator = T_cost b_comparator
scoreboard players operation price b_comparator *= 64 Numbers
scoreboard players operation price b_comparator += G_cost b_comparator

# check current money
execute store result score @a[scores={b_comparator=-1}] G_count run clear @p minecraft:nether_brick{display:{Lore:["{\"text\":\"1 Groschen\"}"]}} 0
execute store result score @a[scores={b_comparator=-1}] T_count run clear @p minecraft:brick{display:{Lore:["{\"text\":\"1 Taler\"}"]}} 0
scoreboard players operation @a[scores={b_comparator=-1}] T_count *= 64 Numbers
scoreboard players operation @a[scores={b_comparator=-1}] G_count += @a[scores={b_comparator=-1}] T_count

# check if player has enough money
execute as @a[scores={b_comparator=-1}] if score @p G_count >= price b_comparator as @p run scoreboard players set @p b_comparator -2

# take money and set flag for cashback
clear @a[scores={b_comparator=-2}] minecraft:nether_brick{display:{Lore:["{\"text\":\"1 Groschen\"}"]}}
clear @a[scores={b_comparator=-2}] minecraft:brick{display:{Lore:["{\"text\":\"1 Taler\"}"]}}
scoreboard players operation @a[scores={b_comparator=-2}] G_count -= price b_comparator
scoreboard players set @a[scores={b_comparator=-2}] Cashback 1

# set flag for giving items
scoreboard players operation @a[scores={b_comparator=-2}] b_comparator = item_amount b_comparator

# Ausgabe der Items
give @a[scores={b_comparator=64..}] minecraft:comparator 64
scoreboard players remove @a[scores={b_comparator=64..}] b_comparator 64
give @a[scores={b_comparator=32..}] minecraft:comparator 32
scoreboard players remove @a[scores={b_comparator=32..}] b_comparator 32
give @a[scores={b_comparator=16..}] minecraft:comparator 16
scoreboard players remove @a[scores={b_comparator=16..}] b_comparator 16
give @a[scores={b_comparator=8..}] minecraft:comparator 8
scoreboard players remove @a[scores={b_comparator=8..}] b_comparator 8
give @a[scores={b_comparator=4..}] minecraft:comparator 4
scoreboard players remove @a[scores={b_comparator=4..}] b_comparator 4
give @a[scores={b_comparator=2..}] minecraft:comparator 2
scoreboard players remove @a[scores={b_comparator=2..}] b_comparator 2
give @a[scores={b_comparator=1..}] minecraft:comparator 1
scoreboard players remove @a[scores={b_comparator=1..}] b_comparator 1

# normal store execution

scoreboard players set @a[scores={b_comparator=..-1}] b_comparator 0

# update Sign, (das muss dann auch der Generator erzeugen, ist sonst n Dreck...)
data merge block ~ ~ ~ {Text1:"[{\"text\":\"\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"function shopsystem:b_comparator\"}},{\"score\":{\"name\":\"T_cost\",\"objective\":\"b_comparator\"}},{\"text\":\" Taler +\"}]",Text2:"[\"\",{\"score\":{\"name\":\"G_cost\",\"objective\":\"b_comparator\"}},{\"text\":\" Groschen\"}]",Text3:"{\"text\":\"->\"}",Text4:"[\"\",{\"score\":{\"name\":\"item_amount\",\"objective\":\"b_comparator\"}},{\"text\":\" Comparators\"}]"}


