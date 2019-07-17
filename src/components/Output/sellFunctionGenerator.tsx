const sellFunctionGenerator = (itemName: string, itemMinecraftName: string, itemnumber: string, itemamount: string, taler: string, groschen: string) => {
    return (`

        tellraw @p[team=red,distance=..5] "s_${itemnumber}"

        # setup all necessary scoreboards
        scoreboard objectives add s_${itemnumber} dummy
        scoreboard players set @p s_${itemnumber} -1

        # standard price (from future generator), this is only set, if T_cost and G_cost do not exist
        execute unless score T_cost s_${itemnumber} >= 0 Numbers run scoreboard players set T_cost s_${itemnumber} ${taler}
        execute unless score G_cost s_${itemnumber} >= 0 Numbers run scoreboard players set G_cost s_${itemnumber} ${groschen}
        execute unless score item_amount s_${itemnumber} >= 0 Numbers run scoreboard players set item_amount s_${itemnumber} ${itemamount}

        # calculate price in Groschen
        scoreboard players operation price s_${itemnumber} = T_cost s_${itemnumber}
        scoreboard players operation price s_${itemnumber} *= 64 Numbers
        scoreboard players operation price s_${itemnumber} += G_cost s_${itemnumber}

        # check number of items, save in Item_count Scoreboard
        execute store result score @a[scores={s_${itemnumber}=-1}] Item_count run clear @p minecraft:${itemMinecraftName} 0

        # check if player has enough items to sell
        execute as @a[scores={s_${itemnumber}=-1}] if score @p Item_count >= item_amount s_${itemnumber} as @p run scoreboard players set @p s_${itemnumber} -2

        # clear money
        execute store result score @a[scores={s_${itemnumber}=-2}] G_count run clear @p minecraft:nether_brick{display:{Lore:["{\\"text\\":\\"1 Groschen\\"}"]}}
        execute store result score @a[scores={s_${itemnumber}=-2}] T_count run clear @p minecraft:brick{display:{Lore:["{\\"text\\":\\"1 Taler\\"}"]}}
        scoreboard players operation @a[scores={s_${itemnumber}=-2}] T_count *= 64 Numbers
        scoreboard players operation @a[scores={s_${itemnumber}=-2}] G_count += @a[scores={s_${itemnumber}=-2}] T_count

        # give player money and set flag for cashback
        scoreboard players operation @a[scores={s_${itemnumber}=-2}] G_count += price s_${itemnumber}
        scoreboard players set @a[scores={s_${itemnumber}=-2}] Cashback 1

        # set flag for clearing items
        scoreboard players operation @a[scores={s_${itemnumber}=-2}] s_${itemnumber} = item_amount s_${itemnumber}

        # clear items
        clear @a[scores={s_${itemnumber}=64..}] minecraft:${itemMinecraftName} 64
        scoreboard players remove @a[scores={s_${itemnumber}=64..}] s_${itemnumber} 64
        clear @a[scores={s_${itemnumber}=32..}] minecraft:${itemMinecraftName} 32
        scoreboard players remove @a[scores={s_${itemnumber}=32..}] s_${itemnumber} 32
        clear @a[scores={s_${itemnumber}=16..}] minecraft:${itemMinecraftName} 16
        scoreboard players remove @a[scores={s_${itemnumber}=16..}] s_${itemnumber} 16
        clear @a[scores={s_${itemnumber}=8..}] minecraft:${itemMinecraftName} 8
        scoreboard players remove @a[scores={s_${itemnumber}=8..}] s_${itemnumber} 8
        clear @a[scores={s_${itemnumber}=4..}] minecraft:${itemMinecraftName} 4
        scoreboard players remove @a[scores={s_${itemnumber}=4..}] s_${itemnumber} 4
        clear @a[scores={s_${itemnumber}=2..}] minecraft:${itemMinecraftName} 2
        scoreboard players remove @a[scores={s_${itemnumber}=2..}] s_${itemnumber} 2
        clear @a[scores={s_${itemnumber}=1..}] minecraft:${itemMinecraftName} 1
        scoreboard players remove @a[scores={s_${itemnumber}=1..}] s_${itemnumber} 1

        # clear flag
        scoreboard players set @a[scores={s_${itemnumber}=..-1}] s_${itemnumber} 0

        # update Sign
        data merge block ~ ~ ~ {Text1:"[{\\"text\\":\\"\\",\\"clickEvent\\":{\\"action\\":\\"run_command\\",\\"value\\":\\"function shopsystem:s_${itemnumber}\\"}},{\\"score\\":{\\"name\\":\\"item_amount\\",\\"objective\\":\\"s_${itemnumber}\\"}},{\\"text\\":\\" ${itemName}\\"}]",Text2:"{\\"text\\":\\"->\\"}",Text3:"[\\"\\",{\\"score\\":{\\"name\\":\\"T_cost\\",\\"objective\\":\\"s_${itemnumber}\\"}},{\\"text\\":\\" Taler\\"}]",Text4:"[\\"\\",{\\"score\\":{\\"name\\":\\"G_cost\\",\\"objective\\":\\"s_${itemnumber}\\"}},{\\"text\\":\\" Groschen\\"}]"}
    `)
}

export default sellFunctionGenerator;