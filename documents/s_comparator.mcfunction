# setup all necessary scoreboards
scoreboard objectives add s_comparator dummy
scoreboard players set @p s_comparator -1

# standard price (from future generator), this is only set, if T_cost and G_cost do not exist
execute unless score T_cost s_comparator >= 0 Numbers run scoreboard players set T_cost s_comparator 1
execute unless score G_cost s_comparator >= 0 Numbers run scoreboard players set G_cost s_comparator 0
execute unless score item_amount s_comparator >= 0 Numbers run scoreboard players set item_amount s_comparator 20

# calculate price in Groschen
scoreboard players operation price s_comparator = T_cost s_comparator
scoreboard players operation price s_comparator *= 64 Numbers
scoreboard players operation price s_comparator += G_cost s_comparator

# check number of items, save in Item_count Scoreboard
execute store result score @a[scores={s_comparator=-1}] Item_count run clear @p minecraft:comparator 0

# check if player has enough items to sell
execute as @a[scores={s_comparator=-1}] if score @p Item_count >= item_amount s_comparator as @p run scoreboard players set @p s_comparator -2

# clear money
execute store result score @a[scores={s_comparator=-2}] G_count run clear @p minecraft:nether_brick{display:{Lore:["{\"text\":\"1 Groschen\"}"]}}
execute store result score @a[scores={s_comparator=-2}] T_count run clear @p minecraft:brick{display:{Lore:["{\"text\":\"1 Taler\"}"]}}
scoreboard players operation @a[scores={s_comparator=-2}] T_count *= 64 Numbers
scoreboard players operation @a[scores={s_comparator=-2}] G_count += @a[scores={s_comparator=-2}] T_count

# give player money and set flag for cashback
scoreboard players operation @a[scores={s_comparator=-2}] G_count += price s_comparator
scoreboard players set @a[scores={s_comparator=-2}] Cashback 1

# set flag for clearing items
scoreboard players operation @a[scores={s_comparator=-2}] s_comparator = item_amount s_comparator

# clear items
clear @a[scores={s_comparator=64..}] minecraft:comparator 64
scoreboard players remove @a[scores={s_comparator=64..}] s_comparator 64
clear @a[scores={s_comparator=32..}] minecraft:comparator 32
scoreboard players remove @a[scores={s_comparator=32..}] s_comparator 32
clear @a[scores={s_comparator=16..}] minecraft:comparator 16
scoreboard players remove @a[scores={s_comparator=16..}] s_comparator 16
clear @a[scores={s_comparator=8..}] minecraft:comparator 8
scoreboard players remove @a[scores={s_comparator=8..}] s_comparator 8
clear @a[scores={s_comparator=4..}] minecraft:comparator 4
scoreboard players remove @a[scores={s_comparator=4..}] s_comparator 4
clear @a[scores={s_comparator=2..}] minecraft:comparator 2
scoreboard players remove @a[scores={s_comparator=2..}] s_comparator 2
clear @a[scores={s_comparator=1..}] minecraft:comparator 1
scoreboard players remove @a[scores={s_comparator=1..}] s_comparator 1

# clear flag
scoreboard players set @a[scores={s_comparator=..-1}] s_comparator 0

# update Sign
data merge block ~ ~ ~ {Text1:"[{\"text\":\"\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"function shopsystem:s_comparator\"}},{\"score\":{\"name\":\"item_amount\",\"objective\":\"s_comparator\"}},{\"text\":\" Comparators\"}]",Text2:"{\"text\":\"->\"}",Text3:"[\"\",{\"score\":{\"name\":\"T_cost\",\"objective\":\"s_comparator\"}},{\"text\":\" Taler\"}]",Text4:"[\"\",{\"score\":{\"name\":\"G_cost\",\"objective\":\"s_comparator\"}},{\"text\":\" Groschen\"}]"}


