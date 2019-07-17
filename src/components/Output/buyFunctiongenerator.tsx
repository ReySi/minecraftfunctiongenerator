const buyFunctionGenerator = (itemName: string, itemMinecraftName: string, itemnumber: string, itemamount: string, taler: string, groschen: string) => {
    return (
        `tellraw @p[team=red,distance=..5] "b_${itemnumber}"

        # setup all necessary scoreboards
        scoreboard objectives add b_${itemnumber} dummy
        scoreboard players set @p b_${itemnumber} -1
        
        # standard price (from future generator), this is only set, if T_cost and G_cost do not exist
        execute unless score T_cost b_${itemnumber} >= 0 Numbers run scoreboard players set T_cost b_${itemnumber} ${taler}
        execute unless score G_cost b_${itemnumber} >= 0 Numbers run scoreboard players set G_cost b_${itemnumber} ${groschen}
        execute unless score item_amount b_${itemnumber} >= 0 Numbers run scoreboard players set item_amount b_${itemnumber} ${itemamount}
        
        # calculate price in Groschen
        scoreboard players operation price b_${itemnumber} = T_cost b_${itemnumber}
        scoreboard players operation price b_${itemnumber} *= 64 Numbers
        scoreboard players operation price b_${itemnumber} += G_cost b_${itemnumber}
        
        # check current money
        execute store result score @a[scores={b_${itemnumber}=-1}] G_count run clear @p minecraft:nether_brick{display:{Lore:["{\\"text\\":\\"1 Groschen\\"}"]}} 0
        execute store result score @a[scores={b_${itemnumber}=-1}] T_count run clear @p minecraft:brick{display:{Lore:["{\\"text\\":\\"1 Taler\\"}"]}} 0
        scoreboard players operation @a[scores={b_${itemnumber}=-1}] T_count *= 64 Numbers
        scoreboard players operation @a[scores={b_${itemnumber}=-1}] G_count += @a[scores={b_${itemnumber}=-1}] T_count
        
        # check if player has enough money
        execute as @a[scores={b_${itemnumber}=-1}] if score @p G_count >= price b_${itemnumber} as @p run scoreboard players set @p b_${itemnumber} -2
        
        # take money and set flag for cashback
        clear @a[scores={b_${itemnumber}=-2}] minecraft:nether_brick{display:{Lore:["{\\"text\\":\\"1 Groschen\\"}"]}}
        clear @a[scores={b_${itemnumber}=-2}] minecraft:brick{display:{Lore:["{\\"text\\":\\"1 Taler\\"}"]}}
        scoreboard players operation @a[scores={b_${itemnumber}=-2}] G_count -= price b_${itemnumber}
        scoreboard players set @a[scores={b_${itemnumber}=-2}] Cashback 1
        
        # set flag for giving items
        scoreboard players operation @a[scores={b_${itemnumber}=-2}] b_${itemnumber} = item_amount b_${itemnumber}
        
        # Ausgabe der Items
        give @a[scores={b_${itemnumber}=64..}] minecraft:${itemMinecraftName} 64
        scoreboard players remove @a[scores={b_${itemnumber}=64..}] b_${itemnumber} 64
        give @a[scores={b_${itemnumber}=32..}] minecraft:${itemMinecraftName} 32
        scoreboard players remove @a[scores={b_${itemnumber}=32..}] b_${itemnumber} 32
        give @a[scores={b_${itemnumber}=16..}] minecraft:${itemMinecraftName} 16
        scoreboard players remove @a[scores={b_${itemnumber}=16..}] b_${itemnumber} 16
        give @a[scores={b_${itemnumber}=8..}] minecraft:${itemMinecraftName} 8
        scoreboard players remove @a[scores={b_${itemnumber}=8..}] b_${itemnumber} 8
        give @a[scores={b_${itemnumber}=4..}] minecraft:${itemMinecraftName} 4
        scoreboard players remove @a[scores={b_${itemnumber}=4..}] b_${itemnumber} 4
        give @a[scores={b_${itemnumber}=2..}] minecraft:${itemMinecraftName} 2
        scoreboard players remove @a[scores={b_${itemnumber}=2..}] b_${itemnumber} 2
        give @a[scores={b_${itemnumber}=1..}] minecraft:${itemMinecraftName} 1
        scoreboard players remove @a[scores={b_${itemnumber}=1..}] b_${itemnumber} 1
        
        # normal store execution
        
        scoreboard players set @a[scores={b_${itemnumber}=..-1}] b_${itemnumber} 0
        
        # update Sign, (das muss dann auch der Generator erzeugen, ist sonst n Dreck...)
        data merge block ~ ~ ~ {Text1:"[{\\"text\\":\\"\\",\\"clickEvent\\":{\\"action\\":\\"run_command\\",\\"value\\":\\"function shopsystem:b_${itemnumber}\\"}},{\\"score\\":{\\"name\\":\\"T_cost\\",\\"objective\\":\\"b_${itemnumber}\\"}},{\\"text\\":\\" Taler +\\"}]",Text2:"[\\"\\",{\\"score\\":{\\"name\\":\\"G_cost\\",\\"objective\\":\\"b_${itemnumber}\\"}},{\\"text\\":\\" Groschen\\"}]",Text3:"{\\"text\\":\\"->\\"}",Text4:"[\\"\\",{\\"score\\":{\\"name\\":\\"item_amount\\",\\"objective\\":\\"b_${itemnumber}\\"}},{\\"text\\":\\" ${itemName}\\"}]"}`
    )
}

export default buyFunctionGenerator;