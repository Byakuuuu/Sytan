//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.35;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.35] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 * 
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.35: November 18, 2021
 * * Compatibility Update!
 * ** If this plugin's updated scene is disabled, the Help Window locations for
 *    the Item, Equip, and Shop Scenes should now be at their designated
 *    locations as calculated by the VisuMZ Core Engine instead of the RMMZ
 *    default location. Update made by Irina.
 * 
 * Version 1.34: October 28, 2021
 * * Feature Update
 * ** Added fail safe checks for projects that are using old data for starting
 *    equipment that no longer exist, thus preventing the game from opening.
 *    Update made by Arisu.
 * 
 * Version 1.33: August 6, 2021
 * * Documentation Update!
 * ** Removed "Weapon" and "Armor" from "Used For" for <Status Info>. This was
 *    an unintended piece of documentation.
 * 
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 * 
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 * 
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *    
 * 
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 * 
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

function _0x3e4a(){const _0x3bab93=['iconText','13765wbuaLK','damage','FuDga','EquipAdjustHpMp','drawItemEffects','StatusWindow','MultiplierStandard','Tzudd','postCreateCategoryWindowItemsEquipsCore','equip','isOptimizeCommandEnabled','playCursorSound','drawCurrencyValue','uOPNU','ggfPA','iCYqb','deactivate','auto','KBONb','bAKWa','isCommandEnabled','includes','value','determineBaseSellingPrice','nonRemovableEtypes','JUIqm','getItemEffectsRemovedStatesBuffsLabel','GCbHO','RmzUx','BxjeL','VisuMZ_1_BattleCore','drawItemEquipType','Game_Actor_forceChangeEquip','isEquipCommandAdded','onSlotCancel','getItemEffectsTpRecoveryText','commandNameWindowDrawText','_dummyWindow','itemAt','QnhBs','ezWIR','currentClass','RemoveEquipIcon','etypeId','HiddenItemB','getItemHitTypeLabel','smallParamFontSize','process_VisuMZ_ItemsEquipsCore_Notetags','tCovo','LabelDamageHP','vArzf','VdafF','commandName','Nbjaq','StatusWindowWidth','return\x200','isSellCommandEnabled','SKAiy','dagvE','battleMembers','STR','getItemEffectsHpRecoveryLabel','NEruH','onTouchOk','LayoutStyle','ElementWeapon','bqmMb','iconHeight','value1','canConsumeItem','speed','paramId','PNMiG','RegExp','pop','_bypassNewLabel','Window_ItemCategory_setItemWindow','HjpMr','hqxgx','getItemEffectsMpRecoveryLabel','center','geUpdatedLayoutStatusWidth','smoothScrollTo','NoChangeMarker','kuhev','LabelSelfGainTP','Step2End','foreground','getItemEffectsMpDamageLabel','FmqAr','indexOf','kZJJV','WAmMG','allowShiftScrolling','FESEg','commandEquip','equipAdjustHpMp','VhfJJ','powerDownColor','HaJmQ','ARRAYJSON','JhxJk','drawItemDamageElement','atypeId','drawItemNumber','_data','OCCASION','updateChangedSlots','item','HMtDS','iGDvi','cursorDown','LNeGr','releaseUnequippableItems','Game_Actor_changeEquip','Window_ItemList_maxCols','addState','onSellCancel','activateSellWindow','addOptimizeCommand','BackRectColor','isEnabled','meetsItemConditionsNotetags','zIyYe','statusWidth','equipTypes','drawCustomShopGraphic','ARRAYSTR','GMHzd','value2','normalColor','processCursorMove','Scene_Equip_helpWindowRect','clamp','ConvertParams','kgRnI','drawItemEffectsHpRecovery','Actors','XGdvT','DmhDU','SwitchSell','lQPfr','getItemEffects','drawItemEffectsSelfTpGain','categoryNameWindowDrawText','Viypl','nextActor','changePaintOpacity','Window_EquipStatus_refresh','getItemEffectsAddedStatesBuffsLabel','helpAreaHeight','makeDeepCopy','equipSlots','makeCommandList','grWBN','mcakD','_category','YWgYz','BvCEj','DAaBU','ItemScene','maxVisibleItems','16FIIuBd','initNewItemsList','Scene_Boot_onDatabaseLoaded','NonOptimizeETypes','process_VisuMZ_ItemsEquipsCore_RegExp','commandNameWindowCenter','getItemScopeText','auqjF','HitType%1','Scene_Shop_sellingPrice','mainAreaTop','nonOptimizeEtypes','_tempActorB','flatHP','MaxIcons','bitmap','weapon','drawItemEffectsMpRecovery','drawEquipData','setHelpWindowItem','toLowerCase','nYPAO','price','width','create','vUHiB','map','IjhCb','addChild','commandStyleCheck','addLoadListener','rJlBQ','TyQVy','REPEAT','unDNq','BqfiU','ARebN','_shopStatusMenuAlly','clearNewItem','Scene_Equip_commandEquip','AGI','LabelConsume','prepareNextScene','Scene_Shop_doSell','HugHK','checkItemConditionsSwitchNotetags','vzcyX','LabelRecoverMP','processCursorMoveModernControls','CONSUMABLE','placeItemNewLabel','xcEOg','USER\x20TP\x20GAIN','trim','getItemEffectsTpDamageLabel','checkShiftRemoveShortcut','onMenuImageLoad','paramPlusItemsEquipsCoreCustomJS','SpeedNeg1999','Param','Slots','bSeWg','name','type','ADDED\x20EFFECTS','filter','addSellCommand','GUfBN','KeyItemProtect','param','meetsItemConditions','DhaFh','prepareItemCustomData','buyWindowRect','hpRate','JXJHE','changeEquip','uOhFx','MaxWeapons','A%1','HXjKM','LadRd','numItems','Scene_Equip_statusWindowRect','initialize','Scene_Shop_numberWindowRect','_numberWindow','description','Window_Selectable_update','calcWindowHeight','bind','AhZlZ','innerWidth','setItemWindow','drawTextEx','Scene_Shop_doBuy','show','ItemMenuStatusRect','LabelRepeats','wNamd','isGoodShown','cFVld','uGOui','onBuyCancel','lineHeight','Scene_Equip_create','MaxItems','QFQES','whnPH','getItemEffectsAddedStatesBuffsText','rFrBE','isClearCommandEnabled','Scene_Shop_createSellWindow','move','initNewLabelSprites','AlreadyEquipMarker','paramValueFontSize','YfVjL','effects','ExtDisplayedParams','setHandler','Game_Actor_tradeItemWithParty','kaJZB','ZvzHT','lvXcQ','WQNxu','sJRlS','Scene_Shop_onSellOk','canEquip','assjl','_commandNameWindow','Emcyu','VSwIm','NonRemoveETypes','RzeeI','getItemDamageAmountTextBattleCore','opacity','left','_newLabelOpacity','contents','setObject','refresh','mpjeD','tPNEo','length','Scene_Shop_goldWindowRect','resetTextColor','New','MANUAL','AzkPK','_newLabelOpacityUpperLimit','caUUU','WXIjm','EFFECT_RECOVER_MP','NZSfs','OySyM','283329DlhGbp','drawIcon','cancel','fill','Scene_Shop_sellWindowRect','iZQNe','ZhFQn','maxItemAmount','uiInputPosition','uWEbX','getMenuImage','updateNewLabelOpacity','FUNC','BattleUsable','adjustHiddenShownGoods','EFFECT_GAIN_TP','AlwaysUsable','FwdoD','drawItemEffectsMpDamage','isEquipChangeOk','OffsetX','MGRrk','cursorPageup','Step3End','iAULs','Scene_Item_createItemWindow','getColor','onBuyCancelItemsEquipsCore','Pykwr','getItemsEquipsCoreBackColor2','SwitchBuy','ksBqe','values','kPvWp','pzUBU','kCpNr','elementId','Scene_Shop_buyWindowRect','CmdIconSell','isBattleTest','GaOMN','UYPkX','bestEquipItem','commandWindowRect','drawUpdatedParamValueDiff','BuyPriceJS','ouXob','qvtrc','buyWindowRectItemsEquipsCore','_categoryNameWindow','isWeapon','fontSizeRatio','processCursorHomeEndTrigger','fillRect','gainItem','addClearCommand','drawCustomShopGraphicLoad','BJLGI','yDHVM','push','Parse_Notetags_ParamValues','getItemDamageAmountLabel','Parse_Notetags_EnableJS','cursorPagedown','scrollTo','mainAreaBottom','DrawParamJS','itemHasEquipLimit','+%1%','wVeIX','sMrnd','Scene_Equip_itemWindowRect','yLQEw','equip2','numberWindowRectItemsEquipsCore','Scene_Equip_onSlotOk','ymHcO','ParamValueFontSize','translucentOpacity','VOjXF','Translucent','refreshItemsEquipsCoreNoMenuImage','innerHeight','tlPTw','CommandAddClear','log','HwGmP','_tempActorA','szzgy','IYbes','gJJRI','LabelApply','canShiftRemoveEquipment','ARRAYNUM','DFKPc','isSoleArmorType','drawItemKeyData','createCategoryWindow','_bypassReleaseUnequippableItemsItemsEquipsCore','Parse_Notetags_ParamJS','ifCzH','JfPTt','createCategoryNameWindow','Window_Selectable_setHelpWindowItem','LUK','isShiftRemoveShortcutEnabled','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','statusWindowRect','Game_Party_gainItem','buttonAssistKey3','550ObFTvn','Text','CmdCancelRename','reloadMapIfUpdated','QtgYB','resetFontSettings','actorParams','isPlaytest','callUpdateHelp','_customItemInfo','Style','blt','note','jiBfj','ParamChangeFontSize','getItemDamageAmountText','drawItemOccasion','addCommand','VpKri','CommandAddOptimize','iittV','EFFECT_ADD_STATE','2859115nviWjP','isRightInputMode','onTouchCancel','commandNameWindowDrawBackground','LabelHitType','getItemEffectsMpRecoveryText','Parse_Notetags_EquipSlots','isOptimizeCommandAdded','%1%','getItemConsumableText','4415680WEYUVX','MaxMP','buttonAssistCategory','Icon','paramJS','FgJiR','armor','isOpen','MuCwc','DMTeg','oXZxq','rbuwX','JnOxv','setBackgroundType','cursorUp','getItemSpeedLabel','paramchangeTextColor','ShopMenuStatusStandard','kOxIb','EFFECT_REMOVE_DEBUFF','onTouchSelectModernControls','Game_BattlerBase_param','commandBuy','HiddenItemA','Rhblg','buttonAssistRemove','playOkSound','ofoZA','paintOpacity','978qhMonz','hide','nrhnx','drawItemDamage','categoryStyleCheck','mnYLq','getInputButtonString','constructor','LXZsO','DrawItemData','Speed0','EquipParams','drawActorParamDifference','isHandled','addStateBuffChanges','DrawBackRect','dTfVX','_resetFontSize','bORvM','Scene_Shop_create','changeBuff','WUhJc','EFFECT_ADD_BUFF','mainFontFace','Yciuo','Parse_Notetags_Prices','getDamageStyle','drawParamText','buttonAssistText3','modifiedBuyPriceItemsEquipsCore','svzXe','sellPriceRate','AlbpS','WBuLd','deselect','Scene_Shop_commandBuy','flatMP','_actor','UVFlq','onTouchSelect','categories','IconSet','iYVfs','CmdIconClear','CannotEquipMarker','rateHP','drawRemoveItem','EIMqf','\x5cb%1\x5cb','EwWMs','optimize','_scene','CmdIconCancel','drawItemDamageAmount','buttonAssistText2','drawing','update','isUseModernControls','FIjyV','_sellWindow','MenuPortraits','drawUpdatedBeforeParamValue','_list','Scene_Shop_onSellCancel','itypeId','Step1Start','Scope%1','index','Scene_Shop_commandWindowRect','newLabelEnabled','getNextAvailableEtypeId','uiHelpPosition','Step3Start','MreYo','Speed1','setItem','Game_BattlerBase_meetsItemConditions','commandBuyItemsEquipsCore','drawItemEffectsAddedStatesBuffs','vndlk','getItemEffectsHpDamageLabel','ijVZg','Scene_Equip_onSlotCancel','Window_Selectable_initialize','_goodsCount','hideAdditionalSprites','Window_ShopSell_isEnabled','SSVTV','onSellOk','gjunu','active','laBqU','mKCho','gainTP','isTriggered','ityrz','activateItemWindow','optKeyItemsNumber','NUM','EFFECT_RECOVER_HP','changeTextColor','onCategoryCancelItemsEquipsCore','dZwCl','Damage\x20Formula\x20Error\x20for\x20%1','isEquipCommandEnabled','drawItemScope','MAT','commandWindowRectItemsEquipsCore','List','round','DamageType%1','drawItemRepeats','WoTnw','updateCommandNameWindow','DrawIcons','iconIndex','helpAreaTop','top','MqZQW','VisuMZ_0_CoreEngine','ARECr','isPageChangeRequested','PurchaseOnly','ItemQuantityFmt','UFQRA','prepare','fontSize','getMatchingInitEquip','_statusWindow','drawItemDarkRect','equipSlotIndex','getItemRepeatsLabel','isSoleWeaponType','_categoryWindow','helpWindowRectItemsEquipsCore','JfEaq','DXVTg','isClicked','damageColor','Scene_Item_categoryWindowRect','Scene_Equip_onActorChange','_buyWindow','weapon-%1','categoryStyle','rDKCL','IsPrO','FontFace','doSell','mainAreaHeight','EcwPB','processShiftRemoveShortcut','Scene_Load_reloadMapIfUpdated','itemLineRect','QHYNQ','FadeSpeed','Ihqjc','drawItemEffectsTpRecovery','postCreateItemWindowModernControls','categoryWindowRect','buttonAssistItemListRequirement','Window_EquipItem_includes','Window_ItemList_colSpacing','VisuMZ_1_MainMenuCore','45NQGeSJ','prepareNewEquipSlotsOnLoad','buttonAssistSlotWindowShift','clear','Scene_Shop_createCategoryWindow','forceResetEquipSlots','format','adjustItemWidthByStatus','forceChangeEquipSlots','Settings','Scene_Item_create','CoreEngine','itemTextAlign','(%1)','hideNewLabelSprites','hideDisabledCommands','NEexH','Width','isCancelled','TP\x20DAMAGE','Type','ScopeAlliesButUser','revertGlobalNamespaceVariables','MDF','itemDataFontSize','updateCategoryNameWindow','processDrawIcon','lIMBg','mmp','select','Scene_Shop_statusWindowRect','ywJsK','Occasion%1','SnsMS','height','_itemWindow','ShiftShortcutKey','QtXJr','Scene_Shop_activateSellWindow','goldWindowRect','version','TTZMH','EnableLayout','tCjNO','_buyWindowLastIndex','excbX','rZJDz','NLDvz','iYwaI','setValue','STxlR','Window_EquipCommand_initialize','categoryNameWindowDrawBackground','FontSize','drawItemCost','getItemEffectsTpDamageText','isArmor','WUVVR','categoryItemTypes','vXliN','QUANTITY','397422rQgkDe','drawParamName','Consumable','CmdIconOptimize','fGGHh','updatedLayoutStyle','isUseItemsEquipsCoreUpdatedLayout','sZipB','cursorRight','Scene_Item_createCategoryWindow','weaponTypes','Speed2000','NLWYB','commandStyle','itemEnableJS','gLaUw','match','_resetFontColor','EquipScene','HIT\x20TYPE','VaHst','mUtvw','getItemDamageElementText','drawItemData','Game_Party_initialize','CmdIconEquip','systemColor','loadPicture','drawItemEffectsHpDamage','TEfJQ','uiMenuStyle','drawParamsItemsEquipsCore','FVuPD','setStatusWindow','_equips','prepareRefreshItemsEquipsCoreLayout','setupItemDamageTempActors','Scene_Equip_commandWindowRect','CmdStyle','getItemConsumableLabel','setTopRow','getItemRepeatsText','baseSellingPrice','createSlotWindow','floor','statusWindowRectItemsEquipsCore','%1-%2','VsnIH','AdKvW','meetsItemConditionsJS','QPxri','CmdTextAlign','kWNhP','Window_ItemCategory_initialize','sellingPrice','PCXrY','shift','setCategory','getItemDamageAmountTextOriginal','vMZRj','Scene_Equip_slotWindowRect','onCategoryCancel','efcLS','SellPriceRate','KMfqk','jOpbX','Parse_Notetags_Batch','Window_ShopBuy_price','activate','tGOhy','toUpperCase','ItemsEquipsCore','Nonconsumable','createStatusWindow','Scene_Equip_createSlotWindow','getItemEffectsSelfTpGainText','+%1','NotConsumable','discardEquip','Scene_Shop_helpWindowRect','consumable','drawItemStyleIcon','registerCommand','background','_shopStatusMenuMode','iconWidth','DEF','optimizeEquipments','jxauI','FadeLimit','ekCGs','maxItems','LabelElement','_handlers','versionId','isBuyCommandEnabled','Window_ItemList_drawItem','ParseItemNotetags','isHoverEnabled','RegularItems','ceil','MaxHP','qVBmU','_buttonAssistWindow','Window_EquipItem_isEnabled','sqSwI','goldWindowRectItemsEquipsCore','FieldUsable','PHQTV','fontFace','getItemEffectsMpDamageText','_slotWindow','icon','ParseArmorNotetags','FontColor','whUIh','splice','GkoXo','removeStateBuffChanges','selfTP','smoothSelect','ScopeRandomEnemies','STRUCT','REMOVED\x20EFFECTS','categoryWindowRectItemsEquipsCore','JjxDW','ActorResetEquipSlots','allowCreateStatusWindow','getInputMultiButtonStrings','isEquipItem','NeverUsable','YTPUQ','addItemCategory','object','canUse','AllArmors','visible','possession','APVWK','dataId','loadSystem','cursorLeft','ItemQuantityFontSize','pageup','HDuiz','forceChangeEquip','isHovered','playBuzzerSound','TjUcs','armor-%1','getItemDamageAmountLabelOriginal','fxzUr','lxzaT','HuAsG','#%1','buttonAssistKey1','LYvZE','Sqzim','loadFaceImages','sellWindowRectItemsEquipsCore','QoRpT','isItem','fTPzS','0000','MJadp','drawNewLabelText','wFtIj','processTouchModernControls','Game_Actor_paramPlus','addEquipCommand','tradeItemWithParty','mainCommandWidth','onSellOkItemsEquipsCore','textSizeEx','JphAK','_itemData','drawItem','popScene','Window_ItemList_updateHelp','members','TextAlign','sell','Vqgyt','Scene_Shop_onCategoryCancel','setNewItem','_newLabelOpacityChange','money','fImGN','ohdnI','isNewItem','replace','isClearCommandAdded','allowCommandWindowCursorUp','SPEED','Fcpfx','ANrml','colSpacing','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','doBuy','Scene_Shop_prepare','BatchShop','sellWindowRect','clearNewLabelFromItem','isDualWield','_newItemsList','Parse_Notetags_Category','ShowShopStatus','(+%1)','MP\x20DAMAGE','isKeyItem','ciUfh','RlBdu','addCancelCommand','Window_ShopCommand_initialize','IncludeShopItem','windowPadding','getItemEffectsRemovedStatesBuffsText','AllItems','_commandWindow','parse','LabelRemove','right','_goods','getItemSpeedText','CmdIconBuy','isClearEquipOk','onSlotOk','parameters','40363543IxIGqL','numberWindowRect','commandSell','exit','isOptimizeEquipOk','EFFECT_REMOVE_STATE','getItemDamageElementLabel','buy','isRepeated','LabelRecoverHP','100%','updateMoneyAmount','MMxtx','MaxArmors','isPressed','DrawEquipData','slotWindowRectItemsEquipsCore','ZfIgj','KNjtE','createItemWindow','paramPlus','Scene_Item_helpWindowRect','ImYwg','getItemOccasionText','getItemSuccessRateLabel','postCreateSellWindowItemsEquipsCore','ShopScene','removeBuff','pagedown','\x5cI[%1]%2','sXUYm','QoL','bslaZ','onCategoryOk','BbBip','TROey','getItemEffectsSelfTpGainLabel','XsvtB','UBwHz','JSON','maxCols','getItemSuccessRateText','isBottomHelpMode','RemoveEquipText','pPHCQ','isCursorMovable','zZfuB','getItemColor','EFFECT_ADD_DEBUFF','addWindow','refreshCursor','vfoNn','_newLabelSprites','min','placeNewLabel','Scene_Shop_onBuyCancel','call','wHguN','W%1','fXLWJ','DrawPortraitJS','Scene_Item_itemWindowRect','getTextColor','contentsBack','Blacklist','makeItemData','SCOPE','Scene_Shop_commandSell','LkaSV','onTouchSelectModern','koDEi','GRnhw','keyItem','successRate','getItemEffectsHpRecoveryText','shouldCommandWindowExist','process_VisuMZ_ItemsEquipsCore_EquipSlots','convertInitEquipsToItems','_tempActor','AllWeapons','defaultItemMax','processCursorSpecialCheckModernControls','SwitchID','SdmaU','QNFmQ','prototype','drawActorCharacter','HP\x20DAMAGE','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','characterName','isMainMenuCoreMenuImageOptionAvailable','PpPSN','Categories','mHXWG','gfttP','text','down','isShiftShortcutKeyForRemove','Step1End','WWvRU','umjZP','KeyItems','ParseWeaponNotetags','drawItemCustomEntryLine','LabelSpeed','createSellWindow','getItemsEquipsCoreBackColor1','upYxE','ConvertNumberToString','rateMP','createBitmap','81398MCcaiQ','Scene_Shop_categoryWindowRect','postCreateSlotWindowItemsEquipsCore','buttonAssistKey2','setShopStatusWindowMode','xsrUU','item-%1','?????','slotWindowRect','drawItemStyleIconText','equips','YTmRZ','isDrawItemNumber','drawItemEffectsTpDamage','dheks','getItemDamageAmountLabelBattleCore','MP\x20RECOVERY','setHp','_doubleTouch','refreshActorEquipSlotsIfUpdated','itemPadding','eNNvO','max','postCreateItemsEquipsCore','vawFx','onDatabaseLoaded','resetShopSwitches','TpTEe','buttonAssistOffset3','TNNln','TP\x20RECOVERY','itemWindowRect','Mbytv','actor','FCKnw','drawUpdatedAfterParamValue','\x5cI[%1]','removeDebuff','dycvJ','getItemEffectsHpDamageText','ZwRJw','occasion','niLuN','paramValueByName','_forcedSlots','drawNewLabelIcon','Game_Actor_discardEquip','wyoss','oWzYA','armorTypes','processHandling','OsVZR','VRJjR','ActorChangeEquipSlots','SellPriceJS','kiLem','qkwfP','OffsetY','code','powerUpColor','isUseParamNamesWithIcons','OSziZ','ListWindowCols','wtypeId','WcHEA','wAUsj','isEquipped','tpGain','drawItemActorMenuImage','PrfQm','setTempActor','currentSymbol','hitIndex','ParseClassNotetags','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','remove','BorderRegExp','hitType','PICwP','LabelSuccessRate','maxBattleMembers','drawText','getItemQuantityText','XgCJk','boxWidth','_calculatingJSParameters','xtWUN','params','split','ZfpGh','updateHelp','createCommandNameWindow','DKsah','drawUpdatedParamName','lXoRT','DAMAGE\x20MULTIPLIER','wXQgf','buffIconIndex','currentExt','loadCharacter','isSceneShop','EFFECT_REMOVE_BUFF','onSlotOkAutoSelect','bwKOL','drawItemName','_slotId','DjVMH','isShowNew','elements','_item','Step2Start','kYYuA','helpWindowRect','categoryNameWindowCenter','buttonAssistText1','limitedPageUpDownSceneCheck','HP\x20RECOVERY','textColor','getItemHitTypeText'];_0x3e4a=function(){return _0x3bab93;};return _0x3e4a();}const _0x4ab1bf=_0x2405;(function(_0x8d67cc,_0x2fa77f){const _0x1e33cf=_0x2405,_0x3aedae=_0x8d67cc();while(!![]){try{const _0x4717d4=-parseInt(_0x1e33cf(0x35f))/0x1*(parseInt(_0x1e33cf(0x4f0))/0x2)+-parseInt(_0x1e33cf(0x39c))/0x3*(parseInt(_0x1e33cf(0x60a))/0x4)+parseInt(_0x1e33cf(0x568))/0x5*(parseInt(_0x1e33cf(0x2bc))/0x6)+parseInt(_0x1e33cf(0x295))/0x7+parseInt(_0x1e33cf(0x29f))/0x8+parseInt(_0x1e33cf(0x211))/0x9*(-parseInt(_0x1e33cf(0x27f))/0xa)+parseInt(_0x1e33cf(0x480))/0xb;if(_0x4717d4===_0x2fa77f)break;else _0x3aedae['push'](_0x3aedae['shift']());}catch(_0x2c6f27){_0x3aedae['push'](_0x3aedae['shift']());}}}(_0x3e4a,0xf0a97));var label='ItemsEquipsCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4ab1bf(0x64b)](function(_0x7b8f79){const _0x57164c=_0x4ab1bf;return _0x7b8f79['status']&&_0x7b8f79[_0x57164c(0x661)][_0x57164c(0x57d)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x4ab1bf(0x368)]||{},VisuMZ['ConvertParams']=function(_0x3a6c40,_0x4c575e){const _0x5990ac=_0x4ab1bf;for(const _0x6b5c19 in _0x4c575e){if(_0x6b5c19[_0x5990ac(0x3ac)](/(.*):(.*)/i)){if(_0x5990ac(0x1ef)!==_0x5990ac(0x256)){const _0xa15f3e=String(RegExp['$1']),_0x3bb207=String(RegExp['$2'])[_0x5990ac(0x3e2)]()[_0x5990ac(0x63f)]();let _0x819955,_0x588034,_0x36b2b4;switch(_0x3bb207){case _0x5990ac(0x31e):_0x819955=_0x4c575e[_0x6b5c19]!==''?Number(_0x4c575e[_0x6b5c19]):0x0;break;case _0x5990ac(0x26e):_0x588034=_0x4c575e[_0x6b5c19]!==''?JSON[_0x5990ac(0x477)](_0x4c575e[_0x6b5c19]):[],_0x819955=_0x588034['map'](_0x2c8112=>Number(_0x2c8112));break;case'EVAL':_0x819955=_0x4c575e[_0x6b5c19]!==''?eval(_0x4c575e[_0x6b5c19]):null;break;case'ARRAYEVAL':_0x588034=_0x4c575e[_0x6b5c19]!==''?JSON[_0x5990ac(0x477)](_0x4c575e[_0x6b5c19]):[],_0x819955=_0x588034[_0x5990ac(0x624)](_0x427bf4=>eval(_0x427bf4));break;case _0x5990ac(0x4a7):_0x819955=_0x4c575e[_0x6b5c19]!==''?JSON['parse'](_0x4c575e[_0x6b5c19]):'';break;case _0x5990ac(0x5cc):_0x588034=_0x4c575e[_0x6b5c19]!==''?JSON[_0x5990ac(0x477)](_0x4c575e[_0x6b5c19]):[],_0x819955=_0x588034[_0x5990ac(0x624)](_0x1ead28=>JSON[_0x5990ac(0x477)](_0x1ead28));break;case _0x5990ac(0x21d):_0x819955=_0x4c575e[_0x6b5c19]!==''?new Function(JSON['parse'](_0x4c575e[_0x6b5c19])):new Function(_0x5990ac(0x59f));break;case'ARRAYFUNC':_0x588034=_0x4c575e[_0x6b5c19]!==''?JSON[_0x5990ac(0x477)](_0x4c575e[_0x6b5c19]):[],_0x819955=_0x588034[_0x5990ac(0x624)](_0x173bfd=>new Function(JSON[_0x5990ac(0x477)](_0x173bfd)));break;case _0x5990ac(0x5a4):_0x819955=_0x4c575e[_0x6b5c19]!==''?String(_0x4c575e[_0x6b5c19]):'';break;case _0x5990ac(0x5e7):_0x588034=_0x4c575e[_0x6b5c19]!==''?JSON[_0x5990ac(0x477)](_0x4c575e[_0x6b5c19]):[],_0x819955=_0x588034['map'](_0x5a1bfb=>String(_0x5a1bfb));break;case _0x5990ac(0x416):_0x36b2b4=_0x4c575e[_0x6b5c19]!==''?JSON[_0x5990ac(0x477)](_0x4c575e[_0x6b5c19]):{},_0x3a6c40[_0xa15f3e]={},VisuMZ[_0x5990ac(0x5ee)](_0x3a6c40[_0xa15f3e],_0x36b2b4);continue;case'ARRAYSTRUCT':_0x588034=_0x4c575e[_0x6b5c19]!==''?JSON[_0x5990ac(0x477)](_0x4c575e[_0x6b5c19]):[],_0x819955=_0x588034['map'](_0x290577=>VisuMZ[_0x5990ac(0x5ee)]({},JSON[_0x5990ac(0x477)](_0x290577)));break;default:continue;}_0x3a6c40[_0xa15f3e]=_0x819955;}else this['cursorPageup']();}}return _0x3a6c40;},(_0xa2a96d=>{const _0x18dfe8=_0x4ab1bf,_0x40a85d=_0xa2a96d[_0x18dfe8(0x648)];for(const _0x390b3f of dependencies){if(!Imported[_0x390b3f]){alert(_0x18dfe8(0x4d9)[_0x18dfe8(0x365)](_0x40a85d,_0x390b3f)),SceneManager['exit']();break;}}const _0xdc22ae=_0xa2a96d[_0x18dfe8(0x661)];if(_0xdc22ae[_0x18dfe8(0x3ac)](/\[Version[ ](.*?)\]/i)){if(_0x18dfe8(0x398)==='WUVVR'){const _0xa44d5a=Number(RegExp['$1']);_0xa44d5a!==VisuMZ[label][_0x18dfe8(0x387)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x40a85d,_0xa44d5a)),SceneManager['exit']());}else return _0x393feb[_0x18dfe8(0x41c)](_0x18dfe8(0x1fe),'right');}if(_0xdc22ae[_0x18dfe8(0x3ac)](/\[Tier[ ](\d+)\]/i)){const _0x289c6e=Number(RegExp['$1']);if(_0x289c6e<tier){if(_0x18dfe8(0x2f6)===_0x18dfe8(0x56f)){if(!_0x4e6b06[_0x18dfe8(0x57e)](_0x50144e))return![];}else alert(_0x18dfe8(0x461)[_0x18dfe8(0x365)](_0x40a85d,_0x289c6e,tier)),SceneManager[_0x18dfe8(0x483)]();}else{if('KPcVi'==='ZJIgh'){if(_0x1d9638[_0x18dfe8(0x286)]())_0x113c74[_0x18dfe8(0x266)](_0x2a98f5);}else tier=Math[_0x18dfe8(0x506)](_0x289c6e,tier);}}VisuMZ[_0x18dfe8(0x5ee)](VisuMZ[label]['Settings'],_0xa2a96d[_0x18dfe8(0x47f)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x4ab1bf(0x648)],_0x4ab1bf(0x525),_0x4c56aa=>{const _0x551536=_0x4ab1bf;VisuMZ[_0x551536(0x5ee)](_0x4c56aa,_0x4c56aa);const _0x18d886=_0x4c56aa[_0x551536(0x5f1)][_0x551536(0x624)](_0x4ba185=>$gameActors[_0x551536(0x511)](_0x4ba185)),_0x289ab8=_0x4c56aa[_0x551536(0x646)][_0x551536(0x624)](_0x530d00=>$dataSystem['equipTypes'][_0x551536(0x5c2)](_0x530d00[_0x551536(0x63f)]()));for(const _0x2ebeef of _0x18d886){if(_0x551536(0x229)!==_0x551536(0x607)){if(!_0x2ebeef)continue;_0x2ebeef[_0x551536(0x367)](_0x289ab8);}else{if(!_0x56b41a)return![];if(!_0x5e6434[_0x551536(0x3e3)][_0x551536(0x308)][_0x551536(0x4b8)](this,_0x133a74))return![];if(!this[_0x551536(0x5e2)](_0x415762))return![];if(!this[_0x551536(0x3cd)](_0x420d10))return![];return!![];}}}),PluginManager[_0x4ab1bf(0x3ee)](pluginData[_0x4ab1bf(0x648)],_0x4ab1bf(0x41a),_0x213a95=>{const _0x436a4e=_0x4ab1bf;VisuMZ['ConvertParams'](_0x213a95,_0x213a95);const _0x40a854=_0x213a95[_0x436a4e(0x5f1)][_0x436a4e(0x624)](_0x57e788=>$gameActors[_0x436a4e(0x511)](_0x57e788));for(const _0x4e6418 of _0x40a854){if(!_0x4e6418)continue;_0x4e6418[_0x436a4e(0x364)]();}}),PluginManager['registerCommand'](pluginData[_0x4ab1bf(0x648)],_0x4ab1bf(0x464),_0x3f26f8=>{const _0x399ec7=_0x4ab1bf;VisuMZ['ConvertParams'](_0x3f26f8,_0x3f26f8);const _0x1434b9=[],_0x7bbfa2=_0x3f26f8[_0x399ec7(0x4c0)]['map'](_0x42ef86=>_0x42ef86[_0x399ec7(0x3e2)]()[_0x399ec7(0x63f)]()),_0x110fee=_0x3f26f8['Whitelist'][_0x399ec7(0x624)](_0x50f7d8=>_0x50f7d8[_0x399ec7(0x3e2)]()[_0x399ec7(0x63f)]()),_0x586353=_0x3f26f8[_0x399ec7(0x4e3)]>=_0x3f26f8['Step1Start']?_0x3f26f8[_0x399ec7(0x2fd)]:_0x3f26f8['Step1End'],_0x544305=_0x3f26f8[_0x399ec7(0x4e3)]>=_0x3f26f8[_0x399ec7(0x2fd)]?_0x3f26f8[_0x399ec7(0x4e3)]:_0x3f26f8['Step1Start'],_0x3ef6a0=Array(_0x544305-_0x586353+0x1)['fill']()[_0x399ec7(0x624)]((_0xa0f502,_0x58c896)=>_0x586353+_0x58c896);for(const _0x46361d of _0x3ef6a0){if(_0x399ec7(0x3b0)==='VaHst'){const _0x4af26f=$dataItems[_0x46361d];if(!_0x4af26f)continue;if(!VisuMZ['ItemsEquipsCore'][_0x399ec7(0x472)](_0x4af26f,_0x7bbfa2,_0x110fee))continue;_0x1434b9[_0x399ec7(0x24c)]([0x0,_0x46361d,0x0,_0x4af26f[_0x399ec7(0x620)]]);}else{_0x46ac62[_0x399ec7(0x3e3)]['Window_Selectable_setHelpWindowItem'][_0x399ec7(0x4b8)](this,_0x5319a1);if(this['isShowNew']())this[_0x399ec7(0x466)](_0xd41538);}}const _0x1877cf=_0x3f26f8[_0x399ec7(0x5be)]>=_0x3f26f8['Step2Start']?_0x3f26f8[_0x399ec7(0x55e)]:_0x3f26f8[_0x399ec7(0x5be)],_0x1a0339=_0x3f26f8[_0x399ec7(0x5be)]>=_0x3f26f8['Step2Start']?_0x3f26f8['Step2End']:_0x3f26f8['Step2Start'],_0x41346d=Array(_0x1a0339-_0x1877cf+0x1)[_0x399ec7(0x214)]()[_0x399ec7(0x624)]((_0x50110f,_0x2da3b2)=>_0x1877cf+_0x2da3b2);for(const _0x6062b0 of _0x41346d){if('tiEqN'!=='tiEqN')_0x3e054e[_0x399ec7(0x24c)](_0x2e320b);else{const _0x5c6d12=$dataWeapons[_0x6062b0];if(!_0x5c6d12)continue;if(!VisuMZ['ItemsEquipsCore'][_0x399ec7(0x472)](_0x5c6d12,_0x7bbfa2,_0x110fee))continue;_0x1434b9[_0x399ec7(0x24c)]([0x1,_0x6062b0,0x0,_0x5c6d12['price']]);}}const _0x1650b4=_0x3f26f8['Step3End']>=_0x3f26f8[_0x399ec7(0x304)]?_0x3f26f8[_0x399ec7(0x304)]:_0x3f26f8[_0x399ec7(0x228)],_0x33b6c3=_0x3f26f8[_0x399ec7(0x228)]>=_0x3f26f8[_0x399ec7(0x304)]?_0x3f26f8[_0x399ec7(0x228)]:_0x3f26f8[_0x399ec7(0x304)],_0x35ae84=Array(_0x33b6c3-_0x1650b4+0x1)[_0x399ec7(0x214)]()[_0x399ec7(0x624)]((_0x5264a3,_0x3f2742)=>_0x1650b4+_0x3f2742);for(const _0x10d2c6 of _0x35ae84){const _0x151381=$dataArmors[_0x10d2c6];if(!_0x151381)continue;if(!VisuMZ[_0x399ec7(0x3e3)][_0x399ec7(0x472)](_0x151381,_0x7bbfa2,_0x110fee))continue;_0x1434b9[_0x399ec7(0x24c)]([0x2,_0x10d2c6,0x0,_0x151381['price']]);}SceneManager[_0x399ec7(0x24c)](Scene_Shop),SceneManager[_0x399ec7(0x634)](_0x1434b9,_0x3f26f8[_0x399ec7(0x336)]);}),VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x472)]=function(_0x3c436d,_0x27297d,_0x49c790){const _0x1a9ca7=_0x4ab1bf;if(_0x3c436d['name'][_0x1a9ca7(0x63f)]()==='')return![];if(_0x3c436d[_0x1a9ca7(0x648)][_0x1a9ca7(0x3ac)](/-----/i))return![];const _0x34a499=_0x3c436d[_0x1a9ca7(0x2e4)];if(_0x27297d[_0x1a9ca7(0x205)]>0x0)for(const _0x31b796 of _0x27297d){if(!_0x31b796)continue;if(_0x34a499[_0x1a9ca7(0x57d)](_0x31b796))return![];}if(_0x49c790[_0x1a9ca7(0x205)]>0x0){if(_0x1a9ca7(0x388)===_0x1a9ca7(0x388)){for(const _0x59937d of _0x49c790){if(_0x1a9ca7(0x4ec)!=='upYxE'){const _0x446c50=this[_0x1a9ca7(0x354)](this['index']());let _0x3cff48=this[_0x1a9ca7(0x59c)](this[_0x1a9ca7(0x2ff)]());_0x3cff48=_0x3cff48['replace'](/\\I\[(\d+)\]/gi,''),_0x282a55[_0x1a9ca7(0x284)](),this[_0x1a9ca7(0x393)](_0x3cff48,_0x446c50),this['categoryNameWindowDrawText'](_0x3cff48,_0x446c50),this['categoryNameWindowCenter'](_0x3cff48,_0x446c50);}else{if(!_0x59937d)continue;if(_0x34a499['includes'](_0x59937d))return!![];}}return![];}else{if(_0xdb8bb3[_0x1a9ca7(0x3ba)]&&_0x271c63[_0x1a9ca7(0x219)]!==_0x5c9f1a)return _0x1cf333[_0x1a9ca7(0x219)];else{if(this[_0x1a9ca7(0x3a2)]())return this[_0x1a9ca7(0x3a1)]()[_0x1a9ca7(0x3ac)](/RIGHT/i);else _0x50d43e['prototype'][_0x1a9ca7(0x296)][_0x1a9ca7(0x4b8)](this);}}}return!![];},VisuMZ['ItemsEquipsCore'][_0x4ab1bf(0x60c)]=Scene_Boot[_0x4ab1bf(0x4d5)]['onDatabaseLoaded'],Scene_Boot[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x509)]=function(){const _0x327469=_0x4ab1bf;this[_0x327469(0x60e)](),VisuMZ[_0x327469(0x3e3)][_0x327469(0x60c)][_0x327469(0x4b8)](this),this['process_VisuMZ_ItemsEquipsCore_Notetags']();},Scene_Boot['prototype'][_0x4ab1bf(0x60e)]=function(){const _0x1080ea=_0x4ab1bf;VisuMZ[_0x1080ea(0x3e3)]['RegExp']={},VisuMZ['ItemsEquipsCore'][_0x1080ea(0x5b1)]['EquipParams']=[],VisuMZ[_0x1080ea(0x3e3)][_0x1080ea(0x5b1)][_0x1080ea(0x53c)]=[];const _0x140343=[_0x1080ea(0x401),_0x1080ea(0x2a0),'ATK',_0x1080ea(0x3f2),_0x1080ea(0x326),_0x1080ea(0x376),_0x1080ea(0x632),_0x1080ea(0x279)];for(const _0x100050 of _0x140343){if(_0x1080ea(0x2c1)!==_0x1080ea(0x2c1)){if(_0x318e4a===_0x9886f8)return;if(_0x504af4[_0x1080ea(0x28b)]['match'](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x111734=_0x435db1(_0x1cd593['$1']),_0x7a6fc1=(_0x329e4f===_0x33edc9?_0x1080ea(0x4ba):'A%1')[_0x1080ea(0x365)](_0x14cea6['id']),_0x450c74=_0x1080ea(0x27b)[_0x1080ea(0x365)](_0x111734);for(let _0x5b1147=0x0;_0x5b1147<0x8;_0x5b1147++){if(_0x111734[_0x1080ea(0x3ac)](_0x498bc3[_0x1080ea(0x3e3)][_0x1080ea(0x5b1)][_0x1080ea(0x53c)][_0x5b1147])){const _0x1148a6=_0x1080ea(0x3ca)[_0x1080ea(0x365)](_0x7a6fc1,_0x5b1147);_0x5d4ac6[_0x1080ea(0x3e3)][_0x1080ea(0x2a3)][_0x1148a6]=new _0x4c43aa(_0x1080ea(0x5d4),_0x1080ea(0x5af),_0x450c74);}}}}else{const _0x1844f7=_0x1080ea(0x4d8)['format'](_0x100050);VisuMZ['ItemsEquipsCore'][_0x1080ea(0x5b1)][_0x1080ea(0x2c7)]['push'](new RegExp(_0x1844f7,'i'));const _0x353262='\x5cb%1\x5cb'[_0x1080ea(0x365)](_0x100050);VisuMZ['ItemsEquipsCore'][_0x1080ea(0x5b1)][_0x1080ea(0x53c)][_0x1080ea(0x24c)](new RegExp(_0x353262,'g'));}}},Scene_Boot[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x597)]=function(){const _0x3da08e=_0x4ab1bf;if(VisuMZ['ParseAllNotetags'])return;this[_0x3da08e(0x4cc)]();const _0x550d95=[$dataItems,$dataWeapons,$dataArmors];for(const _0x903c54 of _0x550d95){if(_0x3da08e(0x583)!==_0x3da08e(0x5f5))for(const _0xce455a of _0x903c54){if(!_0xce455a)continue;VisuMZ['ItemsEquipsCore'][_0x3da08e(0x469)](_0xce455a,_0x903c54),VisuMZ[_0x3da08e(0x3e3)][_0x3da08e(0x2d5)](_0xce455a,_0x903c54),VisuMZ[_0x3da08e(0x3e3)][_0x3da08e(0x24d)](_0xce455a,_0x903c54),VisuMZ[_0x3da08e(0x3e3)][_0x3da08e(0x274)](_0xce455a,_0x903c54),VisuMZ[_0x3da08e(0x3e3)][_0x3da08e(0x24f)](_0xce455a,_0x903c54);}else return this[_0x3da08e(0x3a1)]()[_0x3da08e(0x3ac)](/LOWER/i);}},Scene_Boot['prototype'][_0x4ab1bf(0x4cc)]=function(){const _0x5d2761=_0x4ab1bf;for(const _0x136f67 of $dataClasses){if(!_0x136f67)continue;VisuMZ[_0x5d2761(0x3e3)]['Parse_Notetags_EquipSlots'](_0x136f67);}},VisuMZ['ItemsEquipsCore'][_0x4ab1bf(0x539)]=VisuMZ[_0x4ab1bf(0x539)],VisuMZ[_0x4ab1bf(0x539)]=function(_0x353a4f){const _0x53e3a8=_0x4ab1bf;VisuMZ[_0x53e3a8(0x3e3)]['ParseClassNotetags']['call'](this,_0x353a4f),VisuMZ['ItemsEquipsCore'][_0x53e3a8(0x29b)](_0x353a4f);},VisuMZ['ItemsEquipsCore'][_0x4ab1bf(0x3fd)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x4ab1bf(0x3fd)]=function(_0x3f1bc3){const _0x2e72ef=_0x4ab1bf;VisuMZ['ItemsEquipsCore'][_0x2e72ef(0x3fd)][_0x2e72ef(0x4b8)](this,_0x3f1bc3),VisuMZ[_0x2e72ef(0x3e3)]['Parse_Notetags_Batch'](_0x3f1bc3,$dataItems);},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x4e7)]=VisuMZ[_0x4ab1bf(0x4e7)],VisuMZ['ParseWeaponNotetags']=function(_0x3da12a){const _0xee8dcb=_0x4ab1bf;VisuMZ[_0xee8dcb(0x3e3)]['ParseWeaponNotetags'][_0xee8dcb(0x4b8)](this,_0x3da12a),VisuMZ[_0xee8dcb(0x3e3)][_0xee8dcb(0x3de)](_0x3da12a,$dataWeapons);},VisuMZ['ItemsEquipsCore'][_0x4ab1bf(0x40d)]=VisuMZ[_0x4ab1bf(0x40d)],VisuMZ['ParseArmorNotetags']=function(_0x135956){const _0x684600=_0x4ab1bf;VisuMZ[_0x684600(0x3e3)][_0x684600(0x40d)][_0x684600(0x4b8)](this,_0x135956),VisuMZ[_0x684600(0x3e3)][_0x684600(0x3de)](_0x135956,$dataArmors);},VisuMZ['ItemsEquipsCore'][_0x4ab1bf(0x29b)]=function(_0x3112ad){const _0x57e359=_0x4ab1bf;_0x3112ad[_0x57e359(0x600)]=[];if(!BattleManager[_0x57e359(0x238)]()&&_0x3112ad[_0x57e359(0x28b)]['match'](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){if('AoKIC'===_0x57e359(0x260)){const _0x45b025=_0x47d51f-(_0x48bb36-_0x3029c7)/0x2;this[_0x57e359(0x2c8)](_0xcbec5f,_0x15e574,_0x22ad60,_0x45b025,_0x51c361),_0x42ed90+=_0x5036d3;}else{const _0x16ffd7=String(RegExp['$1'])[_0x57e359(0x548)](/[\r\n]+/);for(const _0x3c9cf2 of _0x16ffd7){if(_0x57e359(0x64d)!==_0x57e359(0x64d))this[_0x57e359(0x3e5)]();else{const _0x5ab4c1=$dataSystem['equipTypes'][_0x57e359(0x5c2)](_0x3c9cf2[_0x57e359(0x63f)]());if(_0x5ab4c1>0x0)_0x3112ad['equipSlots'][_0x57e359(0x24c)](_0x5ab4c1);}}}}else for(const _0x2c9fd1 of $dataSystem[_0x57e359(0x5e5)]){const _0x6b6819=$dataSystem['equipTypes'][_0x57e359(0x5c2)](_0x2c9fd1[_0x57e359(0x63f)]());if(_0x6b6819>0x0)_0x3112ad[_0x57e359(0x600)][_0x57e359(0x24c)](_0x6b6819);}},VisuMZ['ItemsEquipsCore']['Parse_Notetags_Batch']=function(_0x34b567,_0x49eed5){const _0x41dee2=_0x4ab1bf;VisuMZ[_0x41dee2(0x3e3)][_0x41dee2(0x469)](_0x34b567,_0x49eed5),VisuMZ['ItemsEquipsCore'][_0x41dee2(0x2d5)](_0x34b567,_0x49eed5),VisuMZ[_0x41dee2(0x3e3)][_0x41dee2(0x24d)](_0x34b567,_0x49eed5),VisuMZ[_0x41dee2(0x3e3)]['Parse_Notetags_ParamJS'](_0x34b567,_0x49eed5),VisuMZ['ItemsEquipsCore'][_0x41dee2(0x24f)](_0x34b567,_0x49eed5);},VisuMZ['ItemsEquipsCore'][_0x4ab1bf(0x469)]=function(_0xc43556,_0xce0fd9){const _0x4ec22f=_0x4ab1bf;_0xc43556[_0x4ec22f(0x2e4)]=[];const _0x59d996=_0xc43556[_0x4ec22f(0x28b)],_0x118abf=_0x59d996[_0x4ec22f(0x3ac)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x118abf){if(_0x4ec22f(0x4b9)!=='wHguN')return _0x95771b[_0x4ec22f(0x3e3)][_0x4ec22f(0x368)][_0x4ec22f(0x608)][_0x4ec22f(0x48d)];else for(const _0x1ccb4c of _0x118abf){_0x1ccb4c[_0x4ec22f(0x3ac)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x191aa8=String(RegExp['$1'])[_0x4ec22f(0x3e2)]()[_0x4ec22f(0x63f)]()['split'](',');for(const _0x588ff6 of _0x191aa8){_0xc43556['categories'][_0x4ec22f(0x24c)](_0x588ff6[_0x4ec22f(0x63f)]());}}}if(_0x59d996[_0x4ec22f(0x3ac)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x4fc49f=RegExp['$1'][_0x4ec22f(0x548)](/[\r\n]+/);for(const _0xe0b280 of _0x4fc49f){_0xc43556['categories'][_0x4ec22f(0x24c)](_0xe0b280['toUpperCase']()[_0x4ec22f(0x63f)]());}}},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x2d5)]=function(_0x4eb8b4,_0x1180ac){const _0x5d59f8=_0x4ab1bf;_0x4eb8b4[_0x5d59f8(0x28b)][_0x5d59f8(0x3ac)](/<PRICE:[ ](\d+)>/i)&&(_0x4eb8b4[_0x5d59f8(0x620)]=Number(RegExp['$1']));},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x24d)]=function(_0x28a9b6,_0x5dd4a2){const _0x4ba1ac=_0x4ab1bf;if(_0x5dd4a2===$dataItems)return;for(let _0x19fe25=0x0;_0x19fe25<0x8;_0x19fe25++){const _0x50acb6=VisuMZ['ItemsEquipsCore']['RegExp'][_0x4ba1ac(0x2c7)][_0x19fe25];_0x28a9b6[_0x4ba1ac(0x28b)]['match'](_0x50acb6)&&(_0x4ba1ac(0x2aa)!==_0x4ba1ac(0x2aa)?_0x1f0f34['isPressed'](_0x4ba1ac(0x3d4))&&this[_0x4ba1ac(0x5c5)]()?this[_0x4ba1ac(0x227)]():this[_0x4ba1ac(0x2ad)](_0x23db51['isTriggered']('up')):_0x28a9b6['params'][_0x19fe25]=parseInt(RegExp['$1']));}},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x2a3)]={},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x274)]=function(_0x26fa8b,_0x377aec){const _0x4d9293=_0x4ab1bf;if(_0x377aec===$dataItems)return;if(_0x26fa8b[_0x4d9293(0x28b)][_0x4d9293(0x3ac)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x3e20ea=String(RegExp['$1']),_0x4e7098=(_0x377aec===$dataWeapons?_0x4d9293(0x4ba):'A%1')[_0x4d9293(0x365)](_0x26fa8b['id']),_0x4d9d19=_0x4d9293(0x27b)[_0x4d9293(0x365)](_0x3e20ea);for(let _0x52a7b3=0x0;_0x52a7b3<0x8;_0x52a7b3++){if(_0x3e20ea[_0x4d9293(0x3ac)](VisuMZ[_0x4d9293(0x3e3)][_0x4d9293(0x5b1)]['BorderRegExp'][_0x52a7b3])){if('fGGHh'!==_0x4d9293(0x3a0))return _0x437b60===null&&this[_0x4d9293(0x580)]()[_0x4d9293(0x57d)](this[_0x4d9293(0x593)]())?![]:_0x633802[_0x4d9293(0x3e3)][_0x4d9293(0x35c)][_0x4d9293(0x4b8)](this,_0x21d507);else{const _0x2cb58b=_0x4d9293(0x3ca)[_0x4d9293(0x365)](_0x4e7098,_0x52a7b3);VisuMZ[_0x4d9293(0x3e3)][_0x4d9293(0x2a3)][_0x2cb58b]=new Function(_0x4d9293(0x5d4),_0x4d9293(0x5af),_0x4d9d19);}}}}},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x3aa)]={},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x24f)]=function(_0x6d2ec8,_0x6fc46e){const _0x35d3e5=_0x4ab1bf;if(_0x6fc46e!==$dataItems)return;if(_0x6d2ec8[_0x35d3e5(0x28b)][_0x35d3e5(0x3ac)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x3b8452=String(RegExp['$1']),_0x579cdd=_0x35d3e5(0x53a)[_0x35d3e5(0x365)](_0x3b8452);VisuMZ['ItemsEquipsCore'][_0x35d3e5(0x3aa)][_0x6d2ec8['id']]=new Function(_0x35d3e5(0x5d4),_0x579cdd);}},DataManager['isKeyItem']=function(_0xa8ae12){const _0x2d86ef=_0x4ab1bf;return this['isItem'](_0xa8ae12)&&_0xa8ae12[_0x2d86ef(0x2fc)]===0x2;},DataManager[_0x4ab1bf(0x218)]=function(_0x35da15){const _0x1721ee=_0x4ab1bf;if(!_0x35da15)return 0x63;else return _0x35da15[_0x1721ee(0x28b)][_0x1721ee(0x3ac)](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this[_0x1721ee(0x4d0)](_0x35da15);},DataManager[_0x4ab1bf(0x4d0)]=function(_0x21a087){const _0x3c2468=_0x4ab1bf;if(this[_0x3c2468(0x43d)](_0x21a087))return VisuMZ[_0x3c2468(0x3e3)][_0x3c2468(0x368)][_0x3c2468(0x608)]['MaxItems'];else{if(this[_0x3c2468(0x243)](_0x21a087)){if('CJhGu'!==_0x3c2468(0x629))return VisuMZ[_0x3c2468(0x3e3)]['Settings'][_0x3c2468(0x608)][_0x3c2468(0x658)];else{if(!_0x45985f[_0x3c2468(0x43d)](this[_0x3c2468(0x55d)]))return![];const _0xec435b=this[_0x3c2468(0x3c3)]();this[_0x3c2468(0x271)](_0xec435b,_0x4fd059,_0x1da0d0,_0x24dc38,!![]);const _0x3a6e19=this[_0x3c2468(0x29e)]();return this['drawItemKeyData'](_0x3a6e19,_0xd5b375,_0x3e288f,_0x47f759,![],_0x3c2468(0x479)),this['drawItemDarkRect'](_0x495790,_0x499679,_0x1d4c1d),this[_0x3c2468(0x284)](),!![];}}else{if(this[_0x3c2468(0x397)](_0x21a087)){if(_0x3c2468(0x576)===_0x3c2468(0x5a6))_0x215ef1+=_0x489b14(_0x9e6514['$1']);else return VisuMZ[_0x3c2468(0x3e3)]['Settings'][_0x3c2468(0x608)]['MaxArmors'];}}}},ColorManager[_0x4ab1bf(0x4af)]=function(_0x5805b8){const _0x2661e6=_0x4ab1bf;if(!_0x5805b8)return this['normalColor']();else{if(_0x5805b8[_0x2661e6(0x28b)][_0x2661e6(0x3ac)](/<COLOR:[ ](\d+)>/i))return this[_0x2661e6(0x565)](Number(RegExp['$1'])['clamp'](0x0,0x1f));else{if(_0x5805b8['note'][_0x2661e6(0x3ac)](/<COLOR:[ ]#(.*)>/i)){if('GbgcI'!=='pwMmF')return'#'+String(RegExp['$1']);else{const _0x28d38b=_0x38218d[_0x2661e6(0x5e5)][_0x2661e6(0x5c2)](_0x31712d(_0x5818ed['$1'])[_0x2661e6(0x63f)]());return _0x3e78eb[_0x2661e6(0x397)](_0x5216a2)&&_0x50615c[_0x2661e6(0x593)]===_0x28d38b;}}else return this[_0x2661e6(0x5ea)]();}}},ColorManager[_0x4ab1bf(0x22b)]=function(_0xf6ec59){const _0x533f59=_0x4ab1bf;_0xf6ec59=String(_0xf6ec59);if(_0xf6ec59['match'](/#(.*)/i))return'jOpbX'!==_0x533f59(0x3dd)?this[_0x533f59(0x3d6)]():_0x533f59(0x436)[_0x533f59(0x365)](String(RegExp['$1']));else{if(_0x533f59(0x598)!==_0x533f59(0x38e))return this[_0x533f59(0x565)](Number(_0xf6ec59));else this[_0x533f59(0x245)]();}},SceneManager[_0x4ab1bf(0x554)]=function(){const _0xda2ea5=_0x4ab1bf;return this[_0xda2ea5(0x2ef)]&&this['_scene'][_0xda2ea5(0x2c3)]===Scene_Shop;},Game_Temp[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x301)]=function(){const _0xc7415c=_0x4ab1bf;if(this[_0xc7415c(0x5b3)])return![];return VisuMZ[_0xc7415c(0x3e3)][_0xc7415c(0x368)]['New']['Enable'];},VisuMZ[_0x4ab1bf(0x2b0)]=VisuMZ[_0x4ab1bf(0x3e3)]['Settings'][_0x4ab1bf(0x56d)][_0x4ab1bf(0x56e)],VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x2b4)]=Game_BattlerBase[_0x4ab1bf(0x4d5)]['param'],Game_BattlerBase[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x64f)]=function(_0x2dc371){const _0x8128dc=_0x4ab1bf;return this['_shopStatusMenuMode']?this[_0x8128dc(0x62f)]?VisuMZ[_0x8128dc(0x2b0)]:0x1:VisuMZ[_0x8128dc(0x3e3)][_0x8128dc(0x2b4)][_0x8128dc(0x4b8)](this,_0x2dc371);},VisuMZ['ItemsEquipsCore'][_0x4ab1bf(0x308)]=Game_BattlerBase[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x650)],Game_BattlerBase[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x650)]=function(_0x24ff55){const _0x4903a1=_0x4ab1bf;if(!_0x24ff55)return![];if(!VisuMZ[_0x4903a1(0x3e3)][_0x4903a1(0x308)]['call'](this,_0x24ff55))return![];if(!this[_0x4903a1(0x5e2)](_0x24ff55))return![];if(!this[_0x4903a1(0x3cd)](_0x24ff55))return![];return!![];},Game_BattlerBase['prototype'][_0x4ab1bf(0x5e2)]=function(_0x206482){const _0x2a108f=_0x4ab1bf;if(!this[_0x2a108f(0x637)](_0x206482))return![];return!![];},Game_BattlerBase[_0x4ab1bf(0x4d5)]['checkItemConditionsSwitchNotetags']=function(_0x38b74f){const _0x876046=_0x4ab1bf,_0x217dc9=_0x38b74f[_0x876046(0x28b)];if(_0x217dc9[_0x876046(0x3ac)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x876046(0x269)===_0x876046(0x405))_0x4acf10=_0x569229[_0x876046(0x64f)](_0x9ea825),_0x40a66b=_0x2ca305-_0x20da18['param'](_0x181ad4),this[_0x876046(0x320)](_0xafc462[_0x876046(0x2af)](_0x3bef66)),_0x34bc37=(_0x55ee4d>=0x0?'+':'')+_0x1a4097;else{const _0x23948f=JSON[_0x876046(0x477)]('['+RegExp['$1'][_0x876046(0x3ac)](/\d+/g)+']');for(const _0x3028a0 of _0x23948f){if(!$gameSwitches[_0x876046(0x57e)](_0x3028a0))return![];}return!![];}}if(_0x217dc9[_0x876046(0x3ac)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x876046(0x491)!==_0x876046(0x259)){const _0x361aa8=JSON[_0x876046(0x477)]('['+RegExp['$1'][_0x876046(0x3ac)](/\d+/g)+']');for(const _0x1302bc of _0x361aa8){if('sBWoL'==='qFNqi')this[_0x876046(0x341)][_0x876046(0x578)]();else{if(!$gameSwitches['value'](_0x1302bc))return![];}}return!![];}else{if(_0x32565a['id']===_0x1f5866['id'])_0x495bf9+=0x1;}}if(_0x217dc9[_0x876046(0x3ac)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x11c6de=JSON[_0x876046(0x477)]('['+RegExp['$1'][_0x876046(0x3ac)](/\d+/g)+']');for(const _0x1f084f of _0x11c6de){if(_0x876046(0x5d6)!==_0x876046(0x5f3)){if($gameSwitches[_0x876046(0x57e)](_0x1f084f))return!![];}else{const _0x8a4de0=this[_0x876046(0x296)]()?this[_0x876046(0x5e4)]():0x0,_0x46c743=this['_categoryWindow']['y']+this['_categoryWindow'][_0x876046(0x381)],_0x31cd44=_0x29520e['boxWidth']-this[_0x876046(0x5e4)](),_0x4defd3=this[_0x876046(0x252)]()-_0x46c743;return new _0x32da89(_0x8a4de0,_0x46c743,_0x31cd44,_0x4defd3);}}return![];}if(_0x217dc9[_0x876046(0x3ac)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x876046(0x3f6)!=='yLbdV'){const _0x1aa768=JSON[_0x876046(0x477)]('['+RegExp['$1'][_0x876046(0x3ac)](/\d+/g)+']');for(const _0x4c81d8 of _0x1aa768){if(!$gameSwitches[_0x876046(0x57e)](_0x4c81d8))return!![];}return![];}else return _0x34a3b2[_0x876046(0x3e3)][_0x876046(0x368)][_0x876046(0x56d)][_0x876046(0x66c)];}if(_0x217dc9[_0x876046(0x3ac)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4d609e=JSON['parse']('['+RegExp['$1'][_0x876046(0x3ac)](/\d+/g)+']');for(const _0x5d6d12 of _0x4d609e){if(!$gameSwitches['value'](_0x5d6d12))return!![];}return![];}if(_0x217dc9[_0x876046(0x3ac)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x45e43a=JSON[_0x876046(0x477)]('['+RegExp['$1'][_0x876046(0x3ac)](/\d+/g)+']');for(const _0x5e5a8a of _0x45e43a){if(_0x876046(0x30b)==='OyIAF'){if(_0x5c0622===_0x23a70a)return;for(let _0xe0cb7d=0x0;_0xe0cb7d<0x8;_0xe0cb7d++){const _0x3f3b5a=_0x39e341[_0x876046(0x3e3)][_0x876046(0x5b1)]['EquipParams'][_0xe0cb7d];_0x524d66['note'][_0x876046(0x3ac)](_0x3f3b5a)&&(_0x15d15a[_0x876046(0x547)][_0xe0cb7d]=_0x2989be(_0x365fdb['$1']));}}else{if($gameSwitches[_0x876046(0x57e)](_0x5e5a8a))return![];}}return!![];}return!![];},Game_BattlerBase[_0x4ab1bf(0x4d5)]['meetsItemConditionsJS']=function(_0x1a9016){const _0x179208=_0x4ab1bf,_0x2a8dbf=_0x1a9016[_0x179208(0x28b)],_0x51cb45=VisuMZ[_0x179208(0x3e3)][_0x179208(0x3aa)];if(_0x51cb45[_0x1a9016['id']]){if(_0x179208(0x439)===_0x179208(0x3d3))this[_0x179208(0x309)]();else return _0x51cb45[_0x1a9016['id']][_0x179208(0x4b8)](this,_0x1a9016);}else{if(_0x179208(0x1ea)!=='YfVjL'){const _0xe790ab=_0xf05088[_0x179208(0x1e8)];this[_0x179208(0x541)](_0xe790ab,_0x12e5d6,_0x5e7453,_0x4175a4,_0x179208(0x5b8));}else return!![];}},Game_Actor[_0x4ab1bf(0x4d5)]['initEquips']=function(_0x486282){const _0x3d0354=_0x4ab1bf;_0x486282=this[_0x3d0354(0x4cd)](_0x486282);const _0x39dcfb=this[_0x3d0354(0x600)]();this['_equips']=[];for(let _0x5f18ca=0x0;_0x5f18ca<_0x39dcfb[_0x3d0354(0x205)];_0x5f18ca++){this[_0x3d0354(0x3be)][_0x5f18ca]=new Game_Item();}for(let _0x245587=0x0;_0x245587<_0x39dcfb[_0x3d0354(0x205)];_0x245587++){const _0x19fd89=_0x39dcfb[_0x245587],_0x2c414a=this[_0x3d0354(0x33b)](_0x486282,_0x19fd89);if(this[_0x3d0354(0x1f5)](_0x2c414a))this[_0x3d0354(0x3be)][_0x245587][_0x3d0354(0x201)](_0x2c414a);}this[_0x3d0354(0x5d9)](!![]),this[_0x3d0354(0x202)]();},Game_Actor['prototype'][_0x4ab1bf(0x4cd)]=function(_0x15781c){const _0xa3fd42=_0x4ab1bf,_0x38f923=[];for(let _0x1536bf=0x0;_0x1536bf<_0x15781c['length'];_0x1536bf++){if('UqmNE'==='UqmNE'){const _0x32fcc4=_0x15781c[_0x1536bf];if(_0x32fcc4<=0x0)continue;const _0x5018ce=$dataSystem[_0xa3fd42(0x5e5)][_0x1536bf+0x1];if(_0x5018ce===$dataSystem[_0xa3fd42(0x5e5)][0x1]||_0x1536bf===0x1&&this[_0xa3fd42(0x467)]())_0x38f923[_0xa3fd42(0x24c)]($dataWeapons[_0x32fcc4]);else{if(BattleManager[_0xa3fd42(0x238)]()){const _0x14510=$dataArmors[_0x32fcc4];_0x14510&&_0x14510[_0xa3fd42(0x593)]===_0x1536bf+0x1&&_0x38f923[_0xa3fd42(0x24c)](_0x14510);}else{if('eAIMv'===_0xa3fd42(0x4fb)){const _0x3a5c5f=_0x1450a2[_0xa3fd42(0x4d5)]['buffIconIndex'](-0x1,_0x261df9);if(_0x3a5c5f>0x0){_0xfc40a0+=_0xa3fd42(0x514)['format'](_0x3a5c5f),_0x27fcf5++;if(_0x29391d>=_0x59dc61)return _0x4ada4f;}}else{const _0x5165e0=$dataArmors[_0x32fcc4];_0x5165e0&&_0x5165e0[_0xa3fd42(0x593)]===_0x1536bf+0x1&&_0x38f923[_0xa3fd42(0x24c)](_0x5165e0);}}}}else return _0x2dd26a['floor'](this[_0xa3fd42(0x3c6)]());}return _0x38f923;},Game_Actor['prototype'][_0x4ab1bf(0x33b)]=function(_0xfae08c,_0x26d610){const _0x253521=_0x4ab1bf;for(const _0x2e0b70 of _0xfae08c){if(!_0x2e0b70)continue;if(_0x2e0b70[_0x253521(0x593)]===_0x26d610)return _0x253521(0x23f)===_0x253521(0x23f)?(_0xfae08c[_0x253521(0x410)](_0xfae08c[_0x253521(0x5c2)](_0x2e0b70),0x1),_0x2e0b70):_0x896ca5['ItemsEquipsCore'][_0x253521(0x368)]['EquipScene'][_0x253521(0x1fa)];}return null;},Game_Actor[_0x4ab1bf(0x4d5)]['equipSlots']=function(){const _0x4aade0=_0x4ab1bf,_0x3277c6=JsonEx['makeDeepCopy'](this['_forcedSlots']||this[_0x4aade0(0x591)]()[_0x4aade0(0x600)]);if(_0x3277c6[_0x4aade0(0x205)]>=0x2&&this[_0x4aade0(0x467)]())_0x3277c6[0x1]=0x1;return _0x3277c6;},Game_Actor[_0x4ab1bf(0x4d5)]['forceChangeEquipSlots']=function(_0xcdecc4){const _0x40e1a4=_0x4ab1bf;_0xcdecc4['remove'](0x0),_0xcdecc4[_0x40e1a4(0x53b)](-0x1),this['_forcedSlots']=_0xcdecc4,this['refresh'](),this['updateChangedSlots']();},Game_Actor[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x364)]=function(){const _0x4234b3=_0x4ab1bf;this[_0x4234b3(0x51c)]=undefined,this['refresh'](),this[_0x4234b3(0x5d3)]();},Game_Actor[_0x4ab1bf(0x4d5)]['updateChangedSlots']=function(){const _0x12f3e5=_0x4ab1bf;let _0x57b88e=this['equipSlots']()[_0x12f3e5(0x205)];while(this['_equips'][_0x12f3e5(0x205)]>_0x57b88e){const _0x51cdc1=this[_0x12f3e5(0x3be)][this['_equips']['length']-0x1];if(_0x51cdc1&&_0x51cdc1[_0x12f3e5(0x421)]()){if('eTVML'!==_0x12f3e5(0x523))$gameParty[_0x12f3e5(0x247)](_0x51cdc1['object'](),0x1);else{const _0x2e459a=_0x314fd3['ItemsEquipsCore'][_0x12f3e5(0x368)][_0x12f3e5(0x56d)],_0x3d8de0=_0x12f3e5(0x32a)['format'](this['_item'][_0x12f3e5(0x569)][_0x12f3e5(0x649)]),_0xe153d2=[null,_0xf4e8a8['hp'],_0x5c83be['mp'],_0x2867b9['hp'],_0x5abdf8['mp'],_0x4364fe['hp'],_0x5f3df4['mp']][this['_item'][_0x12f3e5(0x569)][_0x12f3e5(0x649)]];return _0x2e459a[_0x3d8de0][_0x12f3e5(0x365)](_0xe153d2);}}this[_0x12f3e5(0x3be)]['pop']();}while(_0x57b88e>this[_0x12f3e5(0x3be)][_0x12f3e5(0x205)]){this['_equips'][_0x12f3e5(0x24c)](new Game_Item());}},Game_Actor[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x360)]=function(){const _0x5b462f=_0x4ab1bf,_0x50bb85=this['equipSlots']();for(let _0x22ce81=0x0;_0x22ce81<_0x50bb85[_0x5b462f(0x205)];_0x22ce81++){if('DKsah'!==_0x5b462f(0x54c)){if(!this[_0x5b462f(0x2f5)]())_0xa6d858[_0x5b462f(0x4d5)][_0x5b462f(0x2b9)]['call'](this);}else{if(!this[_0x5b462f(0x3be)][_0x22ce81])this[_0x5b462f(0x3be)][_0x22ce81]=new Game_Item();}}this[_0x5b462f(0x5d9)](![]),this[_0x5b462f(0x202)]();},VisuMZ['ItemsEquipsCore'][_0x4ab1bf(0x5da)]=Game_Actor[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x656)],Game_Actor[_0x4ab1bf(0x4d5)]['changeEquip']=function(_0x525fce,_0x463e29){const _0x167b2f=_0x4ab1bf;if(!this[_0x167b2f(0x4ce)]){const _0x5d1222=JsonEx[_0x167b2f(0x5ff)](this);_0x5d1222[_0x167b2f(0x4ce)]=!![],VisuMZ[_0x167b2f(0x3e3)][_0x167b2f(0x5da)][_0x167b2f(0x4b8)](this,_0x525fce,_0x463e29),this[_0x167b2f(0x5c8)](_0x5d1222);}else VisuMZ[_0x167b2f(0x3e3)][_0x167b2f(0x5da)][_0x167b2f(0x4b8)](this,_0x525fce,_0x463e29);},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x588)]=Game_Actor['prototype'][_0x4ab1bf(0x42d)],Game_Actor[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x42d)]=function(_0x235a53,_0x48531e){const _0x13152c=_0x4ab1bf;if(!this[_0x13152c(0x4ce)]){const _0xd6b873=JsonEx[_0x13152c(0x5ff)](this);_0xd6b873[_0x13152c(0x4ce)]=!![],VisuMZ[_0x13152c(0x3e3)][_0x13152c(0x588)]['call'](this,_0x235a53,_0x48531e),this[_0x13152c(0x5c8)](_0xd6b873);}else VisuMZ['ItemsEquipsCore']['Game_Actor_forceChangeEquip'][_0x13152c(0x4b8)](this,_0x235a53,_0x48531e);},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x51e)]=Game_Actor[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3ea)],Game_Actor[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3ea)]=function(_0x316c2c){const _0x2dd240=_0x4ab1bf;if(!this[_0x2dd240(0x4ce)]){const _0x125ffb=JsonEx['makeDeepCopy'](this);_0x125ffb[_0x2dd240(0x4ce)]=!![],VisuMZ[_0x2dd240(0x3e3)][_0x2dd240(0x51e)]['call'](this,_0x316c2c),this[_0x2dd240(0x5c8)](_0x125ffb);}else VisuMZ[_0x2dd240(0x3e3)][_0x2dd240(0x51e)][_0x2dd240(0x4b8)](this,_0x316c2c);},Game_Actor[_0x4ab1bf(0x4d5)]['releaseUnequippableItems']=function(_0x1c9bf4){const _0x1e104f=_0x4ab1bf;if(this[_0x1e104f(0x273)])return;for(;;){if(_0x1e104f(0x45e)!==_0x1e104f(0x45e)){_0x3e7636=_0x1e81e0||'',_0xd767bf=_0xc0d983||_0x1e104f(0x1fe),this['_resetFontSize']=this[_0x1e104f(0x377)](),this[_0x1e104f(0x3ad)]=_0xb46a86?_0x27575a[_0x1e104f(0x3b6)]():this[_0x1e104f(0x200)][_0x1e104f(0x565)],_0x4c58ce+=this['itemPadding'](),_0x3d0de7-=this['itemPadding']()*0x2;const _0x226581=this[_0x1e104f(0x449)](_0x1adeb9);if(_0x5a6615===_0x1e104f(0x5b8))_0x2cac8f=_0x1c4120+_0x56d326[_0x1e104f(0x3c8)]((_0x34111d-_0x226581[_0x1e104f(0x621)])/0x2);else _0x2d00d7===_0x1e104f(0x479)&&(_0x1bce68=_0x13f819+_0x2aceac-_0x226581[_0x1e104f(0x621)]);_0x2a0de1+=(this[_0x1e104f(0x672)]()-_0x226581[_0x1e104f(0x381)])/0x2,this['drawTextEx'](_0x2a7c33,_0x1a3190,_0x5242a1,_0x311d9e),this[_0x1e104f(0x2cd)]=_0x14f38d,this['_resetFontColor']=_0x38810c,this[_0x1e104f(0x284)]();}else{const _0x3cb7fe=this[_0x1e104f(0x600)](),_0x2cdc83=this[_0x1e104f(0x4fa)](),_0x189e39=_0x2cdc83[_0x1e104f(0x205)];let _0x8c0f77=![];for(let _0x47a565=0x0;_0x47a565<_0x189e39;_0x47a565++){const _0x3703d5=_0x2cdc83[_0x47a565];if(_0x3703d5&&(!this[_0x1e104f(0x1f5)](_0x3703d5)||_0x3703d5[_0x1e104f(0x593)]!==_0x3cb7fe[_0x47a565])){!_0x1c9bf4&&this[_0x1e104f(0x446)](null,_0x3703d5);if(!this[_0x1e104f(0x4ce)]){const _0x13ad7f=JsonEx[_0x1e104f(0x5ff)](this);_0x13ad7f['_tempActor']=!![],this[_0x1e104f(0x3be)][_0x47a565][_0x1e104f(0x201)](null),this[_0x1e104f(0x273)]=!![],this[_0x1e104f(0x5c8)](_0x13ad7f),this[_0x1e104f(0x273)]=undefined;}else this[_0x1e104f(0x3be)][_0x47a565][_0x1e104f(0x201)](null);_0x8c0f77=!![];}}if(!_0x8c0f77)break;}}},Game_Actor[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5c8)]=function(_0x1c39db){const _0x4e7e57=_0x4ab1bf;if(this['_tempActor'])return;if(!VisuMZ[_0x4e7e57(0x3e3)][_0x4e7e57(0x368)]['EquipScene'][_0x4e7e57(0x56b)])return;const _0x251272=Math[_0x4e7e57(0x329)](_0x1c39db[_0x4e7e57(0x654)]()*this['mhp']),_0x374a19=Math[_0x4e7e57(0x329)](_0x1c39db['mpRate']()*this[_0x4e7e57(0x37b)]);if(this['hp']>0x0)this[_0x4e7e57(0x501)](_0x251272);if(this['mp']>0x0)this['setMp'](_0x374a19);},Game_Actor[_0x4ab1bf(0x4d5)]['clearEquipments']=function(){const _0x394136=_0x4ab1bf,_0x2e2b1e=this['equipSlots']()[_0x394136(0x205)];for(let _0x2a29cf=0x0;_0x2a29cf<_0x2e2b1e;_0x2a29cf++){if(this[_0x394136(0x47d)](_0x2a29cf))this[_0x394136(0x656)](_0x2a29cf,null);}},Game_Actor[_0x4ab1bf(0x4d5)]['isClearEquipOk']=function(_0x298ef0){const _0x1c535d=_0x4ab1bf;if(this[_0x1c535d(0x580)]()[_0x1c535d(0x57d)](this['equipSlots']()[_0x298ef0]))return![];else{if(_0x1c535d(0x402)===_0x1c535d(0x34c)){const _0x355fb4=this[_0x1c535d(0x2ff)]();return _0x5259a6[_0x1c535d(0x48e)]('shift')?this[_0x1c535d(0x250)]():this[_0x1c535d(0x5d7)](_0xc30428[_0x1c535d(0x31a)](_0x1c535d(0x4e1))),this[_0x1c535d(0x2ff)]()!==_0x355fb4&&this['playCursorSound'](),!![];}else return this[_0x1c535d(0x224)](_0x298ef0);}},Game_Actor[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x580)]=function(){const _0x2bb99b=_0x4ab1bf;return VisuMZ[_0x2bb99b(0x3e3)][_0x2bb99b(0x368)][_0x2bb99b(0x3ae)]['NonRemoveETypes'];},Game_Actor[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3f3)]=function(){const _0x8c7716=_0x4ab1bf,_0x1c1c98=this[_0x8c7716(0x600)]()[_0x8c7716(0x205)];for(let _0x4eb897=0x0;_0x4eb897<_0x1c1c98;_0x4eb897++){if(_0x8c7716(0x505)!==_0x8c7716(0x505)){const _0x28bd3f=_0x8c7716(0x62b);if(this[_0x8c7716(0x288)][_0x28bd3f])return this[_0x8c7716(0x288)][_0x28bd3f];const _0x2387cd='×%1';return _0x2387cd[_0x8c7716(0x365)](this[_0x8c7716(0x55d)]['repeats']);}else{if(this[_0x8c7716(0x484)](_0x4eb897))this[_0x8c7716(0x656)](_0x4eb897,null);}}for(let _0x4454b0=0x0;_0x4454b0<_0x1c1c98;_0x4454b0++){if(_0x8c7716(0x26b)!==_0x8c7716(0x26b)){if(_0x247941)_0x28df9e+=this['paramPlusItemsEquipsCoreCustomJS'](_0x455cae,_0x2bc5ca);}else{if(this['isOptimizeEquipOk'](_0x4454b0))this['changeEquip'](_0x4454b0,this[_0x8c7716(0x23b)](_0x4454b0));}}},Game_Actor['prototype'][_0x4ab1bf(0x484)]=function(_0x462f20){const _0x286af3=_0x4ab1bf;return this[_0x286af3(0x615)]()[_0x286af3(0x57d)](this[_0x286af3(0x600)]()[_0x462f20])?_0x286af3(0x438)!=='LYvZE'?this[_0x286af3(0x3c9)]():![]:this[_0x286af3(0x224)](_0x462f20);},Game_Actor['prototype'][_0x4ab1bf(0x615)]=function(){const _0x100036=_0x4ab1bf;return VisuMZ[_0x100036(0x3e3)]['Settings'][_0x100036(0x3ae)][_0x100036(0x60d)];},VisuMZ['ItemsEquipsCore'][_0x4ab1bf(0x1ee)]=Game_Actor[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x446)],Game_Actor['prototype'][_0x4ab1bf(0x446)]=function(_0xf103b0,_0x362695){const _0x3648a2=_0x4ab1bf;if(this[_0x3648a2(0x4ce)])return![];$gameTemp[_0x3648a2(0x5b3)]=!![];const _0x353549=VisuMZ[_0x3648a2(0x3e3)]['Game_Actor_tradeItemWithParty']['call'](this,_0xf103b0,_0x362695);return $gameTemp[_0x3648a2(0x5b3)]=![],_0x353549;},Game_Actor['prototype']['changeEquipById']=function(_0xd98c00,_0x25c2bc){const _0x56645a=_0x4ab1bf,_0x2d52d6=this[_0x56645a(0x302)](_0xd98c00);if(_0x2d52d6<0x0)return;const _0x43bc29=_0xd98c00===0x1?$dataWeapons[_0x25c2bc]:$dataArmors[_0x25c2bc];this[_0x56645a(0x656)](_0x2d52d6,_0x43bc29);},Game_Actor[_0x4ab1bf(0x4d5)]['getNextAvailableEtypeId']=function(_0x54ebde){const _0x12b610=_0x4ab1bf;let _0x33abd3=0x0;const _0x2ba7f2=this[_0x12b610(0x600)](),_0x3715e1=this['equips']();for(let _0x55e803=0x0;_0x55e803<_0x2ba7f2[_0x12b610(0x205)];_0x55e803++){if(_0x12b610(0x51a)!==_0x12b610(0x66d)){if(_0x2ba7f2[_0x55e803]===_0x54ebde){if(_0x12b610(0x49e)!==_0x12b610(0x516)){_0x33abd3=_0x55e803;if(!_0x3715e1[_0x55e803])return _0x33abd3;}else{const _0x243df3=_0x3df0ef(_0x3d5e81['$1']),_0x1dc0e9=(_0x31296b===_0x14174e?'W%1':_0x12b610(0x659))['format'](_0x1ba599['id']),_0x1d8080=_0x12b610(0x27b)[_0x12b610(0x365)](_0x243df3);for(let _0x4badd2=0x0;_0x4badd2<0x8;_0x4badd2++){if(_0x243df3[_0x12b610(0x3ac)](_0xa60a29[_0x12b610(0x3e3)][_0x12b610(0x5b1)][_0x12b610(0x53c)][_0x4badd2])){const _0x402603='%1-%2'[_0x12b610(0x365)](_0x1dc0e9,_0x4badd2);_0xe58f16[_0x12b610(0x3e3)][_0x12b610(0x2a3)][_0x402603]=new _0x5beb47(_0x12b610(0x5d4),_0x12b610(0x5af),_0x1d8080);}}}}}else return 0x0;}return _0x33abd3;},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x444)]=Game_Actor[_0x4ab1bf(0x4d5)]['paramPlus'],Game_Actor[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x494)]=function(_0x45439c){const _0x8e9545=_0x4ab1bf;let _0x498871=VisuMZ[_0x8e9545(0x3e3)][_0x8e9545(0x444)][_0x8e9545(0x4b8)](this,_0x45439c);for(const _0x222adb of this[_0x8e9545(0x4fa)]()){if(_0x222adb)_0x498871+=this[_0x8e9545(0x643)](_0x222adb,_0x45439c);}return _0x498871;},Game_Actor[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x643)]=function(_0xb5f3cc,_0x41d41c){const _0x45cd71=_0x4ab1bf;if(this['_calculatingJSParameters'])return 0x0;const _0x2b29ce=(DataManager[_0x45cd71(0x243)](_0xb5f3cc)?_0x45cd71(0x4ba):_0x45cd71(0x659))[_0x45cd71(0x365)](_0xb5f3cc['id']),_0x10169b=_0x45cd71(0x3ca)[_0x45cd71(0x365)](_0x2b29ce,_0x41d41c);if(VisuMZ['ItemsEquipsCore'][_0x45cd71(0x2a3)][_0x10169b]){this[_0x45cd71(0x545)]=!![];const _0x2c1fca=VisuMZ[_0x45cd71(0x3e3)][_0x45cd71(0x2a3)][_0x10169b][_0x45cd71(0x4b8)](this,_0xb5f3cc,_0x41d41c);return this['_calculatingJSParameters']=![],_0x2c1fca;}else return 0x0;},Game_Actor[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4f4)]=function(_0x17c447){const _0x52caa7=_0x4ab1bf;this[_0x52caa7(0x3f0)]=!![],this[_0x52caa7(0x62f)]=_0x17c447;},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x3b4)]=Game_Party[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x65e)],Game_Party[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x65e)]=function(){const _0x18e6c1=_0x4ab1bf;VisuMZ[_0x18e6c1(0x3e3)][_0x18e6c1(0x3b4)]['call'](this),this[_0x18e6c1(0x60b)]();},Game_Party[_0x4ab1bf(0x4d5)]['initNewItemsList']=function(){const _0x3f73a8=_0x4ab1bf;this[_0x3f73a8(0x468)]=[];},Game_Party['prototype'][_0x4ab1bf(0x459)]=function(_0x1fab15){const _0x4214b4=_0x4ab1bf;if(!$gameTemp['newLabelEnabled']())return![];if(this[_0x4214b4(0x468)]===undefined)this[_0x4214b4(0x60b)]();let _0xead6f3='';if(DataManager[_0x4214b4(0x43d)](_0x1fab15))_0xead6f3=_0x4214b4(0x4f6)[_0x4214b4(0x365)](_0x1fab15['id']);else{if(DataManager[_0x4214b4(0x243)](_0x1fab15))_0xead6f3=_0x4214b4(0x34a)['format'](_0x1fab15['id']);else{if(DataManager[_0x4214b4(0x397)](_0x1fab15)){if(_0x4214b4(0x4dc)===_0x4214b4(0x38a))return _0xa85bc8[_0x4214b4(0x41c)](_0x4214b4(0x1fe),_0x4214b4(0x479));else _0xead6f3=_0x4214b4(0x431)[_0x4214b4(0x365)](_0x1fab15['id']);}else{if('iYVfs'!==_0x4214b4(0x2e6)){const _0x435649=this[_0x4214b4(0x354)](_0x37d221),_0x6802f7=this[_0x4214b4(0x449)](_0x4a6e4e)['width'];return _0x6802f7<=_0x435649['width']?_0x4214b4(0x567):_0x4214b4(0x40c);}else return;}}}return this[_0x4214b4(0x468)][_0x4214b4(0x57d)](_0xead6f3);},Game_Party['prototype'][_0x4ab1bf(0x454)]=function(_0x5c1ddc){const _0x2ef89e=_0x4ab1bf;if(!$gameTemp[_0x2ef89e(0x301)]())return;if(this[_0x2ef89e(0x468)]===undefined)this['initNewItemsList']();let _0x25d38d='';if(DataManager[_0x2ef89e(0x43d)](_0x5c1ddc))_0x25d38d=_0x2ef89e(0x4f6)['format'](_0x5c1ddc['id']);else{if(DataManager['isWeapon'](_0x5c1ddc))_0x25d38d=_0x2ef89e(0x34a)['format'](_0x5c1ddc['id']);else{if(DataManager[_0x2ef89e(0x397)](_0x5c1ddc))_0x25d38d='armor-%1'['format'](_0x5c1ddc['id']);else{if(_0x2ef89e(0x63d)!==_0x2ef89e(0x63d))return this[_0x2ef89e(0x3a1)]()[_0x2ef89e(0x3ac)](/LOWER/i);else return;}}}if(!this[_0x2ef89e(0x468)][_0x2ef89e(0x57d)](_0x25d38d))this[_0x2ef89e(0x468)]['push'](_0x25d38d);},Game_Party[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x630)]=function(_0x333d65){const _0x5cfa25=_0x4ab1bf;if(!$gameTemp['newLabelEnabled']())return;if(this['_newItemsList']===undefined)this[_0x5cfa25(0x60b)]();let _0xb1cd93='';if(DataManager[_0x5cfa25(0x43d)](_0x333d65))_0xb1cd93=_0x5cfa25(0x4f6)['format'](_0x333d65['id']);else{if(DataManager['isWeapon'](_0x333d65))_0x5cfa25(0x527)!==_0x5cfa25(0x343)?_0xb1cd93=_0x5cfa25(0x34a)[_0x5cfa25(0x365)](_0x333d65['id']):_0x165f9e[_0x5cfa25(0x4d5)][_0x5cfa25(0x2e3)][_0x5cfa25(0x4b8)](this,_0x244f1c);else{if(DataManager[_0x5cfa25(0x397)](_0x333d65))_0xb1cd93='armor-%1'[_0x5cfa25(0x365)](_0x333d65['id']);else{if(_0x5cfa25(0x22d)!==_0x5cfa25(0x5d5))return;else return _0x3481c0['uiHelpPosition'];}}}this[_0x5cfa25(0x468)][_0x5cfa25(0x57d)](_0xb1cd93)&&this[_0x5cfa25(0x468)][_0x5cfa25(0x410)](this[_0x5cfa25(0x468)][_0x5cfa25(0x5c2)](_0xb1cd93),0x1);},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x27d)]=Game_Party[_0x4ab1bf(0x4d5)]['gainItem'],Game_Party[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x247)]=function(_0x1c6515,_0x16e63a,_0x2f2328){const _0x34b920=_0x4ab1bf,_0x37b65a=this[_0x34b920(0x65c)](_0x1c6515);VisuMZ['ItemsEquipsCore'][_0x34b920(0x27d)][_0x34b920(0x4b8)](this,_0x1c6515,_0x16e63a,_0x2f2328);if(this[_0x34b920(0x65c)](_0x1c6515)>_0x37b65a)this['setNewItem'](_0x1c6515);},Game_Party[_0x4ab1bf(0x4d5)]['maxItems']=function(_0x5efe49){const _0x37a745=_0x4ab1bf;return DataManager[_0x37a745(0x218)](_0x5efe49);},VisuMZ[_0x4ab1bf(0x3e3)]['Scene_ItemBase_activateItemWindow']=Scene_ItemBase['prototype'][_0x4ab1bf(0x31c)],Scene_ItemBase[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x31c)]=function(){const _0x206fd4=_0x4ab1bf;VisuMZ[_0x206fd4(0x3e3)]['Scene_ItemBase_activateItemWindow'][_0x206fd4(0x4b8)](this),this[_0x206fd4(0x382)][_0x206fd4(0x287)]();},Scene_Item[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4aa)]=function(){const _0x119134=_0x4ab1bf;if(ConfigManager[_0x119134(0x3ba)]&&ConfigManager['uiHelpPosition']!==undefined){if('wzxpR'===_0x119134(0x3ab))_0x54e2b3=_0x119134(0x49d)[_0x119134(0x365)](_0x5f3ce0,_0x2d2c61);else return ConfigManager['uiHelpPosition'];}else{if(this[_0x119134(0x3a2)]())return this[_0x119134(0x3a1)]()['match'](/LOWER/i);else{if(_0x119134(0x508)!==_0x119134(0x5d8))Scene_ItemBase[_0x119134(0x4d5)][_0x119134(0x296)][_0x119134(0x4b8)](this);else return this['isEquipChangeOk'](_0x1fbaef);}}},Scene_Item[_0x4ab1bf(0x4d5)]['isRightInputMode']=function(){const _0x242358=_0x4ab1bf;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x242358(0x219)]!==undefined)return ConfigManager[_0x242358(0x219)];else{if(this[_0x242358(0x3a2)]())return this[_0x242358(0x3a1)]()[_0x242358(0x3ac)](/RIGHT/i);else Scene_ItemBase[_0x242358(0x4d5)][_0x242358(0x296)]['call'](this);}},Scene_Item[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3a1)]=function(){const _0x4a500b=_0x4ab1bf;return VisuMZ[_0x4a500b(0x3e3)]['Settings'][_0x4a500b(0x608)][_0x4a500b(0x5a8)];},Scene_Item['prototype'][_0x4ab1bf(0x2f5)]=function(){const _0x15354f=_0x4ab1bf;return this['_categoryWindow']&&this['_categoryWindow'][_0x15354f(0x2f5)]();},Scene_Item[_0x4ab1bf(0x4d5)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x244737=_0x4ab1bf;return VisuMZ[_0x244737(0x3e3)]['Settings'][_0x244737(0x608)][_0x244737(0x389)];},VisuMZ[_0x4ab1bf(0x3e3)]['Scene_Item_create']=Scene_Item['prototype']['create'],Scene_Item['prototype']['create']=function(){const _0x2b6c94=_0x4ab1bf;VisuMZ[_0x2b6c94(0x3e3)][_0x2b6c94(0x369)][_0x2b6c94(0x4b8)](this),this[_0x2b6c94(0x2f5)]()&&this[_0x2b6c94(0x4a1)]();},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x495)]=Scene_Item[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x560)],Scene_Item[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x560)]=function(){const _0x1be35b=_0x4ab1bf;if(this[_0x1be35b(0x3a2)]()){if(_0x1be35b(0x55a)!==_0x1be35b(0x55a)){if(this['isHoverEnabled']()&&_0x5afa12[_0x1be35b(0x42e)]())this[_0x1be35b(0x2b3)](![]);else _0x5562a1[_0x1be35b(0x31a)]()&&this[_0x1be35b(0x2b3)](!![]);_0x37db73[_0x1be35b(0x345)]()&&this['onTouchOk']();}else return this['helpWindowRectItemsEquipsCore']();}else return VisuMZ[_0x1be35b(0x3e3)][_0x1be35b(0x495)]['call'](this);},Scene_Item[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x342)]=function(){const _0xb1e02a=_0x4ab1bf,_0x3fac86=0x0,_0x29e06c=this[_0xb1e02a(0x330)](),_0xc4fc08=Graphics[_0xb1e02a(0x544)],_0x254a45=this['helpAreaHeight']();return new Rectangle(_0x3fac86,_0x29e06c,_0xc4fc08,_0x254a45);},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x3a5)]=Scene_Item['prototype']['createCategoryWindow'],Scene_Item['prototype'][_0x4ab1bf(0x272)]=function(){const _0x10b1e2=_0x4ab1bf;VisuMZ[_0x10b1e2(0x3e3)]['Scene_Item_createCategoryWindow'][_0x10b1e2(0x4b8)](this);if(this['isUseModernControls']()){if(_0x10b1e2(0x32c)!=='WoTnw')return _0x3596b0[_0x10b1e2(0x3e3)][_0x10b1e2(0x368)][_0x10b1e2(0x3ae)][_0x10b1e2(0x383)];else this[_0x10b1e2(0x570)]();}},Scene_Item['prototype'][_0x4ab1bf(0x570)]=function(){const _0x4eb12a=_0x4ab1bf;delete this[_0x4eb12a(0x341)][_0x4eb12a(0x3f9)]['ok'],delete this[_0x4eb12a(0x341)][_0x4eb12a(0x3f9)][_0x4eb12a(0x213)];},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x347)]=Scene_Item[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x35a)],Scene_Item['prototype'][_0x4ab1bf(0x35a)]=function(){const _0x27041d=_0x4ab1bf;return this[_0x27041d(0x3a2)]()?this['categoryWindowRectItemsEquipsCore']():VisuMZ[_0x27041d(0x3e3)]['Scene_Item_categoryWindowRect']['call'](this);},Scene_Item['prototype'][_0x4ab1bf(0x418)]=function(){const _0x2ae81d=_0x4ab1bf,_0x501b6d=0x0,_0x23d62c=this['mainAreaTop'](),_0x12067f=Graphics[_0x2ae81d(0x544)],_0x37ef93=this[_0x2ae81d(0x663)](0x1,!![]);return new Rectangle(_0x501b6d,_0x23d62c,_0x12067f,_0x37ef93);},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x22a)]=Scene_Item[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x493)],Scene_Item[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x493)]=function(){const _0xa65b51=_0x4ab1bf;VisuMZ['ItemsEquipsCore'][_0xa65b51(0x22a)]['call'](this);if(this[_0xa65b51(0x2f5)]()){if('RXmCO'!=='QbSxp')this[_0xa65b51(0x359)]();else{if(!this[_0xa65b51(0x4ce)]){const _0x54c501=_0x18f6a1[_0xa65b51(0x5ff)](this);_0x54c501[_0xa65b51(0x4ce)]=!![],_0x1c4814[_0xa65b51(0x3e3)][_0xa65b51(0x51e)][_0xa65b51(0x4b8)](this,_0x4f6783),this[_0xa65b51(0x5c8)](_0x54c501);}else _0xe91cea['ItemsEquipsCore'][_0xa65b51(0x51e)][_0xa65b51(0x4b8)](this,_0x417d94);}}if(this[_0xa65b51(0x41b)]()){if('TmQgI'===_0xa65b51(0x1f6)){const _0x105172=_0x3d5ac4['x']+_0x5f2a03[_0xa65b51(0x3c8)]((_0x554527[_0xa65b51(0x621)]-_0x4968cb)/0x2);this[_0xa65b51(0x668)](_0x114f71,_0x105172,_0x8a7aaf['y'],_0x9c5b0a);}else this[_0xa65b51(0x3e5)]();}},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x4bd)]=Scene_Item[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x50f)],Scene_Item[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x50f)]=function(){const _0x5bfcdb=_0x4ab1bf;if(this[_0x5bfcdb(0x3a2)]())return this['itemWindowRectItemsEquipsCore']();else{const _0x373501=VisuMZ[_0x5bfcdb(0x3e3)][_0x5bfcdb(0x4bd)]['call'](this);if(this[_0x5bfcdb(0x41b)]()&&this[_0x5bfcdb(0x366)]()){if(_0x5bfcdb(0x5ef)==='uEHeW'){if(this[_0x5bfcdb(0x43d)](_0xdea2be))return _0x5ddfa9[_0x5bfcdb(0x3e3)][_0x5bfcdb(0x368)][_0x5bfcdb(0x608)][_0x5bfcdb(0x674)];else{if(this[_0x5bfcdb(0x243)](_0x5cc8ad))return _0x1b20bc[_0x5bfcdb(0x3e3)][_0x5bfcdb(0x368)][_0x5bfcdb(0x608)][_0x5bfcdb(0x658)];else{if(this['isArmor'](_0x24f1e7))return _0x50e4d5[_0x5bfcdb(0x3e3)][_0x5bfcdb(0x368)][_0x5bfcdb(0x608)][_0x5bfcdb(0x48d)];}}}else _0x373501[_0x5bfcdb(0x621)]-=this[_0x5bfcdb(0x5e4)]();}return _0x373501;}},Scene_Item[_0x4ab1bf(0x4d5)]['itemWindowRectItemsEquipsCore']=function(){const _0x2b884c=_0x4ab1bf,_0x21ed7a=this[_0x2b884c(0x296)]()?this[_0x2b884c(0x5e4)]():0x0,_0x35b071=this[_0x2b884c(0x341)]['y']+this[_0x2b884c(0x341)][_0x2b884c(0x381)],_0x87eee3=Graphics['boxWidth']-this[_0x2b884c(0x5e4)](),_0x413d7b=this[_0x2b884c(0x252)]()-_0x35b071;return new Rectangle(_0x21ed7a,_0x35b071,_0x87eee3,_0x413d7b);},Scene_Item['prototype'][_0x4ab1bf(0x359)]=function(){const _0x263d9f=_0x4ab1bf;this[_0x263d9f(0x382)]['setHandler'](_0x263d9f(0x213),this[_0x263d9f(0x44d)][_0x263d9f(0x664)](this));},Scene_Item[_0x4ab1bf(0x4d5)]['allowCreateStatusWindow']=function(){const _0x1d6856=_0x4ab1bf;if(this[_0x1d6856(0x3a2)]()){if(_0x1d6856(0x59a)==='vArzf')return!![];else{_0x25e6ef+=_0x1d6856(0x514)[_0x1d6856(0x365)](_0x1e2355),_0x36aa7c++;if(_0x3623d0>=_0x5a118b)return _0x4bde59;}}else{if(_0x1d6856(0x611)===_0x1d6856(0x611))return VisuMZ[_0x1d6856(0x3e3)][_0x1d6856(0x368)][_0x1d6856(0x608)][_0x1d6856(0x46a)];else{const _0x88bed=this[_0x1d6856(0x3a9)](),_0xd0b198=_0x53d582[_0x1d6856(0x3e3)]['Settings'][_0x1d6856(0x49a)][_0x1d6856(0x47c)],_0x29487d=_0x88bed===_0x1d6856(0x4e0)?_0x56d92c[_0x1d6856(0x487)]:_0x1d6856(0x49d)[_0x1d6856(0x365)](_0xd0b198,_0x5d58ab['buy']),_0x542bf2=this[_0x1d6856(0x3fb)]();if(this['hideDisabledCommands']()&&!_0x542bf2)return;this['addCommand'](_0x29487d,_0x1d6856(0x487),_0x542bf2);}}},Scene_Item[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x366)]=function(){const _0x3afbfb=_0x4ab1bf;return VisuMZ[_0x3afbfb(0x3e3)][_0x3afbfb(0x368)][_0x3afbfb(0x608)]['ItemSceneAdjustItemList'];},Scene_Item[_0x4ab1bf(0x4d5)]['createStatusWindow']=function(){const _0x15f5c6=_0x4ab1bf,_0x4dcc07=this[_0x15f5c6(0x27c)]();this[_0x15f5c6(0x33c)]=new Window_ShopStatus(_0x4dcc07),this[_0x15f5c6(0x4b1)](this[_0x15f5c6(0x33c)]),this[_0x15f5c6(0x382)][_0x15f5c6(0x3bd)](this[_0x15f5c6(0x33c)]);const _0x3aca43=VisuMZ[_0x15f5c6(0x3e3)][_0x15f5c6(0x368)][_0x15f5c6(0x608)]['ItemMenuStatusBgType'];this[_0x15f5c6(0x33c)][_0x15f5c6(0x2ac)](_0x3aca43||0x0);},Scene_Item[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x27c)]=function(){const _0x20c131=_0x4ab1bf;if(this[_0x20c131(0x3a2)]()){if('PZZFh'===_0x20c131(0x210)){this[_0x20c131(0x502)]=![];if(this['isCursorMovable']()){const _0x24eabf=this['index'](),_0x4d9397=this[_0x20c131(0x538)]();_0x4d9397>=0x0&&_0x4d9397!==this[_0x20c131(0x2ff)]()&&this[_0x20c131(0x37c)](_0x4d9397),_0x202612&&this['index']()!==_0x24eabf&&this[_0x20c131(0x573)]();}}else return this[_0x20c131(0x3c9)]();}else{if(_0x20c131(0x3f4)!==_0x20c131(0x41f))return VisuMZ['ItemsEquipsCore']['Settings'][_0x20c131(0x608)][_0x20c131(0x66b)][_0x20c131(0x4b8)](this);else this[_0x20c131(0x33c)]=_0x5a9116,this[_0x20c131(0x287)]();}},Scene_Item[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3c9)]=function(){const _0x25ef4a=_0x4ab1bf,_0x25458e=this[_0x25ef4a(0x5e4)](),_0x77f8e2=this[_0x25ef4a(0x382)]['height'],_0x2f82d0=this[_0x25ef4a(0x296)]()?0x0:Graphics[_0x25ef4a(0x544)]-this[_0x25ef4a(0x5e4)](),_0x49bf68=this[_0x25ef4a(0x382)]['y'];return new Rectangle(_0x2f82d0,_0x49bf68,_0x25458e,_0x77f8e2);},Scene_Item[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5e4)]=function(){const _0x321958=_0x4ab1bf;return Scene_Shop[_0x321958(0x4d5)][_0x321958(0x5e4)]();},Scene_Item[_0x4ab1bf(0x4d5)]['buttonAssistItemListRequirement']=function(){const _0xaf14c0=_0x4ab1bf;if(!this[_0xaf14c0(0x3a1)]())return![];if(!this[_0xaf14c0(0x2f5)]())return![];if(!this['_itemWindow'])return![];if(!this[_0xaf14c0(0x382)]['active'])return![];return this[_0xaf14c0(0x3a1)]()&&this[_0xaf14c0(0x2f5)]();},Scene_Item['prototype']['buttonAssistKey1']=function(){const _0x88ff5c=_0x4ab1bf;if(this[_0x88ff5c(0x35b)]()){if(_0x88ff5c(0x240)!==_0x88ff5c(0x240))_0x1a994f=_0x50855c(_0x2d1a0b['$1'])[_0x88ff5c(0x61e)]()[_0x88ff5c(0x63f)]();else return this[_0x88ff5c(0x382)]['maxCols']()===0x1?'ZhcBi'!=='tohSr'?TextManager[_0x88ff5c(0x41c)](_0x88ff5c(0x1fe),_0x88ff5c(0x479)):_0x29c27a['ItemsEquipsCore'][_0x88ff5c(0x368)][_0x88ff5c(0x3ae)][_0x88ff5c(0x265)]:TextManager[_0x88ff5c(0x41c)](_0x88ff5c(0x42b),_0x88ff5c(0x49c));}return Scene_ItemBase[_0x88ff5c(0x4d5)][_0x88ff5c(0x437)]['call'](this);},Scene_Item[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x562)]=function(){const _0xec332a=_0x4ab1bf;if(this[_0xec332a(0x35b)]())return VisuMZ[_0xec332a(0x3e3)]['Settings'][_0xec332a(0x608)][_0xec332a(0x2a1)];return Scene_ItemBase['prototype'][_0xec332a(0x562)][_0xec332a(0x4b8)](this);},Scene_Equip['prototype'][_0x4ab1bf(0x4aa)]=function(){const _0x947d3d=_0x4ab1bf;if(ConfigManager[_0x947d3d(0x3ba)]&&ConfigManager[_0x947d3d(0x303)]!==undefined)return _0x947d3d(0x5c3)===_0x947d3d(0x1f1)?_0x596b84:ConfigManager[_0x947d3d(0x303)];else{if(this[_0x947d3d(0x3a2)]())return this[_0x947d3d(0x3a1)]()[_0x947d3d(0x3ac)](/LOWER/i);else _0x947d3d(0x283)===_0x947d3d(0x55f)?(this[_0x947d3d(0x349)][_0x947d3d(0x66a)](),this[_0x947d3d(0x476)]['show']()):Scene_MenuBase[_0x947d3d(0x4d5)][_0x947d3d(0x296)][_0x947d3d(0x4b8)](this);}},Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x296)]=function(){const _0x2112b1=_0x4ab1bf;if(ConfigManager[_0x2112b1(0x3ba)]&&ConfigManager[_0x2112b1(0x219)]!==undefined)return ConfigManager[_0x2112b1(0x219)];else{if(this[_0x2112b1(0x3a2)]())return this[_0x2112b1(0x3a1)]()[_0x2112b1(0x3ac)](/RIGHT/i);else{if(_0x2112b1(0x2d4)!==_0x2112b1(0x2d4))return!!_0x39bfac&&_0x57731d[_0x2112b1(0x2e4)][_0x2112b1(0x57d)](_0x3e3ca7(_0x572742['$1'])[_0x2112b1(0x3e2)]()[_0x2112b1(0x63f)]());else Scene_MenuBase[_0x2112b1(0x4d5)][_0x2112b1(0x296)][_0x2112b1(0x4b8)](this);}}},Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3a1)]=function(){const _0x2ce8f9=_0x4ab1bf;return VisuMZ[_0x2ce8f9(0x3e3)][_0x2ce8f9(0x368)][_0x2ce8f9(0x3ae)][_0x2ce8f9(0x5a8)];},Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2f5)]=function(){const _0x5e219c=_0x4ab1bf;return this['_commandWindow']&&this[_0x5e219c(0x476)][_0x5e219c(0x2f5)]();},Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3a2)]=function(){const _0x4bd3c3=_0x4ab1bf;return VisuMZ[_0x4bd3c3(0x3e3)][_0x4bd3c3(0x368)][_0x4bd3c3(0x3ae)][_0x4bd3c3(0x389)];},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x673)]=Scene_Equip[_0x4ab1bf(0x4d5)]['create'],Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x622)]=function(){const _0x1f42e7=_0x4ab1bf;VisuMZ[_0x1f42e7(0x3e3)][_0x1f42e7(0x673)][_0x1f42e7(0x4b8)](this),this[_0x1f42e7(0x2f5)]()&&this[_0x1f42e7(0x5c7)]();},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x5ec)]=Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x560)],Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x560)]=function(){const _0x5cf747=_0x4ab1bf;return this[_0x5cf747(0x3a2)]()?this['helpWindowRectItemsEquipsCore']():VisuMZ[_0x5cf747(0x3e3)]['Scene_Equip_helpWindowRect'][_0x5cf747(0x4b8)](this);},Scene_Equip['prototype']['helpWindowRectItemsEquipsCore']=function(){const _0x59c40f=_0x4ab1bf,_0x9bdad5=0x0,_0x30237f=this[_0x59c40f(0x330)](),_0x4d51cc=Graphics['boxWidth'],_0x1187f9=this[_0x59c40f(0x5fe)]();return new Rectangle(_0x9bdad5,_0x30237f,_0x4d51cc,_0x1187f9);},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x65d)]=Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x27c)],Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x27c)]=function(){const _0xa0dbf8=_0x4ab1bf;return this[_0xa0dbf8(0x3a2)]()?this[_0xa0dbf8(0x3c9)]():VisuMZ[_0xa0dbf8(0x3e3)]['Scene_Equip_statusWindowRect'][_0xa0dbf8(0x4b8)](this);},Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3c9)]=function(){const _0x22f40c=_0x4ab1bf,_0x5b9406=this[_0x22f40c(0x296)]()?0x0:Graphics['boxWidth']-this[_0x22f40c(0x5e4)](),_0x30ee68=this[_0x22f40c(0x614)](),_0xa6d93=this[_0x22f40c(0x5e4)](),_0x2a9ed0=this[_0x22f40c(0x350)]();return new Rectangle(_0x5b9406,_0x30ee68,_0xa6d93,_0x2a9ed0);},VisuMZ['ItemsEquipsCore'][_0x4ab1bf(0x3c1)]=Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x23c)],Scene_Equip[_0x4ab1bf(0x4d5)]['commandWindowRect']=function(){const _0x3370be=_0x4ab1bf;return this[_0x3370be(0x3a2)]()?_0x3370be(0x43c)==='IWWZz'?_0x26a79f[_0x3370be(0x3e3)][_0x3370be(0x368)]['ShopScene'][_0x3370be(0x3db)]:this[_0x3370be(0x327)]():VisuMZ[_0x3370be(0x3e3)]['Scene_Equip_commandWindowRect'][_0x3370be(0x4b8)](this);},Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4cb)]=function(){const _0x2819ed=_0x4ab1bf,_0xe6743e=VisuMZ[_0x2819ed(0x3e3)]['Settings']['EquipScene'];return _0xe6743e[_0x2819ed(0x292)]||_0xe6743e[_0x2819ed(0x265)];},Scene_Equip['prototype'][_0x4ab1bf(0x327)]=function(){const _0x3de5ce=_0x4ab1bf,_0xa8c320=this[_0x3de5ce(0x4cb)](),_0xd63a9e=this[_0x3de5ce(0x296)]()?this[_0x3de5ce(0x5e4)]():0x0,_0x2a2109=this[_0x3de5ce(0x614)](),_0x58521d=Graphics['boxWidth']-this[_0x3de5ce(0x5e4)](),_0x540842=_0xa8c320?this[_0x3de5ce(0x663)](0x1,!![]):0x0;return new Rectangle(_0xd63a9e,_0x2a2109,_0x58521d,_0x540842);},VisuMZ['ItemsEquipsCore']['Scene_Equip_createSlotWindow']=Scene_Equip['prototype'][_0x4ab1bf(0x3c7)],Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3c7)]=function(){const _0x375979=_0x4ab1bf;VisuMZ[_0x375979(0x3e3)][_0x375979(0x3e6)][_0x375979(0x4b8)](this),this[_0x375979(0x2f5)]()&&this[_0x375979(0x4f2)]();},VisuMZ[_0x4ab1bf(0x3e3)]['Scene_Equip_slotWindowRect']=Scene_Equip['prototype'][_0x4ab1bf(0x4f8)],Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4f8)]=function(){const _0x2af5f0=_0x4ab1bf;if(this[_0x2af5f0(0x3a2)]()){if('HsutX'!==_0x2af5f0(0x344))return this['slotWindowRectItemsEquipsCore']();else{if(this[_0x2af5f0(0x545)])return 0x0;const _0x4cc8fc=(_0x3c0eae[_0x2af5f0(0x243)](_0x1f9f8c)?_0x2af5f0(0x4ba):_0x2af5f0(0x659))['format'](_0x489ef2['id']),_0x56ca74=_0x2af5f0(0x3ca)[_0x2af5f0(0x365)](_0x4cc8fc,_0x455ea9);if(_0x54ed6a[_0x2af5f0(0x3e3)]['paramJS'][_0x56ca74]){this[_0x2af5f0(0x545)]=!![];const _0x1040c7=_0xe66a59['ItemsEquipsCore'][_0x2af5f0(0x2a3)][_0x56ca74]['call'](this,_0x1dfc6a,_0x53d166);return this[_0x2af5f0(0x545)]=![],_0x1040c7;}else return 0x0;}}else{if(_0x2af5f0(0x549)===_0x2af5f0(0x355)){const _0x5d0ec6=_0x198712[_0x2af5f0(0x5a3)]()['indexOf'](_0xa45953),_0x102e11=_0x254a12+_0xd9677+_0x5d0ec6*_0xa55726;this[_0x2af5f0(0x5fb)](_0x312245[_0x2af5f0(0x1f5)](this[_0x2af5f0(0x55d)])),this[_0x2af5f0(0x4d6)](_0xf2c4df,_0x102e11+_0x23ca1c/0x2,_0x5acb07);let _0x320c95=_0x18bef4;for(const _0x4ba06d of _0x8de27e){const _0x12becb=_0x320c95-(_0x5903e5-_0x334bde)/0x2;this[_0x2af5f0(0x2c8)](_0x184510,_0x4ba06d,_0x102e11,_0x12becb,_0x463b79),_0x320c95+=_0x2cc500;}}else return VisuMZ[_0x2af5f0(0x3e3)][_0x2af5f0(0x3d8)][_0x2af5f0(0x4b8)](this);}},Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x490)]=function(){const _0x4217dd=_0x4ab1bf,_0x186b0e=this[_0x4217dd(0x23c)](),_0x1480d5=this[_0x4217dd(0x296)]()?this['statusWidth']():0x0,_0x14af0e=_0x186b0e['y']+_0x186b0e[_0x4217dd(0x381)],_0x13f278=Graphics[_0x4217dd(0x544)]-this[_0x4217dd(0x5e4)](),_0x55a232=this['mainAreaHeight']()-_0x186b0e[_0x4217dd(0x381)];return new Rectangle(_0x1480d5,_0x14af0e,_0x13f278,_0x55a232);},VisuMZ['ItemsEquipsCore'][_0x4ab1bf(0x258)]=Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x50f)],Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x50f)]=function(){const _0x26a036=_0x4ab1bf;return this[_0x26a036(0x3a2)]()?this[_0x26a036(0x4f8)]():_0x26a036(0x636)===_0x26a036(0x636)?VisuMZ[_0x26a036(0x3e3)][_0x26a036(0x258)][_0x26a036(0x4b8)](this):_0x26a036(0x48a);},Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5e4)]=function(){const _0x6e5358=_0x4ab1bf;if(this[_0x6e5358(0x3a2)]())return this[_0x6e5358(0x5b9)]();else{if(_0x6e5358(0x239)!=='EzIUI')return VisuMZ[_0x6e5358(0x3e3)][_0x6e5358(0x368)][_0x6e5358(0x3ae)][_0x6e5358(0x59e)];else{const _0x100b0f=_0x177336['x']+_0x52dbfe[_0x6e5358(0x3c8)]((_0xd9454['width']-_0x550150)/0x2);this['drawTextEx'](_0x2fa52a,_0x100b0f,_0x3e8406['y'],_0x372a35);}}},Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5b9)]=function(){const _0x2ef7ea=_0x4ab1bf;return Math['floor'](Graphics[_0x2ef7ea(0x544)]/0x2);},Scene_Equip[_0x4ab1bf(0x4d5)]['postCreateSlotWindowItemsEquipsCore']=function(){const _0x1a0b40=_0x4ab1bf;this['_slotWindow'][_0x1a0b40(0x1ed)](_0x1a0b40(0x213),this['popScene'][_0x1a0b40(0x664)](this)),this['_slotWindow'][_0x1a0b40(0x1ed)](_0x1a0b40(0x49c),this[_0x1a0b40(0x5fa)][_0x1a0b40(0x664)](this)),this['_slotWindow'][_0x1a0b40(0x1ed)](_0x1a0b40(0x42b),this['previousActor'][_0x1a0b40(0x664)](this));},VisuMZ[_0x4ab1bf(0x3e3)]['Scene_Equip_commandEquip']=Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5c7)],Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5c7)]=function(){const _0x39b782=_0x4ab1bf;this[_0x39b782(0x2f5)]()&&(this[_0x39b782(0x476)]['deselect'](),this['_commandWindow'][_0x39b782(0x578)]()),VisuMZ[_0x39b782(0x3e3)][_0x39b782(0x631)]['call'](this);},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x25c)]=Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x47e)],Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x47e)]=function(){const _0x46e484=_0x4ab1bf;this[_0x46e484(0x40b)][_0x46e484(0x2ff)]()>=0x0?(VisuMZ['ItemsEquipsCore'][_0x46e484(0x25c)]['call'](this),this[_0x46e484(0x556)]()):(this[_0x46e484(0x40b)][_0x46e484(0x414)](0x0),this[_0x46e484(0x40b)][_0x46e484(0x3e0)]());},Scene_Equip[_0x4ab1bf(0x4d5)]['onSlotOkAutoSelect']=function(){const _0x1e8be8=_0x4ab1bf;this[_0x1e8be8(0x382)]['refresh']();const _0x98952b=this['_slotWindow']['item'](),_0x55a412=this[_0x1e8be8(0x382)][_0x1e8be8(0x5d1)]['indexOf'](_0x98952b),_0x52082c=Math[_0x1e8be8(0x3c8)](this['_itemWindow'][_0x1e8be8(0x609)]()/0x2)-0x1;this[_0x1e8be8(0x382)][_0x1e8be8(0x414)](_0x55a412>=0x0?_0x55a412:0x0),this[_0x1e8be8(0x382)][_0x1e8be8(0x3c4)](this['_itemWindow'][_0x1e8be8(0x2ff)]()-_0x52082c);},VisuMZ['ItemsEquipsCore'][_0x4ab1bf(0x30e)]=Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x58a)],Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x58a)]=function(){const _0x106f2f=_0x4ab1bf;VisuMZ[_0x106f2f(0x3e3)][_0x106f2f(0x30e)]['call'](this),this[_0x106f2f(0x2f5)]()&&(this[_0x106f2f(0x476)][_0x106f2f(0x414)](0x0),this[_0x106f2f(0x40b)][_0x106f2f(0x578)]());},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x348)]=Scene_Equip[_0x4ab1bf(0x4d5)]['onActorChange'],Scene_Equip['prototype']['onActorChange']=function(){const _0x4f53a9=_0x4ab1bf;VisuMZ[_0x4f53a9(0x3e3)][_0x4f53a9(0x348)][_0x4f53a9(0x4b8)](this);if(this['isUseModernControls']()){if(_0x4f53a9(0x38c)!==_0x4f53a9(0x5aa))this[_0x4f53a9(0x476)][_0x4f53a9(0x578)](),this[_0x4f53a9(0x476)][_0x4f53a9(0x2de)](),this[_0x4f53a9(0x40b)][_0x4f53a9(0x414)](0x0),this[_0x4f53a9(0x40b)][_0x4f53a9(0x3e0)]();else{this[_0x4f53a9(0x288)]={};if(!this['_item'])return;const _0x81b640=this[_0x4f53a9(0x55d)][_0x4f53a9(0x28b)];if(_0x81b640[_0x4f53a9(0x3ac)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x52e3be=_0x5aa91a(_0x1e484f['$1'])[_0x4f53a9(0x548)](/[\r\n]+/);for(const _0x3b9136 of _0x52e3be){if(_0x3b9136['match'](/(.*):[ ](.*)/i)){const _0x1d1162=_0x42d862(_0x51c296['$1'])[_0x4f53a9(0x3e2)]()['trim'](),_0x37635a=_0x2df062(_0x150739['$2'])[_0x4f53a9(0x63f)]();this[_0x4f53a9(0x288)][_0x1d1162]=_0x37635a;}}}}}},Scene_Equip['prototype'][_0x4ab1bf(0x361)]=function(){const _0x49f3da=_0x4ab1bf;if(!this[_0x49f3da(0x40b)])return![];if(!this['_slotWindow'][_0x49f3da(0x316)])return![];return this[_0x49f3da(0x40b)][_0x49f3da(0x27a)]();},Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x27e)]=function(){const _0x2d0139=_0x4ab1bf;if(this[_0x2d0139(0x361)]())return TextManager[_0x2d0139(0x2c2)](_0x2d0139(0x3d4));return Scene_MenuBase['prototype'][_0x2d0139(0x27e)]['call'](this);},Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2d8)]=function(){const _0x3b8aaf=_0x4ab1bf;if(this[_0x3b8aaf(0x361)]())return _0x3b8aaf(0x34d)!==_0x3b8aaf(0x4a0)?VisuMZ[_0x3b8aaf(0x3e3)][_0x3b8aaf(0x368)][_0x3b8aaf(0x3ae)][_0x3b8aaf(0x2b8)]:this['_list']?this[_0x3b8aaf(0x3f7)]():0x4;return Scene_MenuBase[_0x3b8aaf(0x4d5)][_0x3b8aaf(0x2d8)][_0x3b8aaf(0x4b8)](this);},Scene_Equip[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x50c)]=function(){const _0x3839d5=_0x4ab1bf;if(this[_0x3839d5(0x361)]()){if(_0x3839d5(0x20c)==='caUUU')return this[_0x3839d5(0x403)][_0x3839d5(0x621)]/0x5/-0x3;else{const _0x2d77f1=_0x517929[_0x3839d5(0x3e3)]['Settings'][_0x3839d5(0x3ae)];return _0x2d77f1[_0x3839d5(0x292)]||_0x2d77f1[_0x3839d5(0x265)];}}return Scene_MenuBase[_0x3839d5(0x4d5)]['buttonAssistOffset3'][_0x3839d5(0x4b8)](this);},Scene_Equip[_0x4ab1bf(0x4d5)]['popScene']=function(){const _0x54d592=_0x4ab1bf;SceneManager[_0x54d592(0x5b2)]();},VisuMZ[_0x4ab1bf(0x3e3)]['Scene_Load_reloadMapIfUpdated']=Scene_Load[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x282)],Scene_Load['prototype'][_0x4ab1bf(0x282)]=function(){const _0xc54555=_0x4ab1bf;VisuMZ[_0xc54555(0x3e3)]['Scene_Load_reloadMapIfUpdated'][_0xc54555(0x4b8)](this),this[_0xc54555(0x503)]();},Scene_Load[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x503)]=function(){const _0x5e2e4d=_0x4ab1bf;if($gameSystem[_0x5e2e4d(0x3fa)]()!==$dataSystem[_0x5e2e4d(0x3fa)])for(const _0x57ec0e of $gameActors[_0x5e2e4d(0x5d1)]){if('hqxgx'===_0x5e2e4d(0x5b6)){if(_0x57ec0e)_0x57ec0e[_0x5e2e4d(0x360)]();}else return _0x1d3dcc['elements'][this['_item'][_0x5e2e4d(0x569)][_0x5e2e4d(0x235)]];}},Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4aa)]=function(){const _0x3763b1=_0x4ab1bf;if(ConfigManager[_0x3763b1(0x3ba)]&&ConfigManager['uiHelpPosition']!==undefined)return _0x3763b1(0x657)===_0x3763b1(0x5c6)?_0x29b31d[_0x3763b1(0x3e3)][_0x3763b1(0x35c)][_0x3763b1(0x4b8)](this,_0x159ed2):ConfigManager[_0x3763b1(0x303)];else{if(this[_0x3763b1(0x3a2)]())return _0x3763b1(0x48c)!==_0x3763b1(0x59b)?this[_0x3763b1(0x3a1)]()['match'](/LOWER/i):![];else Scene_MenuBase[_0x3763b1(0x4d5)][_0x3763b1(0x296)][_0x3763b1(0x4b8)](this);}},Scene_Shop['prototype'][_0x4ab1bf(0x296)]=function(){const _0x457498=_0x4ab1bf;if(ConfigManager[_0x457498(0x3ba)]&&ConfigManager[_0x457498(0x219)]!==undefined){if(_0x457498(0x4ac)==='yILBg')_0x36ecac=_0x58b006[_0x457498(0x506)](this['drawParamName'](_0x2e5003,_0x3c0094+0x4,_0x25b320+0x4,_0x4261af),_0x20c86f),_0x5699dd+=_0x465238;else return ConfigManager[_0x457498(0x219)];}else{if(this[_0x457498(0x3a2)]())return this[_0x457498(0x3a1)]()[_0x457498(0x3ac)](/RIGHT/i);else Scene_MenuBase[_0x457498(0x4d5)][_0x457498(0x296)]['call'](this);}},Scene_Shop['prototype'][_0x4ab1bf(0x3a1)]=function(){const _0x1f77bd=_0x4ab1bf;return VisuMZ[_0x1f77bd(0x3e3)][_0x1f77bd(0x368)][_0x1f77bd(0x49a)][_0x1f77bd(0x5a8)];},Scene_Shop[_0x4ab1bf(0x4d5)]['isUseModernControls']=function(){const _0x491152=_0x4ab1bf;return this['_categoryWindow']&&this['_categoryWindow'][_0x491152(0x2f5)]();},Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3a2)]=function(){const _0x35ff44=_0x4ab1bf;return VisuMZ[_0x35ff44(0x3e3)][_0x35ff44(0x368)][_0x35ff44(0x49a)][_0x35ff44(0x389)];},VisuMZ[_0x4ab1bf(0x3e3)]['Scene_Shop_prepare']=Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x339)],Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x339)]=function(_0x349291,_0x5ec9ea){const _0x28190a=_0x4ab1bf;_0x349291=JsonEx[_0x28190a(0x5ff)](_0x349291),VisuMZ['ItemsEquipsCore'][_0x28190a(0x463)][_0x28190a(0x4b8)](this,_0x349291,_0x5ec9ea),this[_0x28190a(0x21f)]();},Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x21f)]=function(){const _0x59897b=_0x4ab1bf;this[_0x59897b(0x310)]=0x0;for(const _0x519a8c of this[_0x59897b(0x47a)]){if(this[_0x59897b(0x66e)](_0x519a8c)){if(_0x59897b(0x5a2)!=='GpWNH')this['_goodsCount']++;else return this['numberWindowRectItemsEquipsCore']();}else _0x519a8c[0x0]=-0x1;}},Scene_Shop['prototype']['isGoodShown']=function(_0x250ab0){const _0x2e986f=_0x4ab1bf;if(_0x250ab0[0x0]>0x2||_0x250ab0[0x0]<0x0)return![];const _0x41055c=[$dataItems,$dataWeapons,$dataArmors][_0x250ab0[0x0]][_0x250ab0[0x1]];if(!_0x41055c)return![];const _0x4223a3=_0x41055c[_0x2e986f(0x28b)]||'';if(_0x4223a3[_0x2e986f(0x3ac)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('LkaSV'!==_0x2e986f(0x4c4)){const _0x3a9219=this[_0x2e986f(0x504)]();_0x5da58d[_0x2e986f(0x333)]?this[_0x2e986f(0x2d7)](_0x3d07a4+_0x3a9219,_0xb4eb76,_0x58f856,_0x99db36,![]):this[_0x2e986f(0x541)](_0x5e720b['param'](_0x375504),_0x59e0ee+_0x3a9219,_0x1ecc32,_0x273ba5);}else{const _0x7570db=JSON[_0x2e986f(0x477)]('['+RegExp['$1'][_0x2e986f(0x3ac)](/\d+/g)+']');for(const _0x42587b of _0x7570db){if(!$gameSwitches[_0x2e986f(0x57e)](_0x42587b))return![];}return!![];}}if(_0x4223a3[_0x2e986f(0x3ac)](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x10bfd2=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1c0c02 of _0x10bfd2){if(!$gameSwitches[_0x2e986f(0x57e)](_0x1c0c02))return![];}return!![];}if(_0x4223a3[_0x2e986f(0x3ac)](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5bd6c3=JSON[_0x2e986f(0x477)]('['+RegExp['$1'][_0x2e986f(0x3ac)](/\d+/g)+']');for(const _0x5ddb9c of _0x5bd6c3){if(_0x2e986f(0x510)==='Mbytv'){if($gameSwitches[_0x2e986f(0x57e)](_0x5ddb9c))return!![];}else this[_0x2e986f(0x341)][_0x2e986f(0x414)](0x0),this[_0x2e986f(0x4a1)]();}return![];}if(_0x4223a3['match'](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xa4f66d=JSON[_0x2e986f(0x477)]('['+RegExp['$1'][_0x2e986f(0x3ac)](/\d+/g)+']');for(const _0x578a15 of _0xa4f66d){if(!$gameSwitches[_0x2e986f(0x57e)](_0x578a15))return!![];}return![];}if(_0x4223a3['match'](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2e986f(0x584)!=='AntQI'){const _0xdc2427=JSON[_0x2e986f(0x477)]('['+RegExp['$1'][_0x2e986f(0x3ac)](/\d+/g)+']');for(const _0x22742b of _0xdc2427){if(!$gameSwitches[_0x2e986f(0x57e)](_0x22742b))return!![];}return![];}else return _0x572da9[_0x2e986f(0x3e3)][_0x2e986f(0x368)][_0x2e986f(0x56d)][_0x2e986f(0x3e9)];}if(_0x4223a3[_0x2e986f(0x3ac)](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x333dfb=JSON[_0x2e986f(0x477)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3e37d5 of _0x333dfb){if($gameSwitches[_0x2e986f(0x57e)](_0x3e37d5))return![];}return!![];}return!![];},VisuMZ['ItemsEquipsCore'][_0x4ab1bf(0x2cf)]=Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x622)],Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x622)]=function(){const _0x5cab1f=_0x4ab1bf;VisuMZ[_0x5cab1f(0x3e3)][_0x5cab1f(0x2cf)]['call'](this);if(this[_0x5cab1f(0x3a2)]()){if(_0x5cab1f(0x4de)!==_0x5cab1f(0x4de))return this['isUseModernControls']()?![]:_0x51a8c4[_0x5cab1f(0x4d5)][_0x5cab1f(0x3fe)][_0x5cab1f(0x4b8)](this);else this[_0x5cab1f(0x507)]();}this[_0x5cab1f(0x50a)]();},Scene_Shop['prototype']['postCreateItemsEquipsCore']=function(){const _0x27997f=_0x4ab1bf;this[_0x27997f(0x58d)][_0x27997f(0x2bd)](),this[_0x27997f(0x349)][_0x27997f(0x66a)](),this[_0x27997f(0x349)]['deselect'](),this[_0x27997f(0x33c)]['show']();},VisuMZ[_0x4ab1bf(0x3e3)]['Scene_Shop_helpWindowRect']=Scene_Shop['prototype']['helpWindowRect'],Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x560)]=function(){const _0x5f44b4=_0x4ab1bf;if(this[_0x5f44b4(0x3a2)]()){if(_0x5f44b4(0x675)===_0x5f44b4(0x4ae)){const _0x4db4a9=this[_0x5f44b4(0x58e)](_0x552b30);if(!_0x4db4a9||!this[_0x5f44b4(0x55b)]())return;if(!_0x4f8422[_0x5f44b4(0x459)](_0x4db4a9))return;const _0x3ba603=this[_0x5f44b4(0x354)](_0x1ae430),_0x187a3f=_0x3ba603['x'],_0x527c83=_0x3ba603['y']+(this['lineHeight']()-_0x44b2fb['iconHeight'])/0x2,_0x3cfb95=_0x20579b[_0x5f44b4(0x3e3)]['Settings'][_0x5f44b4(0x208)][_0x5f44b4(0x225)],_0x4cf8a0=_0x3c6503[_0x5f44b4(0x3e3)][_0x5f44b4(0x368)][_0x5f44b4(0x208)][_0x5f44b4(0x529)];this[_0x5f44b4(0x4b6)](_0x4db4a9,_0x187a3f+_0x3cfb95,_0x527c83+_0x4cf8a0);}else return this[_0x5f44b4(0x342)]();}else{if('ymHcO'!==_0x5f44b4(0x25d)){_0x3fe423+='\x5cI[%1]'['format'](_0x2c4436[_0x5f44b4(0x32f)]),_0x240d1b++;if(_0x27e73b>=_0x485607)return _0x4fda15;}else return VisuMZ[_0x5f44b4(0x3e3)][_0x5f44b4(0x3eb)][_0x5f44b4(0x4b8)](this);}},Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x342)]=function(){const _0x81c6df=_0x4ab1bf,_0x1d17d4=0x0,_0x15ed24=this[_0x81c6df(0x330)](),_0x22d593=Graphics[_0x81c6df(0x544)],_0x2148a0=this['helpAreaHeight']();return new Rectangle(_0x1d17d4,_0x15ed24,_0x22d593,_0x2148a0);},VisuMZ[_0x4ab1bf(0x3e3)]['Scene_Shop_goldWindowRect']=Scene_Shop['prototype'][_0x4ab1bf(0x386)],Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x386)]=function(){const _0x2fb6af=_0x4ab1bf;if(this[_0x2fb6af(0x3a2)]()){if('HjpMr'===_0x2fb6af(0x5b5))return this[_0x2fb6af(0x406)]();else _0x282409[_0x2fb6af(0x3e3)][_0x2fb6af(0x673)][_0x2fb6af(0x4b8)](this),this[_0x2fb6af(0x2f5)]()&&this['commandEquip']();}else return VisuMZ['ItemsEquipsCore'][_0x2fb6af(0x206)]['call'](this);},Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x406)]=function(){const _0x41501a=_0x4ab1bf,_0x293fe4=this[_0x41501a(0x447)](),_0x47cc7f=this['calcWindowHeight'](0x1,!![]),_0x450ebf=this[_0x41501a(0x296)]()?0x0:Graphics[_0x41501a(0x544)]-_0x293fe4,_0x30bfa3=this[_0x41501a(0x614)]();return new Rectangle(_0x450ebf,_0x30bfa3,_0x293fe4,_0x47cc7f);},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x300)]=Scene_Shop[_0x4ab1bf(0x4d5)]['commandWindowRect'],Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x23c)]=function(){const _0x4a2783=_0x4ab1bf;return this[_0x4a2783(0x3a2)]()?this[_0x4a2783(0x327)]():_0x4a2783(0x602)!==_0x4a2783(0x602)?(_0x326618['isPlaytest']()&&(_0x2cdc3a[_0x4a2783(0x266)](_0x4a2783(0x323)['format'](this[_0x4a2783(0x55d)]['name'])),_0x251755['log'](_0x150799)),this[_0x4a2783(0x375)](),_0x4a2783(0x4f7)):VisuMZ['ItemsEquipsCore'][_0x4a2783(0x300)][_0x4a2783(0x4b8)](this);},Scene_Shop['prototype'][_0x4ab1bf(0x327)]=function(){const _0xb2b6c6=_0x4ab1bf,_0x1cef28=this[_0xb2b6c6(0x296)]()?this['mainCommandWidth']():0x0,_0x56d95f=this[_0xb2b6c6(0x614)](),_0x1e08ec=Graphics[_0xb2b6c6(0x544)]-this[_0xb2b6c6(0x447)](),_0x28817e=this[_0xb2b6c6(0x663)](0x1,!![]);return new Rectangle(_0x1cef28,_0x56d95f,_0x1e08ec,_0x28817e);},VisuMZ['ItemsEquipsCore']['Scene_Shop_numberWindowRect']=Scene_Shop[_0x4ab1bf(0x4d5)]['numberWindowRect'],Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x481)]=function(){const _0x424565=_0x4ab1bf;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x424565(0x25b)]():VisuMZ[_0x424565(0x3e3)][_0x424565(0x65f)][_0x424565(0x4b8)](this);},Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x25b)]=function(){const _0x246339=_0x4ab1bf,_0xda03f0=this[_0x246339(0x476)]['y']+this[_0x246339(0x476)][_0x246339(0x381)],_0x151c9f=Graphics['boxWidth']-this[_0x246339(0x5e4)](),_0x23352e=this['isRightInputMode']()?Graphics['boxWidth']-_0x151c9f:0x0,_0x8e5414=this[_0x246339(0x350)]()-this[_0x246339(0x476)][_0x246339(0x381)];return new Rectangle(_0x23352e,_0xda03f0,_0x151c9f,_0x8e5414);},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x37d)]=Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x27c)],Scene_Shop['prototype'][_0x4ab1bf(0x27c)]=function(){const _0x1ee0f4=_0x4ab1bf;if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x1ee0f4(0x3c9)]();else{if(_0x1ee0f4(0x57b)===_0x1ee0f4(0x57b))return VisuMZ['ItemsEquipsCore'][_0x1ee0f4(0x37d)]['call'](this);else{_0x52598f=this['convertInitEquipsToItems'](_0x31b7b7);const _0x7cc0d1=this[_0x1ee0f4(0x600)]();this['_equips']=[];for(let _0x2032dc=0x0;_0x2032dc<_0x7cc0d1[_0x1ee0f4(0x205)];_0x2032dc++){this[_0x1ee0f4(0x3be)][_0x2032dc]=new _0x4154f1();}for(let _0x59ae67=0x0;_0x59ae67<_0x7cc0d1['length'];_0x59ae67++){const _0x1cea97=_0x7cc0d1[_0x59ae67],_0x10e7fb=this[_0x1ee0f4(0x33b)](_0x116b21,_0x1cea97);if(this[_0x1ee0f4(0x1f5)](_0x10e7fb))this[_0x1ee0f4(0x3be)][_0x59ae67]['setObject'](_0x10e7fb);}this[_0x1ee0f4(0x5d9)](!![]),this[_0x1ee0f4(0x202)]();}}},Scene_Shop['prototype'][_0x4ab1bf(0x3c9)]=function(){const _0x33f215=_0x4ab1bf,_0x520097=this['statusWidth'](),_0x13869c=this['mainAreaHeight']()-this[_0x33f215(0x476)][_0x33f215(0x381)],_0x5a2dc0=this[_0x33f215(0x296)]()?0x0:Graphics[_0x33f215(0x544)]-_0x520097,_0x3bbc67=this[_0x33f215(0x476)]['y']+this[_0x33f215(0x476)][_0x33f215(0x381)];return new Rectangle(_0x5a2dc0,_0x3bbc67,_0x520097,_0x13869c);},VisuMZ[_0x4ab1bf(0x3e3)]['Scene_Shop_buyWindowRect']=Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x653)],Scene_Shop[_0x4ab1bf(0x4d5)]['buyWindowRect']=function(){const _0x437af1=_0x4ab1bf;if(this[_0x437af1(0x3a2)]())return this[_0x437af1(0x241)]();else{if(_0x437af1(0x3d0)===_0x437af1(0x5cb))_0x5975ba='item-%1'['format'](_0x31ad2c['id']);else return VisuMZ[_0x437af1(0x3e3)][_0x437af1(0x236)]['call'](this);}},Scene_Shop[_0x4ab1bf(0x4d5)]['buyWindowRectItemsEquipsCore']=function(){const _0x50cdd6=_0x4ab1bf,_0x1b6dbb=this[_0x50cdd6(0x476)]['y']+this[_0x50cdd6(0x476)][_0x50cdd6(0x381)],_0x41e427=Graphics[_0x50cdd6(0x544)]-this[_0x50cdd6(0x5e4)](),_0x22b33f=this[_0x50cdd6(0x350)]()-this['_commandWindow'][_0x50cdd6(0x381)],_0x503339=this[_0x50cdd6(0x296)]()?Graphics[_0x50cdd6(0x544)]-_0x41e427:0x0;return new Rectangle(_0x503339,_0x1b6dbb,_0x41e427,_0x22b33f);},VisuMZ[_0x4ab1bf(0x3e3)]['Scene_Shop_createCategoryWindow']=Scene_Shop['prototype']['createCategoryWindow'],Scene_Shop[_0x4ab1bf(0x4d5)]['createCategoryWindow']=function(){const _0x408a88=_0x4ab1bf;VisuMZ[_0x408a88(0x3e3)][_0x408a88(0x363)][_0x408a88(0x4b8)](this);if(this[_0x408a88(0x2f5)]()){if('JphAK'===_0x408a88(0x44a))this[_0x408a88(0x570)]();else{const _0x3f344f=new _0x25bc37();return _0x328784[_0x285071]=_0x3f344f,this['addInnerChild'](_0x3f344f),_0x3f344f;}}},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x4f1)]=Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x35a)],Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x35a)]=function(){const _0x38adb1=_0x4ab1bf;if(this[_0x38adb1(0x3a2)]())return _0x38adb1(0x4bb)==='zhxJh'?this[_0x38adb1(0x3a2)]()?this[_0x38adb1(0x406)]():_0x42d192[_0x38adb1(0x3e3)][_0x38adb1(0x206)][_0x38adb1(0x4b8)](this):this[_0x38adb1(0x418)]();else{if('uBoLl'!==_0x38adb1(0x2b7))return VisuMZ[_0x38adb1(0x3e3)]['Scene_Shop_categoryWindowRect'][_0x38adb1(0x4b8)](this);else _0x3b1401=this['_actor']['paramValueByName'](_0x2c2ea9,![]),_0x592cf8=this[_0x38adb1(0x4ce)][_0x38adb1(0x51b)](_0x47f6ac,![]),_0x12ed2f=this[_0x38adb1(0x4ce)]['paramValueByName'](_0x1d01d2,!![]);}},Scene_Shop['prototype']['categoryWindowRectItemsEquipsCore']=function(){const _0x19d6e5=_0x4ab1bf,_0x3bb837=this[_0x19d6e5(0x476)]['y'],_0x5dbaa3=this['_commandWindow'][_0x19d6e5(0x621)],_0x13f484=this[_0x19d6e5(0x663)](0x1,!![]),_0x35e251=this[_0x19d6e5(0x296)]()?Graphics[_0x19d6e5(0x544)]-_0x5dbaa3:0x0;return new Rectangle(_0x35e251,_0x3bb837,_0x5dbaa3,_0x13f484);},Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x570)]=function(){const _0x172c0a=_0x4ab1bf;delete this['_categoryWindow']['_handlers']['ok'],delete this['_categoryWindow'][_0x172c0a(0x3f9)][_0x172c0a(0x213)];},VisuMZ['ItemsEquipsCore'][_0x4ab1bf(0x1e5)]=Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4ea)],Scene_Shop['prototype']['createSellWindow']=function(){const _0x4e6fc4=_0x4ab1bf;VisuMZ[_0x4e6fc4(0x3e3)][_0x4e6fc4(0x1e5)][_0x4e6fc4(0x4b8)](this);if(this[_0x4e6fc4(0x3a2)]()){if(_0x4e6fc4(0x665)!==_0x4e6fc4(0x24a))this[_0x4e6fc4(0x499)]();else return _0x99991d['ScopeRandomAny'][_0x4e6fc4(0x365)](_0x31c9e6(_0x4a2f18['$1']));}},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x215)]=Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x465)],Scene_Shop['prototype'][_0x4ab1bf(0x465)]=function(){const _0x16bec6=_0x4ab1bf;if(this[_0x16bec6(0x3a2)]())return this[_0x16bec6(0x43b)]();else{if('lvSpw'!==_0x16bec6(0x5b0))return VisuMZ[_0x16bec6(0x3e3)][_0x16bec6(0x215)][_0x16bec6(0x4b8)](this);else{const _0x49255b=_0x16bec6(0x372);if(this[_0x16bec6(0x288)][_0x49255b])return this[_0x16bec6(0x288)][_0x49255b];let _0x4a335c='';return _0x4a335c+='%1'[_0x16bec6(0x365)](this[_0x16bec6(0x44b)][_0x16bec6(0x319)]),_0x4a335c;}}},Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x43b)]=function(){const _0x28cad0=_0x4ab1bf,_0x2ae65b=this[_0x28cad0(0x341)]['y']+this[_0x28cad0(0x341)][_0x28cad0(0x381)],_0x17e4cd=Graphics['boxWidth']-this[_0x28cad0(0x5e4)](),_0x30034e=this[_0x28cad0(0x350)]()-this[_0x28cad0(0x341)][_0x28cad0(0x381)],_0x148801=this[_0x28cad0(0x296)]()?Graphics[_0x28cad0(0x544)]-_0x17e4cd:0x0;return new Rectangle(_0x148801,_0x2ae65b,_0x17e4cd,_0x30034e);},Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x499)]=function(){const _0x50173a=_0x4ab1bf;this['_sellWindow']['setStatusWindow'](this[_0x50173a(0x33c)]);},Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5e4)]=function(){const _0x2b7fba=_0x4ab1bf;return VisuMZ[_0x2b7fba(0x3e3)]['Settings'][_0x2b7fba(0x56d)][_0x2b7fba(0x370)];},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x385)]=Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5de)],Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5de)]=function(){const _0x446c06=_0x4ab1bf;VisuMZ[_0x446c06(0x3e3)][_0x446c06(0x385)][_0x446c06(0x4b8)](this),this[_0x446c06(0x3a2)]()&&this[_0x446c06(0x33c)][_0x446c06(0x66a)](),this[_0x446c06(0x2f7)][_0x446c06(0x54a)]();},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x2df)]=Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2b5)],Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2b5)]=function(){const _0x444747=_0x4ab1bf;VisuMZ['ItemsEquipsCore'][_0x444747(0x2df)][_0x444747(0x4b8)](this);if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x444747(0x4f5)!==_0x444747(0x4f5))return _0x53106a[_0x444747(0x3e3)][_0x444747(0x368)][_0x444747(0x49a)][_0x444747(0x3cf)];else this[_0x444747(0x309)]();}},Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x309)]=function(){const _0x1a0921=_0x4ab1bf;this[_0x1a0921(0x38b)]=this['_buyWindowLastIndex']||0x0,this[_0x1a0921(0x349)][_0x1a0921(0x414)](this[_0x1a0921(0x38b)]);},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x4c3)]=Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x482)],Scene_Shop[_0x4ab1bf(0x4d5)]['commandSell']=function(){const _0x7e2919=_0x4ab1bf;VisuMZ['ItemsEquipsCore']['Scene_Shop_commandSell']['call'](this);this[_0x7e2919(0x3a2)]()&&('MzDvI'===_0x7e2919(0x37e)?_0x2eacf1=_0x3c79e5[_0x7e2919(0x3e3)][_0x7e2919(0x368)][_0x7e2919(0x4dd)][_0x1ae7e6]:this['commandSellItemsEquipsCore']());if(this['isUseModernControls']()){if(_0x7e2919(0x204)===_0x7e2919(0x204))this[_0x7e2919(0x341)]['smoothSelect'](0x0),this[_0x7e2919(0x4a1)]();else{_0x361967[_0x7e2919(0x3e3)]['Scene_Shop_doBuy'][_0x7e2919(0x4b8)](this,_0x146851);if(_0x2376b7<=0x0)return;const _0x14a907=_0x1495b6[_0x7e2919(0x3e3)][_0x7e2919(0x368)][_0x7e2919(0x49a)];_0x14a907[_0x7e2919(0x22f)]&&_0x4a8cf3[_0x7e2919(0x390)](_0x14a907[_0x7e2919(0x22f)],!![]);}}},Scene_Shop['prototype']['commandSellItemsEquipsCore']=function(){const _0x211e2d=_0x4ab1bf;this[_0x211e2d(0x349)][_0x211e2d(0x2bd)](),this['_commandWindow'][_0x211e2d(0x2bd)]();},VisuMZ[_0x4ab1bf(0x3e3)]['Scene_Shop_onBuyCancel']=Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x671)],Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x671)]=function(){const _0x543d9c=_0x4ab1bf;VisuMZ['ItemsEquipsCore'][_0x543d9c(0x4b7)][_0x543d9c(0x4b8)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this['onBuyCancelItemsEquipsCore']();},Scene_Shop[_0x4ab1bf(0x4d5)]['onBuyCancelItemsEquipsCore']=function(){const _0x5c2d6f=_0x4ab1bf;this['_buyWindowLastIndex']=this[_0x5c2d6f(0x349)][_0x5c2d6f(0x2ff)](),this['_buyWindow'][_0x5c2d6f(0x66a)](),this[_0x5c2d6f(0x349)][_0x5c2d6f(0x2de)](),this[_0x5c2d6f(0x349)][_0x5c2d6f(0x5ba)](0x0,0x0),this[_0x5c2d6f(0x33c)][_0x5c2d6f(0x66a)](),this[_0x5c2d6f(0x58d)]['hide']();},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x453)]=Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3d9)],Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3d9)]=function(){const _0x59bc07=_0x4ab1bf;VisuMZ['ItemsEquipsCore']['Scene_Shop_onCategoryCancel'][_0x59bc07(0x4b8)](this);if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x59bc07(0x56a)===_0x59bc07(0x56a))this[_0x59bc07(0x321)]();else return _0x36552f[_0x59bc07(0x3e3)]['Scene_Shop_numberWindowRect']['call'](this);}},Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x321)]=function(){const _0x58bd7a=_0x4ab1bf;this[_0x58bd7a(0x349)][_0x58bd7a(0x66a)](),this['_commandWindow'][_0x58bd7a(0x66a)]();},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x1f4)]=Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x314)],Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x314)]=function(){const _0x41bb80=_0x4ab1bf;VisuMZ['ItemsEquipsCore'][_0x41bb80(0x1f4)][_0x41bb80(0x4b8)](this),this[_0x41bb80(0x3a2)]()&&this[_0x41bb80(0x448)]();},Scene_Shop['prototype'][_0x4ab1bf(0x448)]=function(){const _0x1dc8c9=_0x4ab1bf;this[_0x1dc8c9(0x341)]['show']();},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x2fb)]=Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5dd)],Scene_Shop[_0x4ab1bf(0x4d5)]['onSellCancel']=function(){const _0x5397f8=_0x4ab1bf;VisuMZ[_0x5397f8(0x3e3)][_0x5397f8(0x2fb)][_0x5397f8(0x4b8)](this),this[_0x5397f8(0x2f5)]()&&this[_0x5397f8(0x3d9)](),this[_0x5397f8(0x3a2)]()&&this[_0x5397f8(0x58d)][_0x5397f8(0x2bd)]();},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x613)]=Scene_Shop['prototype']['sellingPrice'],Scene_Shop['prototype'][_0x4ab1bf(0x3d2)]=function(){const _0x2e833f=_0x4ab1bf;let _0x3554a4=this[_0x2e833f(0x57f)]();const _0x123881=this[_0x2e833f(0x55d)];return _0x3554a4=VisuMZ['ItemsEquipsCore'][_0x2e833f(0x368)]['ShopScene'][_0x2e833f(0x526)]['call'](this,_0x123881,_0x3554a4),_0x3554a4;},Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x57f)]=function(){const _0x7e6365=_0x4ab1bf;let _0x167103=this[_0x7e6365(0x55d)][_0x7e6365(0x620)];if(!this[_0x7e6365(0x55d)]){if(_0x7e6365(0x65a)===_0x7e6365(0x5c1))this[_0x7e6365(0x227)]();else return 0x0;}else{if(this[_0x7e6365(0x55d)]['note'][_0x7e6365(0x3ac)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x3a9d68=String(RegExp['$1']);let _0x416761=this[_0x7e6365(0x55d)],_0x3cc5e4=_0x167103*this[_0x7e6365(0x2db)]();try{eval(_0x3a9d68);}catch(_0x49db30){if('iiBTO'!==_0x7e6365(0x338)){if($gameTemp[_0x7e6365(0x286)]())console[_0x7e6365(0x266)](_0x49db30);}else this[_0x7e6365(0x668)](_0x13f456,_0x20fc15['x'],_0x396641['y'],_0x36256e);}if(isNaN(_0x3cc5e4))_0x3cc5e4=0x0;return Math[_0x7e6365(0x3c8)](_0x3cc5e4);}else{if(this[_0x7e6365(0x55d)][_0x7e6365(0x28b)][_0x7e6365(0x3ac)](/<SELL PRICE:[ ](\d+)>/i)){if(_0x7e6365(0x433)!==_0x7e6365(0x433))_0x8cbde6[_0x7e6365(0x31a)](_0x7e6365(0x49c))&&_0x2750f2[_0x7e6365(0x48e)]('shift')&&this[_0x7e6365(0x250)](),_0x334366[_0x7e6365(0x31a)](_0x7e6365(0x42b))&&_0x332262[_0x7e6365(0x48e)]('shift')&&this[_0x7e6365(0x227)]();else return parseInt(RegExp['$1']);}else return Math[_0x7e6365(0x3c8)](this['baseSellingPrice']());}}},Scene_Shop['prototype'][_0x4ab1bf(0x3c6)]=function(){const _0x21e59c=_0x4ab1bf;return this['_item'][_0x21e59c(0x620)]*this['sellPriceRate']();},Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2db)]=function(){const _0x517465=_0x4ab1bf;return VisuMZ[_0x517465(0x3e3)][_0x517465(0x368)][_0x517465(0x49a)][_0x517465(0x3db)];},Scene_Shop[_0x4ab1bf(0x4d5)]['buttonAssistItemListRequirement']=function(){const _0xf0b63d=_0x4ab1bf;if(!this[_0xf0b63d(0x3a1)]())return![];if(!this['isUseModernControls']())return![];if(!this[_0xf0b63d(0x2f7)])return![];if(!this['_sellWindow']['active'])return![];return this[_0xf0b63d(0x3a1)]()&&this['isUseModernControls']();},Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x437)]=function(){const _0x355fec=_0x4ab1bf;if(this['buttonAssistItemListRequirement']()){if(this[_0x355fec(0x2f7)]['maxCols']()===0x1)return TextManager['getInputMultiButtonStrings'](_0x355fec(0x1fe),_0x355fec(0x479));else{if(_0x355fec(0x21a)!=='jJIEV')return TextManager[_0x355fec(0x41c)](_0x355fec(0x42b),_0x355fec(0x49c));else _0x519b1b['prototype'][_0x355fec(0x296)]['call'](this);}}else{if(this[_0x355fec(0x660)]&&this[_0x355fec(0x660)]['active'])return TextManager[_0x355fec(0x41c)](_0x355fec(0x1fe),_0x355fec(0x479));}return Scene_MenuBase['prototype'][_0x355fec(0x437)][_0x355fec(0x4b8)](this);},Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4f3)]=function(){const _0x64fe9f=_0x4ab1bf;if(this[_0x64fe9f(0x660)]&&this[_0x64fe9f(0x660)][_0x64fe9f(0x316)]){if(_0x64fe9f(0x3b9)==='oiOxt'){const _0x156fa9=this[_0x64fe9f(0x476)]['y']+this[_0x64fe9f(0x476)][_0x64fe9f(0x381)],_0x16aa37=_0x386804[_0x64fe9f(0x544)]-this[_0x64fe9f(0x5e4)](),_0x59da4e=this[_0x64fe9f(0x350)]()-this[_0x64fe9f(0x476)]['height'],_0x1ae7f0=this[_0x64fe9f(0x296)]()?_0x235f9d[_0x64fe9f(0x544)]-_0x16aa37:0x0;return new _0xde81a5(_0x1ae7f0,_0x156fa9,_0x16aa37,_0x59da4e);}else return TextManager['getInputMultiButtonStrings']('up',_0x64fe9f(0x4e1));}return Scene_MenuBase[_0x64fe9f(0x4d5)][_0x64fe9f(0x4f3)][_0x64fe9f(0x4b8)](this);},Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x562)]=function(){const _0x124f72=_0x4ab1bf;if(this[_0x124f72(0x35b)]())return VisuMZ['ItemsEquipsCore']['Settings']['ItemScene']['buttonAssistCategory'];else{if(this[_0x124f72(0x660)]&&this[_0x124f72(0x660)][_0x124f72(0x316)])return VisuMZ['ItemsEquipsCore'][_0x124f72(0x368)]['ShopScene']['buttonAssistSmallIncrement'];}return Scene_MenuBase['prototype']['buttonAssistText1'][_0x124f72(0x4b8)](this);},Scene_Shop['prototype'][_0x4ab1bf(0x2f2)]=function(){const _0x3a934a=_0x4ab1bf;if(this[_0x3a934a(0x660)]&&this[_0x3a934a(0x660)][_0x3a934a(0x316)]){if(_0x3a934a(0x384)===_0x3a934a(0x5e3)){_0x4398e6['drawing']&&this[_0x3a934a(0x212)](_0xd8b93a,_0x8d0990['x'],_0x121a60['y']+0x2);_0x2fbe6a['x']+=_0x3cb8b9[_0x3a934a(0x400)](_0x17448a['iconWidth']*this[_0x3a934a(0x244)]());if(this[_0x3a934a(0x244)]()===0x1)_0x592d2f['x']+=0x4;}else return VisuMZ[_0x3a934a(0x3e3)][_0x3a934a(0x368)][_0x3a934a(0x49a)]['buttonAssistLargeIncrement'];}return Scene_MenuBase['prototype'][_0x3a934a(0x2f2)][_0x3a934a(0x4b8)](this);},Scene_Shop['prototype'][_0x4ab1bf(0x50a)]=function(){const _0x123472=_0x4ab1bf;if(!SceneManager[_0x123472(0x554)]())return;const _0x180179=VisuMZ[_0x123472(0x3e3)][_0x123472(0x368)][_0x123472(0x49a)];if(_0x180179[_0x123472(0x22f)]){if(_0x123472(0x351)===_0x123472(0x351))$gameSwitches[_0x123472(0x390)](_0x180179[_0x123472(0x22f)],![]);else{const _0x4f874c=_0x4218bd['ItemsEquipsCore']['Settings'][_0x123472(0x56d)];let _0x2479c8=_0x4f874c['BackRectColor']!==_0x4f0f64?_0x4f874c[_0x123472(0x5e0)]:0x13;return _0x38cc11['getColor'](_0x2479c8);}}if(_0x180179[_0x123472(0x5f4)]){if(_0x123472(0x496)===_0x123472(0x496))$gameSwitches[_0x123472(0x390)](_0x180179[_0x123472(0x5f4)],![]);else return this[_0x123472(0x3a1)]()[_0x123472(0x3ac)](/RIGHT/i);}},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x669)]=Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x462)],Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x462)]=function(_0x670477){const _0x113feb=_0x4ab1bf;VisuMZ[_0x113feb(0x3e3)]['Scene_Shop_doBuy'][_0x113feb(0x4b8)](this,_0x670477);if(_0x670477<=0x0)return;const _0x3a3b63=VisuMZ[_0x113feb(0x3e3)][_0x113feb(0x368)][_0x113feb(0x49a)];_0x3a3b63[_0x113feb(0x22f)]&&$gameSwitches[_0x113feb(0x390)](_0x3a3b63[_0x113feb(0x22f)],!![]);},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x635)]=Scene_Shop[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x34f)],Scene_Shop['prototype'][_0x4ab1bf(0x34f)]=function(_0x45534e){const _0x193019=_0x4ab1bf;VisuMZ[_0x193019(0x3e3)][_0x193019(0x635)][_0x193019(0x4b8)](this,_0x45534e);if(_0x45534e<=0x0)return;const _0x375185=VisuMZ[_0x193019(0x3e3)][_0x193019(0x368)][_0x193019(0x49a)];if(_0x375185[_0x193019(0x22f)]){if('ezWIR'===_0x193019(0x590))$gameSwitches['setValue'](_0x375185[_0x193019(0x5f4)],!![]);else{const _0x270dda=this['_commandNameWindow'];_0x270dda[_0x193019(0x200)][_0x193019(0x362)]();const _0x32a63e=this[_0x193019(0x627)](this[_0x193019(0x2ff)]());if(_0x32a63e===_0x193019(0x40c)){const _0x7dc9e2=this[_0x193019(0x354)](this[_0x193019(0x2ff)]());let _0x41a267=this[_0x193019(0x59c)](this[_0x193019(0x2ff)]());_0x41a267=_0x41a267[_0x193019(0x45a)](/\\I\[(\d+)\]/gi,''),_0x270dda[_0x193019(0x284)](),this[_0x193019(0x298)](_0x41a267,_0x7dc9e2),this[_0x193019(0x58c)](_0x41a267,_0x7dc9e2),this[_0x193019(0x60f)](_0x41a267,_0x7dc9e2);}}}};function Sprite_NewLabel(){const _0x43573e=_0x4ab1bf;this[_0x43573e(0x65e)](...arguments);}function _0x2405(_0x16084c,_0x1cd75b){const _0x3e4a52=_0x3e4a();return _0x2405=function(_0x240518,_0x1ad71a){_0x240518=_0x240518-0x1e4;let _0x378180=_0x3e4a52[_0x240518];return _0x378180;},_0x2405(_0x16084c,_0x1cd75b);}Sprite_NewLabel['prototype']=Object['create'](Sprite['prototype']),Sprite_NewLabel[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2c3)]=Sprite_NewLabel,Sprite_NewLabel[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x65e)]=function(){const _0x356676=_0x4ab1bf;Sprite[_0x356676(0x4d5)][_0x356676(0x65e)]['call'](this),this[_0x356676(0x4ef)]();},Sprite_NewLabel[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4ef)]=function(){const _0x1fde37=_0x4ab1bf,_0x16ef10=ImageManager[_0x1fde37(0x3f1)],_0x32f698=ImageManager['iconHeight'];this[_0x1fde37(0x619)]=new Bitmap(_0x16ef10,_0x32f698),this[_0x1fde37(0x51d)](),this[_0x1fde37(0x441)]();},Sprite_NewLabel['prototype'][_0x4ab1bf(0x51d)]=function(){const _0x2e2719=_0x4ab1bf,_0x4c071e=VisuMZ[_0x2e2719(0x3e3)][_0x2e2719(0x368)]['New'][_0x2e2719(0x2a2)];if(_0x4c071e<=0x0)return;const _0x2405a9=ImageManager[_0x2e2719(0x428)](_0x2e2719(0x2e5)),_0x13821f=ImageManager[_0x2e2719(0x3f1)],_0xdc95bf=ImageManager['iconHeight'],_0x51077d=_0x4c071e%0x10*_0x13821f,_0x5083f5=Math[_0x2e2719(0x3c8)](_0x4c071e/0x10)*_0xdc95bf;this[_0x2e2719(0x619)][_0x2e2719(0x28a)](_0x2405a9,_0x51077d,_0x5083f5,_0x13821f,_0xdc95bf,0x0,0x0);},Sprite_NewLabel['prototype'][_0x4ab1bf(0x441)]=function(){const _0x162fbd=_0x4ab1bf,_0x514dfe=VisuMZ['ItemsEquipsCore'][_0x162fbd(0x368)]['New'],_0x2e6e76=_0x514dfe[_0x162fbd(0x280)];if(_0x2e6e76==='')return;const _0x154244=ImageManager['iconWidth'],_0x50b87d=ImageManager[_0x162fbd(0x5ab)];this['bitmap'][_0x162fbd(0x409)]=_0x514dfe[_0x162fbd(0x34e)]||$gameSystem[_0x162fbd(0x2d3)](),this[_0x162fbd(0x619)]['textColor']=this[_0x162fbd(0x4be)](),this[_0x162fbd(0x619)][_0x162fbd(0x33a)]=_0x514dfe[_0x162fbd(0x394)],this[_0x162fbd(0x619)][_0x162fbd(0x541)](_0x2e6e76,0x0,_0x50b87d/0x2,_0x154244,_0x50b87d/0x2,_0x162fbd(0x5b8));},Sprite_NewLabel[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4be)]=function(){const _0x315c5f=_0x4ab1bf,_0x835a75=VisuMZ[_0x315c5f(0x3e3)][_0x315c5f(0x368)]['New'][_0x315c5f(0x40e)];return _0x835a75[_0x315c5f(0x3ac)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x315c5f(0x565)](_0x835a75);},Window_Base['prototype'][_0x4ab1bf(0x558)]=function(_0x1e9e4d,_0x1dfdc3,_0x32dcc0,_0x1c96a1){const _0x4ca0b4=_0x4ab1bf;if(_0x1e9e4d){const _0x4800e0=_0x32dcc0+(this[_0x4ca0b4(0x672)]()-ImageManager[_0x4ca0b4(0x5ab)])/0x2,_0x3fa2ef=ImageManager[_0x4ca0b4(0x3f1)]+0x4,_0x53327a=Math[_0x4ca0b4(0x506)](0x0,_0x1c96a1-_0x3fa2ef);this[_0x4ca0b4(0x320)](ColorManager[_0x4ca0b4(0x4af)](_0x1e9e4d)),this[_0x4ca0b4(0x212)](_0x1e9e4d[_0x4ca0b4(0x32f)],_0x1dfdc3,_0x4800e0),this['drawText'](_0x1e9e4d[_0x4ca0b4(0x648)],_0x1dfdc3+_0x3fa2ef,_0x32dcc0,_0x53327a),this[_0x4ca0b4(0x207)]();}},Window_Base[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5d0)]=function(_0x23ea6e,_0x53260c,_0x29d384,_0x52aebb){const _0x558da6=_0x4ab1bf;if(this[_0x558da6(0x4fc)](_0x23ea6e)){if(_0x558da6(0x440)===_0x558da6(0x440)){this[_0x558da6(0x284)]();const _0x25ef5b=VisuMZ[_0x558da6(0x3e3)]['Settings'][_0x558da6(0x608)],_0x1a4ef8=_0x25ef5b[_0x558da6(0x337)],_0x211961=_0x1a4ef8['format']($gameParty[_0x558da6(0x65c)](_0x23ea6e));this[_0x558da6(0x200)][_0x558da6(0x33a)]=_0x25ef5b[_0x558da6(0x42a)],this['drawText'](_0x211961,_0x53260c,_0x29d384,_0x52aebb,_0x558da6(0x479)),this[_0x558da6(0x284)]();}else return _0x480472[_0x558da6(0x2ef)][_0x558da6(0x3a2)]()?0x1:0x2;}},Window_Base[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4fc)]=function(_0x9cc0c1){const _0x20141c=_0x4ab1bf;if(DataManager[_0x20141c(0x46d)](_0x9cc0c1))return $dataSystem[_0x20141c(0x31d)];return!![];},Window_Base[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x33d)]=function(_0x4808f,_0x526099,_0x20b6fa,_0x2226c2,_0x306105){const _0x28f8e8=_0x4ab1bf;_0x306105=Math[_0x28f8e8(0x506)](_0x306105||0x1,0x1);while(_0x306105--){if(_0x28f8e8(0x2ba)===_0x28f8e8(0x3cc))return _0x397d05[_0x28f8e8(0x218)](_0x1df70b);else{_0x2226c2=_0x2226c2||this['lineHeight'](),this[_0x28f8e8(0x4bf)][_0x28f8e8(0x2bb)]=0xa0;const _0xdbacb5=ColorManager['gaugeBackColor']();this['contentsBack'][_0x28f8e8(0x246)](_0x4808f+0x1,_0x526099+0x1,_0x20b6fa-0x2,_0x2226c2-0x2,_0xdbacb5),this['contentsBack'][_0x28f8e8(0x2bb)]=0xff;}}},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x30f)]=Window_Selectable[_0x4ab1bf(0x4d5)]['initialize'],Window_Selectable['prototype'][_0x4ab1bf(0x65e)]=function(_0x3b6bb6){const _0xb086b6=_0x4ab1bf;this[_0xb086b6(0x1e7)](),VisuMZ['ItemsEquipsCore']['Window_Selectable_initialize']['call'](this,_0x3b6bb6);},Window_Selectable[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x1e7)]=function(){const _0x5bc5a7=_0x4ab1bf;this[_0x5bc5a7(0x4b4)]={},this[_0x5bc5a7(0x1ff)]=0xff,this[_0x5bc5a7(0x455)]=VisuMZ[_0x5bc5a7(0x3e3)]['Settings'][_0x5bc5a7(0x208)][_0x5bc5a7(0x356)],this[_0x5bc5a7(0x20b)]=VisuMZ['ItemsEquipsCore']['Settings'][_0x5bc5a7(0x208)][_0x5bc5a7(0x3f5)];},Window_Selectable[_0x4ab1bf(0x4d5)]['isShowNew']=function(){return![];},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x278)]=Window_Selectable['prototype'][_0x4ab1bf(0x61d)],Window_Selectable[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x61d)]=function(_0x17ab45){const _0x10ad72=_0x4ab1bf;VisuMZ[_0x10ad72(0x3e3)]['Window_Selectable_setHelpWindowItem']['call'](this,_0x17ab45);if(this['isShowNew']())this[_0x10ad72(0x466)](_0x17ab45);},Window_Selectable[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x466)]=function(_0x3f755a){const _0x263334=_0x4ab1bf;if(!_0x3f755a)return;$gameParty['clearNewItem'](_0x3f755a);let _0x18b5bf='';if(DataManager[_0x263334(0x43d)](_0x3f755a))_0x18b5bf=_0x263334(0x4f6)[_0x263334(0x365)](_0x3f755a['id']);else{if(DataManager[_0x263334(0x243)](_0x3f755a))_0x263334(0x203)==='mpjeD'?_0x18b5bf='weapon-%1'[_0x263334(0x365)](_0x3f755a['id']):this[_0x263334(0x2f7)][_0x263334(0x3bd)](this[_0x263334(0x33c)]);else{if(DataManager[_0x263334(0x397)](_0x3f755a))_0x18b5bf=_0x263334(0x431)['format'](_0x3f755a['id']);else{if(_0x263334(0x585)==='ynpVZ')this[_0x263334(0x4c5)](!![]);else return;}}}const _0x483916=this[_0x263334(0x4b4)][_0x18b5bf];if(_0x483916)_0x483916[_0x263334(0x2bd)]();},VisuMZ[_0x4ab1bf(0x3e3)]['Window_Selectable_refresh']=Window_Selectable['prototype'][_0x4ab1bf(0x202)],Window_Selectable[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x202)]=function(){const _0x371dd5=_0x4ab1bf;this['hideNewLabelSprites'](),VisuMZ[_0x371dd5(0x3e3)]['Window_Selectable_refresh'][_0x371dd5(0x4b8)](this);},Window_Selectable['prototype'][_0x4ab1bf(0x36d)]=function(){const _0x4852a4=_0x4ab1bf;for(const _0x48eff4 of Object[_0x4852a4(0x231)](this['_newLabelSprites'])){if(_0x4852a4(0x457)!==_0x4852a4(0x457)){this['_goodsCount']=0x0;for(const _0xa2e59b of this['_goods']){this[_0x4852a4(0x66e)](_0xa2e59b)?this[_0x4852a4(0x310)]++:_0xa2e59b[0x0]=-0x1;}}else _0x48eff4['hide']();}},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x662)]=Window_Selectable[_0x4ab1bf(0x4d5)]['update'],Window_Selectable[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2f4)]=function(){const _0x3a5eab=_0x4ab1bf;this[_0x3a5eab(0x21c)](),VisuMZ['ItemsEquipsCore'][_0x3a5eab(0x662)]['call'](this);},Window_Selectable[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x21c)]=function(){const _0x15e7e2=_0x4ab1bf;if(!this[_0x15e7e2(0x55b)]())return;const _0x490c8d=this[_0x15e7e2(0x20b)];this[_0x15e7e2(0x1ff)]+=this['_newLabelOpacityChange'];(this[_0x15e7e2(0x1ff)]>=_0x490c8d||this[_0x15e7e2(0x1ff)]<=0x0)&&(this[_0x15e7e2(0x455)]*=-0x1);this['_newLabelOpacity']=this['_newLabelOpacity'][_0x15e7e2(0x5ed)](0x0,_0x490c8d);for(const _0x2efa20 of Object[_0x15e7e2(0x231)](this[_0x15e7e2(0x4b4)])){_0x2efa20[_0x15e7e2(0x1fd)]=this[_0x15e7e2(0x1ff)];}},Window_Selectable['prototype']['createNewLabelSprite']=function(_0x19af6a){const _0x5f4055=_0x4ab1bf,_0x373455=this['_newLabelSprites'];if(_0x373455[_0x19af6a])return _0x373455[_0x19af6a];else{if(_0x5f4055(0x3bc)===_0x5f4055(0x408)){const _0x349164=this[_0x5f4055(0x610)]();return this[_0x5f4055(0x271)](_0x349164,_0x355528,_0x3c8ba8,_0xd02c1a,![],_0x5f4055(0x5b8)),this[_0x5f4055(0x33d)](_0x597fb8,_0x5d44c9,_0x65489a),this['resetFontSettings'](),!![];}else{const _0x2b7ad2=new Sprite_NewLabel();return _0x373455[_0x19af6a]=_0x2b7ad2,this['addInnerChild'](_0x2b7ad2),_0x2b7ad2;}}},Window_Selectable[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4b6)]=function(_0x1fe42b,_0x4ff285,_0x3b4feb){const _0x40f935=_0x4ab1bf;let _0x47cf5f='';if(DataManager[_0x40f935(0x43d)](_0x1fe42b))_0x47cf5f=_0x40f935(0x4f6)['format'](_0x1fe42b['id']);else{if(DataManager[_0x40f935(0x243)](_0x1fe42b))_0x47cf5f=_0x40f935(0x34a)['format'](_0x1fe42b['id']);else{if(DataManager[_0x40f935(0x397)](_0x1fe42b))_0x40f935(0x3a8)!==_0x40f935(0x46e)?_0x47cf5f='armor-%1'[_0x40f935(0x365)](_0x1fe42b['id']):(_0x490426[_0x40f935(0x3e3)]['Scene_Item_create'][_0x40f935(0x4b8)](this),this[_0x40f935(0x2f5)]()&&this[_0x40f935(0x4a1)]());else{if('RvZNW'==='BYLJm')return this[_0x40f935(0x2fa)]?this[_0x40f935(0x2fa)][_0x40f935(0x205)]:0x3;else return;}}}const _0x6886e6=this['createNewLabelSprite'](_0x47cf5f);_0x6886e6[_0x40f935(0x1e6)](_0x4ff285,_0x3b4feb),_0x6886e6[_0x40f935(0x66a)](),_0x6886e6[_0x40f935(0x1fd)]=this[_0x40f935(0x1ff)];},Window_ItemCategory['categoryList']=VisuMZ['ItemsEquipsCore'][_0x4ab1bf(0x368)][_0x4ab1bf(0x4dd)][_0x4ab1bf(0x328)],Window_ItemCategory['categoryItemTypes']=['HiddenItemA',_0x4ab1bf(0x594),_0x4ab1bf(0x3e4),_0x4ab1bf(0x39e),_0x4ab1bf(0x221),_0x4ab1bf(0x21e),'FieldUsable','NeverUsable'],VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x3d1)]=Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x65e)],Window_ItemCategory['prototype'][_0x4ab1bf(0x65e)]=function(_0x468577){const _0x590064=_0x4ab1bf;VisuMZ[_0x590064(0x3e3)][_0x590064(0x3d1)]['call'](this,_0x468577),this[_0x590064(0x277)](_0x468577);},Window_ItemCategory['prototype'][_0x4ab1bf(0x277)]=function(_0x36a015){const _0x2dd860=_0x4ab1bf,_0x19dca6=new Rectangle(0x0,0x0,_0x36a015['width'],_0x36a015[_0x2dd860(0x381)]);this[_0x2dd860(0x242)]=new Window_Base(_0x19dca6),this[_0x2dd860(0x242)][_0x2dd860(0x1fd)]=0x0,this[_0x2dd860(0x626)](this[_0x2dd860(0x242)]),this['updateCategoryNameWindow']();},Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2f5)]=function(){const _0x3778f6=_0x4ab1bf;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x3778f6(0x4d5)][_0x3778f6(0x2f5)][_0x3778f6(0x4b8)](this);},Window_ItemCategory['prototype'][_0x4ab1bf(0x245)]=function(){},Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2b9)]=function(){const _0x1e431d=_0x4ab1bf;if(!this[_0x1e431d(0x2f5)]())Window_HorzCommand['prototype'][_0x1e431d(0x2b9)][_0x1e431d(0x4b8)](this);},Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4a8)]=function(){const _0x5ea0a1=_0x4ab1bf;return this[_0x5ea0a1(0x2fa)]?this[_0x5ea0a1(0x3f7)]():0x4;},Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2f4)]=function(){const _0x58b286=_0x4ab1bf;Window_HorzCommand[_0x58b286(0x4d5)][_0x58b286(0x2f4)][_0x58b286(0x4b8)](this),this[_0x58b286(0x382)]&&this[_0x58b286(0x382)][_0x58b286(0x3d5)](this[_0x58b286(0x552)]());},Window_ItemCategory[_0x4ab1bf(0x4d5)]['processCursorMoveModernControls']=function(){const _0x32ca45=_0x4ab1bf;if(this[_0x32ca45(0x4ad)]()){if('vUHiB'===_0x32ca45(0x623)){const _0x455268=this[_0x32ca45(0x2ff)]();if(this[_0x32ca45(0x382)]&&this[_0x32ca45(0x382)][_0x32ca45(0x4a8)]()<=0x1){Input[_0x32ca45(0x488)](_0x32ca45(0x479))&&this[_0x32ca45(0x3a4)](Input[_0x32ca45(0x31a)](_0x32ca45(0x479)));if(Input[_0x32ca45(0x488)](_0x32ca45(0x1fe))){if('ARECr'===_0x32ca45(0x334))this[_0x32ca45(0x429)](Input[_0x32ca45(0x31a)](_0x32ca45(0x1fe)));else return _0x210c9c[_0x32ca45(0x36a)]&&_0x571fc0[_0x32ca45(0x36a)][_0x32ca45(0x368)][_0x32ca45(0x49f)][_0x32ca45(0x64e)]&&_0x39189b['isKeyItem'](this[_0x32ca45(0x55d)])?![]:this[_0x32ca45(0x55d)]['consumable'];}}else this[_0x32ca45(0x382)]&&this['_itemWindow'][_0x32ca45(0x4a8)]()>0x1&&(Input[_0x32ca45(0x488)](_0x32ca45(0x49c))&&!Input[_0x32ca45(0x48e)]('shift')&&this['cursorRight'](Input[_0x32ca45(0x31a)](_0x32ca45(0x49c))),Input[_0x32ca45(0x488)]('pageup')&&!Input[_0x32ca45(0x48e)](_0x32ca45(0x3d4))&&this[_0x32ca45(0x429)](Input['isTriggered'](_0x32ca45(0x42b))));this[_0x32ca45(0x2ff)]()!==_0x455268&&this[_0x32ca45(0x573)]();}else{if(this['isClearEquipOk'](_0x4458ea))this[_0x32ca45(0x656)](_0x2011e7,null);}}},Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x522)]=function(){const _0x17b41c=_0x4ab1bf;if(this[_0x17b41c(0x2f5)]())return;Window_HorzCommand['prototype'][_0x17b41c(0x522)]['call'](this);},Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3fe)]=function(){const _0xbd2a54=_0x4ab1bf;return this[_0xbd2a54(0x2f5)]()?![]:Window_HorzCommand[_0xbd2a54(0x4d5)][_0xbd2a54(0x3fe)][_0xbd2a54(0x4b8)](this);},Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x443)]=function(){const _0x48fd57=_0x4ab1bf;if(this['isOpenAndActive']()){TouchInput['isTriggered']()&&this['onTouchSelect'](!![]);if(TouchInput['isClicked']())this[_0x48fd57(0x5a7)]();else TouchInput[_0x48fd57(0x371)]()&&this[_0x48fd57(0x297)]();}},Window_ItemCategory['prototype'][_0x4ab1bf(0x2e3)]=function(_0xd71a29){const _0x3f88b4=_0x4ab1bf;this['isUseModernControls']()?this[_0x3f88b4(0x4c5)](!![]):Window_HorzCommand[_0x3f88b4(0x4d5)][_0x3f88b4(0x2e3)][_0x3f88b4(0x4b8)](this,_0xd71a29);},Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4c5)]=function(_0x49b43b){const _0x4f9441=_0x4ab1bf;this[_0x4f9441(0x502)]=![];if(this[_0x4f9441(0x4ad)]()){if(_0x4f9441(0x426)!==_0x4f9441(0x670)){const _0x5254e3=this['index'](),_0x449659=this['hitIndex']();if(_0x449659>=0x0&&_0x449659!==this[_0x4f9441(0x2ff)]()){if(_0x4f9441(0x520)===_0x4f9441(0x520))this[_0x4f9441(0x37c)](_0x449659);else{const _0x315dec=this[_0x4f9441(0x1f7)];_0x315dec['drawText'](_0x253c0f,0x0,_0x530bb9['y'],_0x315dec[_0x4f9441(0x666)],_0x4f9441(0x5b8));}}_0x49b43b&&this[_0x4f9441(0x2ff)]()!==_0x5254e3&&this[_0x4f9441(0x573)]();}else return this[_0x4f9441(0x476)]&&this['_commandWindow'][_0x4f9441(0x2f5)]();}},Window_ItemCategory[_0x4ab1bf(0x4d5)]['makeCommandList']=function(){const _0x2d7131=_0x4ab1bf;for(const _0x4367a9 of Window_ItemCategory['categoryList']){this[_0x2d7131(0x420)](_0x4367a9);}this[_0x2d7131(0x37c)](this[_0x2d7131(0x2ff)]());},Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x420)]=function(_0x7f9982){const _0x188461=_0x4ab1bf,_0x2f6b90=_0x7f9982[_0x188461(0x373)],_0x940b8d=_0x7f9982[_0x188461(0x2a2)],_0x5ebf56=_0x7f9982[_0x188461(0x4d2)]||0x0;if(_0x5ebf56>0x0&&!$gameSwitches[_0x188461(0x57e)](_0x5ebf56))return;let _0x3dda5e='',_0x306629='category',_0x4455b0=_0x2f6b90;if(_0x2f6b90['match'](/Category:(.*)/i)){if(_0x188461(0x50d)===_0x188461(0x26a))return'?????';else _0x3dda5e=String(RegExp['$1'])[_0x188461(0x63f)]();}else{if(Window_ItemCategory[_0x188461(0x399)][_0x188461(0x57d)](_0x2f6b90)){if(_0x188461(0x435)===_0x188461(0x435))_0x3dda5e=VisuMZ[_0x188461(0x3e3)][_0x188461(0x368)][_0x188461(0x4dd)][_0x2f6b90];else{this['resetFontSettings'](),this['contents'][_0x188461(0x33a)]=this[_0x188461(0x596)]();let _0x383edc=this['textWidth'](_0x5b11c5['param'](_0x416dcd))+0x4+_0x4cc654;return _0x49fbce[_0x188461(0x333)]?(this[_0x188461(0x2d7)](_0x136c78,_0x556874,_0x5bad85,_0x568fd7,!![]),_0xe936a8[_0x188461(0x36a)]['Settings']['Param']['DrawIcons']&&(_0x383edc+=_0x1013ae[_0x188461(0x3f1)]+0x4)):(this[_0x188461(0x320)](_0x40f134[_0x188461(0x3b6)]()),this[_0x188461(0x541)](_0x13122a[_0x188461(0x64f)](_0x1ef98a),_0x4a6253,_0x42683f,_0x59355f)),this[_0x188461(0x284)](),_0x383edc;}}else{if([_0x188461(0x475),_0x188461(0x3ff)][_0x188461(0x57d)](_0x2f6b90))'MGRrk'!==_0x188461(0x226)?_0x5efa3d=_0x1b8acd[_0x188461(0x329)]((this['innerWidth']-_0x4a2282)/0x2):_0x3dda5e=TextManager['item'];else{if(_0x2f6b90===_0x188461(0x4e6)){if(_0x188461(0x411)!==_0x188461(0x2a7))_0x3dda5e=TextManager[_0x188461(0x4c8)];else return _0x515efe['ItemsEquipsCore'][_0x188461(0x368)][_0x188461(0x56d)]['ElementNone'];}else{if(_0x2f6b90===_0x188461(0x4cf))_0x3dda5e=TextManager[_0x188461(0x61a)];else{if(_0x2f6b90===_0x188461(0x423))_0x3dda5e=TextManager[_0x188461(0x2a5)];else{if(_0x2f6b90[_0x188461(0x3ac)](/WTYPE:(\d+)/i))_0x3dda5e=$dataSystem[_0x188461(0x3a6)][Number(RegExp['$1'])]||'';else{if(_0x2f6b90[_0x188461(0x3ac)](/ATYPE:(\d+)/i)){if(_0x188461(0x4e5)!==_0x188461(0x4e5))return this[_0x188461(0x2fa)]?this[_0x188461(0x2fa)][_0x188461(0x205)]:0x3;else _0x3dda5e=$dataSystem[_0x188461(0x521)][Number(RegExp['$1'])]||'';}else{if(_0x2f6b90[_0x188461(0x3ac)](/ETYPE:(\d+)/i)){if(_0x188461(0x62c)!==_0x188461(0x676))_0x3dda5e=$dataSystem['equipTypes'][Number(RegExp['$1'])]||'';else{_0x12c5ee['playEquip']();const _0x52589=_0x25d371[_0x188461(0x2ef)][_0x188461(0x2e1)];_0x52589['changeEquip'](this[_0x188461(0x2ff)](),null),this[_0x188461(0x202)](),this[_0x188461(0x382)][_0x188461(0x202)](),this[_0x188461(0x287)]();const _0x4b02cf=_0x33f372['_scene'][_0x188461(0x33c)];if(_0x4b02cf)_0x4b02cf[_0x188461(0x202)]();}}}}}}}}}}if(_0x940b8d>0x0&&this['categoryStyle']()!=='text'){if(_0x188461(0x3a3)!==_0x188461(0x3a3)){const _0x1f4c05=_0x188461(0x5d2);if(this[_0x188461(0x288)][_0x1f4c05])return this[_0x188461(0x288)][_0x1f4c05];const _0x158c10=_0x428be5[_0x188461(0x3e3)][_0x188461(0x368)][_0x188461(0x56d)],_0x498923=_0x188461(0x37f)[_0x188461(0x365)](this[_0x188461(0x55d)][_0x188461(0x519)]);return _0x158c10[_0x498923];}else _0x3dda5e=_0x188461(0x49d)['format'](_0x940b8d,_0x3dda5e);}this[_0x188461(0x290)](_0x3dda5e,_0x306629,!![],_0x4455b0);},Window_ItemCategory[_0x4ab1bf(0x4d5)]['itemTextAlign']=function(){const _0x5c5eca=_0x4ab1bf;return VisuMZ[_0x5c5eca(0x3e3)][_0x5c5eca(0x368)][_0x5c5eca(0x4dd)]['TextAlign'];},Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x44c)]=function(_0x2a1c0a){const _0x23ef99=_0x4ab1bf,_0x3be398=this['categoryStyleCheck'](_0x2a1c0a);if(_0x3be398===_0x23ef99(0x567))this[_0x23ef99(0x4f9)](_0x2a1c0a);else _0x3be398===_0x23ef99(0x40c)?this[_0x23ef99(0x3ed)](_0x2a1c0a):Window_HorzCommand[_0x23ef99(0x4d5)][_0x23ef99(0x44c)][_0x23ef99(0x4b8)](this,_0x2a1c0a);},Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x34b)]=function(){const _0x43c9ec=_0x4ab1bf;return VisuMZ[_0x43c9ec(0x3e3)][_0x43c9ec(0x368)][_0x43c9ec(0x4dd)][_0x43c9ec(0x289)];},Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2c0)]=function(_0x2dfd8f){const _0x1ce07c=_0x4ab1bf;if(_0x2dfd8f<0x0)return _0x1ce07c(0x4e0);const _0x88235b=this[_0x1ce07c(0x34b)]();if(_0x88235b!==_0x1ce07c(0x579)){if(_0x1ce07c(0x4fe)!==_0x1ce07c(0x1f0))return _0x88235b;else _0x230d9f[_0x1ce07c(0x3e3)][_0x1ce07c(0x353)][_0x1ce07c(0x4b8)](this),this['refreshActorEquipSlotsIfUpdated']();}else{const _0x46260d=this[_0x1ce07c(0x59c)](_0x2dfd8f);if(_0x46260d['match'](/\\I\[(\d+)\]/i)){const _0x3ca5b9=this[_0x1ce07c(0x354)](_0x2dfd8f),_0xa2fc83=this[_0x1ce07c(0x449)](_0x46260d)[_0x1ce07c(0x621)];if(_0xa2fc83<=_0x3ca5b9[_0x1ce07c(0x621)]){if(_0x1ce07c(0x1f3)!==_0x1ce07c(0x305))return _0x1ce07c(0x567);else{if(_0x299800[_0x1ce07c(0x3ba)]&&_0x1f5cd1['uiHelpPosition']!==_0xb74354)return _0x185d28[_0x1ce07c(0x303)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x1ce07c(0x3a1)]()[_0x1ce07c(0x3ac)](/LOWER/i);else _0x672969['prototype'][_0x1ce07c(0x296)]['call'](this);}}}else{if(_0x1ce07c(0x442)!==_0x1ce07c(0x575))return _0x1ce07c(0x40c);else{const _0x1fea0a=_0x3ffc7f(_0x351bd5['$1'])||0x1;if(_0xf0e1a9>=_0x1fea0a)return!![];}}}else return _0x1ce07c(0x4e0);}},Window_ItemCategory[_0x4ab1bf(0x4d5)]['drawItemStyleIconText']=function(_0x47979c){const _0x3784cf=_0x4ab1bf,_0x5a3498=this[_0x3784cf(0x354)](_0x47979c),_0x1e211d=this['commandName'](_0x47979c),_0x3132cf=this['textSizeEx'](_0x1e211d)[_0x3784cf(0x621)];this[_0x3784cf(0x5fb)](this[_0x3784cf(0x57c)](_0x47979c));const _0x1c6f13=this['itemTextAlign']();if(_0x1c6f13===_0x3784cf(0x479))_0x3784cf(0x28c)!=='ITHGr'?this[_0x3784cf(0x668)](_0x1e211d,_0x5a3498['x']+_0x5a3498[_0x3784cf(0x621)]-_0x3132cf,_0x5a3498['y'],_0x3132cf):this['drawTextEx'](_0x2e6e4a,_0x1362ef['x'],_0x156afc['y'],_0x2bca97);else{if(_0x1c6f13===_0x3784cf(0x5b8)){if(_0x3784cf(0x26f)!==_0x3784cf(0x2d1)){const _0x41afce=_0x5a3498['x']+Math[_0x3784cf(0x3c8)]((_0x5a3498['width']-_0x3132cf)/0x2);this['drawTextEx'](_0x1e211d,_0x41afce,_0x5a3498['y'],_0x3132cf);}else{if(!_0x374346[_0x3784cf(0x554)]())return;const _0x49ff5c=_0x2cf41a['ItemsEquipsCore']['Settings'][_0x3784cf(0x49a)];_0x49ff5c[_0x3784cf(0x22f)]&&_0x1cf2ff[_0x3784cf(0x390)](_0x49ff5c[_0x3784cf(0x22f)],![]),_0x49ff5c['SwitchSell']&&_0x2a46eb[_0x3784cf(0x390)](_0x49ff5c[_0x3784cf(0x5f4)],![]);}}else{if(_0x3784cf(0x62e)===_0x3784cf(0x20a))return _0x4e05d6['ItemsEquipsCore']['Settings'][_0x3784cf(0x608)][_0x3784cf(0x66b)][_0x3784cf(0x4b8)](this);else this[_0x3784cf(0x668)](_0x1e211d,_0x5a3498['x'],_0x5a3498['y'],_0x3132cf);}}},Window_ItemCategory['prototype'][_0x4ab1bf(0x3ed)]=function(_0x3140bc){const _0x3dd6cf=_0x4ab1bf,_0x440ba3=this[_0x3dd6cf(0x59c)](_0x3140bc);if(_0x440ba3[_0x3dd6cf(0x3ac)](/\\I\[(\d+)\]/i)){const _0x44a222=Number(RegExp['$1'])||0x0,_0x1cec92=this[_0x3dd6cf(0x354)](_0x3140bc),_0xaf82a=_0x1cec92['x']+Math['floor']((_0x1cec92['width']-ImageManager['iconWidth'])/0x2),_0x7ad1c9=_0x1cec92['y']+(_0x1cec92[_0x3dd6cf(0x381)]-ImageManager[_0x3dd6cf(0x5ab)])/0x2;this[_0x3dd6cf(0x212)](_0x44a222,_0xaf82a,_0x7ad1c9);}},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x5b4)]=Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x667)],Window_ItemCategory['prototype'][_0x4ab1bf(0x667)]=function(_0x5c7535){const _0x51af6d=_0x4ab1bf;VisuMZ[_0x51af6d(0x3e3)][_0x51af6d(0x5b4)][_0x51af6d(0x4b8)](this,_0x5c7535),_0x5c7535[_0x51af6d(0x341)]=this;},Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x287)]=function(){const _0xf47ffa=_0x4ab1bf;Window_HorzCommand[_0xf47ffa(0x4d5)][_0xf47ffa(0x287)][_0xf47ffa(0x4b8)](this);if(this[_0xf47ffa(0x242)])this[_0xf47ffa(0x378)]();},Window_ItemCategory[_0x4ab1bf(0x4d5)]['updateCategoryNameWindow']=function(){const _0x37aab3=_0x4ab1bf,_0x3c8a7a=this[_0x37aab3(0x242)];_0x3c8a7a[_0x37aab3(0x200)][_0x37aab3(0x362)]();const _0xebd886=this[_0x37aab3(0x2c0)](this[_0x37aab3(0x2ff)]());if(_0xebd886==='icon'){const _0x3f0d8f=this[_0x37aab3(0x354)](this[_0x37aab3(0x2ff)]());let _0x33621f=this[_0x37aab3(0x59c)](this[_0x37aab3(0x2ff)]());_0x33621f=_0x33621f['replace'](/\\I\[(\d+)\]/gi,''),_0x3c8a7a[_0x37aab3(0x284)](),this[_0x37aab3(0x393)](_0x33621f,_0x3f0d8f),this['categoryNameWindowDrawText'](_0x33621f,_0x3f0d8f),this[_0x37aab3(0x561)](_0x33621f,_0x3f0d8f);}},Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x393)]=function(_0x41918a,_0xf1964f){},Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5f8)]=function(_0x24c3e2,_0x37d34d){const _0x3e6980=_0x4ab1bf,_0x83334a=this[_0x3e6980(0x242)];_0x83334a['drawText'](_0x24c3e2,0x0,_0x37d34d['y'],_0x83334a['innerWidth'],_0x3e6980(0x5b8));},Window_ItemCategory[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x561)]=function(_0x49fa56,_0x3a49b9){const _0x122fd6=_0x4ab1bf,_0x1cf10d=this[_0x122fd6(0x242)],_0x341d5f=$gameSystem[_0x122fd6(0x473)](),_0xc42356=_0x3a49b9['x']+Math[_0x122fd6(0x3c8)](_0x3a49b9[_0x122fd6(0x621)]/0x2)+_0x341d5f;_0x1cf10d['x']=_0x1cf10d[_0x122fd6(0x621)]/-0x2+_0xc42356,_0x1cf10d['y']=Math[_0x122fd6(0x3c8)](_0x3a49b9[_0x122fd6(0x381)]/0x2);},Window_ItemList[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x63a)]=function(){const _0x25d53e=_0x4ab1bf;if(this[_0x25d53e(0x4ad)]()){if(_0x25d53e(0x603)===_0x25d53e(0x603)){const _0x2781fa=this[_0x25d53e(0x2ff)]();if(this[_0x25d53e(0x4a8)]()<=0x1){!this[_0x25d53e(0x2c9)](_0x25d53e(0x49c))&&Input[_0x25d53e(0x31a)](_0x25d53e(0x49c))&&this['cursorPagedown']();if(!this[_0x25d53e(0x2c9)](_0x25d53e(0x42b))&&Input[_0x25d53e(0x31a)](_0x25d53e(0x42b))){if(_0x25d53e(0x216)==='WPFni'){if(!this[_0x25d53e(0x29c)]())return;const _0x3eff00=this[_0x25d53e(0x3a9)](),_0x1101d9=_0xa3ea33[_0x25d53e(0x3e3)]['Settings']['EquipScene'][_0x25d53e(0x39f)],_0x59ddfb=_0x3eff00===_0x25d53e(0x4e0)?_0x2a8157[_0x25d53e(0x2ee)]:_0x25d53e(0x49d)[_0x25d53e(0x365)](_0x1101d9,_0x302f0d['optimize']),_0x30756b=this[_0x25d53e(0x572)]();this[_0x25d53e(0x290)](_0x59ddfb,_0x25d53e(0x2ee),_0x30756b);}else this[_0x25d53e(0x227)]();}}else{if(this[_0x25d53e(0x4a8)]()>0x1){if(_0x25d53e(0x2b1)!==_0x25d53e(0x2b1))return![];else{Input[_0x25d53e(0x488)]('right')&&this[_0x25d53e(0x3a4)](Input[_0x25d53e(0x31a)]('right'));Input['isRepeated'](_0x25d53e(0x1fe))&&this[_0x25d53e(0x429)](Input[_0x25d53e(0x31a)](_0x25d53e(0x1fe)));if(this[_0x25d53e(0x563)]()){if(_0x25d53e(0x62d)!==_0x25d53e(0x39a))Input['isTriggered'](_0x25d53e(0x49c))&&Input[_0x25d53e(0x48e)]('shift')&&this[_0x25d53e(0x250)](),Input[_0x25d53e(0x31a)](_0x25d53e(0x42b))&&Input[_0x25d53e(0x48e)](_0x25d53e(0x3d4))&&(_0x25d53e(0x550)===_0x25d53e(0x550)?this['cursorPageup']():_0x331003[_0x25d53e(0x2e4)]['push'](_0x3feee4[_0x25d53e(0x63f)]()));else return _0x28fb0d[_0x25d53e(0x333)]?_0x1e1c60[_0x25d53e(0x36a)][_0x25d53e(0x368)][_0x25d53e(0x645)][_0x25d53e(0x1ec)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}else{if(_0x25d53e(0x276)!==_0x25d53e(0x276)){if(_0x34a14d!==_0x1b85e6)return;if(_0x4682b8['note'][_0x25d53e(0x3ac)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x2522bc=_0x1b30bb(_0x1a8447['$1']),_0x5145f9='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x25d53e(0x365)](_0x2522bc);_0x5303e8[_0x25d53e(0x3e3)][_0x25d53e(0x3aa)][_0x16f8d4['id']]=new _0x5432d7('item',_0x5145f9);}}else{if(Input['isTriggered']('pagedown')){if(_0x25d53e(0x577)!==_0x25d53e(0x577))return _0x5c8f1c['uiHelpPosition'];else this[_0x25d53e(0x250)]();}Input[_0x25d53e(0x31a)](_0x25d53e(0x42b))&&this[_0x25d53e(0x227)]();}}}}}Input['isRepeated'](_0x25d53e(0x4e1))&&(Input['isPressed'](_0x25d53e(0x3d4))&&this[_0x25d53e(0x5c5)]()?this['cursorPagedown']():this[_0x25d53e(0x5d7)](Input[_0x25d53e(0x31a)](_0x25d53e(0x4e1))));if(Input[_0x25d53e(0x488)]('up')){if(_0x25d53e(0x492)===_0x25d53e(0x492))Input['isPressed'](_0x25d53e(0x3d4))&&this[_0x25d53e(0x5c5)]()?this[_0x25d53e(0x227)]():this['cursorUp'](Input[_0x25d53e(0x31a)]('up'));else return this[_0x25d53e(0x418)]();}Imported[_0x25d53e(0x333)]&&this['processCursorHomeEndTrigger'](),this['index']()!==_0x2781fa&&this[_0x25d53e(0x573)]();}else this[_0x25d53e(0x5d7)](_0x2dd4d0[_0x25d53e(0x31a)](_0x25d53e(0x4e1)));}},Window_ItemList[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x563)]=function(){const _0x1b76b7=_0x4ab1bf,_0x52bee6=SceneManager[_0x1b76b7(0x2ef)],_0x18eb79=[Scene_Item,Scene_Shop];return _0x18eb79[_0x1b76b7(0x57d)](_0x52bee6['constructor']);},Window_ItemList[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3e0)]=function(){const _0x2754e4=_0x4ab1bf;Window_Selectable['prototype'][_0x2754e4(0x3e0)][_0x2754e4(0x4b8)](this);if(this['_categoryWindow']&&this['_categoryWindow'][_0x2754e4(0x2f5)]()){if(_0x2754e4(0x4e4)!=='WWvRU')return _0x4e973f[_0x2754e4(0x333)]&&_0x53f45b[_0x2754e4(0x4d5)]['isUseModernControls'][_0x2754e4(0x4b8)](this);else this['_categoryWindow'][_0x2754e4(0x3e0)]();}},Window_ItemList[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x578)]=function(){const _0x3c2f18=_0x4ab1bf;Window_Selectable[_0x3c2f18(0x4d5)][_0x3c2f18(0x578)][_0x3c2f18(0x4b8)](this),this[_0x3c2f18(0x341)]&&this[_0x3c2f18(0x341)][_0x3c2f18(0x2f5)]()&&this[_0x3c2f18(0x341)][_0x3c2f18(0x578)]();},Window_ItemList[_0x4ab1bf(0x4d5)]['setCategory']=function(_0x2e1032){const _0x36b0dd=_0x4ab1bf;if(this[_0x36b0dd(0x604)]!==_0x2e1032){if(_0x36b0dd(0x2e2)===_0x36b0dd(0x2e2)){this[_0x36b0dd(0x604)]=_0x2e1032,this[_0x36b0dd(0x202)]();if(this[_0x36b0dd(0x341)]&&this[_0x36b0dd(0x341)][_0x36b0dd(0x2f5)]())'hmOqf'!==_0x36b0dd(0x605)?this['smoothSelect'](0x0):this[_0x36b0dd(0x250)]();else{if('TpTEe'!==_0x36b0dd(0x50b)){const _0x1b6576=new _0x27dde1(0x0,0x0,_0x219994[_0x36b0dd(0x621)],_0x2c9dc9[_0x36b0dd(0x381)]);this[_0x36b0dd(0x1f7)]=new _0x428772(_0x1b6576),this[_0x36b0dd(0x1f7)][_0x36b0dd(0x1fd)]=0x0,this[_0x36b0dd(0x626)](this[_0x36b0dd(0x1f7)]),this['updateCommandNameWindow']();}else this[_0x36b0dd(0x251)](0x0,0x0);}}else return'icon';}},VisuMZ['ItemsEquipsCore'][_0x4ab1bf(0x5db)]=Window_ItemList['prototype'][_0x4ab1bf(0x4a8)],Window_ItemList[_0x4ab1bf(0x4d5)]['maxCols']=function(){const _0x17cf71=_0x4ab1bf;if(SceneManager[_0x17cf71(0x2ef)][_0x17cf71(0x2c3)]===Scene_Battle){if(_0x17cf71(0x36f)===_0x17cf71(0x2cc)){if(this[_0x17cf71(0x361)]())return this[_0x17cf71(0x403)]['width']/0x5/-0x3;return _0x410c57[_0x17cf71(0x4d5)][_0x17cf71(0x50c)][_0x17cf71(0x4b8)](this);}else return VisuMZ[_0x17cf71(0x3e3)]['Window_ItemList_maxCols'][_0x17cf71(0x4b8)](this);}else return SceneManager[_0x17cf71(0x2ef)][_0x17cf71(0x2c3)]===Scene_Map?VisuMZ[_0x17cf71(0x3e3)][_0x17cf71(0x5db)][_0x17cf71(0x4b8)](this):VisuMZ[_0x17cf71(0x3e3)]['Settings'][_0x17cf71(0x608)][_0x17cf71(0x52e)];},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x35d)]=Window_ItemList[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x460)],Window_ItemList[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x460)]=function(){const _0x4110af=_0x4ab1bf;return this['maxCols']()<=0x1?Window_Selectable[_0x4110af(0x4d5)][_0x4110af(0x460)][_0x4110af(0x4b8)](this):_0x4110af(0x66f)===_0x4110af(0x66f)?VisuMZ[_0x4110af(0x3e3)]['Window_ItemList_colSpacing'][_0x4110af(0x4b8)](this):_0x2a05ef[_0x4110af(0x36a)][_0x4110af(0x368)][_0x4110af(0x645)]['ExtDisplayedParams'];},Window_ItemList['prototype']['includes']=function(_0x46a80c){const _0x2ff1dd=_0x4ab1bf;switch(this[_0x2ff1dd(0x604)]){case _0x2ff1dd(0x475):return DataManager[_0x2ff1dd(0x43d)](_0x46a80c);case'RegularItems':return DataManager[_0x2ff1dd(0x43d)](_0x46a80c)&&_0x46a80c[_0x2ff1dd(0x2fc)]===0x1;case'KeyItems':return DataManager[_0x2ff1dd(0x43d)](_0x46a80c)&&_0x46a80c[_0x2ff1dd(0x2fc)]===0x2;case _0x2ff1dd(0x2b6):return DataManager[_0x2ff1dd(0x43d)](_0x46a80c)&&_0x46a80c[_0x2ff1dd(0x2fc)]===0x3;case'HiddenItemB':return DataManager[_0x2ff1dd(0x43d)](_0x46a80c)&&_0x46a80c[_0x2ff1dd(0x2fc)]===0x4;case _0x2ff1dd(0x39e):return DataManager[_0x2ff1dd(0x43d)](_0x46a80c)&&_0x46a80c[_0x2ff1dd(0x3ec)];case'Nonconsumable':return DataManager[_0x2ff1dd(0x43d)](_0x46a80c)&&!_0x46a80c['consumable'];case _0x2ff1dd(0x221):return DataManager[_0x2ff1dd(0x43d)](_0x46a80c)&&[0x0][_0x2ff1dd(0x57d)](_0x46a80c['occasion']);case _0x2ff1dd(0x21e):return DataManager[_0x2ff1dd(0x43d)](_0x46a80c)&&[0x0,0x1][_0x2ff1dd(0x57d)](_0x46a80c['occasion']);case _0x2ff1dd(0x407):return DataManager[_0x2ff1dd(0x43d)](_0x46a80c)&&[0x0,0x2]['includes'](_0x46a80c[_0x2ff1dd(0x519)]);case _0x2ff1dd(0x41e):return DataManager[_0x2ff1dd(0x43d)](_0x46a80c)&&[0x3]['includes'](_0x46a80c[_0x2ff1dd(0x519)]);case'AllWeapons':return DataManager[_0x2ff1dd(0x243)](_0x46a80c);case _0x2ff1dd(0x423):return DataManager[_0x2ff1dd(0x397)](_0x46a80c);default:if(this[_0x2ff1dd(0x604)]['match'](/WTYPE:(\d+)/i))return DataManager[_0x2ff1dd(0x243)](_0x46a80c)&&_0x46a80c[_0x2ff1dd(0x52f)]===Number(RegExp['$1']);else{if(this[_0x2ff1dd(0x604)][_0x2ff1dd(0x3ac)](/WTYPE:(.*)/i)){const _0x1c8c9c=$dataSystem[_0x2ff1dd(0x3a6)]['indexOf'](String(RegExp['$1'])[_0x2ff1dd(0x63f)]());return DataManager['isWeapon'](_0x46a80c)&&_0x46a80c[_0x2ff1dd(0x52f)]===_0x1c8c9c;}else{if(this['_category'][_0x2ff1dd(0x3ac)](/ATYPE:(\d+)/i))return DataManager[_0x2ff1dd(0x397)](_0x46a80c)&&_0x46a80c[_0x2ff1dd(0x5cf)]===Number(RegExp['$1']);else{if(this[_0x2ff1dd(0x604)]['match'](/ATYPE:(.*)/i)){if('IAeIV'===_0x2ff1dd(0x5bc))return _0x5bd1ad['ItemsEquipsCore'][_0x2ff1dd(0x368)][_0x2ff1dd(0x4dd)][_0x2ff1dd(0x450)];else{const _0x4cc803=$dataSystem[_0x2ff1dd(0x521)][_0x2ff1dd(0x5c2)](String(RegExp['$1'])['trim']());return DataManager['isArmor'](_0x46a80c)&&_0x46a80c[_0x2ff1dd(0x5cf)]===_0x4cc803;}}else{if(this[_0x2ff1dd(0x604)]['match'](/ETYPE:(\d+)/i))return!!_0x46a80c&&_0x46a80c['etypeId']===Number(RegExp['$1']);else{if(this[_0x2ff1dd(0x604)][_0x2ff1dd(0x3ac)](/ETYPE:(.*)/i)){const _0x55225b=$dataSystem[_0x2ff1dd(0x5e5)][_0x2ff1dd(0x5c2)](String(RegExp['$1'])['trim']());return DataManager[_0x2ff1dd(0x397)](_0x46a80c)&&_0x46a80c['etypeId']===_0x55225b;}else{if(this[_0x2ff1dd(0x604)][_0x2ff1dd(0x3ac)](/Category:(.*)/i)){if(_0x2ff1dd(0x3cb)!=='TiiFV')return!!_0x46a80c&&_0x46a80c[_0x2ff1dd(0x2e4)][_0x2ff1dd(0x57d)](String(RegExp['$1'])['toUpperCase']()[_0x2ff1dd(0x63f)]());else{const _0x1303fc=_0x452afd+(this[_0x2ff1dd(0x672)]()-_0x1d70c4['iconHeight'])/0x2,_0x49c16a=_0x23219f['iconWidth']+0x4,_0x20dbe7=_0x4ff495[_0x2ff1dd(0x506)](0x0,_0x464473-_0x49c16a);this['changeTextColor'](_0x3eafff['getItemColor'](_0x4b4bfe)),this[_0x2ff1dd(0x212)](_0x22b23c[_0x2ff1dd(0x32f)],_0x7f2ea2,_0x1303fc),this['drawText'](_0x43d6ce[_0x2ff1dd(0x648)],_0x3f3e54+_0x49c16a,_0x22b9f9,_0x20dbe7),this[_0x2ff1dd(0x207)]();}}}}}}}}}return![];},Window_ItemList[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x55b)]=function(){return!![];},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x3fc)]=Window_ItemList[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x44c)],Window_ItemList['prototype'][_0x4ab1bf(0x44c)]=function(_0x7dac08){const _0x16014c=_0x4ab1bf;VisuMZ[_0x16014c(0x3e3)]['Window_ItemList_drawItem'][_0x16014c(0x4b8)](this,_0x7dac08),this[_0x16014c(0x63c)](_0x7dac08);},Window_ItemList['prototype']['drawItemNumber']=function(_0x514070,_0x45226f,_0x4de4ff,_0x46551e){const _0x252356=_0x4ab1bf;Window_Selectable[_0x252356(0x4d5)][_0x252356(0x5d0)][_0x252356(0x4b8)](this,_0x514070,_0x45226f,_0x4de4ff,_0x46551e);},Window_ItemList['prototype'][_0x4ab1bf(0x63c)]=function(_0x27d1e3){const _0xd995b5=_0x4ab1bf,_0x42bf76=this['itemAt'](_0x27d1e3);if(!_0x42bf76||!this[_0xd995b5(0x55b)]())return;if(!$gameParty[_0xd995b5(0x459)](_0x42bf76))return;const _0x5ad966=this[_0xd995b5(0x354)](_0x27d1e3),_0x235ca3=_0x5ad966['x'],_0x1c0455=_0x5ad966['y']+(this[_0xd995b5(0x672)]()-ImageManager[_0xd995b5(0x5ab)])/0x2,_0x47e5a1=VisuMZ[_0xd995b5(0x3e3)][_0xd995b5(0x368)]['New']['OffsetX'],_0x15d94e=VisuMZ[_0xd995b5(0x3e3)]['Settings'][_0xd995b5(0x208)][_0xd995b5(0x529)];this['placeNewLabel'](_0x42bf76,_0x235ca3+_0x47e5a1,_0x1c0455+_0x15d94e);},Window_ItemList[_0x4ab1bf(0x4d5)]['setStatusWindow']=function(_0x409c4a){const _0x32bd0e=_0x4ab1bf;this[_0x32bd0e(0x33c)]=_0x409c4a,this[_0x32bd0e(0x287)]();},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x44e)]=Window_ItemList[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x54a)],Window_ItemList['prototype'][_0x4ab1bf(0x54a)]=function(){const _0x357892=_0x4ab1bf;VisuMZ[_0x357892(0x3e3)]['Window_ItemList_updateHelp'][_0x357892(0x4b8)](this),this[_0x357892(0x33c)]&&this[_0x357892(0x33c)][_0x357892(0x2c3)]===Window_ShopStatus&&this[_0x357892(0x33c)][_0x357892(0x307)](this[_0x357892(0x5d4)]());},Window_BattleItem[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5e1)]=function(_0x3ab3d6){const _0x5dd198=_0x4ab1bf;return BattleManager['actor']()?BattleManager[_0x5dd198(0x511)]()[_0x5dd198(0x422)](_0x3ab3d6):Window_ItemList[_0x5dd198(0x4d5)]['isEnabled'][_0x5dd198(0x4b8)](this,_0x3ab3d6);},Window_EventItem['prototype'][_0x4ab1bf(0x55b)]=function(){return![];},Window_EquipStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3a2)]=function(){const _0x3aec0b=_0x4ab1bf;return VisuMZ[_0x3aec0b(0x3e3)][_0x3aec0b(0x368)][_0x3aec0b(0x3ae)][_0x3aec0b(0x389)];},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x5fc)]=Window_EquipStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x202)],Window_EquipStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x202)]=function(){const _0xb0850a=_0x4ab1bf;this[_0xb0850a(0x311)](),this[_0xb0850a(0x284)]();if(this[_0xb0850a(0x2e1)])this[_0xb0850a(0x2e1)][_0xb0850a(0x202)]();this[_0xb0850a(0x3a2)]()?_0xb0850a(0x317)==='echFY'?this[_0xb0850a(0x65e)](...arguments):this[_0xb0850a(0x3bf)]():VisuMZ[_0xb0850a(0x3e3)][_0xb0850a(0x5fc)][_0xb0850a(0x4b8)](this);},Window_EquipStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3bf)]=function(){const _0x1b51bb=_0x4ab1bf;this['contents'][_0x1b51bb(0x362)]();if(!this['_actor'])return;if(this[_0x1b51bb(0x4db)]()){const _0x49bf77=ImageManager[_0x1b51bb(0x3b7)](this[_0x1b51bb(0x2e1)]['getMenuImage']());_0x49bf77[_0x1b51bb(0x628)](this[_0x1b51bb(0x642)][_0x1b51bb(0x664)](this));}else{if(_0x1b51bb(0x531)===_0x1b51bb(0x2a9)){if(_0x55bf4e['value'](_0x2f3d52))return!![];}else this['refreshItemsEquipsCoreNoMenuImage']();}},Window_EquipStatus['prototype'][_0x4ab1bf(0x4db)]=function(){const _0xdf835f=_0x4ab1bf;return Imported[_0xdf835f(0x35e)]&&this[_0xdf835f(0x2e1)][_0xdf835f(0x21b)]()!==''&&VisuMZ[_0xdf835f(0x3e3)][_0xdf835f(0x368)][_0xdf835f(0x3ae)][_0xdf835f(0x2f8)];},Window_EquipStatus[_0x4ab1bf(0x4d5)]['onMenuImageLoad']=function(){const _0x460896=_0x4ab1bf;VisuMZ[_0x460896(0x3e3)][_0x460896(0x368)][_0x460896(0x3ae)][_0x460896(0x4bc)][_0x460896(0x4b8)](this),this['drawParamsItemsEquipsCore']();},Window_EquipStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x262)]=function(){const _0x5a2905=_0x4ab1bf;VisuMZ[_0x5a2905(0x3e3)][_0x5a2905(0x368)]['EquipScene']['DrawFaceJS'][_0x5a2905(0x4b8)](this),this[_0x5a2905(0x3bb)]();},Window_EquipStatus['prototype'][_0x4ab1bf(0x3bb)]=function(){const _0x37a800=_0x4ab1bf;this[_0x37a800(0x284)](),VisuMZ[_0x37a800(0x3e3)][_0x37a800(0x368)][_0x37a800(0x3ae)][_0x37a800(0x253)][_0x37a800(0x4b8)](this);},Window_EquipStatus[_0x4ab1bf(0x4d5)]['drawItemActorMenuImage']=function(_0x5d3e30,_0x3e2db2,_0x6e91e,_0x1ffb9b,_0x5eb2dc){const _0x1cbfa3=_0x4ab1bf,_0x36b204=ImageManager['loadPicture'](_0x5d3e30[_0x1cbfa3(0x21b)]()),_0x589c93=this[_0x1cbfa3(0x666)]-_0x36b204[_0x1cbfa3(0x621)];_0x3e2db2+=_0x589c93/0x2;if(_0x589c93<0x0)_0x1ffb9b-=_0x589c93;Window_StatusBase[_0x1cbfa3(0x4d5)][_0x1cbfa3(0x534)]['call'](this,_0x5d3e30,_0x3e2db2,_0x6e91e,_0x1ffb9b,_0x5eb2dc);},Window_EquipStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x285)]=function(){const _0x56df0e=_0x4ab1bf;return Imported['VisuMZ_0_CoreEngine']?VisuMZ[_0x56df0e(0x36a)][_0x56df0e(0x368)]['Param'][_0x56df0e(0x1ec)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x1e9)]=function(){const _0x5c9397=_0x4ab1bf;return VisuMZ[_0x5c9397(0x3e3)][_0x5c9397(0x368)][_0x5c9397(0x3ae)][_0x5c9397(0x25e)];},Window_EquipStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x52c)]=function(){const _0x332479=_0x4ab1bf;return Imported['VisuMZ_0_CoreEngine']&&VisuMZ[_0x332479(0x36a)][_0x332479(0x368)][_0x332479(0x645)][_0x332479(0x32e)];},Window_EquipStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x54d)]=function(_0x40acec,_0x107b52,_0x2479cb,_0x40d223){const _0x4c6fdc=_0x4ab1bf,_0x2e747d=this[_0x4c6fdc(0x504)]();Imported[_0x4c6fdc(0x333)]?this[_0x4c6fdc(0x2d7)](_0x107b52+_0x2e747d,_0x2479cb,_0x40d223,_0x40acec,![]):this[_0x4c6fdc(0x541)](TextManager[_0x4c6fdc(0x64f)](_0x40acec),_0x107b52+_0x2e747d,_0x2479cb,_0x40d223);},Window_EquipStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2f9)]=function(_0x487d8e,_0x3decc3,_0x15a8af,_0x326e2c){const _0x50ec25=_0x4ab1bf,_0x434eff=this[_0x50ec25(0x504)]();let _0x36738c=0x0;Imported[_0x50ec25(0x333)]?_0x36738c=this[_0x50ec25(0x2e1)][_0x50ec25(0x51b)](_0x487d8e,!![]):_0x36738c=this['_actor']['param'](_0x487d8e);const _0x4359be=_0x36738c;this['drawText'](_0x36738c,_0x3decc3,_0x15a8af,_0x326e2c-_0x434eff,_0x50ec25(0x479));},Window_EquipStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x513)]=function(_0x1d0323,_0x510829,_0x229c00,_0x415dc8){const _0x7d6165=_0x4ab1bf,_0x1ce12a=this[_0x7d6165(0x504)]();let _0xe5cc55=0x0,_0x96d6be=0x0,_0x495fbb='';if(this['_tempActor']){Imported[_0x7d6165(0x333)]?(_0xe5cc55=this['_actor'][_0x7d6165(0x51b)](_0x1d0323,![]),_0x96d6be=this['_tempActor']['paramValueByName'](_0x1d0323,![]),_0x495fbb=this[_0x7d6165(0x4ce)]['paramValueByName'](_0x1d0323,!![])):(_0xe5cc55=this[_0x7d6165(0x2e1)][_0x7d6165(0x64f)](_0x1d0323),_0x96d6be=this['_tempActor'][_0x7d6165(0x64f)](_0x1d0323),_0x495fbb=this[_0x7d6165(0x4ce)][_0x7d6165(0x64f)](_0x1d0323));const _0x24da63=_0xe5cc55,_0x516637=_0x96d6be;diffValue=_0x516637-_0x24da63,this[_0x7d6165(0x320)](ColorManager[_0x7d6165(0x2af)](diffValue)),this[_0x7d6165(0x541)](_0x495fbb,_0x510829,_0x229c00,_0x415dc8-_0x1ce12a,_0x7d6165(0x479));}},Window_EquipStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x23d)]=function(_0x5e0577,_0x2928f1,_0x4a42bc,_0x5472f6){const _0x3f1a53=_0x4ab1bf,_0x22f335=this['itemPadding']();let _0x441b90=0x0,_0x43a7d7=0x0,_0x4a722d=![];if(this[_0x3f1a53(0x4ce)]){if(_0x3f1a53(0x5e8)===_0x3f1a53(0x4a5)){this[_0x3f1a53(0x5fb)](this[_0x3f1a53(0x5e1)](null));const _0x5c855a=_0x14b3a4['ItemsEquipsCore'][_0x3f1a53(0x368)][_0x3f1a53(0x3ae)],_0x221651=this['itemLineRect'](_0x8250fc),_0x4169e0=_0x221651['y']+(this[_0x3f1a53(0x672)]()-_0x5a120b[_0x3f1a53(0x5ab)])/0x2,_0x24bb08=_0x3b28a1['iconWidth']+0x4,_0x51fe55=_0x346396[_0x3f1a53(0x506)](0x0,_0x221651[_0x3f1a53(0x621)]-_0x24bb08);this[_0x3f1a53(0x207)](),this[_0x3f1a53(0x212)](_0x5c855a[_0x3f1a53(0x592)],_0x221651['x'],_0x4169e0),this['drawText'](_0x5c855a[_0x3f1a53(0x4ab)],_0x221651['x']+_0x24bb08,_0x221651['y'],_0x51fe55),this[_0x3f1a53(0x5fb)](!![]);}else{if(Imported[_0x3f1a53(0x333)]){if(_0x3f1a53(0x59d)!=='Nbjaq'){const _0x5e3499=this[_0x3f1a53(0x5e4)](),_0x39a1d3=this[_0x3f1a53(0x382)][_0x3f1a53(0x381)],_0x3e8bbc=this['isRightInputMode']()?0x0:_0x340a69[_0x3f1a53(0x544)]-this[_0x3f1a53(0x5e4)](),_0x237ed7=this[_0x3f1a53(0x382)]['y'];return new _0x57de59(_0x3e8bbc,_0x237ed7,_0x5e3499,_0x39a1d3);}else _0x441b90=this[_0x3f1a53(0x2e1)]['paramValueByName'](_0x5e0577,![]),_0x43a7d7=this[_0x3f1a53(0x4ce)][_0x3f1a53(0x51b)](_0x5e0577,![]),_0x4a722d=String(this['_actor'][_0x3f1a53(0x51b)](_0x5e0577,!![]))['match'](/([%％])/i);}else{if(_0x3f1a53(0x557)===_0x3f1a53(0x557))_0x441b90=this[_0x3f1a53(0x2e1)][_0x3f1a53(0x64f)](_0x5e0577),_0x43a7d7=this['_tempActor'][_0x3f1a53(0x64f)](_0x5e0577),_0x4a722d=_0x441b90%0x1!==0x0||_0x43a7d7%0x1!==0x0;else return this[_0x3f1a53(0x4ff)]();}const _0x26891b=_0x441b90,_0x12eb39=_0x43a7d7,_0x46e796=_0x12eb39-_0x26891b;let _0x3bdb43=_0x46e796;if(_0x4a722d)_0x3bdb43=Math[_0x3f1a53(0x329)](_0x46e796*0x64)+'%';_0x46e796!==0x0&&(this['changeTextColor'](ColorManager[_0x3f1a53(0x2af)](_0x46e796)),_0x3bdb43=(_0x46e796>0x0?_0x3f1a53(0x46b):_0x3f1a53(0x36c))[_0x3f1a53(0x365)](_0x3bdb43),this[_0x3f1a53(0x541)](_0x3bdb43,_0x2928f1+_0x22f335,_0x4a42bc,_0x5472f6,'left'));}}},Window_EquipStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x33d)]=function(_0xc92c5a,_0x1a2fc8,_0x477885,_0x19d265,_0x5280df){const _0xf26d7f=_0x4ab1bf;if(VisuMZ[_0xf26d7f(0x3e3)][_0xf26d7f(0x368)][_0xf26d7f(0x3ae)][_0xf26d7f(0x2cb)]===![])return;_0x5280df=Math[_0xf26d7f(0x506)](_0x5280df||0x1,0x1);while(_0x5280df--){_0x19d265=_0x19d265||this[_0xf26d7f(0x672)](),this[_0xf26d7f(0x200)][_0xf26d7f(0x2bb)]=0xa0;const _0x10ecb6=ColorManager[_0xf26d7f(0x22e)]();this[_0xf26d7f(0x200)][_0xf26d7f(0x246)](_0xc92c5a+0x1,_0x1a2fc8+0x1,_0x477885-0x2,_0x19d265-0x2,_0x10ecb6),this[_0xf26d7f(0x200)][_0xf26d7f(0x2bb)]=0xff;}},ColorManager[_0x4ab1bf(0x22e)]=function(){const _0x3c0306=_0x4ab1bf,_0x14abf8=VisuMZ[_0x3c0306(0x3e3)][_0x3c0306(0x368)][_0x3c0306(0x3ae)];let _0x455824=_0x14abf8['BackRectColor']!==undefined?_0x14abf8[_0x3c0306(0x5e0)]:0x13;return ColorManager[_0x3c0306(0x22b)](_0x455824);},VisuMZ['ItemsEquipsCore'][_0x4ab1bf(0x392)]=Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x65e)],Window_EquipCommand['prototype'][_0x4ab1bf(0x65e)]=function(_0x1efe5e){const _0x4ec58f=_0x4ab1bf;VisuMZ[_0x4ec58f(0x3e3)][_0x4ec58f(0x392)][_0x4ec58f(0x4b8)](this,_0x1efe5e),this[_0x4ec58f(0x54b)](_0x1efe5e);},Window_EquipCommand[_0x4ab1bf(0x4d5)]['createCommandNameWindow']=function(_0x44f119){const _0x4dbda9=_0x4ab1bf,_0xe95d12=new Rectangle(0x0,0x0,_0x44f119['width'],_0x44f119[_0x4dbda9(0x381)]);this[_0x4dbda9(0x1f7)]=new Window_Base(_0xe95d12),this['_commandNameWindow'][_0x4dbda9(0x1fd)]=0x0,this[_0x4dbda9(0x626)](this['_commandNameWindow']),this[_0x4dbda9(0x32d)]();},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x287)]=function(){const _0x17cf69=_0x4ab1bf;Window_HorzCommand[_0x17cf69(0x4d5)][_0x17cf69(0x287)][_0x17cf69(0x4b8)](this);if(this['_commandNameWindow'])this[_0x17cf69(0x32d)]();},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x32d)]=function(){const _0x21550a=_0x4ab1bf,_0x156871=this[_0x21550a(0x1f7)];_0x156871[_0x21550a(0x200)]['clear']();const _0x52afd5=this[_0x21550a(0x627)](this[_0x21550a(0x2ff)]());if(_0x52afd5===_0x21550a(0x40c)){const _0x593d1b=this[_0x21550a(0x354)](this[_0x21550a(0x2ff)]());let _0x1c3fd3=this['commandName'](this[_0x21550a(0x2ff)]());_0x1c3fd3=_0x1c3fd3[_0x21550a(0x45a)](/\\I\[(\d+)\]/gi,''),_0x156871[_0x21550a(0x284)](),this['commandNameWindowDrawBackground'](_0x1c3fd3,_0x593d1b),this[_0x21550a(0x58c)](_0x1c3fd3,_0x593d1b),this[_0x21550a(0x60f)](_0x1c3fd3,_0x593d1b);}},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x298)]=function(_0x270c7a,_0x122d15){},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x58c)]=function(_0x3b62c1,_0x22ddb3){const _0x138f7d=_0x4ab1bf,_0x2e70be=this['_commandNameWindow'];_0x2e70be[_0x138f7d(0x541)](_0x3b62c1,0x0,_0x22ddb3['y'],_0x2e70be[_0x138f7d(0x666)],_0x138f7d(0x5b8));},Window_EquipCommand['prototype'][_0x4ab1bf(0x60f)]=function(_0x24ad67,_0x8115b8){const _0x277e69=_0x4ab1bf,_0x57115c=this[_0x277e69(0x1f7)],_0x27f575=$gameSystem[_0x277e69(0x473)](),_0x34cc96=_0x8115b8['x']+Math['floor'](_0x8115b8[_0x277e69(0x621)]/0x2)+_0x27f575;_0x57115c['x']=_0x57115c[_0x277e69(0x621)]/-0x2+_0x34cc96,_0x57115c['y']=Math[_0x277e69(0x3c8)](_0x8115b8['height']/0x2);},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2f5)]=function(){const _0x4fa90e=_0x4ab1bf;return Imported[_0x4fa90e(0x333)]&&Window_HorzCommand['prototype'][_0x4fa90e(0x2f5)]['call'](this);},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2b9)]=function(){const _0xc4a267=_0x4ab1bf;if(this[_0xc4a267(0x537)]()===_0xc4a267(0x571))Window_HorzCommand['prototype'][_0xc4a267(0x2b9)][_0xc4a267(0x4b8)](this);},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x63a)]=function(){const _0x2c2159=_0x4ab1bf;!this[_0x2c2159(0x4d1)]()&&Window_HorzCommand[_0x2c2159(0x4d5)][_0x2c2159(0x63a)][_0x2c2159(0x4b8)](this);},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4d1)]=function(){const _0x16426a=_0x4ab1bf;if(!this[_0x16426a(0x4ad)]())return![];if(SceneManager[_0x16426a(0x2ef)]['constructor']!==Scene_Equip)return![];return Input['isTriggered'](_0x16426a(0x4e1))&&(this['playCursorSound'](),SceneManager[_0x16426a(0x2ef)][_0x16426a(0x5c7)](),SceneManager[_0x16426a(0x2ef)][_0x16426a(0x40b)][_0x16426a(0x414)](-0x1)),![];},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4a8)]=function(){const _0x53634f=_0x4ab1bf;return this['_list']?this[_0x53634f(0x2fa)]['length']:0x3;},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x443)]=function(){const _0x954a75=_0x4ab1bf;if(this[_0x954a75(0x2a6)]()&&this[_0x954a75(0x424)]&&SceneManager[_0x954a75(0x2ef)]['constructor']===Scene_Equip){if(this[_0x954a75(0x3fe)]()&&TouchInput[_0x954a75(0x42e)]()){if(_0x954a75(0x20d)===_0x954a75(0x20d))this[_0x954a75(0x2b3)](![]);else return![];}else TouchInput[_0x954a75(0x31a)]()&&this[_0x954a75(0x2b3)](!![]);TouchInput[_0x954a75(0x345)]()&&(_0x954a75(0x2a4)==='ZzpTT'?(_0x21755b[_0x954a75(0x4d5)]['processCursorMove']['call'](this),this[_0x954a75(0x641)]()):this[_0x954a75(0x5a7)]());}},Window_EquipCommand['prototype'][_0x4ab1bf(0x2b3)]=function(_0x5ec3b2){const _0x193473=_0x4ab1bf;this[_0x193473(0x502)]=![];const _0x1f44f7=this[_0x193473(0x2ff)](),_0x5ea273=this['hitIndex'](),_0x377d05=SceneManager[_0x193473(0x2ef)]['_slotWindow'];if(_0x377d05[_0x193473(0x2a6)]()&&_0x377d05[_0x193473(0x424)]){if(_0x5ea273>=0x0){if(_0x193473(0x2eb)!=='EIMqf')_0x421b02=_0x193473(0x34a)['format'](_0x5ec30c['id']);else{if(_0x5ea273===this[_0x193473(0x2ff)]()){if('WQNxu'!==_0x193473(0x1f2))return!this[_0x193473(0x2f5)]();else this[_0x193473(0x502)]=!![];}this['activate'](),this[_0x193473(0x37c)](_0x5ea273);}}else{if(_0x377d05[_0x193473(0x538)]()>=0x0){if(_0x193473(0x222)===_0x193473(0x5f9))return _0x2a8584['ItemsEquipsCore'][_0x193473(0x236)][_0x193473(0x4b8)](this);else this[_0x193473(0x578)](),this[_0x193473(0x2de)]();}}}_0x5ec3b2&&this['index']()!==_0x1f44f7&&this['playCursorSound']();},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x601)]=function(){const _0x19fc1b=_0x4ab1bf;this[_0x19fc1b(0x445)](),this[_0x19fc1b(0x5df)](),this[_0x19fc1b(0x248)]();},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x202)]=function(){const _0x2e1606=_0x4ab1bf;Window_HorzCommand[_0x2e1606(0x4d5)][_0x2e1606(0x202)]['call'](this),this['refreshCursor']();},Window_EquipCommand[_0x4ab1bf(0x4d5)]['addEquipCommand']=function(){const _0x220fab=_0x4ab1bf;if(!this[_0x220fab(0x589)]())return;const _0x524773=this['commandStyle'](),_0x2f7412=VisuMZ[_0x220fab(0x3e3)][_0x220fab(0x368)][_0x220fab(0x3ae)][_0x220fab(0x3b5)],_0x3f930e=_0x524773==='text'?TextManager[_0x220fab(0x25a)]:'\x5cI[%1]%2'[_0x220fab(0x365)](_0x2f7412,TextManager[_0x220fab(0x25a)]),_0x42b329=this[_0x220fab(0x324)]();this[_0x220fab(0x290)](_0x3f930e,'equip',_0x42b329);},Window_EquipCommand['prototype'][_0x4ab1bf(0x589)]=function(){const _0x4950e3=_0x4ab1bf;return!this[_0x4950e3(0x2f5)]();},Window_EquipCommand['prototype'][_0x4ab1bf(0x324)]=function(){return!![];},Window_EquipCommand[_0x4ab1bf(0x4d5)]['addOptimizeCommand']=function(){const _0x7ac689=_0x4ab1bf;if(!this[_0x7ac689(0x29c)]())return;const _0x4d491e=this[_0x7ac689(0x3a9)](),_0x41a0e4=VisuMZ['ItemsEquipsCore'][_0x7ac689(0x368)][_0x7ac689(0x3ae)]['CmdIconOptimize'],_0x4f6ab6=_0x4d491e===_0x7ac689(0x4e0)?TextManager[_0x7ac689(0x2ee)]:'\x5cI[%1]%2'['format'](_0x41a0e4,TextManager['optimize']),_0x5bdde6=this[_0x7ac689(0x572)]();this['addCommand'](_0x4f6ab6,_0x7ac689(0x2ee),_0x5bdde6);},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x29c)]=function(){const _0x35771c=_0x4ab1bf;return VisuMZ[_0x35771c(0x3e3)][_0x35771c(0x368)][_0x35771c(0x3ae)][_0x35771c(0x292)];},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x572)]=function(){return!![];},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x248)]=function(){const _0x316ecd=_0x4ab1bf;if(!this[_0x316ecd(0x45b)]())return;const _0x37ad54=this['commandStyle'](),_0x2cf7b4=VisuMZ[_0x316ecd(0x3e3)]['Settings'][_0x316ecd(0x3ae)][_0x316ecd(0x2e7)],_0x2906a2=_0x37ad54===_0x316ecd(0x4e0)?TextManager[_0x316ecd(0x362)]:_0x316ecd(0x49d)[_0x316ecd(0x365)](_0x2cf7b4,TextManager[_0x316ecd(0x362)]),_0x430171=this['isClearCommandEnabled']();this[_0x316ecd(0x290)](_0x2906a2,_0x316ecd(0x362),_0x430171);},Window_EquipCommand['prototype'][_0x4ab1bf(0x45b)]=function(){const _0x57a6fa=_0x4ab1bf;return VisuMZ[_0x57a6fa(0x3e3)]['Settings']['EquipScene'][_0x57a6fa(0x265)];},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x1e4)]=function(){return!![];},Window_EquipCommand['prototype'][_0x4ab1bf(0x36b)]=function(){const _0x50f700=_0x4ab1bf;return VisuMZ[_0x50f700(0x3e3)][_0x50f700(0x368)]['EquipScene']['CmdTextAlign'];},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x44c)]=function(_0x1ad59f){const _0x3a0dcb=_0x4ab1bf,_0x5f572b=this[_0x3a0dcb(0x627)](_0x1ad59f);if(_0x5f572b===_0x3a0dcb(0x567))this[_0x3a0dcb(0x4f9)](_0x1ad59f);else _0x5f572b===_0x3a0dcb(0x40c)?this[_0x3a0dcb(0x3ed)](_0x1ad59f):Window_HorzCommand['prototype']['drawItem']['call'](this,_0x1ad59f);},Window_EquipCommand['prototype'][_0x4ab1bf(0x3a9)]=function(){const _0x59288c=_0x4ab1bf;return VisuMZ['ItemsEquipsCore'][_0x59288c(0x368)][_0x59288c(0x3ae)]['CmdStyle'];},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x627)]=function(_0x31ec86){const _0x4165e1=_0x4ab1bf;if(_0x31ec86<0x0)return'text';const _0x4440e9=this[_0x4165e1(0x3a9)]();if(_0x4440e9!==_0x4165e1(0x579))return _0x4440e9;else{if(this['maxItems']()>0x0){const _0x41f4c2=this[_0x4165e1(0x59c)](_0x31ec86);if(_0x41f4c2[_0x4165e1(0x3ac)](/\\I\[(\d+)\]/i)){const _0x28f799=this['itemLineRect'](_0x31ec86),_0x35aab9=this[_0x4165e1(0x449)](_0x41f4c2)['width'];if(_0x35aab9<=_0x28f799[_0x4165e1(0x621)]){if(_0x4165e1(0x5f2)===_0x4165e1(0x5f2))return _0x4165e1(0x567);else _0x101106[_0x4165e1(0x4d5)][_0x4165e1(0x3e0)][_0x4165e1(0x4b8)](this),this[_0x4165e1(0x287)]();}else return _0x4165e1(0x40c);}}}return _0x4165e1(0x4e0);},Window_EquipCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4f9)]=function(_0x45340e){const _0x4415f4=_0x4ab1bf,_0x403a8f=this['itemLineRect'](_0x45340e),_0x3407a=this[_0x4415f4(0x59c)](_0x45340e),_0x573218=this['textSizeEx'](_0x3407a)[_0x4415f4(0x621)];this[_0x4415f4(0x5fb)](this[_0x4415f4(0x57c)](_0x45340e));const _0xffa73b=this[_0x4415f4(0x36b)]();if(_0xffa73b===_0x4415f4(0x479))this[_0x4415f4(0x668)](_0x3407a,_0x403a8f['x']+_0x403a8f[_0x4415f4(0x621)]-_0x573218,_0x403a8f['y'],_0x573218);else{if(_0xffa73b===_0x4415f4(0x5b8)){const _0x474edc=_0x403a8f['x']+Math[_0x4415f4(0x3c8)]((_0x403a8f['width']-_0x573218)/0x2);this['drawTextEx'](_0x3407a,_0x474edc,_0x403a8f['y'],_0x573218);}else{if('pzUBU'===_0x4415f4(0x233))this[_0x4415f4(0x668)](_0x3407a,_0x403a8f['x'],_0x403a8f['y'],_0x573218);else{const _0x25b399=_0x3e8f13[_0x4415f4(0x521)][_0x4415f4(0x5c2)](_0x532d41(_0x4f0d89['$1'])[_0x4415f4(0x63f)]());return _0x3130df[_0x4415f4(0x397)](_0xbb34d4)&&_0x27ca17[_0x4415f4(0x5cf)]===_0x25b399;}}}},Window_EquipCommand['prototype'][_0x4ab1bf(0x3ed)]=function(_0xcf69f8){const _0x4ef396=_0x4ab1bf;this['commandName'](_0xcf69f8)[_0x4ef396(0x3ac)](/\\I\[(\d+)\]/i);const _0x3113d8=Number(RegExp['$1'])||0x0,_0x46c031=this[_0x4ef396(0x354)](_0xcf69f8),_0x38cc47=_0x46c031['x']+Math[_0x4ef396(0x3c8)]((_0x46c031[_0x4ef396(0x621)]-ImageManager[_0x4ef396(0x3f1)])/0x2),_0xb314b=_0x46c031['y']+(_0x46c031[_0x4ef396(0x381)]-ImageManager['iconHeight'])/0x2;this[_0x4ef396(0x212)](_0x3113d8,_0x38cc47,_0xb314b);},Window_EquipSlot[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2f5)]=function(){const _0x4196f8=_0x4ab1bf;return Imported[_0x4196f8(0x333)]&&Window_HorzCommand[_0x4196f8(0x4d5)][_0x4196f8(0x2f5)][_0x4196f8(0x4b8)](this);},Window_EquipSlot[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3e0)]=function(){const _0x5003f2=_0x4ab1bf;Window_StatusBase[_0x5003f2(0x4d5)]['activate'][_0x5003f2(0x4b8)](this),this[_0x5003f2(0x287)]();},Window_EquipSlot[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5eb)]=function(){const _0x494aab=_0x4ab1bf;Window_StatusBase[_0x494aab(0x4d5)][_0x494aab(0x5eb)]['call'](this),this[_0x494aab(0x641)]();},Window_EquipSlot[_0x4ab1bf(0x4d5)]['checkShiftRemoveShortcut']=function(){const _0x5a247a=_0x4ab1bf;if(!this['isShiftRemoveShortcutEnabled']())return;if(Input[_0x5a247a(0x31a)](_0x5a247a(0x3d4))&&this['item']()){const _0xf869c1=SceneManager[_0x5a247a(0x2ef)]['_actor'];if(_0xf869c1){if(this[_0x5a247a(0x26d)](this['index']()))this[_0x5a247a(0x352)](),this['updateHelp']();else{if('kXrzZ'===_0x5a247a(0x4b3))return _0x457e81[_0x5a247a(0x3e3)][_0x5a247a(0x368)][_0x5a247a(0x56d)][_0x5a247a(0x26c)];else this[_0x5a247a(0x42f)]();}}}},Window_EquipSlot[_0x4ab1bf(0x4d5)]['canShiftRemoveEquipment']=function(_0x8668db){const _0x4efb15=_0x4ab1bf,_0x1940b7=SceneManager[_0x4efb15(0x2ef)][_0x4efb15(0x2e1)];if(!_0x1940b7)return;if(!_0x1940b7[_0x4efb15(0x224)](this['index']()))return![];const _0x1d765e=_0x1940b7[_0x4efb15(0x600)]()[this[_0x4efb15(0x2ff)]()];if(_0x1940b7['nonRemovableEtypes']()['includes'](_0x1d765e))return![];return!![];;},Window_EquipSlot['prototype']['processShiftRemoveShortcut']=function(){const _0x1f44fa=_0x4ab1bf;SoundManager['playEquip']();const _0x114cb2=SceneManager['_scene'][_0x1f44fa(0x2e1)];_0x114cb2[_0x1f44fa(0x656)](this['index'](),null),this['refresh'](),this[_0x1f44fa(0x382)][_0x1f44fa(0x202)](),this[_0x1f44fa(0x287)]();const _0x546b94=SceneManager[_0x1f44fa(0x2ef)]['_statusWindow'];if(_0x546b94)_0x546b94[_0x1f44fa(0x202)]();},Window_EquipSlot[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x27a)]=function(){const _0x2c9949=_0x4ab1bf;if(!this[_0x2c9949(0x316)])return![];if(!VisuMZ[_0x2c9949(0x3e3)][_0x2c9949(0x368)][_0x2c9949(0x3ae)][_0x2c9949(0x383)])return![];return!![];},Window_EquipSlot['prototype']['processCursorMoveModernControls']=function(){const _0x3d6942=_0x4ab1bf;!this[_0x3d6942(0x4d1)]()&&('HZpJN'!=='uOYNO'?Window_StatusBase[_0x3d6942(0x4d5)][_0x3d6942(0x63a)][_0x3d6942(0x4b8)](this):this['playCursorSound']());},Window_EquipSlot[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4d1)]=function(){const _0x3ad2ed=_0x4ab1bf;if(!this['isCursorMovable']())return![];if(SceneManager[_0x3ad2ed(0x2ef)][_0x3ad2ed(0x2c3)]!==Scene_Equip)return![];if(this[_0x3ad2ed(0x45c)]()){if(_0x3ad2ed(0x518)===_0x3ad2ed(0x518))return this[_0x3ad2ed(0x573)](),Input['clear'](),SceneManager['_scene'][_0x3ad2ed(0x58a)](),![];else{const _0x16da6a=0x0,_0x5378fc=this[_0x3ad2ed(0x330)](),_0x480594=_0x41e9a7[_0x3ad2ed(0x544)],_0x278fe8=this[_0x3ad2ed(0x5fe)]();return new _0x14c53d(_0x16da6a,_0x5378fc,_0x480594,_0x278fe8);}}else{if(Input[_0x3ad2ed(0x488)](_0x3ad2ed(0x4e1))){const _0x5298be=this['index']();if(Input[_0x3ad2ed(0x48e)](_0x3ad2ed(0x3d4))){if(_0x3ad2ed(0x57a)!==_0x3ad2ed(0x57a))return this[_0x3ad2ed(0x3c9)]();else this['cursorPagedown']();}else this[_0x3ad2ed(0x5d7)](Input[_0x3ad2ed(0x31a)](_0x3ad2ed(0x4e1)));if(this[_0x3ad2ed(0x2ff)]()!==_0x5298be){if(_0x3ad2ed(0x5c9)===_0x3ad2ed(0x434))return![];else this[_0x3ad2ed(0x573)]();}return!![];}else{if(this[_0x3ad2ed(0x4e2)]()&&Input['isTriggered']('shift'))return!![];}}return![];},Window_EquipSlot['prototype'][_0x4ab1bf(0x45c)]=function(){const _0x22149b=_0x4ab1bf;if(this['index']()!==0x0)return![];const _0x1b8a82=VisuMZ[_0x22149b(0x3e3)][_0x22149b(0x368)][_0x22149b(0x3ae)];if(!_0x1b8a82[_0x22149b(0x292)]&&!_0x1b8a82['CommandAddClear'])return![];return Input[_0x22149b(0x31a)]('up');},Window_EquipSlot[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4e2)]=function(){const _0x316c62=_0x4ab1bf;return VisuMZ[_0x316c62(0x3e3)]['Settings'][_0x316c62(0x3ae)][_0x316c62(0x383)];},Window_EquipSlot[_0x4ab1bf(0x4d5)]['processTouchModernControls']=function(){const _0x33abfc=_0x4ab1bf;if(this[_0x33abfc(0x2a6)]()&&this[_0x33abfc(0x424)]&&SceneManager['_scene'][_0x33abfc(0x2c3)]===Scene_Equip){if(this['isHoverEnabled']()&&TouchInput[_0x33abfc(0x42e)]())this[_0x33abfc(0x2b3)](![]);else{if(TouchInput[_0x33abfc(0x31a)]()){if(_0x33abfc(0x315)===_0x33abfc(0x322)){const _0x405140=_0x33d073[_0x33abfc(0x3b7)](_0x49ce8d['getMenuImage']()),_0x560540=this[_0x33abfc(0x666)]-_0x405140[_0x33abfc(0x621)];_0x48c5a9+=_0x560540/0x2;if(_0x560540<0x0)_0x5bb7fa-=_0x560540;_0x10386c[_0x33abfc(0x4d5)]['drawItemActorMenuImage']['call'](this,_0x14f304,_0x475c7f,_0x370c6a,_0x1c6ce5,_0x135ecd);}else this['onTouchSelectModernControls'](!![]);}}if(TouchInput[_0x33abfc(0x345)]())this[_0x33abfc(0x5a7)]();else TouchInput[_0x33abfc(0x371)]()&&this['onTouchCancel']();}},Window_EquipSlot[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2b3)]=function(_0x53fca6){const _0xa6497e=_0x4ab1bf;this[_0xa6497e(0x502)]=![];const _0x415227=this[_0xa6497e(0x2ff)](),_0x534a06=this[_0xa6497e(0x538)](),_0x12e6ca=SceneManager['_scene']['_commandWindow'];if(_0x12e6ca[_0xa6497e(0x2a6)]()&&_0x12e6ca[_0xa6497e(0x424)]){if(_0x534a06>=0x0)_0x534a06===this[_0xa6497e(0x2ff)]()&&(this[_0xa6497e(0x502)]=!![]),this[_0xa6497e(0x3e0)](),this[_0xa6497e(0x37c)](_0x534a06);else _0x12e6ca[_0xa6497e(0x538)]()>=0x0&&(this['deactivate'](),this[_0xa6497e(0x2de)]());}if(_0x53fca6&&this[_0xa6497e(0x2ff)]()!==_0x415227){if(_0xa6497e(0x38d)===_0xa6497e(0x24b)){_0x1e14a0+='\x5cI[%1]'[_0xa6497e(0x365)](_0x4e1c29[_0xa6497e(0x32f)]),_0x43ac3c++;if(_0x677f44>=_0x5dcabb)return _0x1c614e;}else this['playCursorSound']();}},Window_EquipSlot[_0x4ab1bf(0x4d5)]['equipSlotIndex']=function(){return this['index']();},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x35c)]=Window_EquipItem[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x57d)],Window_EquipItem[_0x4ab1bf(0x4d5)]['includes']=function(_0x26b222){const _0x5acc08=_0x4ab1bf;if(_0x26b222===null&&this[_0x5acc08(0x580)]()[_0x5acc08(0x57d)](this[_0x5acc08(0x593)]())){if(_0x5acc08(0x4d4)!==_0x5acc08(0x606))return![];else this[_0x5acc08(0x341)][_0x5acc08(0x3e0)]();}else{if('ojMlG'===_0x5acc08(0x40f))_0x1e5d6c['ItemsEquipsCore'][_0x5acc08(0x2df)]['call'](this),this[_0x5acc08(0x3a2)]()&&this[_0x5acc08(0x309)]();else return VisuMZ['ItemsEquipsCore'][_0x5acc08(0x35c)][_0x5acc08(0x4b8)](this,_0x26b222);}},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x404)]=Window_EquipItem[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5e1)],Window_EquipItem[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5e1)]=function(_0x58425e){const _0x5a4cf5=_0x4ab1bf;if(_0x58425e&&this['_actor']){if(_0x5a4cf5(0x4a2)!=='BbBip'){if(_0x368621&&this[_0x5a4cf5(0x2e1)]){if(this[_0x5a4cf5(0x254)](_0x217d29))return![];if(this[_0x5a4cf5(0x340)](_0x1b0baf))return![];if(this[_0x5a4cf5(0x270)](_0x463e72))return![];}if(!_0x378fff)return!this[_0x5a4cf5(0x580)]()['includes'](this[_0x5a4cf5(0x593)]());return _0x5359ec[_0x5a4cf5(0x3e3)][_0x5a4cf5(0x404)][_0x5a4cf5(0x4b8)](this,_0x58f79d);}else{if(this[_0x5a4cf5(0x254)](_0x58425e))return![];if(this['isSoleWeaponType'](_0x58425e))return![];if(this[_0x5a4cf5(0x270)](_0x58425e))return![];}}if(!_0x58425e){if('dJDfk'===_0x5a4cf5(0x3b1)){const _0xcf8168=_0x5a4cf5(0x500);if(this[_0x5a4cf5(0x44b)][_0x5a4cf5(0x4ee)]<=0x0&&this['_itemData'][_0x5a4cf5(0x2e0)]<=0x0&&!this['_customItemInfo'][_0xcf8168])return![];const _0x5b9621=this[_0x5a4cf5(0x5b7)]();this[_0x5a4cf5(0x271)](_0x5b9621,_0x508e97,_0x5bccdc,_0x3363ce,!![]);const _0x26139e=this[_0x5a4cf5(0x29a)]();return this['changeTextColor'](_0x2e5dae[_0x5a4cf5(0x346)](0x3)),this[_0x5a4cf5(0x271)](_0x26139e,_0x3ffe13,_0xff0af8,_0x447222,![],_0x5a4cf5(0x479)),this[_0x5a4cf5(0x33d)](_0x563da9,_0x465207,_0x380678),this[_0x5a4cf5(0x284)](),!![];}else return!this['nonRemovableEtypes']()[_0x5a4cf5(0x57d)](this[_0x5a4cf5(0x593)]());}return VisuMZ[_0x5a4cf5(0x3e3)][_0x5a4cf5(0x404)][_0x5a4cf5(0x4b8)](this,_0x58425e);},Window_EquipItem[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x254)]=function(_0x46cfac){const _0x363d40=_0x4ab1bf,_0x16a1c7=_0x46cfac[_0x363d40(0x28b)];if(_0x16a1c7['match'](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){const _0x6fa222=Number(RegExp['$1'])||0x1;let _0x39a7d0=0x0;const _0x12a32c=this[_0x363d40(0x2e1)][_0x363d40(0x4fa)](),_0x2b2a07=SceneManager[_0x363d40(0x2ef)][_0x363d40(0x40b)][_0x363d40(0x33e)]();_0x12a32c[_0x2b2a07]=null;for(const _0x283aa2 of _0x12a32c){if(_0x363d40(0x625)!==_0x363d40(0x625)){const _0x363c9a=this[_0x363d40(0x1f7)];_0x363c9a[_0x363d40(0x541)](_0x4c0707,0x0,_0x2b5244['y'],_0x363c9a['innerWidth'],_0x363d40(0x5b8));}else{if(!_0x283aa2)continue;if(DataManager[_0x363d40(0x243)](_0x46cfac)===DataManager[_0x363d40(0x243)](_0x283aa2)){if(_0x46cfac['id']===_0x283aa2['id'])_0x39a7d0+=0x1;}}}return _0x39a7d0>=_0x6fa222;}else{if('qTIAm'!==_0x363d40(0x1f9))return![];else{const _0x26f27a=_0x363d40(0x54f);if(this[_0x363d40(0x288)][_0x26f27a])return this['_customItemInfo'][_0x26f27a];return _0x2c1f9b[_0x363d40(0x586)]&&_0x4fd8e8[_0x363d40(0x2d6)](this[_0x363d40(0x55d)])!==_0x363d40(0x209)?this[_0x363d40(0x1fc)]():this[_0x363d40(0x3d6)]();}}},Window_EquipItem[_0x4ab1bf(0x4d5)]['isSoleWeaponType']=function(_0x135714){const _0x4ae635=_0x4ab1bf;if(!DataManager[_0x4ae635(0x243)](_0x135714))return![];const _0x4d9432=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x5d2da2=0x0;const _0x27a0ec=this[_0x4ae635(0x2e1)]['equips'](),_0x5d8f35=SceneManager[_0x4ae635(0x2ef)][_0x4ae635(0x40b)][_0x4ae635(0x33e)]();_0x27a0ec[_0x5d8f35]=null;for(const _0x13a2e7 of _0x27a0ec){if(_0x4ae635(0x4a6)!==_0x4ae635(0x4a6))return _0x3e1bce['ItemsEquipsCore'][_0x4ae635(0x3c1)][_0x4ae635(0x4b8)](this);else{if(!_0x13a2e7)continue;if(!DataManager[_0x4ae635(0x243)](_0x13a2e7))continue;if(_0x135714[_0x4ae635(0x52f)]===_0x13a2e7[_0x4ae635(0x52f)]){if('EzYba'===_0x4ae635(0x452)){const _0x320cf8=_0x2ed65c[_0x4ae635(0x3e3)][_0x4ae635(0x368)][_0x4ae635(0x208)],_0x141476=_0x320cf8[_0x4ae635(0x280)];if(_0x141476==='')return;const _0x435453=_0x455571[_0x4ae635(0x3f1)],_0x556fcc=_0x29c0a0[_0x4ae635(0x5ab)];this[_0x4ae635(0x619)][_0x4ae635(0x409)]=_0x320cf8[_0x4ae635(0x34e)]||_0x4bb3a7[_0x4ae635(0x2d3)](),this[_0x4ae635(0x619)][_0x4ae635(0x565)]=this['getTextColor'](),this[_0x4ae635(0x619)]['fontSize']=_0x320cf8[_0x4ae635(0x394)],this[_0x4ae635(0x619)][_0x4ae635(0x541)](_0x141476,0x0,_0x556fcc/0x2,_0x435453,_0x556fcc/0x2,'center');}else{_0x5d2da2+=0x1;if(_0x135714[_0x4ae635(0x28b)][_0x4ae635(0x3ac)](_0x4d9432)){const _0x2d9e54=Number(RegExp['$1'])||0x1;if(_0x5d2da2>=_0x2d9e54)return!![];}if(_0x13a2e7['note'][_0x4ae635(0x3ac)](_0x4d9432)){const _0x431fdf=Number(RegExp['$1'])||0x1;if(_0x5d2da2>=_0x431fdf)return!![];}}}}}return![];},Window_EquipItem[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x270)]=function(_0x3098d4){const _0x3b40cb=_0x4ab1bf;if(!DataManager[_0x3b40cb(0x397)](_0x3098d4))return![];const _0x1204e6=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x55ccba=0x0;const _0x2c9418=this[_0x3b40cb(0x2e1)][_0x3b40cb(0x4fa)](),_0x4cc55f=SceneManager[_0x3b40cb(0x2ef)][_0x3b40cb(0x40b)][_0x3b40cb(0x33e)]();_0x2c9418[_0x4cc55f]=null;for(const _0x513454 of _0x2c9418){if(_0x3b40cb(0x3e1)===_0x3b40cb(0x3e1)){if(!_0x513454)continue;if(!DataManager['isArmor'](_0x513454))continue;if(_0x3098d4[_0x3b40cb(0x5cf)]===_0x513454[_0x3b40cb(0x5cf)]){_0x55ccba+=0x1;if(_0x3098d4[_0x3b40cb(0x28b)][_0x3b40cb(0x3ac)](_0x1204e6)){if(_0x3b40cb(0x23a)===_0x3b40cb(0x419)){const _0x3423f7=this['itemAt'](_0x4a3fad);_0x3423f7?_0x1dba0b['prototype'][_0x3b40cb(0x44c)][_0x3b40cb(0x4b8)](this,_0x3815bc):this['drawRemoveItem'](_0x291402);}else{const _0xd4168=Number(RegExp['$1'])||0x1;if(_0x55ccba>=_0xd4168)return!![];}}if(_0x513454[_0x3b40cb(0x28b)][_0x3b40cb(0x3ac)](_0x1204e6)){const _0x282d4e=Number(RegExp['$1'])||0x1;if(_0x55ccba>=_0x282d4e)return!![];}}}else return this[_0x3b40cb(0x3a1)]()[_0x3b40cb(0x3ac)](/RIGHT/i);}return![];},Window_EquipItem[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x580)]=function(){const _0xf8b2c3=_0x4ab1bf;return VisuMZ[_0xf8b2c3(0x3e3)][_0xf8b2c3(0x368)][_0xf8b2c3(0x3ae)]['NonRemoveETypes'];},Window_EquipItem[_0x4ab1bf(0x4d5)]['drawItem']=function(_0x5e443d){const _0x2d5979=_0x4ab1bf,_0x33485f=this[_0x2d5979(0x58e)](_0x5e443d);if(_0x33485f){if(_0x2d5979(0x37a)===_0x2d5979(0x1f8)){const _0x43bdfb=_0x3ba033+_0x3088d5+_0x3f2ded*_0x5a1018;this[_0x2d5979(0x33d)](_0x43bdfb,_0x1930f8,_0x3bdfb9,_0x25333b);}else Window_ItemList['prototype']['drawItem']['call'](this,_0x5e443d);}else{if('STxlR'===_0x2d5979(0x391))this['drawRemoveItem'](_0x5e443d);else{const _0x336e7c=this[_0x2d5979(0x3a9)](),_0x44e4d0=_0x153f12[_0x2d5979(0x3e3)][_0x2d5979(0x368)][_0x2d5979(0x49a)][_0x2d5979(0x237)],_0x2ace0b=_0x336e7c==='text'?_0x404b17[_0x2d5979(0x451)]:'\x5cI[%1]%2'[_0x2d5979(0x365)](_0x44e4d0,_0xbade74[_0x2d5979(0x451)]),_0x4711d5=this[_0x2d5979(0x5a0)]();if(this[_0x2d5979(0x36e)]()&&!_0x4711d5)return;this[_0x2d5979(0x290)](_0x2ace0b,_0x2d5979(0x451),_0x4711d5);}}},Window_EquipItem['prototype'][_0x4ab1bf(0x2ea)]=function(_0x1e6bdd){const _0x35214c=_0x4ab1bf;this[_0x35214c(0x5fb)](this['isEnabled'](null));const _0x3672db=VisuMZ[_0x35214c(0x3e3)][_0x35214c(0x368)][_0x35214c(0x3ae)],_0x3c8728=this[_0x35214c(0x354)](_0x1e6bdd),_0x353773=_0x3c8728['y']+(this[_0x35214c(0x672)]()-ImageManager[_0x35214c(0x5ab)])/0x2,_0x9a08d3=ImageManager['iconWidth']+0x4,_0x33343d=Math[_0x35214c(0x506)](0x0,_0x3c8728[_0x35214c(0x621)]-_0x9a08d3);this[_0x35214c(0x207)](),this[_0x35214c(0x212)](_0x3672db[_0x35214c(0x592)],_0x3c8728['x'],_0x353773),this[_0x35214c(0x541)](_0x3672db['RemoveEquipText'],_0x3c8728['x']+_0x9a08d3,_0x3c8728['y'],_0x33343d),this[_0x35214c(0x5fb)](!![]);},Window_EquipItem[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x54a)]=function(){const _0x326105=_0x4ab1bf;Window_ItemList[_0x326105(0x4d5)]['updateHelp'][_0x326105(0x4b8)](this);if(this[_0x326105(0x2e1)]&&this[_0x326105(0x33c)]&&this[_0x326105(0x559)]>=0x0){const _0x1f1957=JsonEx[_0x326105(0x5ff)](this[_0x326105(0x2e1)]);_0x1f1957[_0x326105(0x4ce)]=!![],_0x1f1957[_0x326105(0x42d)](this[_0x326105(0x559)],this[_0x326105(0x5d4)]()),this[_0x326105(0x33c)][_0x326105(0x536)](_0x1f1957);}},VisuMZ['ItemsEquipsCore']['Window_ShopCommand_initialize']=Window_ShopCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x65e)],Window_ShopCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x65e)]=function(_0x4ebd2f){const _0x50ec85=_0x4ab1bf;VisuMZ['ItemsEquipsCore'][_0x50ec85(0x471)]['call'](this,_0x4ebd2f),this['createCommandNameWindow'](_0x4ebd2f);},Window_ShopCommand['prototype'][_0x4ab1bf(0x54b)]=function(_0x20f6ea){const _0x855a24=_0x4ab1bf,_0xe41681=new Rectangle(0x0,0x0,_0x20f6ea[_0x855a24(0x621)],_0x20f6ea[_0x855a24(0x381)]);this['_commandNameWindow']=new Window_Base(_0xe41681),this['_commandNameWindow'][_0x855a24(0x1fd)]=0x0,this[_0x855a24(0x626)](this[_0x855a24(0x1f7)]),this[_0x855a24(0x32d)]();},Window_ShopCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x287)]=function(){const _0x34d1e4=_0x4ab1bf;Window_HorzCommand[_0x34d1e4(0x4d5)][_0x34d1e4(0x287)][_0x34d1e4(0x4b8)](this);if(this[_0x34d1e4(0x1f7)])this['updateCommandNameWindow']();},Window_ShopCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x32d)]=function(){const _0x1fe266=_0x4ab1bf,_0x53d7ba=this['_commandNameWindow'];_0x53d7ba[_0x1fe266(0x200)][_0x1fe266(0x362)]();const _0x3574f2=this[_0x1fe266(0x627)](this['index']());if(_0x3574f2==='icon'){if(_0x1fe266(0x2ed)===_0x1fe266(0x61f))_0x28ae38=this[_0x1fe266(0x2e1)][_0x1fe266(0x51b)](_0x34d95f,![]),_0x1fd431=this[_0x1fe266(0x4ce)][_0x1fe266(0x51b)](_0x8ed3,![]),_0x3f3a13=_0x9ebd00(this['_actor']['paramValueByName'](_0x3e952c,!![]))[_0x1fe266(0x3ac)](/([%％])/i);else{const _0x14472d=this[_0x1fe266(0x354)](this[_0x1fe266(0x2ff)]());let _0x5a73ea=this[_0x1fe266(0x59c)](this['index']());_0x5a73ea=_0x5a73ea[_0x1fe266(0x45a)](/\\I\[(\d+)\]/gi,''),_0x53d7ba['resetFontSettings'](),this['commandNameWindowDrawBackground'](_0x5a73ea,_0x14472d),this['commandNameWindowDrawText'](_0x5a73ea,_0x14472d),this[_0x1fe266(0x60f)](_0x5a73ea,_0x14472d);}}},Window_ShopCommand['prototype']['commandNameWindowDrawBackground']=function(_0x1c8a4e,_0x47776b){},Window_ShopCommand['prototype'][_0x4ab1bf(0x58c)]=function(_0x3b1328,_0x4ea36c){const _0x59047b=_0x4ab1bf,_0x4950ae=this[_0x59047b(0x1f7)];_0x4950ae[_0x59047b(0x541)](_0x3b1328,0x0,_0x4ea36c['y'],_0x4950ae[_0x59047b(0x666)],_0x59047b(0x5b8));},Window_ShopCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x60f)]=function(_0x3af9ee,_0x12c3ba){const _0x5782d1=_0x4ab1bf,_0x1963e6=this[_0x5782d1(0x1f7)],_0x3c0f0e=$gameSystem[_0x5782d1(0x473)](),_0x45d813=_0x12c3ba['x']+Math[_0x5782d1(0x3c8)](_0x12c3ba[_0x5782d1(0x621)]/0x2)+_0x3c0f0e;_0x1963e6['x']=_0x1963e6[_0x5782d1(0x621)]/-0x2+_0x45d813,_0x1963e6['y']=Math['floor'](_0x12c3ba[_0x5782d1(0x381)]/0x2);},Window_ShopCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4a8)]=function(){const _0x5b2f34=_0x4ab1bf;return this[_0x5b2f34(0x2fa)]?this[_0x5b2f34(0x2fa)][_0x5b2f34(0x205)]:0x3;},Window_ShopCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x36e)]=function(){const _0x5734de=_0x4ab1bf;return VisuMZ['ItemsEquipsCore']['Settings'][_0x5734de(0x49a)]['CmdHideDisabled'];},Window_ShopCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x601)]=function(){const _0x25f499=_0x4ab1bf;this['addBuyCommand'](),this[_0x25f499(0x64c)](),this[_0x25f499(0x470)]();},Window_ShopCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x202)]=function(){const _0x531e5a=_0x4ab1bf;Window_HorzCommand[_0x531e5a(0x4d5)][_0x531e5a(0x202)][_0x531e5a(0x4b8)](this),this[_0x531e5a(0x4b2)]();},Window_ShopCommand['prototype']['addBuyCommand']=function(){const _0x363c22=_0x4ab1bf,_0x1e6653=this[_0x363c22(0x3a9)](),_0x1a4adc=VisuMZ[_0x363c22(0x3e3)][_0x363c22(0x368)]['ShopScene'][_0x363c22(0x47c)],_0x1f3489=_0x1e6653===_0x363c22(0x4e0)?TextManager[_0x363c22(0x487)]:_0x363c22(0x49d)[_0x363c22(0x365)](_0x1a4adc,TextManager[_0x363c22(0x487)]),_0x394596=this[_0x363c22(0x3fb)]();if(this[_0x363c22(0x36e)]()&&!_0x394596)return;this[_0x363c22(0x290)](_0x1f3489,_0x363c22(0x487),_0x394596);},Window_ShopCommand['prototype'][_0x4ab1bf(0x3fb)]=function(){const _0x5d73e2=_0x4ab1bf;if(SceneManager[_0x5d73e2(0x2ef)][_0x5d73e2(0x2c3)]===Scene_Shop){if('JRDUj'!==_0x5d73e2(0x4c6))return SceneManager[_0x5d73e2(0x2ef)][_0x5d73e2(0x310)]>0x0;else{_0xcab96b+=0x1;if(_0x271ce5[_0x5d73e2(0x28b)][_0x5d73e2(0x3ac)](_0x39ba77)){const _0x261a4b=_0x51da7f(_0xcde5ea['$1'])||0x1;if(_0x3f68f3>=_0x261a4b)return!![];}if(_0x45916e['note'][_0x5d73e2(0x3ac)](_0x441372)){const _0x3d9531=_0x48d4ca(_0x1bd603['$1'])||0x1;if(_0x1bce64>=_0x3d9531)return!![];}}}else return!![];},Window_ShopCommand[_0x4ab1bf(0x4d5)]['addSellCommand']=function(){const _0x50df30=_0x4ab1bf,_0x44c5ce=this[_0x50df30(0x3a9)](),_0x4b5fa6=VisuMZ[_0x50df30(0x3e3)][_0x50df30(0x368)][_0x50df30(0x49a)][_0x50df30(0x237)],_0x6e7bc5=_0x44c5ce===_0x50df30(0x4e0)?TextManager['sell']:_0x50df30(0x49d)['format'](_0x4b5fa6,TextManager[_0x50df30(0x451)]),_0x6d93f2=this[_0x50df30(0x5a0)]();if(this[_0x50df30(0x36e)]()&&!_0x6d93f2)return;this[_0x50df30(0x290)](_0x6e7bc5,_0x50df30(0x451),_0x6d93f2);},Window_ShopCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5a0)]=function(){return!this['_purchaseOnly'];},Window_ShopCommand['prototype'][_0x4ab1bf(0x470)]=function(){const _0x3b84ea=_0x4ab1bf,_0x281962=this[_0x3b84ea(0x3a9)](),_0x30d4ec=VisuMZ[_0x3b84ea(0x3e3)][_0x3b84ea(0x368)][_0x3b84ea(0x49a)][_0x3b84ea(0x2f0)],_0x4cc274=VisuMZ[_0x3b84ea(0x3e3)]['Settings'][_0x3b84ea(0x49a)][_0x3b84ea(0x281)],_0x3c9d63=_0x281962===_0x3b84ea(0x4e0)?_0x4cc274:_0x3b84ea(0x49d)[_0x3b84ea(0x365)](_0x30d4ec,_0x4cc274);this['addCommand'](_0x3c9d63,_0x3b84ea(0x213));},Window_ShopCommand['prototype'][_0x4ab1bf(0x36b)]=function(){const _0x34cdeb=_0x4ab1bf;return VisuMZ[_0x34cdeb(0x3e3)][_0x34cdeb(0x368)][_0x34cdeb(0x49a)]['CmdTextAlign'];},Window_ShopCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x44c)]=function(_0x2b234c){const _0x40442c=_0x4ab1bf,_0x455ad4=this['commandStyleCheck'](_0x2b234c);if(_0x455ad4==='iconText')_0x40442c(0x546)!==_0x40442c(0x546)?(_0x5af67d[_0x40442c(0x3e3)][_0x40442c(0x3e6)][_0x40442c(0x4b8)](this),this[_0x40442c(0x2f5)]()&&this[_0x40442c(0x4f2)]()):this[_0x40442c(0x4f9)](_0x2b234c);else _0x455ad4==='icon'?this[_0x40442c(0x3ed)](_0x2b234c):Window_HorzCommand['prototype']['drawItem'][_0x40442c(0x4b8)](this,_0x2b234c);},Window_ShopCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3a9)]=function(){const _0x4cdd56=_0x4ab1bf;return VisuMZ[_0x4cdd56(0x3e3)]['Settings'][_0x4cdd56(0x49a)][_0x4cdd56(0x3c2)];},Window_ShopCommand['prototype'][_0x4ab1bf(0x627)]=function(_0x5b4f17){const _0x186656=_0x4ab1bf;if(_0x5b4f17<0x0)return'text';const _0x4de636=this[_0x186656(0x3a9)]();if(_0x4de636!=='auto'){if('HDuiz'!==_0x186656(0x42c))this['_statusWindow'][_0x186656(0x307)](this['item']());else return _0x4de636;}else{if(this[_0x186656(0x3f7)]()>0x0){const _0x3aab74=this['commandName'](_0x5b4f17);if(_0x3aab74[_0x186656(0x3ac)](/\\I\[(\d+)\]/i)){if(_0x186656(0x647)!=='GAbFa'){const _0x57ea60=this['itemLineRect'](_0x5b4f17),_0x101efb=this['textSizeEx'](_0x3aab74)[_0x186656(0x621)];return _0x101efb<=_0x57ea60[_0x186656(0x621)]?_0x186656(0x567):_0x186656(0x40c);}else this[_0x186656(0x455)]*=-0x1;}}}return'text';},Window_ShopCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4f9)]=function(_0x220b0b){const _0x580a02=_0x4ab1bf,_0x390a2f=this[_0x580a02(0x354)](_0x220b0b),_0x4e0c26=this['commandName'](_0x220b0b),_0x54e11f=this[_0x580a02(0x449)](_0x4e0c26)[_0x580a02(0x621)];this[_0x580a02(0x5fb)](this['isCommandEnabled'](_0x220b0b));const _0x79273=this[_0x580a02(0x36b)]();if(_0x79273===_0x580a02(0x479))this[_0x580a02(0x668)](_0x4e0c26,_0x390a2f['x']+_0x390a2f[_0x580a02(0x621)]-_0x54e11f,_0x390a2f['y'],_0x54e11f);else{if(_0x79273===_0x580a02(0x5b8)){const _0x10433f=_0x390a2f['x']+Math[_0x580a02(0x3c8)]((_0x390a2f['width']-_0x54e11f)/0x2);this[_0x580a02(0x668)](_0x4e0c26,_0x10433f,_0x390a2f['y'],_0x54e11f);}else _0x580a02(0x51f)==='XmWNP'?(_0x260a08[_0x580a02(0x3e3)][_0x580a02(0x1e5)][_0x580a02(0x4b8)](this),this[_0x580a02(0x3a2)]()&&this[_0x580a02(0x499)]()):this[_0x580a02(0x668)](_0x4e0c26,_0x390a2f['x'],_0x390a2f['y'],_0x54e11f);}},Window_ShopCommand[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3ed)]=function(_0xbcf358){const _0x632d5=_0x4ab1bf;this[_0x632d5(0x59c)](_0xbcf358)['match'](/\\I\[(\d+)\]/i);const _0x343349=Number(RegExp['$1'])||0x0,_0x116c58=this[_0x632d5(0x354)](_0xbcf358),_0x3dec9d=_0x116c58['x']+Math[_0x632d5(0x3c8)]((_0x116c58[_0x632d5(0x621)]-ImageManager[_0x632d5(0x3f1)])/0x2),_0x240286=_0x116c58['y']+(_0x116c58[_0x632d5(0x381)]-ImageManager[_0x632d5(0x5ab)])/0x2;this[_0x632d5(0x212)](_0x343349,_0x3dec9d,_0x240286);},VisuMZ['ItemsEquipsCore']['Window_ShopBuy_refresh']=Window_ShopBuy[_0x4ab1bf(0x4d5)]['refresh'],Window_ShopBuy[_0x4ab1bf(0x4d5)]['refresh']=function(){const _0x160160=_0x4ab1bf;this[_0x160160(0x48b)](),VisuMZ[_0x160160(0x3e3)]['Window_ShopBuy_refresh'][_0x160160(0x4b8)](this);},Window_ShopBuy[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x48b)]=function(){const _0x10b7eb=_0x4ab1bf;if(SceneManager[_0x10b7eb(0x2ef)][_0x10b7eb(0x2c3)]===Scene_Shop){if('TyQVy'===_0x10b7eb(0x62a))this['_money']=SceneManager[_0x10b7eb(0x2ef)][_0x10b7eb(0x456)]();else return _0x4ae445[_0x10b7eb(0x3e3)]['Settings'][_0x10b7eb(0x49a)][_0x10b7eb(0x389)];}},VisuMZ[_0x4ab1bf(0x3e3)][_0x4ab1bf(0x3df)]=Window_ShopBuy[_0x4ab1bf(0x4d5)]['price'],Window_ShopBuy[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x620)]=function(_0x2fd591){const _0x326162=_0x4ab1bf;if(!_0x2fd591)return 0x0;let _0x20d12f=VisuMZ[_0x326162(0x3e3)][_0x326162(0x3df)][_0x326162(0x4b8)](this,_0x2fd591);return Math[_0x326162(0x506)](0x0,this[_0x326162(0x2d9)](_0x2fd591,_0x20d12f));},Window_ShopBuy[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2d9)]=function(_0x36c923,_0x2d07bc){const _0x39b401=_0x4ab1bf,_0x1307b2=_0x36c923['note'];if(_0x1307b2[_0x39b401(0x3ac)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x23ee5f=String(RegExp['$1']);try{if('oMFkJ'===_0x39b401(0x46f))return _0x3ab0e6(_0x5e9b52['$1']);else eval(_0x23ee5f);}catch(_0x2bfb59){if($gameTemp[_0x39b401(0x286)]())console[_0x39b401(0x266)](_0x2bfb59);}}_0x2d07bc=VisuMZ[_0x39b401(0x3e3)]['Settings']['ShopScene'][_0x39b401(0x23e)][_0x39b401(0x4b8)](this,_0x36c923,_0x2d07bc);if(isNaN(_0x2d07bc))_0x2d07bc=0x0;return Math['floor'](_0x2d07bc);},Window_ShopBuy[_0x4ab1bf(0x4d5)]['drawItem']=function(_0x49c74d){const _0x2708bd=_0x4ab1bf;this['resetFontSettings']();const _0x3b452c=this[_0x2708bd(0x58e)](_0x49c74d),_0x15f9a0=this['itemLineRect'](_0x49c74d),_0x584c88=_0x15f9a0['width'];this[_0x2708bd(0x5fb)](this[_0x2708bd(0x5e1)](_0x3b452c)),this[_0x2708bd(0x558)](_0x3b452c,_0x15f9a0['x'],_0x15f9a0['y'],_0x584c88),this[_0x2708bd(0x395)](_0x3b452c,_0x15f9a0),this[_0x2708bd(0x5fb)](!![]);},Window_ShopBuy[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x395)]=function(_0x1926f1,_0x535d59){const _0x2d1f33=_0x4ab1bf,_0x2c7b83=this[_0x2d1f33(0x620)](_0x1926f1);this[_0x2d1f33(0x574)](_0x2c7b83,TextManager['currencyUnit'],_0x535d59['x'],_0x535d59['y'],_0x535d59[_0x2d1f33(0x621)]);},Window_ShopSell[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4a8)]=function(){const _0x13277f=_0x4ab1bf;return SceneManager[_0x13277f(0x2ef)][_0x13277f(0x3a2)]()?0x1:0x2;},VisuMZ[_0x4ab1bf(0x3e3)]['Window_ShopSell_isEnabled']=Window_ShopSell['prototype']['isEnabled'],Window_ShopSell[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5e1)]=function(_0x56ddb0){const _0xfdeee7=_0x4ab1bf;if(!_0x56ddb0)return![];const _0x3063e9=_0x56ddb0[_0xfdeee7(0x28b)];if(_0x3063e9[_0xfdeee7(0x3ac)](/<CANNOT SELL>/i))return![];if(_0x3063e9[_0xfdeee7(0x3ac)](/<CAN SELL>/i))return!![];if(_0x3063e9['match'](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x27bdc5=JSON[_0xfdeee7(0x477)]('['+RegExp['$1'][_0xfdeee7(0x3ac)](/\d+/g)+']');for(const _0x3bd6d1 of _0x27bdc5){if(!$gameSwitches[_0xfdeee7(0x57e)](_0x3bd6d1))return![];}}if(_0x3063e9[_0xfdeee7(0x3ac)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4d8a53=JSON[_0xfdeee7(0x477)]('['+RegExp['$1'][_0xfdeee7(0x3ac)](/\d+/g)+']');for(const _0x904e45 of _0x4d8a53){if(!$gameSwitches['value'](_0x904e45))return![];}}if(_0x3063e9[_0xfdeee7(0x3ac)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xfdeee7(0x52d)===_0xfdeee7(0x52d)){const _0x56b0b7=JSON[_0xfdeee7(0x477)]('['+RegExp['$1'][_0xfdeee7(0x3ac)](/\d+/g)+']');for(const _0x33b9ea of _0x56b0b7){if($gameSwitches[_0xfdeee7(0x57e)](_0x33b9ea))return![];}}else return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0xfdeee7(0x418)]():_0x2dc2b8[_0xfdeee7(0x3e3)]['Scene_Shop_categoryWindowRect'][_0xfdeee7(0x4b8)](this);}return VisuMZ['ItemsEquipsCore'][_0xfdeee7(0x312)][_0xfdeee7(0x4b8)](this,_0x56ddb0);},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x335)]=function(){return![];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x43a)]=function(){const _0x2c0789=_0x4ab1bf;Window_StatusBase['prototype'][_0x2c0789(0x43a)][_0x2c0789(0x4b8)](this);for(const _0x51d0cc of $gameParty[_0x2c0789(0x44f)]()){ImageManager[_0x2c0789(0x553)](_0x51d0cc[_0x2c0789(0x4da)]());}},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x25f)]=function(){const _0x87c3d1=_0x4ab1bf;return VisuMZ['ItemsEquipsCore'][_0x87c3d1(0x368)]['StatusWindow'][_0x87c3d1(0x261)];},Window_ShopStatus[_0x4ab1bf(0x4d5)]['refresh']=function(){const _0x21b38a=_0x4ab1bf;this[_0x21b38a(0x200)][_0x21b38a(0x362)](),this[_0x21b38a(0x4bf)]['clear']();if(this[_0x21b38a(0x55d)]){if(_0x21b38a(0x655)!==_0x21b38a(0x655)){const _0x1cf7df=this['itemLineRect'](_0x4922c4),_0x463bee=this[_0x21b38a(0x449)](_0xccbcde)[_0x21b38a(0x621)];return _0x463bee<=_0x1cf7df[_0x21b38a(0x621)]?'iconText':_0x21b38a(0x40c);}else{this[_0x21b38a(0x284)](),this['changePaintOpacity'](!![]),this['prepareItemCustomData']();if(this['isEquipItem']()){if(_0x21b38a(0x528)===_0x21b38a(0x4df)){const _0x2a9415=_0x135d1b[_0x21b38a(0x5ff)](this[_0x21b38a(0x2e1)]);_0x2a9415[_0x21b38a(0x4ce)]=!![],_0x2a9415[_0x21b38a(0x42d)](this['_slotId'],this[_0x21b38a(0x5d4)]()),this[_0x21b38a(0x33c)][_0x21b38a(0x536)](_0x2a9415);}else this[_0x21b38a(0x61c)]();}else _0x21b38a(0x65b)==='MyaUw'?(_0x5cb92a['ItemsEquipsCore'][_0x21b38a(0x2fb)][_0x21b38a(0x4b8)](this),this['isUseModernControls']()&&this['onCategoryCancel'](),this[_0x21b38a(0x3a2)]()&&this['_dummyWindow']['hide']()):this[_0x21b38a(0x3b3)]();this[_0x21b38a(0x5e6)]();}}},Window_ShopStatus['prototype']['drawPossession']=function(_0x339172,_0x4e42cd){const _0x5bbbee=_0x4ab1bf;if(!this[_0x5bbbee(0x41d)]()&&!DataManager[_0x5bbbee(0x43d)](this[_0x5bbbee(0x55d)]))return;const _0x3f3eed=this[_0x5bbbee(0x666)]-this['itemPadding']()-_0x339172,_0x456ffc=this['textWidth'](_0x5bbbee(0x43f));this['changeTextColor'](ColorManager[_0x5bbbee(0x3b6)]()),this[_0x5bbbee(0x541)](TextManager[_0x5bbbee(0x425)],_0x339172+this['itemPadding'](),_0x4e42cd,_0x3f3eed-_0x456ffc),this['resetTextColor'](),this['drawItemNumber'](this[_0x5bbbee(0x55d)],_0x339172,_0x4e42cd,_0x3f3eed);},Window_ShopStatus[_0x4ab1bf(0x4d5)]['drawItemDarkRect']=function(_0x23dc68,_0x9dafbb,_0x44bb99,_0x4d6dd9,_0x45f08f){const _0x5e08fc=_0x4ab1bf;if(VisuMZ[_0x5e08fc(0x3e3)][_0x5e08fc(0x368)][_0x5e08fc(0x56d)][_0x5e08fc(0x2cb)]===![])return;_0x45f08f=Math['max'](_0x45f08f||0x1,0x1);while(_0x45f08f--){_0x4d6dd9=_0x4d6dd9||this[_0x5e08fc(0x672)](),this[_0x5e08fc(0x4bf)]['paintOpacity']=0xa0;const _0x4f642a=ColorManager[_0x5e08fc(0x4eb)]();this[_0x5e08fc(0x4bf)][_0x5e08fc(0x246)](_0x23dc68+0x1,_0x9dafbb+0x1,_0x44bb99-0x2,_0x4d6dd9-0x2,_0x4f642a),this['contentsBack'][_0x5e08fc(0x2bb)]=0xff;}},ColorManager[_0x4ab1bf(0x4eb)]=function(){const _0x534158=_0x4ab1bf,_0x4f510c=VisuMZ[_0x534158(0x3e3)][_0x534158(0x368)][_0x534158(0x56d)];let _0x3f3df6=_0x4f510c[_0x534158(0x5e0)]!==undefined?_0x4f510c[_0x534158(0x5e0)]:0x13;return ColorManager[_0x534158(0x22b)](_0x3f3df6);},Window_ShopStatus[_0x4ab1bf(0x4d5)]['drawEquipData']=function(){const _0x51a8a3=_0x4ab1bf;if(VisuMZ['ItemsEquipsCore'][_0x51a8a3(0x368)][_0x51a8a3(0x56d)]['DrawEquipData']){VisuMZ['ItemsEquipsCore'][_0x51a8a3(0x368)][_0x51a8a3(0x56d)][_0x51a8a3(0x48f)]['call'](this);return;}const _0x5992c9=this[_0x51a8a3(0x672)](),_0x3f8bcb=this['gaugeLineHeight']()+0x8;let _0xc2464e=0x0,_0x55f0d8=0x0,_0x5a6dab=this[_0x51a8a3(0x666)],_0x68eacf=this[_0x51a8a3(0x263)],_0x326f0f=Math['floor'](_0x5a6dab/0x2),_0x3a47b9=_0xc2464e+_0x5a6dab-_0x326f0f;this[_0x51a8a3(0x558)](this[_0x51a8a3(0x55d)],_0xc2464e+this['itemPadding'](),_0x55f0d8,_0x5a6dab-this[_0x51a8a3(0x504)]()*0x2),this[_0x51a8a3(0x33d)](_0xc2464e,_0x55f0d8,_0x5a6dab),_0x55f0d8+=_0x5992c9;if(this[_0x51a8a3(0x587)](_0xc2464e,_0x55f0d8,_0x326f0f))_0x55f0d8+=0x0;if(this['drawItemQuantity'](_0x3a47b9,_0x55f0d8,_0x326f0f))_0x55f0d8+=_0x5992c9;const _0x35f114=this[_0x51a8a3(0x285)](),_0x416fde=_0x55f0d8;_0x55f0d8=_0x68eacf-_0x35f114[_0x51a8a3(0x205)]*_0x3f8bcb-0x4;let _0xc8d261=_0xc2464e,_0x1392eb=0x0,_0x3b7236=_0x55f0d8;for(const _0x20e0c5 of _0x35f114){if('WsHPN'!==_0x51a8a3(0x3dc))_0x1392eb=Math[_0x51a8a3(0x506)](this[_0x51a8a3(0x39d)](_0x20e0c5,_0xc2464e+0x4,_0x55f0d8+0x4,_0x5a6dab),_0x1392eb),_0x55f0d8+=_0x3f8bcb;else return 0x0;}const _0xd6fe5b=$gameParty[_0x51a8a3(0x540)](),_0x53ad56=Math['floor']((_0x5a6dab-_0x1392eb)/_0xd6fe5b);_0x1392eb=_0x5a6dab-_0x53ad56*_0xd6fe5b;for(const _0x4dcf57 of $gameParty[_0x51a8a3(0x5a3)]()){const _0x3348e0=$gameParty[_0x51a8a3(0x5a3)]()[_0x51a8a3(0x5c2)](_0x4dcf57),_0x587311=_0xc8d261+_0x1392eb+_0x3348e0*_0x53ad56;this[_0x51a8a3(0x5fb)](_0x4dcf57[_0x51a8a3(0x1f5)](this[_0x51a8a3(0x55d)])),this[_0x51a8a3(0x4d6)](_0x4dcf57,_0x587311+_0x53ad56/0x2,_0x3b7236);let _0x45f720=_0x3b7236;for(const _0x398adc of _0x35f114){if(_0x51a8a3(0x20f)===_0x51a8a3(0x2a8))return this['_scene']&&this[_0x51a8a3(0x2ef)][_0x51a8a3(0x2c3)]===_0x5b968c;else{const _0x9f04b3=_0x45f720-(_0x5992c9-_0x3f8bcb)/0x2;this[_0x51a8a3(0x2c8)](_0x4dcf57,_0x398adc,_0x587311,_0x9f04b3,_0x53ad56),_0x45f720+=_0x3f8bcb;}}}this[_0x51a8a3(0x33d)](_0xc8d261,_0x416fde,_0x1392eb,_0x3b7236-_0x416fde);for(let _0x524a79=0x0;_0x524a79<_0xd6fe5b;_0x524a79++){if('Yjios'!==_0x51a8a3(0x234)){const _0x41be17=_0xc8d261+_0x1392eb+_0x524a79*_0x53ad56;this['drawItemDarkRect'](_0x41be17,_0x416fde,_0x53ad56,_0x3b7236-_0x416fde);}else!this[_0x51a8a3(0x4d1)]()&&_0x14acfc['prototype'][_0x51a8a3(0x63a)][_0x51a8a3(0x4b8)](this);}for(const _0x52d30f of _0x35f114){if(_0x51a8a3(0x2ce)===_0x51a8a3(0x458))return this[_0x51a8a3(0x4a8)]()<=0x1?_0xb25e1f[_0x51a8a3(0x4d5)][_0x51a8a3(0x460)][_0x51a8a3(0x4b8)](this):_0x21fe01[_0x51a8a3(0x3e3)][_0x51a8a3(0x35d)][_0x51a8a3(0x4b8)](this);else{this[_0x51a8a3(0x33d)](_0xc8d261,_0x3b7236,_0x1392eb,_0x3f8bcb);for(let _0x434bf9=0x0;_0x434bf9<_0xd6fe5b;_0x434bf9++){if(_0x51a8a3(0x380)!==_0x51a8a3(0x380))this['process_VisuMZ_ItemsEquipsCore_RegExp'](),_0x513ba9['ItemsEquipsCore'][_0x51a8a3(0x60c)]['call'](this),this[_0x51a8a3(0x597)]();else{const _0x3609d2=_0xc8d261+_0x1392eb+_0x434bf9*_0x53ad56;this[_0x51a8a3(0x33d)](_0x3609d2,_0x3b7236,_0x53ad56,_0x3f8bcb);}}_0x3b7236+=_0x3f8bcb;}}},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x587)]=function(_0x5273be,_0x1ecec4,_0x349941){const _0x401ea3=_0x4ab1bf;if(!this[_0x401ea3(0x41d)]())return![];const _0x1d21f1=$dataSystem[_0x401ea3(0x5e5)][this['_item'][_0x401ea3(0x593)]];return this[_0x401ea3(0x271)](_0x1d21f1,_0x5273be,_0x1ecec4,_0x349941,!![]),this['drawItemDarkRect'](_0x5273be,_0x1ecec4,_0x349941),this[_0x401ea3(0x284)](),!![];},Window_ShopStatus['prototype'][_0x4ab1bf(0x542)]=function(){const _0x50b366=_0x4ab1bf,_0x665109=VisuMZ[_0x50b366(0x3e3)][_0x50b366(0x368)]['ItemScene']['ItemQuantityFmt'];return _0x665109[_0x50b366(0x365)]($gameParty[_0x50b366(0x65c)](this[_0x50b366(0x55d)]));},Window_ShopStatus['prototype'][_0x4ab1bf(0x285)]=function(){const _0x245e78=_0x4ab1bf;return Imported['VisuMZ_0_CoreEngine']?_0x245e78(0x2ab)==='JnOxv'?VisuMZ['CoreEngine'][_0x245e78(0x368)][_0x245e78(0x645)]['ExtDisplayedParams']:_0x489aa3['ItemsEquipsCore'][_0x245e78(0x368)][_0x245e78(0x3ae)][_0x245e78(0x3c2)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ShopStatus[_0x4ab1bf(0x4d5)]['smallParamFontSize']=function(){const _0x51e89f=_0x4ab1bf;return VisuMZ[_0x51e89f(0x3e3)][_0x51e89f(0x368)][_0x51e89f(0x56d)][_0x51e89f(0x28d)];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x39d)]=function(_0x57f8ad,_0x494444,_0x49ca77,_0x5ec627){const _0x2aa923=_0x4ab1bf;this['resetFontSettings'](),this[_0x2aa923(0x200)][_0x2aa923(0x33a)]=this[_0x2aa923(0x596)]();let _0x143e87=this['textWidth'](TextManager['param'](_0x57f8ad))+0x4+_0x494444;if(Imported[_0x2aa923(0x333)]){if(_0x2aa923(0x45f)===_0x2aa923(0x45f))this[_0x2aa923(0x2d7)](_0x494444,_0x49ca77,_0x5ec627,_0x57f8ad,!![]),VisuMZ['CoreEngine']['Settings'][_0x2aa923(0x645)][_0x2aa923(0x32e)]&&(_0x143e87+=ImageManager[_0x2aa923(0x3f1)]+0x4);else return this['normalColor']();}else this[_0x2aa923(0x320)](ColorManager[_0x2aa923(0x3b6)]()),this[_0x2aa923(0x541)](TextManager['param'](_0x57f8ad),_0x494444,_0x49ca77,_0x5ec627);return this[_0x2aa923(0x284)](),_0x143e87;},Window_ShopStatus['prototype'][_0x4ab1bf(0x2c8)]=function(_0x4d5294,_0x35191c,_0x257aa8,_0x37a847,_0x45766){const _0x459464=_0x4ab1bf;_0x257aa8+=this['itemPadding'](),_0x45766-=this[_0x459464(0x504)]()*0x2;const _0xe4b758=VisuMZ[_0x459464(0x3e3)][_0x459464(0x368)]['StatusWindow'];this[_0x459464(0x200)][_0x459464(0x33a)]=_0xe4b758[_0x459464(0x28d)],this[_0x459464(0x5fb)](_0x4d5294[_0x459464(0x1f5)](this[_0x459464(0x55d)]));if(_0x4d5294[_0x459464(0x532)](this['_item'])){const _0x22abe9=_0xe4b758['AlreadyEquipMarker'];this[_0x459464(0x541)](_0x22abe9,_0x257aa8,_0x37a847,_0x45766,_0x459464(0x5b8));}else{if(_0x4d5294[_0x459464(0x1f5)](this[_0x459464(0x55d)])){const _0x1f5b79=JsonEx['makeDeepCopy'](_0x4d5294);_0x1f5b79['_tempActor']=!![];const _0x5d2cc2=_0x1f5b79[_0x459464(0x600)]()[_0x459464(0x5c2)](this[_0x459464(0x55d)][_0x459464(0x593)]);if(_0x5d2cc2>=0x0)_0x1f5b79['forceChangeEquip'](_0x5d2cc2,this['_item']);let _0x260987=0x0,_0x19e6d4=0x0,_0x3e5e4f=0x0;Imported[_0x459464(0x333)]?(_0x260987=_0x1f5b79[_0x459464(0x51b)](_0x35191c),_0x19e6d4=_0x260987-_0x4d5294[_0x459464(0x51b)](_0x35191c),this[_0x459464(0x320)](ColorManager[_0x459464(0x2af)](_0x19e6d4)),_0x3e5e4f=(_0x19e6d4>=0x0?'+':'')+VisuMZ[_0x459464(0x4ed)](_0x19e6d4,0x0,_0x35191c)):'FCKnw'===_0x459464(0x512)?(_0x260987=_0x1f5b79[_0x459464(0x64f)](_0x35191c),_0x19e6d4=_0x260987-_0x4d5294[_0x459464(0x64f)](_0x35191c),this[_0x459464(0x320)](ColorManager['paramchangeTextColor'](_0x19e6d4)),_0x3e5e4f=(_0x19e6d4>=0x0?'+':'')+_0x19e6d4):_0x26638b=_0x459464(0x5bf);if(_0x3e5e4f==='+0')_0x3e5e4f=_0xe4b758[_0x459464(0x5bb)];this['drawText'](_0x3e5e4f,_0x257aa8,_0x37a847,_0x45766,_0x459464(0x5b8));}else{if(_0x459464(0x318)!==_0x459464(0x318))return;else{const _0x51168a=_0xe4b758[_0x459464(0x2e8)];this[_0x459464(0x541)](_0x51168a,_0x257aa8,_0x37a847,_0x45766,_0x459464(0x5b8));}}}this['resetFontSettings'](),this[_0x459464(0x5fb)](!![]);},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3b3)]=function(){const _0x10cea8=_0x4ab1bf;VisuMZ['ItemsEquipsCore'][_0x10cea8(0x368)][_0x10cea8(0x56d)][_0x10cea8(0x2c5)][_0x10cea8(0x4b8)](this);},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x652)]=function(){const _0xd70413=_0x4ab1bf;this[_0xd70413(0x288)]={};if(!this['_item'])return;const _0x412698=this[_0xd70413(0x55d)][_0xd70413(0x28b)];if(_0x412698[_0xd70413(0x3ac)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0xba4fb6=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x1279e9 of _0xba4fb6){if(_0x1279e9['match'](/(.*):[ ](.*)/i)){if(_0xd70413(0x5cd)!=='JhxJk'){if(!this[_0xd70413(0x3a1)]())return![];if(!this[_0xd70413(0x2f5)]())return![];if(!this[_0xd70413(0x2f7)])return![];if(!this['_sellWindow'][_0xd70413(0x316)])return![];return this[_0xd70413(0x3a1)]()&&this[_0xd70413(0x2f5)]();}else{const _0x5c99cf=String(RegExp['$1'])['toUpperCase']()['trim'](),_0x47e632=String(RegExp['$2'])[_0xd70413(0x63f)]();this['_customItemInfo'][_0x5c99cf]=_0x47e632;}}}}},Window_ShopStatus[_0x4ab1bf(0x4d5)]['itemDataFontSize']=function(){const _0x52446c=_0x4ab1bf;return Math[_0x52446c(0x506)](0x1,$gameSystem['mainFontSize']()-0x4);},Window_ShopStatus['prototype'][_0x4ab1bf(0x284)]=function(){const _0x28ea7c=_0x4ab1bf;Window_StatusBase[_0x28ea7c(0x4d5)][_0x28ea7c(0x284)][_0x28ea7c(0x4b8)](this),this['contents'][_0x28ea7c(0x33a)]=this[_0x28ea7c(0x2cd)]||this[_0x28ea7c(0x200)]['fontSize'],this[_0x28ea7c(0x200)][_0x28ea7c(0x565)]=this[_0x28ea7c(0x3ad)]||this['contents']['textColor'];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x244)]=function(){const _0x58865c=_0x4ab1bf;return this[_0x58865c(0x200)][_0x58865c(0x33a)]/$gameSystem['mainFontSize']();},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x212)]=function(_0x2f1232,_0x3d64bd,_0x23753b){const _0x5290ea=_0x4ab1bf,_0xbf0812=ImageManager[_0x5290ea(0x428)](_0x5290ea(0x2e5)),_0x479c9e=ImageManager['iconWidth'],_0x171e0c=ImageManager[_0x5290ea(0x5ab)],_0x55b48c=_0x2f1232%0x10*_0x479c9e,_0x2844be=Math[_0x5290ea(0x3c8)](_0x2f1232/0x10)*_0x171e0c,_0x27a949=Math[_0x5290ea(0x400)](_0x479c9e*this[_0x5290ea(0x244)]()),_0x22a5f1=Math[_0x5290ea(0x400)](_0x171e0c*this['fontSizeRatio']());this[_0x5290ea(0x200)][_0x5290ea(0x28a)](_0xbf0812,_0x55b48c,_0x2844be,_0x479c9e,_0x171e0c,_0x3d64bd,_0x23753b,_0x27a949,_0x22a5f1);},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x379)]=function(_0x2869fe,_0x3da7f2){const _0x3c8c4b=_0x4ab1bf;if(_0x3da7f2[_0x3c8c4b(0x2f3)]){if(_0x3c8c4b(0x3da)!==_0x3c8c4b(0x3d7))this[_0x3c8c4b(0x212)](_0x2869fe,_0x3da7f2['x'],_0x3da7f2['y']+0x2);else{if(this['buttonAssistItemListRequirement']())return _0x2c37ea[_0x3c8c4b(0x3e3)][_0x3c8c4b(0x368)][_0x3c8c4b(0x608)][_0x3c8c4b(0x2a1)];else{if(this['_numberWindow']&&this['_numberWindow'][_0x3c8c4b(0x316)])return _0x9a373a['ItemsEquipsCore'][_0x3c8c4b(0x368)][_0x3c8c4b(0x49a)]['buttonAssistSmallIncrement'];}return _0x575124[_0x3c8c4b(0x4d5)][_0x3c8c4b(0x562)][_0x3c8c4b(0x4b8)](this);}}_0x3da7f2['x']+=Math[_0x3c8c4b(0x400)](ImageManager[_0x3c8c4b(0x3f1)]*this['fontSizeRatio']());if(this[_0x3c8c4b(0x244)]()===0x1)_0x3da7f2['x']+=0x4;},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x271)]=function(_0x53ddca,_0x3088ff,_0x30938b,_0x524f54,_0x2baf6f,_0x4b6f9c){const _0x4d31a7=_0x4ab1bf;_0x53ddca=_0x53ddca||'',_0x4b6f9c=_0x4b6f9c||'left',this[_0x4d31a7(0x2cd)]=this[_0x4d31a7(0x377)](),this[_0x4d31a7(0x3ad)]=_0x2baf6f?ColorManager[_0x4d31a7(0x3b6)]():this['contents'][_0x4d31a7(0x565)],_0x3088ff+=this[_0x4d31a7(0x504)](),_0x524f54-=this[_0x4d31a7(0x504)]()*0x2;const _0x243629=this[_0x4d31a7(0x449)](_0x53ddca);if(_0x4b6f9c===_0x4d31a7(0x5b8))_0x3088ff=_0x3088ff+Math[_0x4d31a7(0x3c8)]((_0x524f54-_0x243629[_0x4d31a7(0x621)])/0x2);else _0x4b6f9c===_0x4d31a7(0x479)&&(_0x3088ff=_0x3088ff+_0x524f54-_0x243629[_0x4d31a7(0x621)]);_0x30938b+=(this[_0x4d31a7(0x672)]()-_0x243629[_0x4d31a7(0x381)])/0x2,this[_0x4d31a7(0x668)](_0x53ddca,_0x3088ff,_0x30938b,_0x524f54),this[_0x4d31a7(0x2cd)]=undefined,this[_0x4d31a7(0x3ad)]=undefined,this['resetFontSettings']();},Window_ShopStatus['prototype']['drawItemConsumable']=function(_0x141dcf,_0x5c3a02,_0x4aab24){const _0x16b351=_0x4ab1bf;if(!DataManager['isItem'](this[_0x16b351(0x55d)]))return![];const _0xacd2d3=this[_0x16b351(0x3c3)]();this[_0x16b351(0x271)](_0xacd2d3,_0x141dcf,_0x5c3a02,_0x4aab24,!![]);const _0x191925=this[_0x16b351(0x29e)]();return this[_0x16b351(0x271)](_0x191925,_0x141dcf,_0x5c3a02,_0x4aab24,![],'right'),this[_0x16b351(0x33d)](_0x141dcf,_0x5c3a02,_0x4aab24),this[_0x16b351(0x284)](),!![];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3c3)]=function(){const _0x361056=_0x4ab1bf;return VisuMZ['ItemsEquipsCore'][_0x361056(0x368)][_0x361056(0x56d)][_0x361056(0x633)];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x29e)]=function(){const _0x3b2bdb=_0x4ab1bf,_0x1563de=_0x3b2bdb(0x63b);if(this[_0x3b2bdb(0x288)][_0x1563de])return this['_customItemInfo'][_0x1563de];if(this[_0x3b2bdb(0x5ad)]()){if(_0x3b2bdb(0x5c4)==='WAmMG')return VisuMZ['ItemsEquipsCore'][_0x3b2bdb(0x368)]['StatusWindow']['Consumable'];else{const _0x1c7553=_0x3b2bdb(0x4d8)[_0x3b2bdb(0x365)](_0x1ede89);_0xf9bcac['ItemsEquipsCore']['RegExp'][_0x3b2bdb(0x2c7)][_0x3b2bdb(0x24c)](new _0x5077b9(_0x1c7553,'i'));const _0x219fad=_0x3b2bdb(0x2ec)[_0x3b2bdb(0x365)](_0x2c5e33);_0x533410['ItemsEquipsCore'][_0x3b2bdb(0x5b1)][_0x3b2bdb(0x53c)][_0x3b2bdb(0x24c)](new _0x3566d0(_0x219fad,'g'));}}else return VisuMZ[_0x3b2bdb(0x3e3)]['Settings'][_0x3b2bdb(0x56d)][_0x3b2bdb(0x3e9)];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5ad)]=function(){const _0x3600b7=_0x4ab1bf;return VisuMZ[_0x3600b7(0x36a)]&&VisuMZ['CoreEngine'][_0x3600b7(0x368)][_0x3600b7(0x49f)]['KeyItemProtect']&&DataManager[_0x3600b7(0x46d)](this['_item'])?![]:'mSFIP'===_0x3600b7(0x678)?_0x187244[_0x3600b7(0x3e3)]['Settings'][_0x3600b7(0x56d)][_0x3600b7(0x644)]:this[_0x3600b7(0x55d)]['consumable'];},Window_ShopStatus[_0x4ab1bf(0x4d5)]['drawItemQuantity']=function(_0x43dcf1,_0x510d63,_0x9c393){const _0x46efa6=_0x4ab1bf;if(!this['isEquipItem']()&&!DataManager[_0x46efa6(0x43d)](this[_0x46efa6(0x55d)]))return![];if(DataManager[_0x46efa6(0x46d)](this[_0x46efa6(0x55d)])&&!$dataSystem['optKeyItemsNumber']){const _0xbe48e7=TextManager[_0x46efa6(0x4c8)];this[_0x46efa6(0x271)](_0xbe48e7,_0x43dcf1,_0x510d63,_0x9c393,!![],_0x46efa6(0x5b8));}else{const _0x4c18eb=TextManager['possession'];this['drawItemKeyData'](_0x4c18eb,_0x43dcf1,_0x510d63,_0x9c393,!![]);const _0x1dffed=this[_0x46efa6(0x542)]();this[_0x46efa6(0x271)](_0x1dffed,_0x43dcf1,_0x510d63,_0x9c393,![],_0x46efa6(0x479));}return this[_0x46efa6(0x33d)](_0x43dcf1,_0x510d63,_0x9c393),this[_0x46efa6(0x284)](),!![];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x542)]=function(){const _0x31e764=_0x4ab1bf,_0x53a897=_0x31e764(0x39b);if(this[_0x31e764(0x288)][_0x53a897])return this[_0x31e764(0x288)][_0x53a897];const _0x21f96f=VisuMZ['ItemsEquipsCore'][_0x31e764(0x368)][_0x31e764(0x608)][_0x31e764(0x337)];return _0x21f96f[_0x31e764(0x365)]($gameParty[_0x31e764(0x65c)](this[_0x31e764(0x55d)]));},Window_ShopStatus['prototype'][_0x4ab1bf(0x28f)]=function(_0x1831de,_0x1a7652,_0x51bfa6){const _0xca184c=_0x4ab1bf,_0x416952=this['getItemOccasionText']();return this[_0xca184c(0x271)](_0x416952,_0x1831de,_0x1a7652,_0x51bfa6,![],_0xca184c(0x5b8)),this[_0xca184c(0x33d)](_0x1831de,_0x1a7652,_0x51bfa6),this[_0xca184c(0x284)](),!![];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x497)]=function(){const _0x1e42e3=_0x4ab1bf,_0x58ba03=_0x1e42e3(0x5d2);if(this[_0x1e42e3(0x288)][_0x58ba03])return this[_0x1e42e3(0x288)][_0x58ba03];const _0x19d3d4=VisuMZ[_0x1e42e3(0x3e3)]['Settings'][_0x1e42e3(0x56d)],_0x219ed8=_0x1e42e3(0x37f)[_0x1e42e3(0x365)](this[_0x1e42e3(0x55d)][_0x1e42e3(0x519)]);return _0x19d3d4[_0x219ed8];},Window_ShopStatus['prototype'][_0x4ab1bf(0x325)]=function(_0x399eee,_0x133e3f,_0x3ea3e3){const _0x21e7a9=_0x4ab1bf,_0x1b8fa2=this[_0x21e7a9(0x610)]();return this[_0x21e7a9(0x271)](_0x1b8fa2,_0x399eee,_0x133e3f,_0x3ea3e3,![],_0x21e7a9(0x5b8)),this['drawItemDarkRect'](_0x399eee,_0x133e3f,_0x3ea3e3),this[_0x21e7a9(0x284)](),!![];},Window_ShopStatus['prototype'][_0x4ab1bf(0x610)]=function(){const _0xc25569=_0x4ab1bf,_0x3de064=_0xc25569(0x4c2);if(this[_0xc25569(0x288)][_0x3de064])return this[_0xc25569(0x288)][_0x3de064];const _0x4293f7=VisuMZ['ItemsEquipsCore'][_0xc25569(0x368)][_0xc25569(0x56d)];if(Imported[_0xc25569(0x586)]){const _0x1888e0=this['_item'][_0xc25569(0x28b)];if(_0x1888e0[_0xc25569(0x3ac)](/<TARGET:[ ](.*)>/i)){if(_0xc25569(0x2be)===_0xc25569(0x230)){const _0xcf7c02=this[_0xc25569(0x27c)]();this[_0xc25569(0x33c)]=new _0x4ec088(_0xcf7c02),this[_0xc25569(0x4b1)](this[_0xc25569(0x33c)]),this[_0xc25569(0x382)][_0xc25569(0x3bd)](this[_0xc25569(0x33c)]);const _0x4b59d8=_0x354eec[_0xc25569(0x3e3)][_0xc25569(0x368)]['ItemScene']['ItemMenuStatusBgType'];this[_0xc25569(0x33c)][_0xc25569(0x2ac)](_0x4b59d8||0x0);}else{const _0x25447d=String(RegExp['$1']);if(_0x25447d[_0xc25569(0x3ac)](/(\d+) RANDOM ANY/i)){if('kTgli'!=='xxylN')return _0x4293f7['ScopeRandomAny'][_0xc25569(0x365)](Number(RegExp['$1']));else{if(!_0x319b6d)return 0x0;let _0x22a9a2=_0x49ddd4['ItemsEquipsCore'][_0xc25569(0x3df)][_0xc25569(0x4b8)](this,_0x56d8e4);return _0x6cf449[_0xc25569(0x506)](0x0,this[_0xc25569(0x2d9)](_0x5b4cde,_0x22a9a2));}}else{if(_0x25447d[_0xc25569(0x3ac)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){if(_0xc25569(0x267)!==_0xc25569(0x217))return _0x4293f7[_0xc25569(0x415)][_0xc25569(0x365)](Number(RegExp['$1']));else _0x5cfe4c[_0xc25569(0x3e3)][_0xc25569(0x3d1)][_0xc25569(0x4b8)](this,_0x225cbb),this[_0xc25569(0x277)](_0x431dec);}else{if(_0x25447d[_0xc25569(0x3ac)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return'uIlLp'!=='uIlLp'?_0x187059[_0xc25569(0x3e3)][_0xc25569(0x368)][_0xc25569(0x56d)]['ElementWeapon']:_0x4293f7['ScopeRandomAllies'][_0xc25569(0x365)](Number(RegExp['$1']));else{if(_0x25447d[_0xc25569(0x3ac)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x4293f7[_0xc25569(0x374)];}}}}}}const _0x1b276c=_0xc25569(0x2fe)[_0xc25569(0x365)](this[_0xc25569(0x55d)]['scope']);return _0x4293f7[_0x1b276c];},Window_ShopStatus['prototype']['drawItemSpeed']=function(_0x57cdf7,_0xf06be6,_0x589816){const _0x1e31ba=_0x4ab1bf,_0x186486=this[_0x1e31ba(0x2ae)]();this[_0x1e31ba(0x271)](_0x186486,_0x57cdf7,_0xf06be6,_0x589816,!![]);const _0x49263e=this['getItemSpeedText']();return this[_0x1e31ba(0x271)](_0x49263e,_0x57cdf7,_0xf06be6,_0x589816,![],_0x1e31ba(0x479)),this[_0x1e31ba(0x33d)](_0x57cdf7,_0xf06be6,_0x589816),this[_0x1e31ba(0x284)](),!![];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2ae)]=function(){const _0x2f39b2=_0x4ab1bf;return VisuMZ[_0x2f39b2(0x3e3)][_0x2f39b2(0x368)][_0x2f39b2(0x56d)][_0x2f39b2(0x4e9)];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x47b)]=function(){const _0xf7b4d4=_0x4ab1bf,_0x3c1df5=_0xf7b4d4(0x45d);if(this[_0xf7b4d4(0x288)][_0x3c1df5])return this[_0xf7b4d4(0x288)][_0x3c1df5];const _0x3692a0=this[_0xf7b4d4(0x55d)][_0xf7b4d4(0x5ae)];if(_0x3692a0>=0x7d0){if(_0xf7b4d4(0x638)!=='vzcyX')this[_0xf7b4d4(0x320)](_0x5b2d94[_0xf7b4d4(0x52b)]());else return VisuMZ[_0xf7b4d4(0x3e3)][_0xf7b4d4(0x368)][_0xf7b4d4(0x56d)][_0xf7b4d4(0x3a7)];}else{if(_0x3692a0>=0x3e8)return VisuMZ['ItemsEquipsCore'][_0xf7b4d4(0x368)][_0xf7b4d4(0x56d)]['Speed1000'];else{if(_0x3692a0>0x0)return _0xf7b4d4(0x530)===_0xf7b4d4(0x530)?VisuMZ[_0xf7b4d4(0x3e3)][_0xf7b4d4(0x368)]['StatusWindow'][_0xf7b4d4(0x306)]:_0xea920[_0xf7b4d4(0x3e3)]['Window_ItemList_colSpacing'][_0xf7b4d4(0x4b8)](this);else{if(_0x3692a0===0x0)return VisuMZ[_0xf7b4d4(0x3e3)][_0xf7b4d4(0x368)][_0xf7b4d4(0x56d)][_0xf7b4d4(0x2c6)];else{if(_0x3692a0>-0x3e8){if('WIoZT'===_0xf7b4d4(0x357)){const _0x3b48da=_0x39753f[_0xf7b4d4(0x3e3)][_0xf7b4d4(0x5b1)][_0xf7b4d4(0x2c7)][_0x401759];_0x415773['note'][_0xf7b4d4(0x3ac)](_0x3b48da)&&(_0xa97d52[_0xf7b4d4(0x547)][_0x1a0c24]=_0x35097a(_0x1b18a6['$1']));}else return VisuMZ['ItemsEquipsCore'][_0xf7b4d4(0x368)][_0xf7b4d4(0x56d)]['SpeedNeg999'];}else{if(_0x3692a0>-0x7d0){if(_0xf7b4d4(0x58f)===_0xf7b4d4(0x43e))this[_0xf7b4d4(0x250)]();else return VisuMZ[_0xf7b4d4(0x3e3)]['Settings'][_0xf7b4d4(0x56d)][_0xf7b4d4(0x644)];}else{if(_0x3692a0<=-0x7d0){if(_0xf7b4d4(0x293)===_0xf7b4d4(0x293))return VisuMZ[_0xf7b4d4(0x3e3)][_0xf7b4d4(0x368)]['StatusWindow']['SpeedNeg2000'];else{if(!this[_0xf7b4d4(0x3be)][_0x116a12])this[_0xf7b4d4(0x3be)][_0x1e81c6]=new _0x139039();}}else return _0xf7b4d4(0x4f7);}}}}}}},Window_ShopStatus[_0x4ab1bf(0x4d5)]['drawItemSuccessRate']=function(_0x112635,_0x1a5518,_0x5a413d){const _0x5e1af1=_0x4ab1bf,_0x2a5b97=this[_0x5e1af1(0x498)]();this[_0x5e1af1(0x271)](_0x2a5b97,_0x112635,_0x1a5518,_0x5a413d,!![]);const _0x14450d=this[_0x5e1af1(0x4a9)]();return this[_0x5e1af1(0x271)](_0x14450d,_0x112635,_0x1a5518,_0x5a413d,![],_0x5e1af1(0x479)),this['drawItemDarkRect'](_0x112635,_0x1a5518,_0x5a413d),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x498)]=function(){const _0x46388d=_0x4ab1bf;return VisuMZ[_0x46388d(0x3e3)][_0x46388d(0x368)][_0x46388d(0x56d)][_0x46388d(0x53f)];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4a9)]=function(){const _0x400a6f=_0x4ab1bf,_0x59ffe9='SUCCESS\x20RATE';if(this[_0x400a6f(0x288)][_0x59ffe9])return this[_0x400a6f(0x288)][_0x59ffe9];if(Imported[_0x400a6f(0x586)]){const _0x3822da=this[_0x400a6f(0x55d)][_0x400a6f(0x28b)];if(_0x3822da[_0x400a6f(0x3ac)](/<ALWAYS HIT>/i))return'100%';else{if(_0x3822da[_0x400a6f(0x3ac)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x400a6f(0x31b)===_0x400a6f(0x31b)?_0x400a6f(0x29d)['format'](Number(RegExp['$1'])):_0xb28f92[_0x400a6f(0x3e3)][_0x400a6f(0x368)][_0x400a6f(0x56d)][_0x400a6f(0x3a7)];}}return _0x400a6f(0x29d)[_0x400a6f(0x365)](this[_0x400a6f(0x55d)][_0x400a6f(0x4c9)]);},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x32b)]=function(_0x14155d,_0x37811e,_0x2a77a5){const _0x7fa394=_0x4ab1bf,_0x1e3649=this['getItemRepeatsLabel']();this[_0x7fa394(0x271)](_0x1e3649,_0x14155d,_0x37811e,_0x2a77a5,!![]);const _0x56487e=this[_0x7fa394(0x3c5)]();return this[_0x7fa394(0x271)](_0x56487e,_0x14155d,_0x37811e,_0x2a77a5,![],_0x7fa394(0x479)),this[_0x7fa394(0x33d)](_0x14155d,_0x37811e,_0x2a77a5),this[_0x7fa394(0x284)](),!![];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x33f)]=function(){const _0x30fe8b=_0x4ab1bf;return VisuMZ[_0x30fe8b(0x3e3)]['Settings']['StatusWindow'][_0x30fe8b(0x66c)];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3c5)]=function(){const _0x3cc776=_0x4ab1bf,_0x2254cd='REPEAT';if(this[_0x3cc776(0x288)][_0x2254cd])return this[_0x3cc776(0x288)][_0x2254cd];const _0x2ccbec='×%1';return _0x2ccbec[_0x3cc776(0x365)](this[_0x3cc776(0x55d)]['repeats']);},Window_ShopStatus[_0x4ab1bf(0x4d5)]['drawItemHitType']=function(_0x285a31,_0x2a871b,_0x4eafad){const _0x2a2497=_0x4ab1bf,_0x514225=this[_0x2a2497(0x595)]();this[_0x2a2497(0x271)](_0x514225,_0x285a31,_0x2a871b,_0x4eafad,!![]);const _0x51abe6=this['getItemHitTypeText']();return this[_0x2a2497(0x271)](_0x51abe6,_0x285a31,_0x2a871b,_0x4eafad,![],_0x2a2497(0x479)),this['drawItemDarkRect'](_0x285a31,_0x2a871b,_0x4eafad),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4ab1bf(0x4d5)]['getItemHitTypeLabel']=function(){const _0x2a255c=_0x4ab1bf;return VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0x2a255c(0x299)];},Window_ShopStatus['prototype'][_0x4ab1bf(0x566)]=function(){const _0x1d0c28=_0x4ab1bf,_0x477dbc=_0x1d0c28(0x3af);if(this[_0x1d0c28(0x288)][_0x477dbc])return this[_0x1d0c28(0x288)][_0x477dbc];const _0x45987f=VisuMZ[_0x1d0c28(0x3e3)][_0x1d0c28(0x368)][_0x1d0c28(0x56d)],_0x2af56b=_0x1d0c28(0x612)[_0x1d0c28(0x365)](this[_0x1d0c28(0x55d)][_0x1d0c28(0x53d)]);return _0x45987f[_0x2af56b];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2bf)]=function(_0x1a0bf5,_0x264397,_0x50a676){const _0x20d8fe=_0x4ab1bf;if(this[_0x20d8fe(0x55d)][_0x20d8fe(0x569)][_0x20d8fe(0x649)]<=0x0)return _0x264397;if(this[_0x20d8fe(0x5ce)](_0x1a0bf5,_0x264397,_0x50a676))_0x264397+=this[_0x20d8fe(0x672)]();if(this[_0x20d8fe(0x2f1)](_0x1a0bf5,_0x264397,_0x50a676))_0x264397+=this[_0x20d8fe(0x672)]();return this[_0x20d8fe(0x284)](),_0x264397;},Window_ShopStatus['prototype'][_0x4ab1bf(0x5ce)]=function(_0x22630f,_0x243eaf,_0x48d67d){const _0x56361b=_0x4ab1bf,_0x5d54b3=this[_0x56361b(0x486)]();this[_0x56361b(0x271)](_0x5d54b3,_0x22630f,_0x243eaf,_0x48d67d,!![]);const _0x371546=this[_0x56361b(0x3b2)]();return this['drawItemKeyData'](_0x371546,_0x22630f,_0x243eaf,_0x48d67d,![],'right'),this['drawItemDarkRect'](_0x22630f,_0x243eaf,_0x48d67d),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x486)]=function(){const _0x343f03=_0x4ab1bf;return VisuMZ[_0x343f03(0x3e3)][_0x343f03(0x368)][_0x343f03(0x56d)][_0x343f03(0x3f8)];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3b2)]=function(){const _0x297801=_0x4ab1bf,_0x200959='ELEMENT';if(this[_0x297801(0x288)][_0x200959])return this[_0x297801(0x288)][_0x200959];if(this[_0x297801(0x55d)][_0x297801(0x569)]['elementId']<=-0x1)return VisuMZ['ItemsEquipsCore'][_0x297801(0x368)]['StatusWindow'][_0x297801(0x5a9)];else return this[_0x297801(0x55d)][_0x297801(0x569)][_0x297801(0x235)]===0x0?_0x297801(0x2c4)===_0x297801(0x2c4)?VisuMZ['ItemsEquipsCore'][_0x297801(0x368)][_0x297801(0x56d)]['ElementNone']:![]:$dataSystem[_0x297801(0x55c)][this['_item']['damage'][_0x297801(0x235)]];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x2f1)]=function(_0x2a5236,_0x59d7a6,_0x17748c){const _0x5bbeb0=_0x4ab1bf,_0x34c7bb=this[_0x5bbeb0(0x24e)]();this['drawItemKeyData'](_0x34c7bb,_0x2a5236,_0x59d7a6,_0x17748c,!![]),this[_0x5bbeb0(0x3c0)]();const _0x3deb0e=this[_0x5bbeb0(0x28e)](),_0x6661f2=ColorManager['damageColor']([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x5bbeb0(0x55d)][_0x5bbeb0(0x569)][_0x5bbeb0(0x649)]]);return this[_0x5bbeb0(0x320)](_0x6661f2),this[_0x5bbeb0(0x271)](_0x3deb0e,_0x2a5236,_0x59d7a6,_0x17748c,![],_0x5bbeb0(0x479)),this[_0x5bbeb0(0x33d)](_0x2a5236,_0x59d7a6,_0x17748c),this[_0x5bbeb0(0x284)](),!![];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x24e)]=function(){const _0x272efd=_0x4ab1bf;return Imported[_0x272efd(0x586)]&&DataManager[_0x272efd(0x2d6)](this[_0x272efd(0x55d)])!==_0x272efd(0x209)?this['getItemDamageAmountLabelBattleCore']():this[_0x272efd(0x432)]();},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x432)]=function(){const _0x2eaa24=_0x4ab1bf,_0x173a48=VisuMZ[_0x2eaa24(0x3e3)][_0x2eaa24(0x368)][_0x2eaa24(0x56d)],_0x552394=_0x2eaa24(0x32a)[_0x2eaa24(0x365)](this[_0x2eaa24(0x55d)][_0x2eaa24(0x569)][_0x2eaa24(0x649)]),_0x30334d=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this['_item'][_0x2eaa24(0x569)][_0x2eaa24(0x649)]];return _0x173a48[_0x552394]['format'](_0x30334d);},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3c0)]=function(){const _0x22b152=_0x4ab1bf,_0x27752f=$gameActors[_0x22b152(0x511)](0x1);this[_0x22b152(0x268)]=JsonEx['makeDeepCopy'](_0x27752f),this['_tempActorB']=JsonEx['makeDeepCopy'](_0x27752f);},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x28e)]=function(){const _0x208d2f=_0x4ab1bf,_0x393df3=_0x208d2f(0x54f);if(this['_customItemInfo'][_0x393df3])return this['_customItemInfo'][_0x393df3];return Imported[_0x208d2f(0x586)]&&DataManager[_0x208d2f(0x2d6)](this[_0x208d2f(0x55d)])!=='MANUAL'?this[_0x208d2f(0x1fc)]():this['getItemDamageAmountTextOriginal']();},Window_ShopStatus['prototype'][_0x4ab1bf(0x3d6)]=function(){const _0x5de5ca=_0x4ab1bf;window['a']=this[_0x5de5ca(0x268)],window['b']=this[_0x5de5ca(0x616)],this[_0x5de5ca(0x268)][_0x5de5ca(0x4f4)](!![]),this[_0x5de5ca(0x616)][_0x5de5ca(0x4f4)]([0x3,0x4][_0x5de5ca(0x57d)](this['_item'][_0x5de5ca(0x569)]['type']));let _0x43775f=this[_0x5de5ca(0x55d)][_0x5de5ca(0x569)]['formula'];try{if('xLWXg'===_0x5de5ca(0x543))return _0x429756[_0x5de5ca(0x333)]&&_0x3d4328['prototype'][_0x5de5ca(0x2f5)]['call'](this);else{const _0x20da7f=Math[_0x5de5ca(0x506)](eval(_0x43775f),0x0)/window['a']['atk'];return this['revertGlobalNamespaceVariables'](),isNaN(_0x20da7f)?_0x5de5ca(0x4f7):_0x5de5ca(0x29d)[_0x5de5ca(0x365)](Math[_0x5de5ca(0x329)](_0x20da7f*0x64));}}catch(_0x2b1f50){return $gameTemp[_0x5de5ca(0x286)]()&&(_0x5de5ca(0x332)==='qGWEH'?_0x2d38ad=_0x142410[_0x5de5ca(0x61a)]:(console[_0x5de5ca(0x266)]('Damage\x20Formula\x20Error\x20for\x20%1'[_0x5de5ca(0x365)](this[_0x5de5ca(0x55d)][_0x5de5ca(0x648)])),console[_0x5de5ca(0x266)](_0x2b1f50))),this[_0x5de5ca(0x375)](),'?????';}},Window_ShopStatus['prototype']['revertGlobalNamespaceVariables']=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x56c)]=function(_0x42fa48,_0x4e87a6,_0x361f7d){const _0x576872=_0x4ab1bf;if(!this[_0x576872(0x4c1)]())return _0x4e87a6;if(this[_0x576872(0x5f0)](_0x42fa48,_0x4e87a6,_0x361f7d))_0x4e87a6+=this[_0x576872(0x672)]();if(this[_0x576872(0x61b)](_0x42fa48,_0x4e87a6,_0x361f7d))_0x4e87a6+=this[_0x576872(0x672)]();if(this[_0x576872(0x358)](_0x42fa48,_0x4e87a6,_0x361f7d))_0x4e87a6+=this[_0x576872(0x672)]();if(this[_0x576872(0x3b8)](_0x42fa48,_0x4e87a6,_0x361f7d))_0x4e87a6+=this[_0x576872(0x672)]();if(this[_0x576872(0x223)](_0x42fa48,_0x4e87a6,_0x361f7d))_0x4e87a6+=this[_0x576872(0x672)]();if(this[_0x576872(0x4fd)](_0x42fa48,_0x4e87a6,_0x361f7d))_0x4e87a6+=this[_0x576872(0x672)]();if(this[_0x576872(0x5f7)](_0x42fa48,_0x4e87a6,_0x361f7d))_0x4e87a6+=this[_0x576872(0x672)]();if(this[_0x576872(0x30a)](_0x42fa48,_0x4e87a6,_0x361f7d))_0x4e87a6+=this[_0x576872(0x672)]();if(this['drawItemEffectsRemovedStatesBuffs'](_0x42fa48,_0x4e87a6,_0x361f7d))_0x4e87a6+=this['lineHeight']();return this[_0x576872(0x284)](),_0x4e87a6;},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5f6)]=function(){const _0x3be4c9=_0x4ab1bf;return this[_0x3be4c9(0x55d)][_0x3be4c9(0x1eb)];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4c1)]=function(){const _0xb0c1c8=_0x4ab1bf;let _0x44367e=![];this['_itemData']={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0xd4a35=this['getItemEffects']();for(const _0x3ccc77 of _0xd4a35){switch(_0x3ccc77[_0xb0c1c8(0x52a)]){case Game_Action[_0xb0c1c8(0x31f)]:this[_0xb0c1c8(0x44b)][_0xb0c1c8(0x2e9)]+=_0x3ccc77[_0xb0c1c8(0x5ac)],this[_0xb0c1c8(0x44b)][_0xb0c1c8(0x617)]+=_0x3ccc77[_0xb0c1c8(0x5e9)],_0x44367e=!![];break;case Game_Action[_0xb0c1c8(0x20e)]:this[_0xb0c1c8(0x44b)]['rateMP']+=_0x3ccc77[_0xb0c1c8(0x5ac)],this[_0xb0c1c8(0x44b)][_0xb0c1c8(0x2e0)]+=_0x3ccc77['value2'],_0x44367e=!![];break;case Game_Action[_0xb0c1c8(0x220)]:this['_itemData'][_0xb0c1c8(0x319)]+=_0x3ccc77['value1'],_0x44367e=!![];break;case Game_Action[_0xb0c1c8(0x294)]:this['_itemData'][_0xb0c1c8(0x5dc)][_0xb0c1c8(0x24c)](_0x3ccc77['dataId']),_0x44367e=!![];break;case Game_Action[_0xb0c1c8(0x485)]:this[_0xb0c1c8(0x44b)]['removeState'][_0xb0c1c8(0x24c)](_0x3ccc77[_0xb0c1c8(0x427)]),this['_itemData']['removeStateBuffChanges']=!![],_0x44367e=!![];break;case Game_Action[_0xb0c1c8(0x2d2)]:this[_0xb0c1c8(0x44b)][_0xb0c1c8(0x2d0)][_0x3ccc77[_0xb0c1c8(0x427)]]+=0x1,_0x44367e=!![];break;case Game_Action[_0xb0c1c8(0x4b0)]:this[_0xb0c1c8(0x44b)][_0xb0c1c8(0x2d0)][_0x3ccc77['dataId']]-=0x1,_0x44367e=!![];break;case Game_Action[_0xb0c1c8(0x555)]:this[_0xb0c1c8(0x44b)][_0xb0c1c8(0x49b)][_0xb0c1c8(0x24c)](_0x3ccc77['dataId']),this[_0xb0c1c8(0x44b)][_0xb0c1c8(0x412)]=!![],_0x44367e=!![];break;case Game_Action[_0xb0c1c8(0x2b2)]:this[_0xb0c1c8(0x44b)][_0xb0c1c8(0x515)]['push'](_0x3ccc77[_0xb0c1c8(0x427)]),this['_itemData'][_0xb0c1c8(0x412)]=!![],_0x44367e=!![];break;}}if(this[_0xb0c1c8(0x44b)][_0xb0c1c8(0x5dc)]['length']>0x0)this['_itemData'][_0xb0c1c8(0x2ca)]=!![];for(let _0x1ac953=0x0;_0x1ac953<this['_itemData'][_0xb0c1c8(0x2d0)][_0xb0c1c8(0x205)];_0x1ac953++){if(this['_itemData'][_0xb0c1c8(0x2d0)][_0x1ac953]!==0x0)this['_itemData'][_0xb0c1c8(0x2ca)]=!![];}this[_0xb0c1c8(0x55d)]['tpGain']!==0x0&&(this[_0xb0c1c8(0x44b)]['selfTP']=this['_item'][_0xb0c1c8(0x533)],_0x44367e=!![]);const _0x5952c6=[_0xb0c1c8(0x564),_0xb0c1c8(0x500),_0xb0c1c8(0x50e),_0xb0c1c8(0x4d7),'MP\x20DAMAGE',_0xb0c1c8(0x372),_0xb0c1c8(0x63e),_0xb0c1c8(0x64a),_0xb0c1c8(0x417)];for(const _0xe916ad of _0x5952c6){if(this[_0xb0c1c8(0x288)][_0xe916ad]){_0x44367e=!![];break;}}return _0x44367e;},Window_ShopStatus['prototype'][_0x4ab1bf(0x5f0)]=function(_0x3c0fcf,_0x31baab,_0x1980d1){const _0x18e311=_0x4ab1bf,_0xc32ff7=_0x18e311(0x564);if(this[_0x18e311(0x44b)][_0x18e311(0x2e9)]<=0x0&&this['_itemData'][_0x18e311(0x617)]<=0x0&&!this[_0x18e311(0x288)][_0xc32ff7])return![];const _0x3f2b80=this['getItemEffectsHpRecoveryLabel']();this[_0x18e311(0x271)](_0x3f2b80,_0x3c0fcf,_0x31baab,_0x1980d1,!![]);const _0x919c61=this[_0x18e311(0x4ca)]();return this[_0x18e311(0x320)](ColorManager[_0x18e311(0x346)](0x1)),this[_0x18e311(0x271)](_0x919c61,_0x3c0fcf,_0x31baab,_0x1980d1,![],_0x18e311(0x479)),this[_0x18e311(0x33d)](_0x3c0fcf,_0x31baab,_0x1980d1),this[_0x18e311(0x284)](),!![];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5a5)]=function(){const _0x2a24c4=_0x4ab1bf,_0x46a651=VisuMZ[_0x2a24c4(0x3e3)]['Settings'][_0x2a24c4(0x56d)][_0x2a24c4(0x489)];return _0x46a651['format'](TextManager['hp']);},Window_ShopStatus['prototype']['getItemEffectsHpRecoveryText']=function(){const _0x3ad53e=_0x4ab1bf,_0x1f4fc4=_0x3ad53e(0x564);if(this['_customItemInfo'][_0x1f4fc4])return this[_0x3ad53e(0x288)][_0x1f4fc4];let _0x179e5e='';if(this[_0x3ad53e(0x44b)][_0x3ad53e(0x2e9)]>0x0)_0x179e5e+=_0x3ad53e(0x255)['format'](Math[_0x3ad53e(0x3c8)](this[_0x3ad53e(0x44b)][_0x3ad53e(0x2e9)]*0x64));if(this[_0x3ad53e(0x44b)][_0x3ad53e(0x2e9)]>0x0&&this[_0x3ad53e(0x44b)]['flatHP']>0x0)_0x179e5e+='\x20';if(this[_0x3ad53e(0x44b)][_0x3ad53e(0x617)]>0x0)_0x179e5e+=_0x3ad53e(0x3e8)[_0x3ad53e(0x365)](this['_itemData'][_0x3ad53e(0x617)]);return _0x179e5e;},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x61b)]=function(_0x510aa7,_0x29a59b,_0x101228){const _0x18745b=_0x4ab1bf,_0x27a13a=_0x18745b(0x500);if(this[_0x18745b(0x44b)]['rateMP']<=0x0&&this[_0x18745b(0x44b)][_0x18745b(0x2e0)]<=0x0&&!this[_0x18745b(0x288)][_0x27a13a])return![];const _0x2aa304=this['getItemEffectsMpRecoveryLabel']();this['drawItemKeyData'](_0x2aa304,_0x510aa7,_0x29a59b,_0x101228,!![]);const _0x247499=this['getItemEffectsMpRecoveryText']();return this[_0x18745b(0x320)](ColorManager[_0x18745b(0x346)](0x3)),this['drawItemKeyData'](_0x247499,_0x510aa7,_0x29a59b,_0x101228,![],_0x18745b(0x479)),this['drawItemDarkRect'](_0x510aa7,_0x29a59b,_0x101228),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x4ab1bf(0x5b7)]=function(){const _0x1df9a1=_0x4ab1bf,_0x4f425d=VisuMZ[_0x1df9a1(0x3e3)][_0x1df9a1(0x368)][_0x1df9a1(0x56d)][_0x1df9a1(0x639)];return _0x4f425d[_0x1df9a1(0x365)](TextManager['mp']);},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x29a)]=function(){const _0x4ea151=_0x4ab1bf,_0x350a3e=_0x4ea151(0x500);if(this['_customItemInfo'][_0x350a3e])return this[_0x4ea151(0x288)][_0x350a3e];let _0x484a70='';if(this[_0x4ea151(0x44b)]['rateMP']>0x0)_0x484a70+=_0x4ea151(0x255)[_0x4ea151(0x365)](Math[_0x4ea151(0x3c8)](this[_0x4ea151(0x44b)]['rateMP']*0x64));if(this[_0x4ea151(0x44b)][_0x4ea151(0x4ee)]>0x0&&this[_0x4ea151(0x44b)][_0x4ea151(0x2e0)]>0x0)_0x484a70+='\x20';if(this['_itemData'][_0x4ea151(0x2e0)]>0x0)_0x484a70+=_0x4ea151(0x3e8)[_0x4ea151(0x365)](this['_itemData']['flatMP']);return _0x484a70;},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x358)]=function(_0x5dbf38,_0x8d2616,_0x37d623){const _0x39e6af=_0x4ab1bf,_0xb088a7=_0x39e6af(0x50e);if(this[_0x39e6af(0x44b)][_0x39e6af(0x319)]<=0x0&&!this[_0x39e6af(0x288)][_0xb088a7])return![];const _0x5cfe5b=this['getItemEffectsTpRecoveryLabel']();this[_0x39e6af(0x271)](_0x5cfe5b,_0x5dbf38,_0x8d2616,_0x37d623,!![]);const _0x1f3132=this[_0x39e6af(0x58b)]();return this['changeTextColor'](ColorManager[_0x39e6af(0x52b)]()),this[_0x39e6af(0x271)](_0x1f3132,_0x5dbf38,_0x8d2616,_0x37d623,![],_0x39e6af(0x479)),this[_0x39e6af(0x33d)](_0x5dbf38,_0x8d2616,_0x37d623),this[_0x39e6af(0x284)](),!![];},Window_ShopStatus[_0x4ab1bf(0x4d5)]['getItemEffectsTpRecoveryLabel']=function(){const _0x33faf=_0x4ab1bf,_0x577a9a=VisuMZ[_0x33faf(0x3e3)]['Settings'][_0x33faf(0x56d)]['LabelRecoverTP'];return _0x577a9a['format'](TextManager['tp']);},Window_ShopStatus[_0x4ab1bf(0x4d5)]['getItemEffectsTpRecoveryText']=function(){const _0x330823=_0x4ab1bf,_0x5c0df2=_0x330823(0x50e);if(this['_customItemInfo'][_0x5c0df2])return this[_0x330823(0x288)][_0x5c0df2];let _0xbb1350='';return _0xbb1350+='+%1'[_0x330823(0x365)](this[_0x330823(0x44b)][_0x330823(0x319)]),_0xbb1350;},Window_ShopStatus['prototype'][_0x4ab1bf(0x5f7)]=function(_0xd8f308,_0x57dfa7,_0x49b4e8){const _0x3943fe=_0x4ab1bf,_0x1de393=_0x3943fe(0x63e);if(this[_0x3943fe(0x44b)][_0x3943fe(0x413)]===0x0&&!this[_0x3943fe(0x288)][_0x1de393])return![];const _0xea7433=this[_0x3943fe(0x4a4)]();this[_0x3943fe(0x271)](_0xea7433,_0xd8f308,_0x57dfa7,_0x49b4e8,!![]);const _0x24252f=this[_0x3943fe(0x3e7)]();return this[_0x3943fe(0x44b)][_0x3943fe(0x413)]>0x0?_0x3943fe(0x30d)!==_0x3943fe(0x53e)?this[_0x3943fe(0x320)](ColorManager['powerUpColor']()):(_0x115ac6+=_0x52d0b9(_0x567dec['$1']),_0x13c89e+=_0x1b90cb(_0x27f419['$2'])):this[_0x3943fe(0x320)](ColorManager[_0x3943fe(0x5ca)]()),this[_0x3943fe(0x271)](_0x24252f,_0xd8f308,_0x57dfa7,_0x49b4e8,![],_0x3943fe(0x479)),this['drawItemDarkRect'](_0xd8f308,_0x57dfa7,_0x49b4e8),this[_0x3943fe(0x284)](),!![];},Window_ShopStatus[_0x4ab1bf(0x4d5)]['getItemEffectsSelfTpGainLabel']=function(){const _0x383540=_0x4ab1bf,_0x1c3070=VisuMZ['ItemsEquipsCore'][_0x383540(0x368)]['StatusWindow'][_0x383540(0x5bd)];return _0x1c3070[_0x383540(0x365)](TextManager['tp']);},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x3e7)]=function(){const _0x2fb3f0=_0x4ab1bf,_0x121edc=_0x2fb3f0(0x63e);if(this[_0x2fb3f0(0x288)][_0x121edc])return this['_customItemInfo'][_0x121edc];let _0x596614='';return this[_0x2fb3f0(0x44b)]['selfTP']>0x0?_0x596614+=_0x2fb3f0(0x3e8)[_0x2fb3f0(0x365)](this[_0x2fb3f0(0x44b)][_0x2fb3f0(0x413)]):_0x596614+='%1'[_0x2fb3f0(0x365)](this[_0x2fb3f0(0x44b)]['selfTP']),_0x596614;},Window_ShopStatus[_0x4ab1bf(0x4d5)]['drawItemEffectsHpDamage']=function(_0x597ac7,_0x56e752,_0x57c9f2){const _0x4f3b39=_0x4ab1bf,_0x3ad1ad=_0x4f3b39(0x4d7);if(this[_0x4f3b39(0x44b)][_0x4f3b39(0x2e9)]>=0x0&&this[_0x4f3b39(0x44b)][_0x4f3b39(0x617)]>=0x0&&!this[_0x4f3b39(0x288)][_0x3ad1ad])return![];const _0x407990=this['getItemEffectsHpDamageLabel']();this['drawItemKeyData'](_0x407990,_0x597ac7,_0x56e752,_0x57c9f2,!![]);const _0x3b5873=this[_0x4f3b39(0x517)]();return this[_0x4f3b39(0x320)](ColorManager[_0x4f3b39(0x346)](0x0)),this[_0x4f3b39(0x271)](_0x3b5873,_0x597ac7,_0x56e752,_0x57c9f2,![],_0x4f3b39(0x479)),this[_0x4f3b39(0x33d)](_0x597ac7,_0x56e752,_0x57c9f2),this[_0x4f3b39(0x284)](),!![];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x30c)]=function(){const _0x3ee750=_0x4ab1bf,_0x588d21=VisuMZ[_0x3ee750(0x3e3)]['Settings'][_0x3ee750(0x56d)][_0x3ee750(0x599)];return _0x588d21['format'](TextManager['hp']);},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x517)]=function(){const _0x3c920a=_0x4ab1bf,_0x1825c8=_0x3c920a(0x4d7);if(this[_0x3c920a(0x288)][_0x1825c8])return this[_0x3c920a(0x288)][_0x1825c8];let _0x404783='';if(this[_0x3c920a(0x44b)]['rateHP']<0x0)_0x404783+='%1%'[_0x3c920a(0x365)](Math[_0x3c920a(0x3c8)](this[_0x3c920a(0x44b)][_0x3c920a(0x2e9)]*0x64));if(this[_0x3c920a(0x44b)][_0x3c920a(0x2e9)]<0x0&&this[_0x3c920a(0x44b)]['flatHP']<0x0)_0x404783+='\x20';if(this[_0x3c920a(0x44b)][_0x3c920a(0x617)]<0x0)_0x404783+='%1'[_0x3c920a(0x365)](this[_0x3c920a(0x44b)][_0x3c920a(0x617)]);return _0x404783;},Window_ShopStatus[_0x4ab1bf(0x4d5)]['drawItemEffectsMpDamage']=function(_0x3b00ef,_0x4c3a3d,_0x3144cd){const _0x5b2e32=_0x4ab1bf,_0x4360c1=_0x5b2e32(0x46c);if(this[_0x5b2e32(0x44b)][_0x5b2e32(0x4ee)]>=0x0&&this['_itemData'][_0x5b2e32(0x2e0)]>=0x0&&!this[_0x5b2e32(0x288)][_0x4360c1])return![];const _0x31996a=this[_0x5b2e32(0x5c0)]();this[_0x5b2e32(0x271)](_0x31996a,_0x3b00ef,_0x4c3a3d,_0x3144cd,!![]);const _0x164dc8=this[_0x5b2e32(0x40a)]();return this[_0x5b2e32(0x320)](ColorManager[_0x5b2e32(0x346)](0x2)),this[_0x5b2e32(0x271)](_0x164dc8,_0x3b00ef,_0x4c3a3d,_0x3144cd,![],_0x5b2e32(0x479)),this[_0x5b2e32(0x33d)](_0x3b00ef,_0x4c3a3d,_0x3144cd),this[_0x5b2e32(0x284)](),!![];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5c0)]=function(){const _0x17876e=_0x4ab1bf,_0x1801e1=VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow']['LabelDamageMP'];return _0x1801e1[_0x17876e(0x365)](TextManager['mp']);},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x40a)]=function(){const _0x3a1420=_0x4ab1bf,_0x14f925=_0x3a1420(0x46c);if(this[_0x3a1420(0x288)][_0x14f925])return this['_customItemInfo'][_0x14f925];let _0x4f14d9='';if(this[_0x3a1420(0x44b)][_0x3a1420(0x4ee)]<0x0)_0x4f14d9+=_0x3a1420(0x29d)[_0x3a1420(0x365)](Math[_0x3a1420(0x3c8)](this[_0x3a1420(0x44b)][_0x3a1420(0x4ee)]*0x64));if(this[_0x3a1420(0x44b)]['rateMP']<0x0&&this[_0x3a1420(0x44b)][_0x3a1420(0x2e0)]<0x0)_0x4f14d9+='\x20';if(this[_0x3a1420(0x44b)]['flatMP']<0x0)_0x4f14d9+='%1'[_0x3a1420(0x365)](this[_0x3a1420(0x44b)][_0x3a1420(0x2e0)]);return _0x4f14d9;},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4fd)]=function(_0x125f6e,_0x19feaa,_0x5cbbc2){const _0x575c44=_0x4ab1bf,_0x48ee3c=_0x575c44(0x372);if(this['_itemData'][_0x575c44(0x319)]>=0x0&&!this[_0x575c44(0x288)][_0x48ee3c])return![];const _0xa3ae04=this['getItemEffectsTpDamageLabel']();this[_0x575c44(0x271)](_0xa3ae04,_0x125f6e,_0x19feaa,_0x5cbbc2,!![]);const _0x28c2e4=this[_0x575c44(0x396)]();return this[_0x575c44(0x320)](ColorManager['powerDownColor']()),this[_0x575c44(0x271)](_0x28c2e4,_0x125f6e,_0x19feaa,_0x5cbbc2,![],_0x575c44(0x479)),this[_0x575c44(0x33d)](_0x125f6e,_0x19feaa,_0x5cbbc2),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x640)]=function(){const _0x33f1ba=_0x4ab1bf,_0x3016d0=VisuMZ[_0x33f1ba(0x3e3)]['Settings'][_0x33f1ba(0x56d)]['LabelDamageTP'];return _0x3016d0['format'](TextManager['tp']);},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x396)]=function(){const _0xd8e2a=_0x4ab1bf,_0x1815f9=_0xd8e2a(0x372);if(this[_0xd8e2a(0x288)][_0x1815f9])return this['_customItemInfo'][_0x1815f9];let _0x4f7e24='';return _0x4f7e24+='%1'[_0xd8e2a(0x365)](this['_itemData'][_0xd8e2a(0x319)]),_0x4f7e24;},Window_ShopStatus['prototype'][_0x4ab1bf(0x30a)]=function(_0x416961,_0x32653e,_0x120803){const _0x9cd7a7=_0x4ab1bf,_0x57a68b=_0x9cd7a7(0x64a);if(!this[_0x9cd7a7(0x44b)]['addStateBuffChanges']&&!this['_customItemInfo'][_0x57a68b])return![];const _0x145914=this[_0x9cd7a7(0x5fd)]();this['drawItemKeyData'](_0x145914,_0x416961,_0x32653e,_0x120803,!![]);const _0x560eb5=this[_0x9cd7a7(0x677)]();return this[_0x9cd7a7(0x271)](_0x560eb5,_0x416961,_0x32653e,_0x120803,![],_0x9cd7a7(0x479)),this[_0x9cd7a7(0x33d)](_0x416961,_0x32653e,_0x120803),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x4ab1bf(0x5fd)]=function(){const _0x2db6d9=_0x4ab1bf;return VisuMZ['ItemsEquipsCore'][_0x2db6d9(0x368)][_0x2db6d9(0x56d)][_0x2db6d9(0x26c)];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x677)]=function(){const _0x5c76c3=_0x4ab1bf,_0x1eb07e='ADDED\x20EFFECTS';if(this[_0x5c76c3(0x288)][_0x1eb07e])return this[_0x5c76c3(0x288)][_0x1eb07e];let _0x41b094='',_0x2cbb58=0x0;const _0xe159d6=0x8;for(const _0x66a950 of this[_0x5c76c3(0x44b)][_0x5c76c3(0x5dc)]){if(_0x5c76c3(0x2da)!==_0x5c76c3(0x2da)){_0x4cbec3[_0x5c76c3(0x3ac)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x42fdbc=_0xf856f0(_0x1af9e3['$1'])['toUpperCase']()[_0x5c76c3(0x63f)]()[_0x5c76c3(0x548)](',');for(const _0x55465b of _0x42fdbc){_0xa92051[_0x5c76c3(0x2e4)]['push'](_0x55465b[_0x5c76c3(0x63f)]());}}else{const _0x4a86d3=$dataStates[_0x66a950];if(_0x4a86d3&&_0x4a86d3[_0x5c76c3(0x32f)]>0x0){_0x41b094+='\x5cI[%1]'['format'](_0x4a86d3[_0x5c76c3(0x32f)]),_0x2cbb58++;if(_0x2cbb58>=_0xe159d6)return _0x41b094;}}}for(let _0x3ba169=0x0;_0x3ba169<this['_itemData']['changeBuff']['length'];_0x3ba169++){const _0x32b30c=this['_itemData'][_0x5c76c3(0x2d0)][_0x3ba169],_0x40c401=Game_BattlerBase[_0x5c76c3(0x4d5)][_0x5c76c3(0x551)](_0x32b30c,_0x3ba169);if(_0x40c401>0x0){_0x41b094+='\x5cI[%1]'[_0x5c76c3(0x365)](_0x40c401),_0x2cbb58++;if(_0x2cbb58>=_0xe159d6)return _0x41b094;}}return _0x41b094;},Window_ShopStatus[_0x4ab1bf(0x4d5)]['drawItemEffectsRemovedStatesBuffs']=function(_0x1e2780,_0x1f714c,_0x4e2a84){const _0x2cdfb2=_0x4ab1bf,_0x13f993=_0x2cdfb2(0x417);if(!this[_0x2cdfb2(0x44b)]['removeStateBuffChanges']&&!this[_0x2cdfb2(0x288)][_0x13f993])return![];const _0x360527=this[_0x2cdfb2(0x582)]();this[_0x2cdfb2(0x271)](_0x360527,_0x1e2780,_0x1f714c,_0x4e2a84,!![]);const _0x248c29=this[_0x2cdfb2(0x474)]();return this[_0x2cdfb2(0x271)](_0x248c29,_0x1e2780,_0x1f714c,_0x4e2a84,![],_0x2cdfb2(0x479)),this['drawItemDarkRect'](_0x1e2780,_0x1f714c,_0x4e2a84),this[_0x2cdfb2(0x284)](),!![];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x582)]=function(){const _0x10cddb=_0x4ab1bf;return VisuMZ[_0x10cddb(0x3e3)][_0x10cddb(0x368)][_0x10cddb(0x56d)][_0x10cddb(0x478)];},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x474)]=function(){const _0xf9d1f1=_0x4ab1bf,_0x18d942=_0xf9d1f1(0x417);if(this['_customItemInfo'][_0x18d942])return this[_0xf9d1f1(0x288)][_0x18d942];let _0x2d83f2='',_0x5ef899=0x0;const _0x1ad9dc=VisuMZ[_0xf9d1f1(0x3e3)][_0xf9d1f1(0x368)]['StatusWindow'][_0xf9d1f1(0x618)];for(const _0x24ce75 of this[_0xf9d1f1(0x44b)]['removeState']){if(_0xf9d1f1(0x3ce)===_0xf9d1f1(0x3ce)){const _0x2a4fa2=$dataStates[_0x24ce75];if(_0x2a4fa2&&_0x2a4fa2[_0xf9d1f1(0x32f)]>0x0){_0x2d83f2+=_0xf9d1f1(0x514)[_0xf9d1f1(0x365)](_0x2a4fa2[_0xf9d1f1(0x32f)]),_0x5ef899++;if(_0x5ef899>=_0x1ad9dc)return _0x2d83f2;}}else _0x3721d0[_0xf9d1f1(0x3e3)][_0xf9d1f1(0x453)]['call'](this),this[_0xf9d1f1(0x3a2)]()&&this['onCategoryCancelItemsEquipsCore']();}for(let _0x432eaf=0x0;_0x432eaf<this[_0xf9d1f1(0x44b)]['removeBuff'][_0xf9d1f1(0x205)];_0x432eaf++){if('ciTXa'!==_0xf9d1f1(0x38f)){const _0x12c511=Game_BattlerBase[_0xf9d1f1(0x4d5)][_0xf9d1f1(0x551)](0x1,_0x432eaf);if(_0x12c511>0x0){_0x2d83f2+='\x5cI[%1]'[_0xf9d1f1(0x365)](_0x12c511),_0x5ef899++;if(_0x5ef899>=_0x1ad9dc)return _0x2d83f2;}}else return _0x383a06[_0xf9d1f1(0x3e3)][_0xf9d1f1(0x368)]['StatusWindow'][_0xf9d1f1(0x39e)];}for(let _0x56d842=0x0;_0x56d842<this[_0xf9d1f1(0x44b)]['removeDebuff'][_0xf9d1f1(0x205)];_0x56d842++){if(_0xf9d1f1(0x291)!==_0xf9d1f1(0x524)){const _0x40ee39=Game_BattlerBase['prototype'][_0xf9d1f1(0x551)](-0x1,_0x56d842);if(_0x40ee39>0x0){_0x2d83f2+=_0xf9d1f1(0x514)['format'](_0x40ee39),_0x5ef899++;if(_0x5ef899>=_0x1ad9dc)return _0x2d83f2;}}else return _0x5843ef[_0xf9d1f1(0x3e3)][_0xf9d1f1(0x368)][_0xf9d1f1(0x56d)][_0xf9d1f1(0x28d)];}return _0x2d83f2;},Window_ShopStatus[_0x4ab1bf(0x4d5)]['drawItemCustomEntries']=function(_0x37d123,_0x4385a1,_0x25f591){const _0x24cbd6=_0x4ab1bf;if(this[_0x24cbd6(0x55d)][_0x24cbd6(0x28b)][_0x24cbd6(0x3ac)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x9a058b=String(RegExp['$1'])[_0x24cbd6(0x548)](/[\r\n]+/);for(const _0x1972dd of _0x9a058b){if(_0x1972dd['match'](/(.*):[ ](.*)/i)){if(_0x24cbd6(0x54e)==='lXoRT'){const _0x52436e=String(RegExp['$1'])['trim'](),_0xce98e=String(RegExp['$2'])[_0x24cbd6(0x63f)]();this[_0x24cbd6(0x4e8)](_0x52436e,_0xce98e,_0x37d123,_0x4385a1,_0x25f591),_0x4385a1+=this[_0x24cbd6(0x672)]();}else{const _0x35ab0b=_0x24cbd6(0x63e);if(this[_0x24cbd6(0x288)][_0x35ab0b])return this[_0x24cbd6(0x288)][_0x35ab0b];let _0x3bb88a='';return this[_0x24cbd6(0x44b)][_0x24cbd6(0x413)]>0x0?_0x3bb88a+='+%1'[_0x24cbd6(0x365)](this[_0x24cbd6(0x44b)][_0x24cbd6(0x413)]):_0x3bb88a+='%1'['format'](this[_0x24cbd6(0x44b)][_0x24cbd6(0x413)]),_0x3bb88a;}}}}return this[_0x24cbd6(0x284)](),_0x4385a1;},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x4e8)]=function(_0x5047fc,_0x40cba0,_0x12589e,_0x1cdcd7,_0x1665b2){const _0x37ae69=_0x4ab1bf;this[_0x37ae69(0x271)](_0x5047fc,_0x12589e,_0x1cdcd7,_0x1665b2,!![]),this[_0x37ae69(0x271)](_0x40cba0,_0x12589e,_0x1cdcd7,_0x1665b2,![],_0x37ae69(0x479)),this['drawItemDarkRect'](_0x12589e,_0x1cdcd7,_0x1665b2),this[_0x37ae69(0x284)]();},Window_ShopStatus[_0x4ab1bf(0x4d5)][_0x4ab1bf(0x5e6)]=function(){const _0x25bcc9=_0x4ab1bf;if(!this[_0x25bcc9(0x55d)])return;const _0x3a6cfe=this[_0x25bcc9(0x55d)][_0x25bcc9(0x28b)],_0x3b48bf=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x5a9088=_0x3a6cfe[_0x25bcc9(0x3ac)](_0x3b48bf);if(_0x5a9088)for(const _0x189dc6 of _0x5a9088){if(_0x25bcc9(0x1fb)==='RzeeI'){_0x189dc6[_0x25bcc9(0x3ac)](_0x3b48bf);const _0x5f466e=String(RegExp['$1'])[_0x25bcc9(0x63f)]()||'';if(_0x5f466e==='')continue;const _0x5b7fec=ImageManager[_0x25bcc9(0x3b7)](_0x5f466e);_0x5b7fec[_0x25bcc9(0x628)](this[_0x25bcc9(0x249)][_0x25bcc9(0x664)](this,_0x5b7fec,this['_item']));}else{if(_0x5b5b80>=0x0)_0x44cf30===this[_0x25bcc9(0x2ff)]()&&(this['_doubleTouch']=!![]),this['activate'](),this[_0x25bcc9(0x37c)](_0x60649d);else _0x296bdc['hitIndex']()>=0x0&&(this[_0x25bcc9(0x578)](),this[_0x25bcc9(0x2de)]());}}},Window_ShopStatus['prototype']['drawCustomShopGraphicLoad']=function(_0x336ac9,_0x3e1134){const _0x1845b9=_0x4ab1bf;if(this[_0x1845b9(0x55d)]!==_0x3e1134)return;if(!_0x336ac9)return;if(_0x336ac9[_0x1845b9(0x621)]<=0x0||_0x336ac9[_0x1845b9(0x381)]<=0x0)return;const _0x11206b=_0x3e1134[_0x1845b9(0x28b)];let _0x5d5b08=_0x1845b9(0x3ef);_0x11206b['match'](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0x5d5b08='foreground');const _0x2e762f=_0x5d5b08===_0x1845b9(0x3ef)?this['contentsBack']:this[_0x1845b9(0x200)];let _0x431d9d=this[_0x1845b9(0x666)],_0x4c1888=this[_0x1845b9(0x263)];_0x11206b[_0x1845b9(0x3ac)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&('LJcmA'==='whkLb'?this[_0x1845b9(0x321)]():_0x431d9d=Number(RegExp['$1']));if(_0x11206b['match'](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)){if(_0x1845b9(0x4c7)!==_0x1845b9(0x2dd))_0x4c1888=Number(RegExp['$1']);else return _0x1f88d8[_0x1845b9(0x3e3)]['Settings']['StatusWindow'][_0x1845b9(0x2c6)];}if(_0x11206b[_0x1845b9(0x3ac)](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)){if(_0x1845b9(0x232)!==_0x1845b9(0x232)){const _0x353cd5=_0x1845b9(0x3af);if(this[_0x1845b9(0x288)][_0x353cd5])return this['_customItemInfo'][_0x353cd5];const _0x3e32e0=_0x5f1439[_0x1845b9(0x3e3)]['Settings'][_0x1845b9(0x56d)],_0x5105f3=_0x1845b9(0x612)[_0x1845b9(0x365)](this[_0x1845b9(0x55d)][_0x1845b9(0x53d)]);return _0x3e32e0[_0x5105f3];}else _0x431d9d=Number(RegExp['$1']),_0x4c1888=Number(RegExp['$2']);}const _0x517f09=Math[_0x1845b9(0x4b5)](0x1,_0x431d9d/_0x336ac9['width'],_0x4c1888/_0x336ac9[_0x1845b9(0x381)]);let _0x483450=0x0,_0x30415b=0x0,_0x33f6d2=Math['floor'](_0x336ac9[_0x1845b9(0x621)]*_0x517f09),_0x5e88ef=Math[_0x1845b9(0x3c8)](_0x336ac9[_0x1845b9(0x381)]*_0x517f09),_0x45238f=_0x1845b9(0x5b8);if(_0x11206b[_0x1845b9(0x3ac)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)){if(_0x1845b9(0x4d3)===_0x1845b9(0x535)){const _0x149c47=this['equipSlots']();for(let _0x26e1ce=0x0;_0x26e1ce<_0x149c47[_0x1845b9(0x205)];_0x26e1ce++){if(!this[_0x1845b9(0x3be)][_0x26e1ce])this[_0x1845b9(0x3be)][_0x26e1ce]=new _0x4888df();}this[_0x1845b9(0x5d9)](![]),this['refresh']();}else _0x45238f=String(RegExp['$1'])[_0x1845b9(0x61e)]()[_0x1845b9(0x63f)]();}if(_0x45238f===_0x1845b9(0x1fe))_0x1845b9(0x2dc)!==_0x1845b9(0x264)?_0x483450=0x0:_0x48bd7d[_0x1845b9(0x24c)](_0x2a7e72);else _0x45238f===_0x1845b9(0x5b8)?_0x483450=Math[_0x1845b9(0x329)]((this[_0x1845b9(0x666)]-_0x33f6d2)/0x2):_0x483450=this['innerWidth']-_0x33f6d2;let _0x23dec9='middle';_0x11206b[_0x1845b9(0x3ac)](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)&&(_0x1845b9(0x4a3)===_0x1845b9(0x257)?this['cursorRight'](_0x308530[_0x1845b9(0x31a)](_0x1845b9(0x479))):_0x23dec9=String(RegExp['$1'])['toLowerCase']()['trim']());if(_0x23dec9===_0x1845b9(0x331)){if('kxOvV'!==_0x1845b9(0x5a1))_0x30415b=0x0;else return this[_0x1845b9(0x3a2)]()?this[_0x1845b9(0x342)]():_0x553316[_0x1845b9(0x3e3)][_0x1845b9(0x5ec)][_0x1845b9(0x4b8)](this);}else _0x23dec9==='middle'?_0x30415b=Math[_0x1845b9(0x329)]((this[_0x1845b9(0x263)]-_0x5e88ef)/0x2):_0x30415b=this[_0x1845b9(0x263)]-_0x5e88ef;_0x11206b['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x483450+=Number(RegExp['$1']));_0x11206b[_0x1845b9(0x3ac)](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x1845b9(0x275)===_0x1845b9(0x275)?_0x30415b+=Number(RegExp['$1']):(_0x51334e[_0x1845b9(0x3e3)]['Scene_Shop_onBuyCancel'][_0x1845b9(0x4b8)](this),this[_0x1845b9(0x3a2)]()&&this[_0x1845b9(0x22c)]()));_0x11206b[_0x1845b9(0x3ac)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)&&('TjUcs'===_0x1845b9(0x430)?(_0x483450+=Number(RegExp['$1']),_0x30415b+=Number(RegExp['$2'])):_0x405887=_0x1845b9(0x34a)[_0x1845b9(0x365)](_0x4dddc3['id']));let _0x3db82d=0xff;if(_0x11206b['match'](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i)){if(_0x1845b9(0x651)!==_0x1845b9(0x581))_0x3db82d=Number(RegExp['$1']);else{const _0x479705=this[_0x1845b9(0x595)]();this[_0x1845b9(0x271)](_0x479705,_0x1d4de0,_0x12dc67,_0x2f6e0e,!![]);const _0x407c74=this[_0x1845b9(0x566)]();return this[_0x1845b9(0x271)](_0x407c74,_0x4a5ad1,_0xf6f230,_0x5099f1,![],'right'),this['drawItemDarkRect'](_0x12614f,_0x523790,_0x526cdf),this[_0x1845b9(0x284)](),!![];}}else _0x11206b[_0x1845b9(0x3ac)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)&&('SSVTV'!==_0x1845b9(0x313)?_0x4088d2=_0x347003[_0x1845b9(0x5e5)][_0x2d8979(_0x349f85['$1'])]||'':_0x3db82d=Math['round'](Number(RegExp['$1'])*0.01*0xff)[_0x1845b9(0x5ed)](0x0,0xff));_0x2e762f[_0x1845b9(0x2bb)]=_0x3db82d,_0x2e762f[_0x1845b9(0x28a)](_0x336ac9,0x0,0x0,_0x336ac9[_0x1845b9(0x621)],_0x336ac9[_0x1845b9(0x381)],_0x483450,_0x30415b,_0x33f6d2,_0x5e88ef),_0x2e762f[_0x1845b9(0x2bb)]=0xff;};