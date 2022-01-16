//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.50;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.50] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
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
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
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
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
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
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
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
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
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
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
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
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
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
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
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
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
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
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
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
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
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
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
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
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
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
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
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
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
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
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x2bd3fa=_0x4271;(function(_0x32c3ec,_0x2b570e){const _0x1aca94=_0x4271,_0x2d959d=_0x32c3ec();while(!![]){try{const _0x3f037e=-parseInt(_0x1aca94(0x3d9))/0x1*(-parseInt(_0x1aca94(0x755))/0x2)+-parseInt(_0x1aca94(0x5a3))/0x3*(parseInt(_0x1aca94(0x3ff))/0x4)+-parseInt(_0x1aca94(0x857))/0x5+-parseInt(_0x1aca94(0x563))/0x6*(parseInt(_0x1aca94(0x7e4))/0x7)+parseInt(_0x1aca94(0x685))/0x8*(parseInt(_0x1aca94(0x1bb))/0x9)+-parseInt(_0x1aca94(0x178))/0xa*(parseInt(_0x1aca94(0x22d))/0xb)+parseInt(_0x1aca94(0x565))/0xc*(parseInt(_0x1aca94(0x37a))/0xd);if(_0x3f037e===_0x2b570e)break;else _0x2d959d['push'](_0x2d959d['shift']());}catch(_0x26a4ec){_0x2d959d['push'](_0x2d959d['shift']());}}}(_0x4881,0x2201c));function _0x4881(){const _0x492d8e=['\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','loadTitle1','mainAreaTop','PLRRI','reserveNewGameCommonEvent','opacity','_commandList','isMenuButtonAssistEnabled','WIN_OEM_COPY','paramValueByName','Scene_Options_create','CYNtN','isOpen','DcwSj','DummyBgType','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ColorMPGauge1','keyRepeatWait','ENTER_SPECIAL','_buttonType','Settings','LINEAR','worldTransform','createPageButtons','ktPFV','drawItem','processPointAnimationRequests','fromCharCode','escape','NoTileShadows','mapId','blockWidth','Speed','RequireFocus','BppYC','buttonAssistWindowButtonRect','Scene_Title_drawGameTitle','hpGaugeColor1','SystemSetSideView','Window_StatusBase_drawActorLevel','Upper\x20Left','pLMRv','onerror','ColorHPGauge1','VdKGc','gugZG','_backSprite2','processBack','_shakeDuration','SParameterFormula','CAPSLOCK','gljLe','XEWUH','sqrt','rgba(0,\x200,\x200,\x200.7)','rgba(0,\x200,\x200,\x201.0)','Window_Selectable_itemRect','GoldFontSize','OutlineColor','educN','_stored_mpCostColor','processAlwaysEscape','AccuracyBoost','IconSParam8','ColorTPCost','xBnmw','%1:\x20Exit\x20','_coreEasingType','pageup','FunctionName','CZgZN','InputRect','PixelateImageRendering','playTestCtrlT','dummyWindowRect','drawValue','destroyCoreEngineMarkedBitmaps','NUM','isRightInputMode','moveCancelButtonSideButtonLayout','Map%1','SwitchRandomizeOne','gaugeHeight','commandWindowRect','SbtUk','IXktb','OPEN_CURLY_BRACKET','ctGaugeColor1','TCZVP','DigitGroupingLocale','Ukimv','PAUSE','command122','_colorCache','COLON','drawActorSimpleStatus','WIN_OEM_FJ_TOUROKU','setMoveEasingType','_dummyWindow','mmBXa','_destroyInternalTextures','isHandled','list','GoldBgType','ESC','getCombinedScrollingText','_downArrowSprite','DEXCq','IconParam6','OutlineColorDmg','rCkPT','XParamVocab1','maxLvGaugeColor1','_pollGamepads','integer','string','vXTSJ','DOLLAR','YLhLv','Scene_MenuBase_mainAreaTop','KizNy','Scene_Battle_createCancelButton','paramBaseAboveLevel99','buttonY','ApLQX','Scene_Boot_startNormalGame','jaiIh','responseText','stop','smoothSelect','pixelated','Scene_Name_onInputOk','darwin','ExtractStrFromTroop','ARRAYSTR','EndingID','refresh','ParseSkillNotetags','TextCodeClassNames','bind','removeAllFauxAnimations','isMaxLevel','Scene_Battle_update','78150Lmrdgo','ProfileRect','getColor','NRkde','CallHandlerJS','Mute','isCollidedWithEvents','createBackground','HASH','padZero','LUK','save','_mapNameWindow','IconParam5','INCIRC','_targetAnchor','ItemBackColor2','render','round','_closing','isTouchedInsideFrame','WindowLayer_render','_numberWindow','LESS_THAN','isGamepadButtonPressed','_addShadow','reduce','processKeyboardEnd','drawGameVersion','HRG','$dataMap','alignBottom','GoldOverlap','isActiveTpb','parseForcedGameTroopSettingsCoreEngine','usableSkills','isTriggered','changeClass','openness','XParamVocab2','_scaleX','move','paramRateJS','_offsetY','HOME','Sprite_Button_updateOpacity','GetParamIcon','sparamFlatBonus','Flat','%1〘Choice\x20Cancel〙%1','ShowDevTools','_stored_powerDownColor','image-rendering','SellRect','windowPadding','drawText','pagedown','helpAreaTopSideButtonLayout','MAX_GL_TEXTURES','JuksF','onInputBannedWords','ActorHPColor','ExportStrFromAllMaps','Game_Character_processMoveCommand','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','Conditional\x20Branch\x20Script\x20Error','MAT','2898wFqCiN','exec','dashToggle','_targetOffsetY','changeTextColor','requestMotion','Bitmap_resize','_context','context','_anchor','Window_NameInput_cursorUp','TitleCommandList','kyVAA','AqZyZ','paramRate2','_digitGroupingEx','MEanI','Plus2','updateOrigin','setAnchor','actor','_hovered','_stored_deathColor','_repositioned','PXLYE','currentLevelExp','Scene_Map_updateScene','DELETE','Scene_MenuBase_createCancelButton','LYRlP','GZQvH','IconIndex','FontShadows','ActorRect','updateWaitMode','(\x5cd+)([%％])>','valueOutlineColor','openingSpeed','SystemSetWindowPadding','OpenURL','bsBPA','pointY','IffPG','processCursorHomeEndTrigger','_targetOffsetX','_actorWindow','animations','_stored_tpCostColor','SParamVocab1','OPEN_PAREN','MaFnS','CDCIF','CANCEL','getLastPluginCommandInterpreter','HANJA','Spriteset_Base_isAnimationPlaying','Map%1.json','Bitmap_strokeRect','ETB','WIN_OEM_PA2','call','description','listWindowRect','initMembers','playCursor','drawGoldItemStyle','BBMXR','InKbb','ShowJS','wRyaF','CpUIs','qxqsb','keyboard','_isButtonHidden','GfZHt','SkillTypeBgType','itemHeight','getCoreEngineScreenShakeStyle','eILrD','PHA','EQUALS','xparamFlatBonus','CEV','makeDeepCopy','jRtON','VOLUME_DOWN','horzJS','playOk','jncMC','uiAreaHeight','_origin','LqIyE','processKeyboardBackspace','duration','CategoryBgType','TitlePicButtons','Flat1','system','hideButtonFromView','updateEffekseer','ItemStyle','ButtonAssist','xNPHR','stypeId','_clickHandler','BgFilename2','keyMapper','Game_Picture_move','RwCCO','BTestItems','makeTargetSprites','Game_BattlerBase_refresh','WOGKu','makeCommandList','99rMRbZf','Scene_MenuBase_mainAreaHeight','TimeProgress','(\x5cd+)>','BhNXJ','catchNormalError','#%1','XParamVocab0','Bitmap_fillRect','createDimmerSprite','OUTELASTIC','loadPicture','getInputMultiButtonStrings','consumeItem','_pointAnimationQueue','〘Scrolling\x20Text〙\x0a','isNumpadPressed','gainGold','Spriteset_Base_update','XwOaf','Olhnz','processKeyboardDigitChange','_spriteset','EquipMenu','xfQlQ','_stored_tpGaugeColor1','playLoad','expGaugeColor1','CoreEngine','zWFhM','Scene_Menu_create','dAXZf','NUMPAD5','makeDocumentTitle','clamp','iconHeight','MenuBg','Scene_Base_terminateAnimationClearBugFix','log','isOptionValid','_data','loadIconBitmap','isGameActive','isActor','updateTransform','buttons','Show\x20Scrolling\x20Text\x20Script\x20Error','VisuMZ_2_BattleSystemETB','meVolume','SRCcl','cursorPageup','ButtonHeight','OutlineColorGauge','dWzEu','LineHeight','removeOnceParallelInterpreter','WIN_OEM_JUMP','DrawIcons','drawParamText','GmlgB','mpGaugeColor2','moveRelativeToResolutionChange','pbFIm','PRINTSCREEN','Graphics_printError','setup','process_VisuMZ_CoreEngine_jsQuickFunctions','vzjRq','add','updateAnchor','EnableNumberInput','MAXHP','targetEvaRate','_mainSprite','exportAllMapStrings','onKeyDownKeysF6F7','GTLge','ALWAYS','itemHit','CTB','Jcoxn','fillStyle','SlotRect','TUluc','KpgQd','Sprite_Picture_loadBitmap','sparamFlatJS','snapForBackground','JvMac','ACCEPT','BottomButtons','gainItem','ColorTPGauge2','TCR','strokeRect','mainAreaBottom','buttonAssistCancel','LvExpGauge','toLocaleString','setMainFontSize','COMMA','F6key','openURL','IconSParam4','SPACE','_stored_mpGaugeColor1','ParamMax','mtUcV','EnableMasking','SnapshotOpacity','RepositionActors','cos','easingType','CLOSE_BRACKET','Game_System_initialize','process_VisuMZ_CoreEngine_CustomParameters','_backgroundSprite','skillTypeWindowRect','numberShowButton','GoldRect','down2','F22','xparamPlus2','Bitmap_blt','toLowerCase','processSoundTimings','_isPlaytest','dTjix','Tilemap_addShadow','vICfa','forceStencil','ParseClassNotetags','systemColor','F16','_opening','PreserveNumbers','Abbreviation','outlineColor','Window_NameInput_cursorDown','bRBZE','GldEX','_screenX','BlurFilter','AGI','NUMPAD1','ahAFP','levelUpRecovery','XParamVocab6','DimColor2','startMove','_registerKeyInput','setSideButtonLayout','RowSpacing','CNT','send','deselect','tkzbH','INQUINT','areButtonsOutsideMainUI','qSBsz','enter','createMenuButton','drawCurrencyValue','onMoveEnd','option','characters','StatusEquipRect','_lastOrigin','KeySHIFT','startShake','titleCommandWindow','registerCommand','vqeIc','showPointAnimations','ZERO','DamageColor','targetX','LNHbP','F18','Input_onKeyDown','ColorCrisis','EditRect','_listWindow','EXR','en-US','startAutoNewGame','sv_actors','clear','OptionsMenu','ADD','_internalTextures','command355','updateMain','command105','gGdnJ','ceil','VaHcg','ExtractStrFromMap','ColorHPGauge2','CnCQB','needsUpdate','commandWindowRows','param','ParamChange','traitObjects','bjXqb','applyCoreEasing','wYfzi','onEscapeSuccess','VisuMZ_2_BattleSystemCTB','_buttonAssistWindow','nGQeg','(\x5cd+\x5c.?\x5cd+)>','gameTitle','sparamRate2','numRepeats','XrfJd','match','playOnceParallelInterpreter','Dslqc','tileWidth','GRD','process_VisuMZ_CoreEngine_Settings','UGcIq','INELASTIC','uwfoC','height','SParamVocab8','_windowskin','_active','_isWindow','isMaskingEnabled','cjGrf','qUGbp','INOUTEXPO','_battlerName','WIN_OEM_FJ_ROYA','clearStencil','kyIJo','isAnimationOffsetXMirrored','META','stencilOp','clone','LJpBm','CEtUe','colSpacing','showDevTools','VisuMZ_2_BattleSystemPTB','processKeyboardHome','Window_Base_initialize','initVisuMZCoreEngine','setSkill','rKmHi','TKCdB','_coreEngineShakeStyle','sCsZi','normalColor','ActorMPColor','Game_Action_setAttack','IDs','ARRAYSTRUCT','ScreenShake','playBuzzer','PDR','MDF','_refreshBack','Window_Base_drawText','NewYj','_cacheScaleY','optionsWindowRect','_sellWindow','createBuffer','OUTCUBIC','SEPARATOR','getPointAnimationLayer','smooth','0.00','xparamFlatJS','hVXVt','cUAfP','toUpperCase','createFauxAnimationSprite','_stored_expGaugeColor1','Enable','xdg-open','NLieu','Game_Screen_initialize','hmeqk','DOWN','setCoreEngineUpdateWindowBg','Scene_Item_create','makeFontBigger','Game_Party_consumeItem','OpenConsole','setHandler','_fauxAnimationSprites','VisuMZ_2_BattleSystemOTB','PA1','EXECUTE','Bitmap_measureTextWidth','right','buttonAssistText3','resize','tEoxQ','Window_NumberInput_processDigitChange','Enemy','OUTBOUNCE','_paramPlus','uQvjX','HIT','helpAreaHeight','_commandWindow','BattleSystem','IconParam7','setActorHomeRepositioned','_makeFontNameText','createPointAnimationSprite','MZYMw','JsUoB','UYfzW','NfUkO','GlXel','JSON','SParamVocab0','img/%1/','ColorDeath','ctrl','EzBmE','stringKeyMap','originalJS','note','SParamVocab4','_width','3718wNqxMi','TaJEy','<JS\x20%1\x20%2:[\x20](.*)>','Game_Action_itemHit','_sideButtonLayout','animationNextDelay','StatusBgType','createCommandWindow','AutoStretch','khKMo','ZknfN','_helpWindow','QCymB','textHeight','missed','Linear','outlineColorDmg','targetBackOpacity','vaggY','Max','filter','onClick','DigitGroupingGaugeSprites','cancel','LQAeh','_profileWindow','Color','END','paramchangeTextColor','DataManager_setupNewGame','processMoveCommand','ExportCurMapText','OkText','vvjew','getGamepads','LevelUpFullMp','anchor','font-smooth','outbounce','DQTEw','setColorTone','clearRect','IconParam2','batch','writeFile','Key%1','_gamepadWait','yVgig','type','RLPRj','xScrollLinkedOffset','SKTRm','bvZuk','_statusEquipWindow','tilesets','join','pressed','_pagedownButton','_pictureContainer','MODECHANGE','Game_Event_isCollidedWithEvents','DocumentTitleFmt','BasicParameterFormula','zKaRr','ColorManager_loadWindowskin','paramFlat','displayY','KeyItemProtect','INOUTELASTIC','XMzMx','([\x5c+\x5c-]\x5cd+)>','drawFace','cjiWr','tagwd','REPLACE','ctrlKey','_dimmerSprite','Window_Gold_refresh','isBottomButtonMode','INOUTSINE','ParseWeaponNotetags','isUseModernControls','buttonAssistText2','INOUTBACK','setValue','xparamPlus','lBTkj','updateData','_viewportSize','Gold','enable','_statusParamsWindow','rightArrowWidth','Game_Picture_calcEasing','number','215115TFYNQX','MDR','textColor','initMembersCoreEngine','targetOpacity','hMhIq','drawGameSubtitle','tJkde','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','updateFauxAnimations','updateMove','〘Common\x20Event\x20%1:\x20%2〙\x20End','_baseTexture','Qroam','setCoreEngineScreenShakeStyle','WOBIg','endAnimation','setFrame','onload','EscapeAlways','members','updatePositionCoreEngine','mev','original','FHZym','qApby','_movementWholeDuration','INSERT','SqVJv','EditBgType','_stored_maxLvGaugeColor1','pPmtO','retreat','_cache','key%1','_cancelButton','LEFT','menuShowButton','422908iXcrZb','OTB','toString','skillId','xparamRateJS','EnableNameInput','Game_Action_numRepeats','YFoEu','DimColor1','Scene_Unlisted','BTB','expRate','PictureID','sv_enemies','AntiZoomPictures','Input_pollGamepads','EISU','rgTGF','destroyed','mhp','SLASH','encounterStep','Game_Temp_initialize','inbounce','Window_EquipItem_isEnabled','isMapScrollLinked','Padding','paramPlus','allowShiftScrolling','QhTWd','paramPlusJS','setupNewGame','getColorDataFromPluginParameters','itypeId','createEnemies','DSnOk','MIN_SAFE_INTEGER','Nrdbr','SwitchToggleOne','XParamVocab5','Scene_Name_create','Window_ShopSell_isEnabled','MainMenu','_targetX','RevertPreserveNumbers','_maxDigits','SystemSetFontSize','updateLastTarget','default','Scene_Shop_create','concat','KeyTAB','itemLineRect','IconXParam6','makeActionList','translucentOpacity','updatePositionCoreEngineShakeOriginal','_refreshArrows','sparamFlat2','buttonAssistText5','OmVgD','IconSet','_centerElement','connected','SwitchActorText','AllTroops','ShopMenu','_index','TMsYA','filterArea','CONTEXT_MENU','BgFilename1','paramX','includes','XParamVocab4','createTitleButtons','font','_pageupButton','ExtractStrFromList','bitmap','AllMaps','gradientFillRect','isPressed','updatePictureAntiZoom','paramWidth','titles1','_fauxAnimationQueue','nmmSF','PIPE','requestFauxAnimation','updateClose','Window','shift','%1〘End\x20Choice\x20Selection〙%1','inBattle','NUM_LOCK','_lastPluginCommandInterpreter','maxLevel','ZaDaA','EXCLAMATION','visible','DIVIDE','useFontWidthFix','Window_Base_drawFace','UYbBW','_inputSpecialKeyCode','gaugeBackColor','Game_Picture_initBasic','focus','OUTQUAD','wIZUZ','MapOnceParallel','onButtonImageLoad','IconXParam7','Indzk','qxZpD','Window_Selectable_processTouch','erasePicture','ListBgType','drawRightArrow','Scene_Map_initialize','padding','cFUAY','valueOutlineWidth','ztXJs','SParamVocab7','URL','AnimationPoint','zhssi','_currentMap','isNwjs','constructor','mainAreaTopSideButtonLayout','kgYPh','eJIKM','_clientArea','JUNJA','uXSnr','Sprite_Animation_setViewport','IconParam3','imageSmoothingEnabled','SystemLoadImages','iVimm','IconXParam0','isInputting','origin','removeAllPointAnimations','iconWidth','doesNameContainBannedWords','_movementDuration','OUTSINE','SkillTypeRect','IconXParam8','VisuMZ_2_BattleSystemBTB','isRepeated','JqBXn','removePointAnimation','qAsTS','IconSParam6','Scene_Status_create','_troopId','drawParamName','INOUTQUINT','repeat','CsAiJ','bitmapHeight','initButtonHidden','_stored_expGaugeColor2','paramMax','isSideButtonLayout','touchUI','_margin','DigitGroupingExText','sparamRate1','buttonAssistKey5','processTimingData','targetPosition','determineSideButtonLayoutValid','ColorCTGauge2','sRwoL','buttonAssistWindowSideRect','isSceneMap','initialLevel','IconXParam2','NUMPAD6','mbjIk','UFRTz','TAB','RHHLQ','coreEngineRepositionEnemies','level','createCancelButton','Bitmap_drawText','_stored_crisisColor','createCustomBackgroundImages','VRYTh','Bitmap_drawTextOutline','hpGaugeColor2','aEiRq','setActorHome','hide','active','PictureShowIcon','setActionState','setBackgroundOpacity','PySye','levelUp','hit','REC','categoryWindowRect','oBNFc','Window_Selectable_cursorUp','ColorPowerDown','startNormalGame','flush','initialize','Game_Interpreter_command105','performEscape','CIRCUMFLEX','playTestF6','_moveEasingType','isSmartEventCollisionOn','_statusWindow','processTouch','_stored_gaugeBackColor','HelpRect','_shouldPreventDefault','exportAllTroopStrings','Qqtjt','qxxZw','PERIOD','picture','ModernControls','getCustomBackgroundSettings','toFixed','startAnimation','_stored_ctGaugeColor1','ParseTilesetNotetags','playMiss','F10','ColorNormal','SParamVocab9','bdfnR','enemies','updateDashToggle','button','SceneManager_initialize','setupCoreEngine','isPlaytest','animationId','RIGHT','animationBaseDelay','lineHeight','createTroopNote','printError','processEscape','textWidth','_targetScaleX','process_VisuMZ_CoreEngine_Functions','MCR','PictureEraseAll','center','calcCoreEasing','_inputWindow','HiMcJ','InputBgType','<%1\x20%2:[\x20]','MultiKeyFmt','params','Sprite_Battler_startMove','CommandRect','inputWindowRect','SmartEventCollisionPriority','Plus','createJsQuickFunction','ColorExpGauge1','Chance','_muteSound','mmp','updateOnceParallelInterpreters','volume','xparam','_onceParallelInterpreters','QPGWr','XueGk','learnings','GoldChange','ESSzY','bHCIz','Scene_Boot_updateDocumentTitle','ALTGR','contains','max','StatusMenu','checkCacheKey','XParamVocab7','QalCh','YKsMP','windowOpacity','ColorSystem','StartID','pagedownShowButton','skills','mpCostColor','NWVkV','skillTypes','ygsjl','ZJGyW','GkDGA','Window_NameInput_cursorRight','removeChild','drawTextEx','clearCachedKeys','removeFauxAnimation','Window_Base_update','BattleManager_processEscape','item','isGamepadConnected','updateKeyText','isCancelled','\x0a\x0a\x0a\x0a\x0a','title','areTileShadowsHidden','_animationQueue','processFauxAnimationRequests','pbrJs','INOUTCIRC','NewGameCommonEventAll','AflhK','KVriw','_tilemap','updatePlayTestF7','setViewport','contentsBack','RgNeP','Actor','xparamRate2','hSQuz','isInstanceOfSceneMap','OptionsBgType','cVzVL','sin','Scene_Battle_createSpriteset','SsSIM','updateOpen','setBackgroundType','Window_NameInput_refresh','STENCIL_BUFFER_BIT','_battleField','currentClass','IconXParam1','helpAreaTop','loadSystem','SwitchRandomizeRange','CSMVu','itemBackColor1','276yeafJN','createTextState','10212TzFPAy','isSideView','PTB','itemHitImprovedAccuracy','isAnimationPlaying','_defaultStretchMode','mPfjx','DefaultMode','processCursorMove','ColorExpGauge2','Sprite_Actor_setActorHome','drawCurrentParam','ParseItemNotetags','Window_Selectable_cursorDown','eva','MRG','titles2','Page','isSceneBattle','F11','SideView','setAttack','FontSize','Basic','replace','isNextScene','getButtonAssistLocation','map','buttonAreaHeight','faces','blt','text','evaluate','Flat2','_editWindow','IconXParam5','CreateBattleSystemID','zxUUd','initialBattleSystem','ColorMPGauge2','_timerSprite','ImprovedAccuracySystem','OpenSpeed','Exlux','jCRlt','measureTextWidthNoRounding','_goldWindow','buttonAssistSwitch','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','switchModes','_setupEventHandlers','cursorRight','push','Window_NameInput_cursorLeft','index','paramBase','NJSQR','NUMPAD3','end','format','KtvSD','QFQNp','3XVXBTz','RWbnl','updateShadow','smallParamFontSize','drawNewParam','Window_Selectable_drawBackgroundRect','addWindow','gSEmH','Game_Actor_changeClass','randomInt','sparam','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','TvgNM','YpAnN','dimColor1','itemWindowRect','IconSParam5','sKLUx','createPointAnimationTargets','isPhysical','DATABASE','return\x200','textSizeEx','TRG','CancelText','updateBackOpacity','tpCostColor','WIN_OEM_PA3','Game_Picture_show','maxLvGaugeColor2','requestPointAnimation','_targetOpacity','isKeyItem','isPointAnimationPlaying','catchLoadError','_drawTextOutline','TRAIT_PARAM','targetSpritePosition','_shakeSpeed','ShowButtons','isMagical','arSxB','mpszj','setCommonEvent','_drawTextShadow','_onKeyPress','Game_Interpreter_command122','_playTestFastMode','Game_Map_setup','isDying','targetContentsOpacity','FDR','INEXPO','buttonAssistOffset2','ParseActorNotetags','stretch','WIN_OEM_FINISH','ProfileBgType','nw.gui','updatePositionCoreEngineShakeVert','Unnamed','MRF','\x5c}❪TAB❫\x5c{','Window_StatusBase_drawActorSimpleStatus','style','create','buttonAssistKey1','TdQAI','Symbol','drawActorLevel','PhIPr','mpGaugeColor1','_list','dwsAp','loadGameImagesCoreEngine','altKey','Sprite_Picture_updateOrigin','Title','dKVtZ','open','buttonAssistKey%1','loadMapData','_mp','nStiG','IconXParam4','version','ghgOw','enemy','DrawItemBackgroundJS','GameEnd','JsBHn','horizontal','Script\x20Call\x20Error','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','isFullDocumentTitle','fillRect','SParamVocab5','PositionJS','SParamVocab6','Game_Troop_setup','itemPadding','status','sparamFlat1','paramRate1','areButtonsHidden','_targetScaleY','ParamName','framebuffer','Pixelated','resetTextColor','value','_realScale','qYRTP','parameters','yoiRV','ApplyEasing','TILDE','_commonEventLayers','iIPAy','VisuMZ_2_BattleSystemFTB','select','createWindowLayer','ParseStateNotetags','initCoreEngine','OUTBACK','isGamepadTriggered','Game_Action_itemEva','F12','maxCols','_changingClass','QXnzn','applyForcedGameTroopSettingsCoreEngine','TextManager_param','CLOSE_PAREN','ColorMaxLvGauge1','_stored_systemColor','fadeSpeed','get','AkkqK','EAatV','DEF','_backgroundFilter','playCursorSound','Y:\x20%1','_storedMapText','Scene_MenuBase_createBackground','ZePdf','BtzRQ','itemRect','ExtJS','NHxrU','ItemBgType','ihsSQ','hWTlZ','Sprite_destroy','setBattleSystem','_customModified','KHjAq','createSpriteset','ListRect','X:\x20%1','applyEasing','Smooth','TJcoJ','DOUBLE_QUOTE','CustomParamType','SceneManager_isGameActive','measureTextWidth','setSize','UEqRY','code','ATK','qhgbg','mainCommandWidth','statusWindowRect','Bitmap_drawCircle','VisuMZ_1_OptionsCore','setupButtonImage','Window_NumberInput_start','VHHyN','_slotWindow','playEscape','MfUPz','paramName','Window_NameInput_cursorPagedown','ImgLoad','cancelShowButton','createPointAnimationQueue','zbWrE','_height','_balloonQueue','subjectHitRate','Game_Interpreter_updateWaitMode','seVolume','eaFsr','Scene_Boot_onDatabaseLoaded','retrievePointAnimation','Scene_Equip_create','Manual','_stored_maxLvGaugeColor2','fontSize','Kpwdi','Control\x20Variables\x20Script\x20Error','INOUTCUBIC','isExpGaugeDrawn','_lastX','calcEasing','menu','reservePlayTestNewGameCommonEvent','xparamPlusJS','waiting','win32','ColorGaugeBack','Duration','_pictureCoordinatesWindow','_mode','yUlWj','jHzQD','yRaOV','zBmMB','UpdatePictureCoordinates','IconParam1','DpSVz','Scene_Map_createSpriteset','innerWidth','DisplayedParams','912VeRovc','show','addLoadListener','addCommand','bgs','createPointAnimation','isArrowPressed','_onKeyDown','makeCoreEngineCommandList','storeMapData','Spriteset_Base_initialize','IconSParam0','resetFontSettings','Sprite_Gauge_gaugeRate','useDigitGrouping','ExportAllMapText','JCfJb','PLUS','Scene_Base_createWindowLayer','_duration','catchException','innerHeight','_backSprite1','gPNob','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ddlEA','StatusRect','layoutSettings','ItemHeight','EVA','XNPpv','Bitmap_gradientFillRect','bitmapWidth','vILKF','SLEEP','setMute','_optionsWindow','command357','setupValueFont','_effectsContainer','test','setViewportCoreEngineFix','WIN_ICO_HELP','terminate','encounterStepsMinimum','Center','F23','CrisisRate','_forcedBattleSys','addChild','([\x5c+\x5c-]\x5cd+)([%％])>','CategoryRect','shake','KEEP','%1〘Choice\x20%2〙\x20%3%1','RegExp','_buyWindow','makeFontSmaller','CustomParamNames','bgm','setTargetAnchor','Sprite_AnimationMV_processTimingData','_opacity','OnIrt','_updateFilterArea','gVdMs','drawActorClass','FINAL','drawActorExpGauge','Spriteset_Battle_createEnemies','GoldIcon','_upArrowSprite','EXSEL','ColSpacing','processHandling','down','Location','boxHeight','STENCIL_TEST','cuPYb','canEquip','stencilFunc','RkNjm','SeLAn','QbZFp','blendFunc','offsetY','ESFjr','backOpacity','MenuLayout','setSideView','pow','createFauxAnimationQueue','restore','SULTW','asin','profileWindowRect','F20','ConvertParams','Input_clear','_createInternalTextures','normal','IfFxc','home','nickname','vOujn','backspace','processDigitChange','hrAqo','NewGameBoot','top','ColorMaxLvGauge2','drawAllParams','_tempActor','HelpBgType','ARRAYEVAL','buttonAssistWindowRect','INSINE','vwseI','makeAutoBattleActions','actorWindowRect','abs','isOpenAndActive','performMiss','Bitmap_initialize','Scene_MenuBase_createPageButtons','cursorUp','BuyRect','PictureFilename','isItem','uOazX','ExportStrFromAllTroops','jXEef','pictureButtons','adjustPictureAntiZoom','%1\x0a','playTestF7','maxItems','_animation','Untitled','contents','OUTQUART','vbuyO','IconSParam9','addOnceParallelInterpreter','buttonAssistOffset5','mainFontSize','initDigitGrouping','IconParam4','_scaleY','mainAreaHeight','SCALE_MODES','IconXParam9','buttonAssistText4','_inputString','mAoGE','_windowLayer','scale','loadBitmap','drawCircle','isAlive','uZpEr','Game_Picture_x','BACKSPACE','TranslucentOpacity','wait','onXhrError','cursorPagedown','StatusEquipBgType','IconSParam1','_skillTypeWindow','EQUAL','STB','SkillMenu','expGaugeColor2','repositionCancelButtonSideButtonLayout','ColorMPCost','SlotBgType','BuyBgType','CustomParamAbb','setClickHandler','Rate1','Game_Picture_updateMove','ezoKx','initBasic','fkgFI','width','WYknI','powerDownColor','hPiSM','Window_Base_drawIcon','moveMenuButtonSideButtonLayout','isClosed','pictures','windowRect','_mirror','NUMPAD4','createDigits','optSideView','_pictureCoordinatesMode','drawCharacter','Sprite_Animation_processSoundTimings','RepositionEnemies','UEtLt','isSpecialCode','_forcedTroopView','PictureEasingType','battlebacks2','2OMQzvF','_targetY','updatePictureCoordinates','skipBranch','PGDN','jxEVC','advanced','battleSystem','_itemWindow','cursorLeft','ParseEnemyNotetags','CommandBgType','%1/','QoL','canUse','eSPeF','〘Show\x20Text〙\x0a','ObJxU','CONVERT','INQUART','gainSilentTp','GET','setEasingType','_playtestF7Looping','dimColor2','\x5c}❪SHIFT❫\x5c{','_pauseSignSprite','aqHFd','gaugeRate','_shakePower','eklLk','remove','isAnimationForEach','oRvyh','updatePadding','SwitchToggleRange','CustomParamIcons','INCUBIC','damageColor','prototype','_offsetX','paramY','uyVUv','isFauxAnimationPlaying','Game_Picture_y','_smooth','sparamRate','KByDI','NONCONVERT','Rate2','VisuMZ_2_BattleSystemSTB','adjustSprite','makeEncounterCount','ALT','traitsPi','centerSprite','StatusParamsBgType','STRUCT','sdtzg','〘Common\x20Event\x20%1:\x20%2〙\x20Start','gaugeLineHeight','TextStr','FDiwB','isItemStyle','buyWindowRect','PictureEraseRange','_encounterCount','MAX_SAFE_INTEGER','Bitmap_clearRect','drawGameTitle','catchUnknownError','ItemRect','itemSuccessRate','_CoreEngineSettings','nah','floor','Scene_Boot_loadSystemImages','WIN_OEM_WSCTRL','runCombinedScrollingTextAsCode','XVtGA','keyCode','EfjHk','CLOSE_CURLY_BRACKET','FwPUL','KANA','exit','wgCkH','ItemBackColor1','DvWLM','tab','loadWindowskin','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','tpGaugeColor2','cgqfo','targetY','xparamPlus1','contentsOpacity','RPGMAKER_VERSION','Scene_Map_updateMainMultiply','sceneTerminationClearEffects','ParseArmorNotetags','vertJS','Keyboard','fAomK','pop','_stored_hpGaugeColor1','buttonAssistText1','ExportString','_storedStack','sparamRateJS','_stored_hpGaugeColor2','maxGold','ActorBgType','getBackgroundOpacity','Rate','WASD','_actor','renderNoMask','OPEN_BRACKET','_lastY','RzpIe','powerUpColor','sparamPlusJS','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','YOOgd','Type','pendingColor','displayX','_hideTileShadows','NUMPAD2','ARRAYFUNC','_scene','isPlaying','parse','Window_NameInput_cursorPageup','onDatabaseLoaded','randomJS','wholeDuration','loadSystemImages','text%1','length','bFufk','ASTERISK','20097IcqJxp','Power','isCursorMovable','IPhab','【%1】\x0a','ActorTPColor','uiAreaWidth','FUNC','IconXParam3','OS_KEY','_colorTone','BtubO','Graphics_centerElement','QwertyLayout','ATTN','loadTitle2','drawBackgroundRect','fdURc','refreshDimmerBitmap','_screenY','process_VisuMZ_CoreEngine_RegExp','Param','EYIWX','BaseTexture','min','PLAY','targets','eventsXyNt','ONE','atbActive','F24','glvED','ZcejN','markCoreEngineModified','Opacity','processTouchModernControls','Game_Interpreter_command355','LAWJk','onLoad','OUTQUINT','filters','SEMICOLON','TextFmt','Spriteset_Base_updatePosition','SRNOV','left','isWindowMaskingEnabled','PRINT','Plus1','start','%1%2','SystemSetBattleSystem','statusParamsWindowRect','HYPHEN_MINUS','defineProperty','createChildSprite','F7key','roDxy','NumberBgType','cursorDown','battlebacks1','createCustomParameter','platform','animationShouldMirror','isTpb','isNormalPriority','parallaxes','INBOUNCE','helpWindowRect','QUOTE','retrieveFauxAnimation','CommandWidth','IconSParam7','QUESTION_MARK','Input_update','bWPCM','SceneManager_onKeyDown','setLastPluginCommandInterpreter','itemEva','terms','Input_setupEventHandlers','STR','KeyboardInput','pictureId','iCwOX','yScrollLinkedOffset','WNtrJ','reserveCommonEvent','CRSEL','offsetX','VNglo','processCursorMoveModernControls','updateScene','updateMainMultiply','apply','_digitGrouping','alwaysDash','Scene_Skill_create','ColorTPGauge1','fillText','ODZaT','FTB','NEAREST','Window_NameInput_processTouch','FontWidthFix','IconSParam2','isEnabled','scaleMode','ParseAllNotetags','movePageButtonSideButtonLayout','MBaGm','BlendMode','targetScaleX','getInputButtonString','getBattleSystem','238945RmFoow','updateOpacity','update','up2','wcHTX','PGUP','Window_Base_drawCharacter','Window_Base_createTextState','SHIFT','Origin','RepositionEnemies130','GroupDigits','successRate','showPicture','showFauxAnimations','onInputOk','substring','setupCoreEasing','goldWindowRect','BannedWords','wcIul','%2%1%3','currentValue','targetObjects','Input_shouldPreventDefault','Sprite_Gauge_currentValue','goto','aQAON','createFauxAnimation','pages','ValueJS','XParamVocab8','_hideButtons','_centerElementCoreEngine','mirror','name','_coreEasing','xBTAD','_hp','_pictureName','viewport','updateDocumentTitle','MAXMP','BoxMargin','DlpcJ','setAction','drawIconBySize','addChildToBack','Icon','VOLUME_MUTE','sparamPlus','initCoreEngineScreenShake','_pointAnimationSprites','useDigitGroupingEx','boxWidth','subject','random','buttonAssistKey4','GPrhq','isBusy','forceOutOfPlaytest','_categoryWindow','drawActorNickname','F15','subtitle','hpColor','xparamRate','JSXnP','helpAreaBottom','LevelUpFullHp','vertical','charCode','bgmVolume','outlineColorGauge','Game_Actor_paramBase','TextJS','charAt','setWindowPadding','hFpJR','faceHeight','XParamVocab9','Window_NameInput_processHandling','BACK_SLASH','updatePosition','mute','child_process','Rbuqb','ScaleY','buttonAssistKey3','Renderer','resetBattleSystem','Total','destroy','TGR','clearForcedGameTroopSettingsCoreEngine','_number','children','CommonEventID','TrKnr','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','repositionEnemiesByResolution','exp','buttonAssistText%1','guardSkillId','SELECT','EVAL','NUMPAD7','IconParam0','getLevel','BmodI','FWPtQ','ScufN','SystemLoadAudio','drawIcon','trim','clearOnceParallelInterpreters','FZtzt','bgsVolume','ORvqX','setHome','HRiUj','Subtitle','GUbhv','deathColor','EREOF','Scene_MenuBase_helpAreaTop','defaultInputMode','Graphics_defaultStretchMode','backgroundBitmap','isEnemy','Window_Selectable_processCursorMove','CRI','MEV','slotWindowRect','BftjQ','pWzzk','adjustBoxSize','command111','crisisColor','Layer','GJkQH','faceWidth','addEventListener','HELP','currencyUnit'];_0x4881=function(){return _0x492d8e;};return _0x4881();}var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x55c3a3){const _0x4297f9=_0x4271;return _0x55c3a3[_0x4297f9(0x608)]&&_0x55c3a3[_0x4297f9(0x1f8)][_0x4297f9(0x448)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x2bd3fa(0x8fc)]||{},VisuMZ[_0x2bd3fa(0x6e7)]=function(_0x243bcf,_0x3e4998){const _0x2983ed=_0x2bd3fa;for(const _0x1a9263 in _0x3e4998){if(_0x2983ed(0x93d)!==_0x2983ed(0x911)){if(_0x1a9263['match'](/(.*):(.*)/i)){if(_0x2983ed(0x8dd)!==_0x2983ed(0x8dd)){this['_destroyInternalTextures']();for(let _0x15a25a=0x0;_0x15a25a<_0x3bb80c[_0x2983ed(0x8e2)]['MAX_GL_TEXTURES'];_0x15a25a++){const _0x3166c3=new _0x562681[(_0x2983ed(0x7fb))]();_0x3166c3['setSize'](0x800,0x800),_0x3f117e[_0x2983ed(0x249)][_0x2983ed(0x8fc)][_0x2983ed(0x762)][_0x2983ed(0x930)]&&(_0x3166c3[_0x2983ed(0x84f)]=_0x4f0ad3[_0x2983ed(0x71c)][_0x2983ed(0x84a)]),this['_internalTextures'][_0x2983ed(0x599)](_0x3166c3);}}else{const _0x3495a8=String(RegExp['$1']),_0x3b8fa3=String(RegExp['$2'])[_0x2983ed(0x345)]()[_0x2983ed(0x8c9)]();let _0x39a2c7,_0x30a50a,_0x492778;switch(_0x3b8fa3){case _0x2983ed(0x935):_0x39a2c7=_0x3e4998[_0x1a9263]!==''?Number(_0x3e4998[_0x1a9263]):0x0;break;case'ARRAYNUM':_0x30a50a=_0x3e4998[_0x1a9263]!==''?JSON['parse'](_0x3e4998[_0x1a9263]):[],_0x39a2c7=_0x30a50a[_0x2983ed(0x580)](_0x4cc42b=>Number(_0x4cc42b));break;case _0x2983ed(0x8c0):_0x39a2c7=_0x3e4998[_0x1a9263]!==''?eval(_0x3e4998[_0x1a9263]):null;break;case _0x2983ed(0x6f8):_0x30a50a=_0x3e4998[_0x1a9263]!==''?JSON['parse'](_0x3e4998[_0x1a9263]):[],_0x39a2c7=_0x30a50a[_0x2983ed(0x580)](_0x12e71f=>eval(_0x12e71f));break;case _0x2983ed(0x36f):_0x39a2c7=_0x3e4998[_0x1a9263]!==''?JSON[_0x2983ed(0x7da)](_0x3e4998[_0x1a9263]):'';break;case'ARRAYJSON':_0x30a50a=_0x3e4998[_0x1a9263]!==''?JSON[_0x2983ed(0x7da)](_0x3e4998[_0x1a9263]):[],_0x39a2c7=_0x30a50a['map'](_0x51a9de=>JSON[_0x2983ed(0x7da)](_0x51a9de));break;case _0x2983ed(0x7eb):_0x39a2c7=_0x3e4998[_0x1a9263]!==''?new Function(JSON[_0x2983ed(0x7da)](_0x3e4998[_0x1a9263])):new Function(_0x2983ed(0x5b8));break;case _0x2983ed(0x7d7):_0x30a50a=_0x3e4998[_0x1a9263]!==''?JSON[_0x2983ed(0x7da)](_0x3e4998[_0x1a9263]):[],_0x39a2c7=_0x30a50a[_0x2983ed(0x580)](_0x174c60=>new Function(JSON[_0x2983ed(0x7da)](_0x174c60)));break;case _0x2983ed(0x835):_0x39a2c7=_0x3e4998[_0x1a9263]!==''?String(_0x3e4998[_0x1a9263]):'';break;case _0x2983ed(0x16f):_0x30a50a=_0x3e4998[_0x1a9263]!==''?JSON[_0x2983ed(0x7da)](_0x3e4998[_0x1a9263]):[],_0x39a2c7=_0x30a50a[_0x2983ed(0x580)](_0x1c70b3=>String(_0x1c70b3));break;case _0x2983ed(0x78e):_0x492778=_0x3e4998[_0x1a9263]!==''?JSON[_0x2983ed(0x7da)](_0x3e4998[_0x1a9263]):{},_0x243bcf[_0x3495a8]={},VisuMZ[_0x2983ed(0x6e7)](_0x243bcf[_0x3495a8],_0x492778);continue;case _0x2983ed(0x331):_0x30a50a=_0x3e4998[_0x1a9263]!==''?JSON[_0x2983ed(0x7da)](_0x3e4998[_0x1a9263]):[],_0x39a2c7=_0x30a50a[_0x2983ed(0x580)](_0x3f2bb7=>VisuMZ['ConvertParams']({},JSON[_0x2983ed(0x7da)](_0x3f2bb7)));break;default:continue;}_0x243bcf[_0x3495a8]=_0x39a2c7;}}}else{const _0x1529ed='_stored_hpGaugeColor2';this['_colorCache']=this[_0x2983ed(0x945)]||{};if(this[_0x2983ed(0x945)][_0x1529ed])return this['_colorCache'][_0x1529ed];const _0x2b8424=_0x18914e[_0x2983ed(0x249)][_0x2983ed(0x8fc)][_0x2983ed(0x394)][_0x2983ed(0x2f3)];return this['getColorDataFromPluginParameters'](_0x1529ed,_0x2b8424);}}return _0x243bcf;},(_0x5423e8=>{const _0x3dedb4=_0x2bd3fa,_0x2ae69c=_0x5423e8['name'];for(const _0x426b68 of dependencies){if(!Imported[_0x426b68]){alert(_0x3dedb4(0x69d)[_0x3dedb4(0x5a0)](_0x2ae69c,_0x426b68)),SceneManager[_0x3dedb4(0x7aa)]();break;}}const _0xb89f77=_0x5423e8[_0x3dedb4(0x1f8)];if(_0xb89f77[_0x3dedb4(0x306)](/\[Version[ ](.*?)\]/i)){const _0xc0bb29=Number(RegExp['$1']);if(_0xc0bb29!==VisuMZ[label][_0x3dedb4(0x5f8)]){if(_0x3dedb4(0x4b9)===_0x3dedb4(0x533)){const _0x10fa06=_0x2626ac[_0x3dedb4(0x75b)]['uiAreaWidth'],_0x35cb9d=_0xe7892f[_0x3dedb4(0x75b)][_0x3dedb4(0x214)],_0x5cffa2=_0x1cf71b[_0x3dedb4(0x249)][_0x3dedb4(0x8fc)]['UI'][_0x3dedb4(0x882)];_0x3805e4[_0x3dedb4(0x88d)]=_0x10fa06-_0x5cffa2*0x2,_0x1ecf25[_0x3dedb4(0x6d2)]=_0x35cb9d-_0x5cffa2*0x2,this['determineSideButtonLayoutValid']();}else alert(_0x3dedb4(0x8f7)[_0x3dedb4(0x5a0)](_0x2ae69c,_0xc0bb29)),SceneManager[_0x3dedb4(0x7aa)]();}}if(_0xb89f77['match'](/\[Tier[ ](\d+)\]/i)){if(_0x3dedb4(0x26b)!=='BLxyf'){const _0x45d014=Number(RegExp['$1']);if(_0x45d014<tier){if(_0x3dedb4(0x872)!==_0x3dedb4(0x809))alert(_0x3dedb4(0x8ba)['format'](_0x2ae69c,_0x45d014,tier)),SceneManager[_0x3dedb4(0x7aa)]();else return _0x11989e['CoreEngine']['Settings']['UI'][_0x3dedb4(0x260)];}else tier=Math[_0x3dedb4(0x523)](_0x45d014,tier);}else this[_0x3dedb4(0x7f7)]+=_0x263d6e[_0x3dedb4(0x18a)]((_0x1d4f9b[_0x3dedb4(0x30f)]-0x270)/0x2),this[_0x3dedb4(0x7f7)]-=_0x244973[_0x3dedb4(0x7a0)]((_0xa9cc17[_0x3dedb4(0x30f)]-_0x11de53['boxHeight'])/0x2),_0x41d68e[_0x3dedb4(0x566)]()?this[_0x3dedb4(0x2ba)]-=_0x50a97d[_0x3dedb4(0x7a0)]((_0x493bc3['width']-_0x3c27db[_0x3dedb4(0x88d)])/0x2):this[_0x3dedb4(0x2ba)]+=_0x181965['round']((_0x5ad097[_0x3dedb4(0x88d)]-0x330)/0x2);}VisuMZ['ConvertParams'](VisuMZ[label][_0x3dedb4(0x8fc)],_0x5423e8[_0x3dedb4(0x614)]);})(pluginData),PluginManager[_0x2bd3fa(0x2d8)](pluginData[_0x2bd3fa(0x87a)],_0x2bd3fa(0x47e),_0x815631=>{const _0x2dba61=_0x2bd3fa;if(!SceneManager[_0x2dba61(0x7d8)])return;if(!SceneManager[_0x2dba61(0x7d8)][_0x2dba61(0x243)])return;VisuMZ[_0x2dba61(0x6e7)](_0x815631,_0x815631);const _0x33d657=Math[_0x2dba61(0x18a)](_0x815631['pointX']),_0x112108=Math[_0x2dba61(0x18a)](_0x815631[_0x2dba61(0x1e4)]);$gameTemp[_0x2dba61(0x5c1)](_0x33d657,_0x112108,_0x815631['AnimationID'],_0x815631['Mirror'],_0x815631[_0x2dba61(0x17d)]);}),PluginManager[_0x2bd3fa(0x2d8)](pluginData[_0x2bd3fa(0x87a)],_0x2bd3fa(0x694),_0x3f531d=>{const _0x5954ae=_0x2bd3fa;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x5954ae(0x481)]())return;SceneManager[_0x5954ae(0x7d8)][_0x5954ae(0x312)]=![],VisuMZ[_0x5954ae(0x249)][_0x5954ae(0x1b6)]();}),PluginManager[_0x2bd3fa(0x2d8)](pluginData[_0x2bd3fa(0x87a)],'ExportAllTroopText',_0x544e77=>{const _0x21d41a=_0x2bd3fa;if(!$gameTemp[_0x21d41a(0x4f7)]())return;if(!Utils['isNwjs']())return;SceneManager[_0x21d41a(0x7d8)][_0x21d41a(0x312)]=![],VisuMZ[_0x21d41a(0x249)][_0x21d41a(0x708)]();}),PluginManager[_0x2bd3fa(0x2d8)](pluginData[_0x2bd3fa(0x87a)],_0x2bd3fa(0x399),_0x4ce55d=>{const _0x3360e2=_0x2bd3fa;if(!$gameTemp[_0x3360e2(0x4f7)]())return;if(!Utils[_0x3360e2(0x481)]())return;if(!$gameMap)return;if($gameMap[_0x3360e2(0x906)]()<=0x0)return;VisuMZ['ConvertParams'](_0x4ce55d,_0x4ce55d);const _0x1443ea=_0x3360e2(0x938)[_0x3360e2(0x5a0)]($gameMap[_0x3360e2(0x906)]()[_0x3360e2(0x181)](0x3)),_0x24cd4f=VisuMZ[_0x3360e2(0x249)]['ExtractStrFromMap']($gameMap[_0x3360e2(0x906)]());VisuMZ[_0x3360e2(0x249)][_0x3360e2(0x7c0)](_0x24cd4f,_0x1443ea,!![]);}),PluginManager[_0x2bd3fa(0x2d8)](pluginData[_0x2bd3fa(0x87a)],'ExportCurTroopText',_0x590663=>{const _0x1c4709=_0x2bd3fa;if(!$gameTemp[_0x1c4709(0x4f7)]())return;if(!Utils['isNwjs']())return;if(!$gameParty['inBattle']())return;VisuMZ[_0x1c4709(0x6e7)](_0x590663,_0x590663);const _0x30aff8='Troop%1'[_0x1c4709(0x5a0)]($gameTroop[_0x1c4709(0x49f)]['padZero'](0x4)),_0x352de9=VisuMZ[_0x1c4709(0x249)]['ExtractStrFromTroop']($gameTroop[_0x1c4709(0x49f)]);VisuMZ[_0x1c4709(0x249)][_0x1c4709(0x7c0)](_0x352de9,_0x30aff8,!![]);}),VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x7c0)]=function(_0x3019e9,_0x1373ae,_0x447f56){const _0x5ef781=_0x2bd3fa,_0x1da5c2=require('fs');let _0x4b33eb='Exported_Script_%1.txt'[_0x5ef781(0x5a0)](_0x1373ae||'0');_0x1da5c2[_0x5ef781(0x3a6)](_0x4b33eb,_0x3019e9,_0x2526b2=>{const _0x53108b=_0x5ef781;if(_0x2526b2){if('SRCcl'===_0x53108b(0x25e))throw err;else return this['_digitGrouping'];}else _0x447f56&&alert(_0x53108b(0x595)['format'](_0x4b33eb));});},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x1b6)]=function(){const _0x14a54c=_0x2bd3fa,_0x3e23ef=[];for(const _0x3d26e2 of $dataMapInfos){if(!_0x3d26e2)continue;_0x3e23ef[_0x14a54c(0x599)](_0x3d26e2['id']);}const _0x17e1c5=_0x3e23ef['length']*0x64+Math[_0x14a54c(0x5ac)](0x64);alert('Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x14a54c(0x5a0)](_0x17e1c5)),this['_storedMapText']=[],this['_currentMap']=$dataMap;for(const _0x9c311c of _0x3e23ef){VisuMZ[_0x14a54c(0x249)][_0x14a54c(0x5f4)](_0x9c311c);}setTimeout(VisuMZ[_0x14a54c(0x249)][_0x14a54c(0x277)]['bind'](this),_0x17e1c5);},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x5f4)]=function(_0x113013){const _0x1d0e90=_0x2bd3fa,_0x18ca1f=_0x1d0e90(0x1f3)[_0x1d0e90(0x5a0)](_0x113013[_0x1d0e90(0x181)](0x3)),_0x10a3e1=new XMLHttpRequest(),_0x2160e6='data/'+_0x18ca1f;_0x10a3e1[_0x1d0e90(0x5f2)](_0x1d0e90(0x76a),_0x2160e6),_0x10a3e1['overrideMimeType']('application/json'),_0x10a3e1[_0x1d0e90(0x3eb)]=()=>this[_0x1d0e90(0x68e)](_0x10a3e1,_0x113013,_0x18ca1f,_0x2160e6),_0x10a3e1[_0x1d0e90(0x912)]=()=>DataManager[_0x1d0e90(0x72b)](_0x1d0e90(0x196),_0x18ca1f,_0x2160e6),_0x10a3e1[_0x1d0e90(0x2c7)]();},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x68e)]=function(_0x1dbe22,_0x162345,_0x580511,_0x1a2b35){const _0x4aa1c1=_0x2bd3fa;$dataMap=JSON['parse'](_0x1dbe22[_0x4aa1c1(0x967)]),DataManager[_0x4aa1c1(0x80a)]($dataMap),this[_0x4aa1c1(0x633)][_0x162345]=VisuMZ[_0x4aa1c1(0x249)][_0x4aa1c1(0x2f2)](_0x162345),$dataMap=this[_0x4aa1c1(0x480)];},VisuMZ[_0x2bd3fa(0x249)]['exportAllMapStrings']=function(){const _0x91ccc=_0x2bd3fa,_0x23c497=_0x91ccc(0x44f);this['_storedMapText'][_0x91ccc(0x774)](undefined)['remove']('')[_0x91ccc(0x774)](null);const _0xb5d7fb=this['_storedMapText']['join'](_0x91ccc(0x53f))[_0x91ccc(0x8c9)]();VisuMZ[_0x91ccc(0x249)]['ExportString'](_0xb5d7fb,_0x23c497,!![]),SceneManager[_0x91ccc(0x7d8)]['_active']=!![];},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x2f2)]=function(_0x4ec45d){const _0x34bc9e=_0x2bd3fa;if(!$dataMap)return'';let _0x3aa5dd='█'['repeat'](0x46)+'\x0a\x0a',_0x1d7f59='═'[_0x34bc9e(0x4a2)](0x46)+'\x0a\x0a',_0x2ab37c='';this[_0x34bc9e(0x618)]=0x0;for(const _0x26d003 of $dataMap['events']){if(_0x34bc9e(0x3e8)!=='WOBIg'){_0x5af678[_0x34bc9e(0x249)][_0x34bc9e(0x8fc)][_0x34bc9e(0x6de)][_0x34bc9e(0x5f0)][_0x34bc9e(0x79a)][_0x34bc9e(0x1f7)](this);if(_0x65d704[_0x34bc9e(0x897)]!==''&&_0x4e83c7[_0x34bc9e(0x897)]!=='Subtitle')this['drawGameSubtitle']();if(_0x480546[_0x34bc9e(0x5f8)]!==''&&_0x2a11c9[_0x34bc9e(0x5f8)]!=='0.00')this[_0x34bc9e(0x194)]();}else{if(!_0x26d003)continue;let _0x50b24a=_0x26d003['id'],_0x5270c6=_0x26d003['name'],_0x4d4a03=_0x26d003[_0x34bc9e(0x874)];for(const _0x540562 of _0x4d4a03){const _0x41ca91=_0x4d4a03['indexOf'](_0x540562)+0x1;let _0x4fd57c=_0x1d7f59+_0x34bc9e(0x7d0),_0x263d32=VisuMZ[_0x34bc9e(0x249)][_0x34bc9e(0x44d)](_0x540562[_0x34bc9e(0x94e)]);if(_0x263d32[_0x34bc9e(0x7e1)]>0x0){if(_0x2ab37c[_0x34bc9e(0x7e1)]>0x0)_0x2ab37c+=_0x1d7f59+_0x34bc9e(0x53f);else{const _0x920db2=$dataMapInfos[_0x4ec45d][_0x34bc9e(0x87a)];_0x2ab37c+=_0x3aa5dd+_0x34bc9e(0x5ae)[_0x34bc9e(0x5a0)](_0x4ec45d,_0x920db2||'Unnamed')+_0x3aa5dd;}_0x2ab37c+=_0x4fd57c[_0x34bc9e(0x5a0)](_0x50b24a,_0x5270c6,_0x41ca91,_0x263d32);}}}}if(_0x2ab37c[_0x34bc9e(0x7e1)]>0x0){if(_0x34bc9e(0x5ec)===_0x34bc9e(0x5ec))_0x2ab37c+=_0x1d7f59;else return!![];}return _0x2ab37c;},VisuMZ[_0x2bd3fa(0x249)]['ExportStrFromAllTroops']=function(){const _0xc435bb=_0x2bd3fa,_0x346470=$dataTroops[_0xc435bb(0x7e1)]*0xa+Math['randomInt'](0xa);alert(_0xc435bb(0x3e1)['format'](_0x346470));const _0x3f5502=[];for(const _0x259c99 of $dataTroops){if(!_0x259c99)continue;const _0x51c096=_0x259c99['id'];_0x3f5502[_0x51c096]=VisuMZ[_0xc435bb(0x249)][_0xc435bb(0x16e)](_0x51c096);}setTimeout(VisuMZ[_0xc435bb(0x249)][_0xc435bb(0x4e2)][_0xc435bb(0x174)](this,_0x3f5502),_0x346470);},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x16e)]=function(_0x54fcd7){const _0x19a732=_0x2bd3fa;if(!$dataTroops[_0x54fcd7])return'';let _0x275cfd='█'[_0x19a732(0x4a2)](0x46)+'\x0a\x0a',_0x460df6='═'[_0x19a732(0x4a2)](0x46)+'\x0a\x0a',_0x25f109='';this['_commonEventLayers']=0x0;const _0x128640=$dataTroops[_0x54fcd7];let _0x1edbf6=_0x128640[_0x19a732(0x874)];for(const _0x37d3ec of _0x1edbf6){const _0x33ac10=_0x1edbf6['indexOf'](_0x37d3ec)+0x1;let _0x7572b1=_0x460df6+'《《《\x20Page\x20%1\x20》》》\x0a%2\x0a',_0xfc334d=VisuMZ[_0x19a732(0x249)][_0x19a732(0x44d)](_0x37d3ec[_0x19a732(0x94e)]);if(_0xfc334d['length']>0x0){if('QFQNp'!==_0x19a732(0x5a2)){this[_0x19a732(0x2d4)]=_0x19a732(0x79f),this[_0x19a732(0x670)]='nah',this[_0x19a732(0x7cc)]=_0x19a732(0x79f);const _0x5bd381=this[_0x19a732(0x747)]();_0x5af801[_0x19a732(0x77c)][_0x19a732(0x4d6)]['call'](this,_0x5bd381),this['setBackgroundType'](0x2);}else{if(_0x25f109[_0x19a732(0x7e1)]>0x0){if(_0x19a732(0x5e6)!==_0x19a732(0x49c))_0x25f109+=_0x460df6+_0x19a732(0x53f);else{if(_0xa9e79b&&_0x3aca90[_0x19a732(0x43e)])return!![];}}else _0x25f109+=_0x275cfd+_0x19a732(0x600)[_0x19a732(0x5a0)](_0x54fcd7,_0x128640[_0x19a732(0x87a)]||_0x19a732(0x5df))+_0x275cfd;_0x25f109+=_0x7572b1[_0x19a732(0x5a0)](_0x33ac10,_0xfc334d);}}}return _0x25f109[_0x19a732(0x7e1)]>0x0&&(_0x25f109+=_0x460df6),_0x25f109;},VisuMZ[_0x2bd3fa(0x249)]['exportAllTroopStrings']=function(_0x22c142){const _0xf1b3b=_0x2bd3fa,_0xc37881=_0xf1b3b(0x440);_0x22c142['remove'](undefined)[_0xf1b3b(0x774)]('')['remove'](null);const _0x52a39a=_0x22c142[_0xf1b3b(0x3b1)](_0xf1b3b(0x53f))[_0xf1b3b(0x8c9)]();VisuMZ[_0xf1b3b(0x249)][_0xf1b3b(0x7c0)](_0x52a39a,_0xc37881,!![]),SceneManager[_0xf1b3b(0x7d8)][_0xf1b3b(0x312)]=!![];},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x44d)]=function(_0x4b4ce0){const _0x5dc6b2=_0x2bd3fa;let _0x24dda1='\x0a'+'─'[_0x5dc6b2(0x4a2)](0x46)+'\x0a',_0x4b9781='\x0a'+'┄'['repeat'](0x46)+'\x0a',_0x44eda9='';for(const _0x57a3b7 of _0x4b4ce0){if(_0x5dc6b2(0x67c)==='PnVjp'){const _0x108260=_0x1e52a1[_0x5dc6b2(0x6ed)]()[_0x5dc6b2(0x57d)](/\\I\[(\d+)\]/gi,'');this[_0x5dc6b2(0x1af)](_0x3eb12b[_0x5dc6b2(0x6ed)](),_0xac36f,_0x252282,_0x156423);}else{if(!_0x57a3b7)continue;if(_0x57a3b7[_0x5dc6b2(0x64d)]===0x65)_0x44eda9+=_0x24dda1+'\x0a',_0x44eda9+='〘Show\x20Text〙\x0a',_0x57a3b7['parameters'][0x4]!==''&&_0x57a3b7[_0x5dc6b2(0x614)][0x4]!==undefined&&(_0x44eda9+=_0x5dc6b2(0x7e8)[_0x5dc6b2(0x5a0)](_0x57a3b7[_0x5dc6b2(0x614)][0x4]));else{if(_0x57a3b7[_0x5dc6b2(0x64d)]===0x191){if('xQiSm'!==_0x5dc6b2(0x8c6))_0x44eda9+=_0x5dc6b2(0x70c)[_0x5dc6b2(0x5a0)](_0x57a3b7[_0x5dc6b2(0x614)][0x0]);else{if(_0x6f3a6d[_0x5dc6b2(0x45d)]())return;_0x1de0ee[_0x5dc6b2(0x6e7)](_0x5dd498,_0x583fdb);const _0x41a721=[_0x5dc6b2(0x1e9),_0x5dc6b2(0x820),_0x5dc6b2(0x754),'characters',_0x5dc6b2(0x4f2),_0x5dc6b2(0x582),_0x5dc6b2(0x826),'pictures',_0x5dc6b2(0x2e7),_0x5dc6b2(0x40c),_0x5dc6b2(0x21c),_0x5dc6b2(0x3b0),_0x5dc6b2(0x454),_0x5dc6b2(0x575)];for(const _0x1295bb of _0x41a721){const _0x1d7473=_0xb493ec[_0x1295bb],_0x44f105='img/%1/'[_0x5dc6b2(0x5a0)](_0x1295bb);for(const _0x241d68 of _0x1d7473){_0x4a84d3['loadBitmap'](_0x44f105,_0x241d68);}}}}else{if(_0x57a3b7[_0x5dc6b2(0x64d)]===0x192)_0x5dc6b2(0x63c)===_0x5dc6b2(0x321)?_0x3c6b95[_0x5dc6b2(0x249)][_0x5dc6b2(0x18d)]['call'](this,_0x4d9805):(_0x44eda9+=_0x24dda1,_0x44eda9+=_0x5dc6b2(0x6bb)['format'](_0x4b9781,_0x57a3b7[_0x5dc6b2(0x614)][0x0]+0x1,_0x57a3b7[_0x5dc6b2(0x614)][0x1]));else{if(_0x57a3b7['code']===0x193)_0x44eda9+=_0x24dda1,_0x44eda9+=_0x5dc6b2(0x1a9)['format'](_0x4b9781);else{if(_0x57a3b7[_0x5dc6b2(0x64d)]===0x194)_0x44eda9+=_0x24dda1,_0x44eda9+=_0x5dc6b2(0x45c)[_0x5dc6b2(0x5a0)](_0x4b9781);else{if(_0x57a3b7[_0x5dc6b2(0x64d)]===0x69)_0x5dc6b2(0x443)!=='nECvW'?(_0x44eda9+=_0x24dda1+'\x0a',_0x44eda9+=_0x5dc6b2(0x23c)):_0x5cb90c[_0x5dc6b2(0x801)]=!![];else{if(_0x57a3b7[_0x5dc6b2(0x64d)]===0x6c)_0x44eda9+=_0x24dda1+'\x0a',_0x44eda9+='》Comment《\x0a%1\x0a'[_0x5dc6b2(0x5a0)](_0x57a3b7[_0x5dc6b2(0x614)][0x0]);else{if(_0x57a3b7[_0x5dc6b2(0x64d)]===0x198)_0x44eda9+=_0x5dc6b2(0x70c)[_0x5dc6b2(0x5a0)](_0x57a3b7[_0x5dc6b2(0x614)][0x0]);else{if(_0x57a3b7[_0x5dc6b2(0x64d)]===0x75){if('mtVkb'==='mtVkb'){const _0x17bea5=$dataCommonEvents[_0x57a3b7[_0x5dc6b2(0x614)][0x0]];if(_0x17bea5&&this[_0x5dc6b2(0x618)]<=0xa){if(_0x5dc6b2(0x3e6)!==_0x5dc6b2(0x3e6)){try{_0xbfb6be[_0x5dc6b2(0x249)][_0x5dc6b2(0x5d1)][_0x5dc6b2(0x1f7)](this,_0x11f7d6);}catch(_0x2edff2){_0x14c6c0[_0x5dc6b2(0x4f7)]()&&(_0x4042e4[_0x5dc6b2(0x253)](_0x5dc6b2(0x66d)),_0x475332['log'](_0x2edff2));}return!![];}else{this['_commonEventLayers']++;let _0x297a3e=VisuMZ[_0x5dc6b2(0x249)][_0x5dc6b2(0x44d)](_0x17bea5[_0x5dc6b2(0x94e)]);_0x297a3e[_0x5dc6b2(0x7e1)]>0x0&&(_0x44eda9+=_0x24dda1,_0x44eda9+=_0x4b9781,_0x44eda9+=_0x5dc6b2(0x790)[_0x5dc6b2(0x5a0)](_0x17bea5['id'],_0x17bea5[_0x5dc6b2(0x87a)]),_0x44eda9+=_0x4b9781,_0x44eda9+=_0x297a3e,_0x44eda9+=_0x4b9781,_0x44eda9+='〘Common\x20Event\x20%1:\x20%2〙\x20End'[_0x5dc6b2(0x5a0)](_0x17bea5['id'],_0x17bea5[_0x5dc6b2(0x87a)]),_0x44eda9+=_0x4b9781),this['_commonEventLayers']--;}}}else _0x323070[_0x5dc6b2(0x249)]['Settings'][_0x5dc6b2(0x762)][_0x5dc6b2(0x1db)]?this[_0x5dc6b2(0x5cf)](_0x2791f0,_0x365aa2,_0x40c246,_0xfd997d):_0x511b50[_0x5dc6b2(0x249)][_0x5dc6b2(0x4c3)]['call'](this,_0x58718c,_0x4dec81,_0x1db218,_0x1d3238);}}}}}}}}}}}return _0x44eda9[_0x5dc6b2(0x7e1)]>0x0&&(_0x44eda9+=_0x24dda1),_0x44eda9;},PluginManager[_0x2bd3fa(0x2d8)](pluginData[_0x2bd3fa(0x87a)],_0x2bd3fa(0x1e2),_0x121eda=>{const _0x1e1c18=_0x2bd3fa;VisuMZ[_0x1e1c18(0x6e7)](_0x121eda,_0x121eda);const _0x3b70d1=_0x121eda[_0x1e1c18(0x47d)];VisuMZ['openURL'](_0x3b70d1);}),PluginManager[_0x2bd3fa(0x2d8)](pluginData[_0x2bd3fa(0x87a)],_0x2bd3fa(0x51d),_0x3eba11=>{const _0x59b20c=_0x2bd3fa;VisuMZ[_0x59b20c(0x6e7)](_0x3eba11,_0x3eba11);const _0x597b9a=_0x3eba11[_0x59b20c(0x611)]||0x0;$gameParty[_0x59b20c(0x23e)](_0x597b9a);}),PluginManager[_0x2bd3fa(0x2d8)](pluginData['name'],_0x2bd3fa(0x46e),_0x3bd59e=>{const _0x3802f5=_0x2bd3fa;if(!SceneManager[_0x3802f5(0x4b4)]())return;VisuMZ[_0x3802f5(0x6e7)](_0x3bd59e,_0x3bd59e);const _0x29a667=_0x3bd59e[_0x3802f5(0x8b8)];SceneManager[_0x3802f5(0x7d8)][_0x3802f5(0x307)](_0x29a667);}),PluginManager['registerCommand'](pluginData[_0x2bd3fa(0x87a)],'PictureCoordinatesMode',_0x359d8e=>{const _0x4b40c8=_0x2bd3fa;if(!$gameTemp[_0x4b40c8(0x4f7)]())return;if(!Utils[_0x4b40c8(0x481)]())return;VisuMZ[_0x4b40c8(0x6e7)](_0x359d8e,_0x359d8e);const _0x23b5da=_0x359d8e[_0x4b40c8(0x40b)]||0x1;$gameTemp['_pictureCoordinatesMode']=_0x23b5da;}),PluginManager[_0x2bd3fa(0x2d8)](pluginData[_0x2bd3fa(0x87a)],_0x2bd3fa(0x753),_0x331005=>{const _0x239d6e=_0x2bd3fa;VisuMZ[_0x239d6e(0x6e7)](_0x331005,_0x331005);const _0x197e6f=_0x331005[_0x239d6e(0x837)]||0x1,_0x573259=_0x331005[_0x239d6e(0x29d)]||'Linear',_0x3ea32e=$gameScreen['picture'](_0x197e6f);_0x3ea32e&&_0x3ea32e[_0x239d6e(0x76b)](_0x573259);}),PluginManager[_0x2bd3fa(0x2d8)](pluginData[_0x2bd3fa(0x87a)],_0x2bd3fa(0x503),_0x46a9d8=>{const _0x8cc34d=_0x2bd3fa;for(let _0x27feb2=0x1;_0x27feb2<=0x64;_0x27feb2++){_0x8cc34d(0x810)===_0x8cc34d(0x960)?this[_0x8cc34d(0x61b)](0x0):$gameScreen[_0x8cc34d(0x474)](_0x27feb2);}}),PluginManager[_0x2bd3fa(0x2d8)](pluginData[_0x2bd3fa(0x87a)],_0x2bd3fa(0x796),_0x4af7b5=>{const _0x2ffba7=_0x2bd3fa;VisuMZ['ConvertParams'](_0x4af7b5,_0x4af7b5);const _0x52529d=Math[_0x2ffba7(0x7fc)](_0x4af7b5[_0x2ffba7(0x52b)],_0x4af7b5[_0x2ffba7(0x170)]),_0x13a1a4=Math[_0x2ffba7(0x523)](_0x4af7b5[_0x2ffba7(0x52b)],_0x4af7b5[_0x2ffba7(0x170)]);for(let _0x29fdc4=_0x52529d;_0x29fdc4<=_0x13a1a4;_0x29fdc4++){if(_0x2ffba7(0x793)!=='FDiwB'){if(this[_0x2ffba7(0x190)](_0xece3f5))return!![];}else $gameScreen['erasePicture'](_0x29fdc4);}}),PluginManager[_0x2bd3fa(0x2d8)](pluginData['name'],_0x2bd3fa(0x4c9),_0x2a66fc=>{const _0x5f3c40=_0x2bd3fa;VisuMZ[_0x5f3c40(0x6e7)](_0x2a66fc,_0x2a66fc);const _0x3b163d=Math['round'](_0x2a66fc[_0x5f3c40(0x40b)])['clamp'](0x1,0x64),_0x2f5ce8=_0x2a66fc[_0x5f3c40(0x8fc)],_0x37ae34=_0x2f5ce8[_0x5f3c40(0x860)]['clamp'](0x0,0x1),_0x13d328=Math[_0x5f3c40(0x18a)](_0x2f5ce8['PositionX']||0x0),_0xaf276e=Math[_0x5f3c40(0x18a)](_0x2f5ce8['PositionY']||0x0),_0x1a092b=Math['round'](_0x2f5ce8['ScaleX']||0x0),_0x21b08a=Math[_0x5f3c40(0x18a)](_0x2f5ce8[_0x5f3c40(0x8ae)]||0x0),_0x21efc2=Math[_0x5f3c40(0x18a)](_0x2f5ce8[_0x5f3c40(0x806)])[_0x5f3c40(0x24f)](0x0,0xff),_0x455fcd=_0x2f5ce8[_0x5f3c40(0x853)],_0x5938de='VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2',_0x19b4de=_0x2a66fc[_0x5f3c40(0x645)]?_0x5f3c40(0x645):_0x5f3c40(0x60f),_0x3bb33b=_0x5938de[_0x5f3c40(0x5a0)](_0x2a66fc[_0x5f3c40(0x1da)],_0x19b4de);$gameScreen[_0x5f3c40(0x864)](_0x3b163d,_0x3bb33b,_0x37ae34,_0x13d328,_0xaf276e,_0x1a092b,_0x21b08a,_0x21efc2,_0x455fcd);}),PluginManager[_0x2bd3fa(0x2d8)](pluginData['name'],_0x2bd3fa(0x332),_0x20ae97=>{const _0x1feb0b=_0x2bd3fa;VisuMZ[_0x1feb0b(0x6e7)](_0x20ae97,_0x20ae97);const _0x3f9562=_0x20ae97[_0x1feb0b(0x7d2)]||_0x1feb0b(0x88f),_0x36481b=_0x20ae97[_0x1feb0b(0x7e5)]['clamp'](0x1,0x9),_0x51345c=_0x20ae97[_0x1feb0b(0x908)][_0x1feb0b(0x24f)](0x1,0x9),_0x1bf2f6=_0x20ae97[_0x1feb0b(0x678)]||0x1,_0x2a48cb=_0x20ae97['Wait'];$gameScreen[_0x1feb0b(0x3e7)](_0x3f9562),$gameScreen[_0x1feb0b(0x2d6)](_0x36481b,_0x51345c,_0x1bf2f6);if(_0x2a48cb){const _0x3681c5=$gameTemp[_0x1feb0b(0x1f0)]();if(_0x3681c5)_0x3681c5[_0x1feb0b(0x72a)](_0x1bf2f6);}}),PluginManager['registerCommand'](pluginData[_0x2bd3fa(0x87a)],_0x2bd3fa(0x42d),_0x24ae9d=>{const _0x26dbdf=_0x2bd3fa;VisuMZ[_0x26dbdf(0x6e7)](_0x24ae9d,_0x24ae9d);const _0x4339e8=_0x24ae9d[_0x26dbdf(0x2d1)]||0x1;$gameSystem[_0x26dbdf(0x290)](_0x4339e8);}),PluginManager[_0x2bd3fa(0x2d8)](pluginData[_0x2bd3fa(0x87a)],_0x2bd3fa(0x90e),_0x2ac3dc=>{const _0x5071c4=_0x2bd3fa;if($gameParty[_0x5071c4(0x45d)]())return;VisuMZ['ConvertParams'](_0x2ac3dc,_0x2ac3dc);const _0x4a45fb=_0x2ac3dc[_0x5071c4(0x2d1)];if(_0x4a45fb[_0x5071c4(0x306)](/Front/i))$gameSystem[_0x5071c4(0x6df)](![]);else{if(_0x4a45fb[_0x5071c4(0x306)](/Side/i)){if('TvgNM'!==_0x5071c4(0x5af))for(const _0x38f644 of _0x11a47f){if(_0x38f644&&_0x38f644[_0x5071c4(0x43e)])return!![];}else $gameSystem['setSideView'](!![]);}else{if(_0x5071c4(0x200)==='ZuHgt'){const _0x19b328=_0x2f6588[_0x5071c4(0x7a0)]((_0x320973-0x2)*_0x5aa557),_0x289a76=_0x34c63b[_0x5071c4(0x77c)][_0x5071c4(0x93a)][_0x5071c4(0x1f7)](this),_0x1259a5=_0x38faa7+this[_0x5071c4(0x4fb)]()-_0x289a76-0x2;this[_0x5071c4(0x711)][_0x5071c4(0x602)](_0x1b7160,_0x1259a5,_0x3f400f,_0x289a76,_0x5b70d4[_0x5071c4(0x469)]()),this['contents'][_0x5071c4(0x450)](_0x965d0+0x1,_0x1259a5+0x1,_0x19b328,_0x289a76-0x2,_0x28211a,_0x53c62a);}else $gameSystem[_0x5071c4(0x6df)](!$gameSystem[_0x5071c4(0x566)]());}}}),PluginManager[_0x2bd3fa(0x2d8)](pluginData['name'],_0x2bd3fa(0x8c7),_0x5e6ef8=>{const _0x1fe015=_0x2bd3fa;if($gameParty[_0x1fe015(0x45d)]())return;VisuMZ[_0x1fe015(0x6e7)](_0x5e6ef8,_0x5e6ef8);const _0x5d2bce=[_0x1fe015(0x6c0),_0x1fe015(0x689),'me','se'];for(const _0x49782e of _0x5d2bce){if(_0x1fe015(0x6dc)!==_0x1fe015(0x2de)){const _0x119d66=_0x5e6ef8[_0x49782e],_0xfc36e0=_0x1fe015(0x761)[_0x1fe015(0x5a0)](_0x49782e);for(const _0x4da255 of _0x119d66){'nQerb'!=='TXFZL'?AudioManager[_0x1fe015(0x33c)](_0xfc36e0,_0x4da255):this[_0x1fe015(0x79e)]={'SideView':_0x15a48f[_0x1fe015(0x74b)],'BattleSystem':this['initialBattleSystem'](),'FontSize':_0x3ca5d5[_0x1fe015(0x75b)][_0x1fe015(0x66b)],'Padding':0xc};}}else return _0x43575d[_0x1fe015(0x6d2)]-this[_0x1fe015(0x363)]();}}),PluginManager['registerCommand'](pluginData[_0x2bd3fa(0x87a)],_0x2bd3fa(0x48c),_0x200d43=>{const _0x4dd3bf=_0x2bd3fa;if($gameParty[_0x4dd3bf(0x45d)]())return;VisuMZ['ConvertParams'](_0x200d43,_0x200d43);const _0x19413a=[_0x4dd3bf(0x1e9),'battlebacks1',_0x4dd3bf(0x754),_0x4dd3bf(0x2d2),'enemies','faces',_0x4dd3bf(0x826),_0x4dd3bf(0x746),_0x4dd3bf(0x2e7),_0x4dd3bf(0x40c),_0x4dd3bf(0x21c),'tilesets','titles1','titles2'];for(const _0x316470 of _0x19413a){const _0x359df8=_0x200d43[_0x316470],_0x122a6e='img/%1/'['format'](_0x316470);for(const _0x379e60 of _0x359df8){ImageManager[_0x4dd3bf(0x723)](_0x122a6e,_0x379e60);}}}),PluginManager[_0x2bd3fa(0x2d8)](pluginData[_0x2bd3fa(0x87a)],_0x2bd3fa(0x939),_0x488b96=>{const _0xa55213=_0x2bd3fa;if($gameParty[_0xa55213(0x45d)]())return;VisuMZ[_0xa55213(0x6e7)](_0x488b96,_0x488b96);const _0x51f3be=_0x488b96[_0xa55213(0x330)],_0x1edc33=(_0x488b96[_0xa55213(0x513)]||0x0)/0x64;for(const _0x1ac614 of _0x51f3be){if(_0xa55213(0x7ef)!==_0xa55213(0x315)){const _0xbef1ab=Math['random']()<=_0x1edc33;$gameSwitches[_0xa55213(0x3ce)](_0x1ac614,_0xbef1ab);}else _0x31bae9['CoreEngine'][_0xa55213(0x6e8)]['call'](this),this['_inputString']=_0x5b20f0,this[_0xa55213(0x468)]=_0x118102,this[_0xa55213(0x3a8)]=_0x441106[_0xa55213(0x8f9)];}}),PluginManager[_0x2bd3fa(0x2d8)](pluginData[_0x2bd3fa(0x87a)],_0x2bd3fa(0x560),_0x34697f=>{const _0x543b1a=_0x2bd3fa;if($gameParty['inBattle']())return;VisuMZ[_0x543b1a(0x6e7)](_0x34697f,_0x34697f);const _0x37145d=Math['min'](_0x34697f[_0x543b1a(0x52b)],_0x34697f[_0x543b1a(0x170)]),_0x42b5d8=Math[_0x543b1a(0x523)](_0x34697f[_0x543b1a(0x52b)],_0x34697f[_0x543b1a(0x170)]),_0x2a3ce7=(_0x34697f['Chance']||0x0)/0x64;for(let _0x3cf4c8=_0x37145d;_0x3cf4c8<=_0x42b5d8;_0x3cf4c8++){if(_0x543b1a(0x30e)!==_0x543b1a(0x3de)){const _0x5d11a2=Math[_0x543b1a(0x88f)]()<=_0x2a3ce7;$gameSwitches[_0x543b1a(0x3ce)](_0x3cf4c8,_0x5d11a2);}else{const _0x4ba58c='_stored_ctGaugeColor2';this['_colorCache']=this[_0x543b1a(0x945)]||{};if(this[_0x543b1a(0x945)][_0x4ba58c])return this[_0x543b1a(0x945)][_0x4ba58c];const _0x1ae6f6=_0x276dce['CoreEngine'][_0x543b1a(0x8fc)][_0x543b1a(0x394)][_0x543b1a(0x4b1)];return this['getColorDataFromPluginParameters'](_0x4ba58c,_0x1ae6f6);}}}),PluginManager['registerCommand'](pluginData[_0x2bd3fa(0x87a)],_0x2bd3fa(0x425),_0xbb970d=>{const _0x1a36ec=_0x2bd3fa;if($gameParty[_0x1a36ec(0x45d)]())return;VisuMZ['ConvertParams'](_0xbb970d,_0xbb970d);const _0x15ac9e=_0xbb970d['IDs'];for(const _0x4e816b of _0x15ac9e){if('DcwSj'!==_0x1a36ec(0x8f5))_0x1f0f67['CoreEngine']['Scene_Item_create'][_0x1a36ec(0x1f7)](this),this[_0x1a36ec(0x34e)]();else{const _0x5517e3=$gameSwitches['value'](_0x4e816b);$gameSwitches[_0x1a36ec(0x3ce)](_0x4e816b,!_0x5517e3);}}}),PluginManager[_0x2bd3fa(0x2d8)](pluginData[_0x2bd3fa(0x87a)],_0x2bd3fa(0x778),_0x19afbd=>{const _0x4db795=_0x2bd3fa;if($gameParty[_0x4db795(0x45d)]())return;VisuMZ[_0x4db795(0x6e7)](_0x19afbd,_0x19afbd);const _0x876023=Math[_0x4db795(0x7fc)](_0x19afbd[_0x4db795(0x52b)],_0x19afbd[_0x4db795(0x170)]),_0x3f62dd=Math[_0x4db795(0x523)](_0x19afbd[_0x4db795(0x52b)],_0x19afbd[_0x4db795(0x170)]);for(let _0x5ea02d=_0x876023;_0x5ea02d<=_0x3f62dd;_0x5ea02d++){if(_0x4db795(0x803)==='glvED'){const _0x2c7076=$gameSwitches[_0x4db795(0x611)](_0x5ea02d);$gameSwitches[_0x4db795(0x3ce)](_0x5ea02d,!_0x2c7076);}else this['_forcedBattleSys']=_0x4db795(0x849);}}),PluginManager[_0x2bd3fa(0x2d8)](pluginData[_0x2bd3fa(0x87a)],_0x2bd3fa(0x817),_0x3fd5d4=>{const _0x1db6bc=_0x2bd3fa;if($gameParty['inBattle']())return;VisuMZ[_0x1db6bc(0x6e7)](_0x3fd5d4,_0x3fd5d4);const _0x2c739a=_0x3fd5d4[_0x1db6bc(0x2d1)]['toUpperCase']()[_0x1db6bc(0x8c9)](),_0x35c034=VisuMZ[_0x1db6bc(0x249)][_0x1db6bc(0x589)](_0x2c739a);$gameSystem[_0x1db6bc(0x63e)](_0x35c034);}),VisuMZ[_0x2bd3fa(0x249)]['CreateBattleSystemID']=function(_0x145f13){const _0x1a78e5=_0x2bd3fa;_0x145f13=_0x145f13||_0x1a78e5(0x5b7),_0x145f13=String(_0x145f13)[_0x1a78e5(0x345)]()[_0x1a78e5(0x8c9)]();switch(_0x145f13){case'DTB':return 0x0;case'TPB\x20ACTIVE':Imported['VisuMZ_1_OptionsCore']&&(_0x1a78e5(0x392)===_0x1a78e5(0x392)?ConfigManager[_0x1a78e5(0x801)]=!![]:_0x5cef2b+=_0x1a78e5(0x70c)[_0x1a78e5(0x5a0)](_0xc4fd4a['parameters'][0x0]));return 0x1;case'TPB\x20WAIT':Imported[_0x1a78e5(0x653)]&&('qAbwz'===_0x1a78e5(0x85b)?(this[_0x1a78e5(0x69b)]=new _0x226249(_0x40dbbe[_0x1a78e5(0x8e9)](_0x27fac8[_0x1a78e5(0x446)])),this[_0x1a78e5(0x916)]=new _0x1b223d(_0x1f2e54[_0x1a78e5(0x7f3)](_0x23862c[_0x1a78e5(0x224)])),this[_0x1a78e5(0x6b6)](this[_0x1a78e5(0x69b)]),this[_0x1a78e5(0x6b6)](this['_backSprite2']),this[_0x1a78e5(0x69b)]['bitmap'][_0x1a78e5(0x687)](this[_0x1a78e5(0x788)]['bind'](this,this[_0x1a78e5(0x69b)])),this[_0x1a78e5(0x916)][_0x1a78e5(0x44e)]['addLoadListener'](this['adjustSprite'][_0x1a78e5(0x174)](this,this[_0x1a78e5(0x916)]))):ConfigManager[_0x1a78e5(0x801)]=![]);return 0x2;case _0x1a78e5(0x27c):if(Imported[_0x1a78e5(0x2fe)])return'CTB';break;case _0x1a78e5(0x731):if(Imported[_0x1a78e5(0x787)])return _0x1a78e5(0x731);break;case'BTB':if(Imported[_0x1a78e5(0x498)]){if('pxTkp'==='pxTkp')return _0x1a78e5(0x409);else{if(_0x142ada)_0x5eb9d2[_0x1a78e5(0x571)](_0x33041d);}}break;case _0x1a78e5(0x849):if(Imported[_0x1a78e5(0x61a)])return _0x1a78e5(0x849);break;case _0x1a78e5(0x400):if(Imported[_0x1a78e5(0x355)])return _0x1a78e5(0x400);break;case'ETB':if(Imported[_0x1a78e5(0x25c)])return'ETB';break;case _0x1a78e5(0x567):if(Imported[_0x1a78e5(0x324)]){if(_0x1a78e5(0x344)===_0x1a78e5(0x344))return _0x1a78e5(0x567);else this['isUseModernControls']()?this[_0x1a78e5(0x807)]():_0x3636fb['CoreEngine'][_0x1a78e5(0x473)]['call'](this);}break;}return $dataSystem[_0x1a78e5(0x75c)];},PluginManager[_0x2bd3fa(0x2d8)](pluginData[_0x2bd3fa(0x87a)],_0x2bd3fa(0x1e1),_0x3df88c=>{const _0x25f6b4=_0x2bd3fa;VisuMZ['ConvertParams'](_0x3df88c,_0x3df88c);const _0x15addf=_0x3df88c[_0x25f6b4(0x2d1)]||0x1;$gameSystem[_0x25f6b4(0x8a4)](_0x15addf);}),VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x666)]=Scene_Boot[_0x2bd3fa(0x77c)][_0x2bd3fa(0x7dc)],Scene_Boot[_0x2bd3fa(0x77c)][_0x2bd3fa(0x7dc)]=function(){const _0xd29d66=_0x2bd3fa;VisuMZ[_0xd29d66(0x249)][_0xd29d66(0x666)][_0xd29d66(0x1f7)](this),this[_0xd29d66(0x7f8)](),this['process_VisuMZ_CoreEngine_Notetags'](),this[_0xd29d66(0x30b)](),this[_0xd29d66(0x501)](),this[_0xd29d66(0x2a0)](),VisuMZ[_0xd29d66(0x850)]();},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x6bc)]={},Scene_Boot[_0x2bd3fa(0x77c)][_0x2bd3fa(0x7f8)]=function(){const _0xbb08b4=_0x2bd3fa,_0x446153=[_0xbb08b4(0x274),_0xbb08b4(0x881),'ATK','DEF',_0xbb08b4(0x1ba),'MDF',_0xbb08b4(0x2bc),'LUK'],_0x1cdae4=[_0xbb08b4(0x362),_0xbb08b4(0x6a2),_0xbb08b4(0x8da),_0xbb08b4(0x20d),_0xbb08b4(0x8db),'MRF','CNT',_0xbb08b4(0x195),'MRG','TRG'],_0x4fd492=['TGR',_0xbb08b4(0x30a),_0xbb08b4(0x4cf),_0xbb08b4(0x20a),_0xbb08b4(0x502),_0xbb08b4(0x28a),_0xbb08b4(0x334),_0xbb08b4(0x3da),_0xbb08b4(0x5d6),_0xbb08b4(0x2e4)],_0x2b1baa=[_0x446153,_0x1cdae4,_0x4fd492],_0x4ed165=[_0xbb08b4(0x510),'Plus1',_0xbb08b4(0x1cc),_0xbb08b4(0x38d),_0xbb08b4(0x7c7),_0xbb08b4(0x73a),_0xbb08b4(0x786),_0xbb08b4(0x1a8),_0xbb08b4(0x21b),_0xbb08b4(0x586)];for(const _0x225e6e of _0x2b1baa){let _0x22f963='';if(_0x225e6e===_0x446153)_0x22f963='param';if(_0x225e6e===_0x1cdae4)_0x22f963=_0xbb08b4(0x518);if(_0x225e6e===_0x4fd492)_0x22f963=_0xbb08b4(0x5ad);for(const _0x4dc603 of _0x4ed165){let _0x2983f7=_0xbb08b4(0x816)[_0xbb08b4(0x5a0)](_0x22f963,_0x4dc603);VisuMZ[_0xbb08b4(0x249)][_0xbb08b4(0x6bc)][_0x2983f7]=[],VisuMZ[_0xbb08b4(0x249)][_0xbb08b4(0x6bc)][_0x2983f7+'JS']=[];let _0x577cdd=_0xbb08b4(0x509);if([_0xbb08b4(0x510),_0xbb08b4(0x1a8)]['includes'](_0x4dc603)){if(_0xbb08b4(0x764)!=='eSPeF'){_0x422912-=_0x143e4d;if(_0x16a1a5<=0x0)_0x242028=0x0;this[_0xbb08b4(0x969)](_0x3f5fb7);}else _0x577cdd+=_0xbb08b4(0x3c0);}else{if([_0xbb08b4(0x814),'Flat1']['includes'](_0x4dc603)){if(_0xbb08b4(0x20f)===_0xbb08b4(0x20f))_0x577cdd+=_0xbb08b4(0x6b7);else{_0x354bc8=_0x347390(_0x16256b)[_0xbb08b4(0x345)]();const _0x125f6e=_0x413f86['CoreEngine'][_0xbb08b4(0x8fc)][_0xbb08b4(0x7f9)];if(_0x43c12f===_0xbb08b4(0x274))return _0x125f6e[_0xbb08b4(0x8c2)];if(_0x336e0a===_0xbb08b4(0x881))return _0x125f6e['IconParam1'];if(_0x4f4ad0==='ATK')return _0x125f6e['IconParam2'];if(_0x2b8990==='DEF')return _0x125f6e['IconParam3'];if(_0x47e404===_0xbb08b4(0x1ba))return _0x125f6e[_0xbb08b4(0x719)];if(_0x2b7c78===_0xbb08b4(0x335))return _0x125f6e[_0xbb08b4(0x185)];if(_0x5da741==='AGI')return _0x125f6e['IconParam6'];if(_0x458434===_0xbb08b4(0x182))return _0x125f6e[_0xbb08b4(0x366)];if(_0x5bfddb===_0xbb08b4(0x362))return _0x125f6e[_0xbb08b4(0x48e)];if(_0x295ae4==='EVA')return _0x125f6e['IconXParam1'];if(_0x15a79b==='CRI')return _0x125f6e['IconXParam2'];if(_0x1c45b4===_0xbb08b4(0x20d))return _0x125f6e[_0xbb08b4(0x7ec)];if(_0x1fcaae===_0xbb08b4(0x8db))return _0x125f6e[_0xbb08b4(0x5f7)];if(_0x4f17e3==='MRF')return _0x125f6e[_0xbb08b4(0x588)];if(_0x5db6a8===_0xbb08b4(0x2c6))return _0x125f6e[_0xbb08b4(0x434)];if(_0x587884===_0xbb08b4(0x195))return _0x125f6e[_0xbb08b4(0x470)];if(_0x353cb6==='MRG')return _0x125f6e[_0xbb08b4(0x497)];if(_0x15dc12===_0xbb08b4(0x5ba))return _0x125f6e[_0xbb08b4(0x71d)];if(_0x5d8d1c==='TGR')return _0x125f6e[_0xbb08b4(0x690)];if(_0x14dec0===_0xbb08b4(0x30a))return _0x125f6e[_0xbb08b4(0x72e)];if(_0x3e103b===_0xbb08b4(0x4cf))return _0x125f6e['IconSParam2'];if(_0x41b931===_0xbb08b4(0x20a))return _0x125f6e['IconSParam3'];if(_0x2da661===_0xbb08b4(0x502))return _0x125f6e['IconSParam4'];if(_0x4808bc===_0xbb08b4(0x28a))return _0x125f6e['IconSParam5'];if(_0x59f54b===_0xbb08b4(0x334))return _0x125f6e[_0xbb08b4(0x49d)];if(_0x11b619==='MDR')return _0x125f6e[_0xbb08b4(0x82c)];if(_0x220e9f===_0xbb08b4(0x5d6))return _0x125f6e[_0xbb08b4(0x927)];if(_0x16d2e7===_0xbb08b4(0x2e4))return _0x125f6e[_0xbb08b4(0x714)];if(_0x2acbba[_0xbb08b4(0x249)][_0xbb08b4(0x779)][_0x1f81d8])return _0x577cea[_0xbb08b4(0x249)]['CustomParamIcons'][_0x124288]||0x0;return 0x0;}}else{if([_0xbb08b4(0x1cc),_0xbb08b4(0x586)]['includes'](_0x4dc603))_0x577cdd+=_0xbb08b4(0x7b0);else{if(_0x4dc603==='Max'){if(_0xbb08b4(0x36c)===_0xbb08b4(0x36c))_0x577cdd+=_0xbb08b4(0x230);else{const _0x32a907=_0x5445e3[_0xbb08b4(0x45b)]();_0x32a907[_0xbb08b4(0x313)]&&_0x32a907[_0xbb08b4(0x463)]&&_0x32a907[_0xbb08b4(0x19e)]>0x0&&(_0x50f0cd['stencilFunc'](_0x385d5f[_0xbb08b4(0x730)],0x0,~0x0),_0x384415['stencilOp'](_0x599af1['KEEP'],_0x261262[_0xbb08b4(0x6ba)],_0x275937[_0xbb08b4(0x6ba)]),_0x32a907[_0xbb08b4(0x189)](_0x335004),_0x36a4e[_0xbb08b4(0x3a5)]['flush'](),_0x4a861f[_0xbb08b4(0x2e8)](),_0x266c73[_0xbb08b4(0x6d6)](_0x129eb8['ALWAYS'],0x1,~0x0),_0x435f88['stencilOp'](_0x229950['REPLACE'],_0x1e7718[_0xbb08b4(0x3c4)],_0x2f57ed[_0xbb08b4(0x3c4)]),_0x4bba4d[_0xbb08b4(0x6da)](_0x3e3e16[_0xbb08b4(0x2db)],_0x3e84f1[_0xbb08b4(0x800)]),_0x216e19['render'](_0x1fdbda),_0xaad437['batch'][_0xbb08b4(0x4d5)](),_0x25b65c[_0xbb08b4(0x6da)](_0x5aeeaf['ONE'],_0xfa14f7['ONE_MINUS_SRC_ALPHA']));}}else{if(_0x4dc603===_0xbb08b4(0x73a))_0x577cdd+=_0xbb08b4(0x1de);else{if(_0x4dc603===_0xbb08b4(0x786)){if(_0xbb08b4(0x5e9)===_0xbb08b4(0x5e9))_0x577cdd+=_0xbb08b4(0x301);else{if(_0x435f4c[_0xbb08b4(0x306)](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0x25d9a2[_0xbb08b4(0x306)](/enter/i))return this['_inputSpecialKeyCode']===0xd;if(_0x232cb4[_0xbb08b4(0x306)](/escape/i))return this[_0xbb08b4(0x468)]===0x1b;}}}}}}}for(const _0x13f861 of _0x225e6e){let _0x52a9fb=_0x4dc603[_0xbb08b4(0x57d)](/[\d+]/g,'')[_0xbb08b4(0x345)]();const _0xf9091=_0x577cdd['format'](_0x13f861,_0x52a9fb);VisuMZ[_0xbb08b4(0x249)][_0xbb08b4(0x6bc)][_0x2983f7][_0xbb08b4(0x599)](new RegExp(_0xf9091,'i'));const _0x3f3684=_0xbb08b4(0x37c)[_0xbb08b4(0x5a0)](_0x13f861,_0x52a9fb);VisuMZ['CoreEngine']['RegExp'][_0x2983f7+'JS'][_0xbb08b4(0x599)](new RegExp(_0x3f3684,'i'));}}}},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_Notetags']=function(){const _0x181f3c=_0x2bd3fa;if(VisuMZ[_0x181f3c(0x850)])return;},Scene_Boot[_0x2bd3fa(0x77c)]['process_VisuMZ_CoreEngine_Settings']=function(){const _0x5e95ba=_0x2bd3fa;VisuMZ[_0x5e95ba(0x249)][_0x5e95ba(0x8fc)][_0x5e95ba(0x762)][_0x5e95ba(0x352)]&&('BLvYr'===_0x5e95ba(0x550)?this['setup'](_0x5cf9b7[_0x5e95ba(0x94e)],0x0):VisuMZ[_0x5e95ba(0x1aa)](!![]));VisuMZ[_0x5e95ba(0x249)][_0x5e95ba(0x8fc)][_0x5e95ba(0x762)]['ModernControls']&&(Input[_0x5e95ba(0x225)][0x23]=_0x5e95ba(0x59f),Input['keyMapper'][0x24]=_0x5e95ba(0x6ec));if(VisuMZ[_0x5e95ba(0x249)][_0x5e95ba(0x8fc)][_0x5e95ba(0x220)]){const _0x2f0db3=VisuMZ[_0x5e95ba(0x249)][_0x5e95ba(0x8fc)][_0x5e95ba(0x220)];_0x2f0db3[_0x5e95ba(0x2d5)]=_0x2f0db3[_0x5e95ba(0x2d5)]||'\x5c}❪SHIFT❫\x5c{',_0x2f0db3[_0x5e95ba(0x432)]=_0x2f0db3[_0x5e95ba(0x432)]||_0x5e95ba(0x5e1);}VisuMZ[_0x5e95ba(0x249)][_0x5e95ba(0x8fc)][_0x5e95ba(0x836)][_0x5e95ba(0x7c8)]&&(Input[_0x5e95ba(0x225)][0x57]='up',Input[_0x5e95ba(0x225)][0x41]=_0x5e95ba(0x811),Input[_0x5e95ba(0x225)][0x53]=_0x5e95ba(0x6d0),Input[_0x5e95ba(0x225)][0x44]=_0x5e95ba(0x359),Input['keyMapper'][0x45]=_0x5e95ba(0x1b0)),VisuMZ[_0x5e95ba(0x249)][_0x5e95ba(0x8fc)]['KeyboardInput']['DashToggleR']&&(Input['keyMapper'][0x52]=_0x5e95ba(0x1bd));},Scene_Boot[_0x2bd3fa(0x77c)][_0x2bd3fa(0x501)]=function(){const _0x5808fb=_0x2bd3fa;this[_0x5808fb(0x26f)]();},Scene_Boot['prototype'][_0x2bd3fa(0x26f)]=function(){const _0x16d2e5=_0x2bd3fa,_0x315333=VisuMZ[_0x16d2e5(0x249)]['Settings']['jsQuickFunc'];for(const _0x6ea80 of _0x315333){if(_0x16d2e5(0x268)==='FpVow')_0x29cd07['log'](_0x16d2e5(0x5ff)),_0x429630['log'](_0x1b9aed);else{const _0x3f3306=_0x6ea80[_0x16d2e5(0x92d)][_0x16d2e5(0x57d)](/[ ]/g,''),_0x341827=_0x6ea80['CodeJS'];VisuMZ[_0x16d2e5(0x249)][_0x16d2e5(0x511)](_0x3f3306,_0x341827);}}},VisuMZ[_0x2bd3fa(0x249)]['createJsQuickFunction']=function(_0x55fcd3,_0x641d1c){const _0x5210e4=_0x2bd3fa;if(!!window[_0x55fcd3]){if($gameTemp[_0x5210e4(0x4f7)]())console[_0x5210e4(0x253)](_0x5210e4(0x1b8)[_0x5210e4(0x5a0)](_0x55fcd3));}const _0x3d7887=_0x5210e4(0x8e8)[_0x5210e4(0x5a0)](_0x55fcd3,_0x641d1c);window[_0x55fcd3]=new Function(_0x3d7887);},Scene_Boot[_0x2bd3fa(0x77c)][_0x2bd3fa(0x2a0)]=function(){const _0x5dd80e=_0x2bd3fa,_0x44fd4c=VisuMZ[_0x5dd80e(0x249)][_0x5dd80e(0x8fc)]['CustomParam'];if(!_0x44fd4c)return;for(const _0x37dd38 of _0x44fd4c){if(!_0x37dd38)continue;VisuMZ[_0x5dd80e(0x249)][_0x5dd80e(0x821)](_0x37dd38);}},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x6bf)]={},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x779)]={},VisuMZ['CoreEngine'][_0x2bd3fa(0x648)]={},VisuMZ[_0x2bd3fa(0x249)]['CustomParamAbb']={},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x821)]=function(_0x466541){const _0x4092f7=_0x2bd3fa,_0x207c20=_0x466541[_0x4092f7(0x2b5)],_0x2bdf95=_0x466541[_0x4092f7(0x60d)],_0x16bcb3=_0x466541[_0x4092f7(0x887)],_0x526a35=_0x466541['Type'],_0x34c0f0=new Function(_0x466541[_0x4092f7(0x875)]);VisuMZ[_0x4092f7(0x249)][_0x4092f7(0x6bf)][_0x207c20['toUpperCase']()[_0x4092f7(0x8c9)]()]=_0x2bdf95,VisuMZ[_0x4092f7(0x249)][_0x4092f7(0x779)][_0x207c20[_0x4092f7(0x345)]()[_0x4092f7(0x8c9)]()]=_0x16bcb3,VisuMZ[_0x4092f7(0x249)][_0x4092f7(0x648)][_0x207c20[_0x4092f7(0x345)]()[_0x4092f7(0x8c9)]()]=_0x526a35,VisuMZ[_0x4092f7(0x249)]['CustomParamAbb'][_0x207c20[_0x4092f7(0x345)]()[_0x4092f7(0x8c9)]()]=_0x207c20,Object['defineProperty'](Game_BattlerBase[_0x4092f7(0x77c)],_0x207c20,{'get'(){const _0x1d0726=_0x4092f7,_0x429325=_0x34c0f0[_0x1d0726(0x1f7)](this);return _0x526a35==='integer'?Math[_0x1d0726(0x18a)](_0x429325):_0x429325;}});},VisuMZ[_0x2bd3fa(0x850)]=function(){const _0x450b7f=_0x2bd3fa;for(const _0xe9e6e9 of $dataActors){if(_0x450b7f(0x770)===_0x450b7f(0x3c2))return _0x4e57b5['getInputButtonString'](_0x450b7f(0x45b));else{if(_0xe9e6e9)VisuMZ[_0x450b7f(0x5d9)](_0xe9e6e9);}}for(const _0xb17856 of $dataClasses){if(_0xb17856)VisuMZ[_0x450b7f(0x2b0)](_0xb17856);}for(const _0x15c5e2 of $dataSkills){if(_0x15c5e2)VisuMZ['ParseSkillNotetags'](_0x15c5e2);}for(const _0x3bee57 of $dataItems){if(_0x3bee57)VisuMZ['ParseItemNotetags'](_0x3bee57);}for(const _0x255ad2 of $dataWeapons){if('qNUlj'===_0x450b7f(0x776)){if(_0x1bb22f[_0x450b7f(0x4f7)]())_0x51ccd[_0x450b7f(0x253)](_0x2d4af8);}else{if(_0x255ad2)VisuMZ['ParseWeaponNotetags'](_0x255ad2);}}for(const _0x1a402a of $dataArmors){if(_0x1a402a)VisuMZ[_0x450b7f(0x7b9)](_0x1a402a);}for(const _0x1fc9b3 of $dataEnemies){if(_0x450b7f(0x262)!=='rIbMZ'){if(_0x1fc9b3)VisuMZ[_0x450b7f(0x75f)](_0x1fc9b3);}else return 7.5625*_0x75b669*_0x1cd597;}for(const _0x2dab72 of $dataStates){if(_0x2dab72)VisuMZ[_0x450b7f(0x61d)](_0x2dab72);}for(const _0x2e81b9 of $dataTilesets){if(_0x2e81b9)VisuMZ[_0x450b7f(0x4ec)](_0x2e81b9);}},VisuMZ[_0x2bd3fa(0x5d9)]=function(_0x51e874){},VisuMZ[_0x2bd3fa(0x2b0)]=function(_0x24e9c6){},VisuMZ[_0x2bd3fa(0x172)]=function(_0x1ad005){},VisuMZ['ParseItemNotetags']=function(_0x16e51f){},VisuMZ[_0x2bd3fa(0x3ca)]=function(_0x203fdf){},VisuMZ[_0x2bd3fa(0x7b9)]=function(_0x51183e){},VisuMZ[_0x2bd3fa(0x75f)]=function(_0x34530f){},VisuMZ[_0x2bd3fa(0x61d)]=function(_0x236fdf){},VisuMZ['ParseTilesetNotetags']=function(_0x894443){},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x5d9)]=VisuMZ[_0x2bd3fa(0x5d9)],VisuMZ[_0x2bd3fa(0x5d9)]=function(_0xbeffcb){const _0x417ea2=_0x2bd3fa;VisuMZ[_0x417ea2(0x249)]['ParseActorNotetags']['call'](this,_0xbeffcb);const _0x34264a=_0xbeffcb[_0x417ea2(0x377)];if(_0x34264a[_0x417ea2(0x306)](/<MAX LEVEL:[ ](\d+)>/i)){_0xbeffcb[_0x417ea2(0x460)]=Number(RegExp['$1']);if(_0xbeffcb[_0x417ea2(0x460)]===0x0)_0xbeffcb[_0x417ea2(0x460)]=Number['MAX_SAFE_INTEGER'];}_0x34264a[_0x417ea2(0x306)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0xbeffcb[_0x417ea2(0x4b5)]=Math['min'](Number(RegExp['$1']),_0xbeffcb[_0x417ea2(0x460)]));},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x2b0)]=VisuMZ[_0x2bd3fa(0x2b0)],VisuMZ[_0x2bd3fa(0x2b0)]=function(_0xde0bb){const _0x203984=_0x2bd3fa;VisuMZ[_0x203984(0x249)][_0x203984(0x2b0)][_0x203984(0x1f7)](this,_0xde0bb);if(_0xde0bb[_0x203984(0x51c)])for(const _0x2984b3 of _0xde0bb['learnings']){_0x2984b3[_0x203984(0x377)][_0x203984(0x306)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x203984(0x3e0)==='yVLdj'?_0x168b63[_0x203984(0x249)][_0x203984(0x84b)][_0x203984(0x1f7)](this):_0x2984b3[_0x203984(0x4bd)]=Math['max'](Number(RegExp['$1']),0x1));}},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x75f)]=VisuMZ[_0x2bd3fa(0x75f)],VisuMZ[_0x2bd3fa(0x75f)]=function(_0x5b01e4){const _0x1e1756=_0x2bd3fa;VisuMZ['CoreEngine'][_0x1e1756(0x75f)][_0x1e1756(0x1f7)](this,_0x5b01e4),_0x5b01e4['level']=0x1;const _0xfe5d7c=_0x5b01e4[_0x1e1756(0x377)];if(_0xfe5d7c['match'](/<LEVEL:[ ](\d+)>/i))_0x5b01e4[_0x1e1756(0x4bd)]=Number(RegExp['$1']);if(_0xfe5d7c[_0x1e1756(0x306)](/<MAXHP:[ ](\d+)>/i))_0x5b01e4[_0x1e1756(0x50b)][0x0]=Number(RegExp['$1']);if(_0xfe5d7c['match'](/<MAXMP:[ ](\d+)>/i))_0x5b01e4[_0x1e1756(0x50b)][0x1]=Number(RegExp['$1']);if(_0xfe5d7c[_0x1e1756(0x306)](/<ATK:[ ](\d+)>/i))_0x5b01e4[_0x1e1756(0x50b)][0x2]=Number(RegExp['$1']);if(_0xfe5d7c[_0x1e1756(0x306)](/<DEF:[ ](\d+)>/i))_0x5b01e4[_0x1e1756(0x50b)][0x3]=Number(RegExp['$1']);if(_0xfe5d7c[_0x1e1756(0x306)](/<MAT:[ ](\d+)>/i))_0x5b01e4['params'][0x4]=Number(RegExp['$1']);if(_0xfe5d7c['match'](/<MDF:[ ](\d+)>/i))_0x5b01e4['params'][0x5]=Number(RegExp['$1']);if(_0xfe5d7c[_0x1e1756(0x306)](/<AGI:[ ](\d+)>/i))_0x5b01e4[_0x1e1756(0x50b)][0x6]=Number(RegExp['$1']);if(_0xfe5d7c[_0x1e1756(0x306)](/<LUK:[ ](\d+)>/i))_0x5b01e4[_0x1e1756(0x50b)][0x7]=Number(RegExp['$1']);if(_0xfe5d7c[_0x1e1756(0x306)](/<EXP:[ ](\d+)>/i))_0x5b01e4[_0x1e1756(0x8bc)]=Number(RegExp['$1']);if(_0xfe5d7c['match'](/<GOLD:[ ](\d+)>/i))_0x5b01e4['gold']=Number(RegExp['$1']);},VisuMZ[_0x2bd3fa(0x249)]['Graphics_defaultStretchMode']=Graphics[_0x2bd3fa(0x56a)],Graphics[_0x2bd3fa(0x56a)]=function(){const _0x3a3dbf=_0x2bd3fa;switch(VisuMZ[_0x3a3dbf(0x249)][_0x3a3dbf(0x8fc)]['QoL'][_0x3a3dbf(0x382)]){case _0x3a3dbf(0x5da):return!![];case _0x3a3dbf(0x6ea):return![];default:return VisuMZ[_0x3a3dbf(0x249)][_0x3a3dbf(0x8d6)][_0x3a3dbf(0x1f7)](this);}},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x26d)]=Graphics['printError'],Graphics[_0x2bd3fa(0x4fd)]=function(_0x20c43a,_0x1441f8,_0x9168d9=null){const _0x256040=_0x2bd3fa;VisuMZ[_0x256040(0x249)][_0x256040(0x26d)][_0x256040(0x1f7)](this,_0x20c43a,_0x1441f8,_0x9168d9),VisuMZ['ShowDevTools'](![]);},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x7f0)]=Graphics[_0x2bd3fa(0x43d)],Graphics[_0x2bd3fa(0x43d)]=function(_0x4d4af9){const _0x4495b2=_0x2bd3fa;VisuMZ[_0x4495b2(0x249)]['Graphics_centerElement'][_0x4495b2(0x1f7)](this,_0x4d4af9),this['_centerElementCoreEngine'](_0x4d4af9);},Graphics[_0x2bd3fa(0x878)]=function(_0x475129){const _0x49aa90=_0x2bd3fa;VisuMZ[_0x49aa90(0x249)][_0x49aa90(0x8fc)]['QoL']['FontSmoothing']&&(_0x475129[_0x49aa90(0x5e3)][_0x49aa90(0x39f)]='none');VisuMZ[_0x49aa90(0x249)][_0x49aa90(0x8fc)]['QoL'][_0x49aa90(0x930)]&&(_0x475129['style'][_0x49aa90(0x1ac)]=_0x49aa90(0x96a));const _0x5690b8=Math[_0x49aa90(0x523)](0x0,Math[_0x49aa90(0x7a0)](_0x475129[_0x49aa90(0x73f)]*this[_0x49aa90(0x612)])),_0x2a98ee=Math['max'](0x0,Math[_0x49aa90(0x7a0)](_0x475129[_0x49aa90(0x30f)]*this[_0x49aa90(0x612)]));_0x475129['style'][_0x49aa90(0x73f)]=_0x5690b8+'px',_0x475129['style'][_0x49aa90(0x30f)]=_0x2a98ee+'px';},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x701)]=Bitmap[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4d6)],Bitmap['prototype'][_0x2bd3fa(0x4d6)]=function(_0x2d97e6,_0x5e86fe){const _0x40147c=_0x2bd3fa;VisuMZ[_0x40147c(0x249)][_0x40147c(0x701)][_0x40147c(0x1f7)](this,_0x2d97e6,_0x5e86fe),this[_0x40147c(0x782)]=!(VisuMZ['CoreEngine'][_0x40147c(0x8fc)][_0x40147c(0x762)][_0x40147c(0x930)]??!![]);},Bitmap[_0x2bd3fa(0x77c)][_0x2bd3fa(0x805)]=function(){const _0x28f7ef=_0x2bd3fa;this[_0x28f7ef(0x63f)]=!![];},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x63d)]=Sprite['prototype'][_0x2bd3fa(0x8b3)],Sprite[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8b3)]=function(){const _0x13e8ae=_0x2bd3fa;VisuMZ[_0x13e8ae(0x249)]['Sprite_destroy'][_0x13e8ae(0x1f7)](this),this[_0x13e8ae(0x934)]();},Sprite['prototype'][_0x2bd3fa(0x934)]=function(){const _0x49cda1=_0x2bd3fa;if(!this['bitmap'])return;if(!this['bitmap']['_customModified'])return;this[_0x49cda1(0x44e)]['_baseTexture']&&!this['_bitmap'][_0x49cda1(0x3e5)][_0x49cda1(0x411)]&&(_0x49cda1(0x527)===_0x49cda1(0x527)?this[_0x49cda1(0x44e)][_0x49cda1(0x8b3)]():(_0x38228f['CoreEngine'][_0x49cda1(0x68f)][_0x49cda1(0x1f7)](this),this['initMembersCoreEngine']()));},VisuMZ['CoreEngine'][_0x2bd3fa(0x1c1)]=Bitmap[_0x2bd3fa(0x77c)][_0x2bd3fa(0x35b)],Bitmap[_0x2bd3fa(0x77c)][_0x2bd3fa(0x35b)]=function(_0x37fafd,_0x38eec7){const _0x44f34f=_0x2bd3fa;VisuMZ[_0x44f34f(0x249)][_0x44f34f(0x1c1)][_0x44f34f(0x1f7)](this,_0x37fafd,_0x38eec7),this[_0x44f34f(0x805)]();},VisuMZ[_0x2bd3fa(0x249)]['Bitmap_blt']=Bitmap['prototype'][_0x2bd3fa(0x583)],Bitmap['prototype'][_0x2bd3fa(0x583)]=function(_0x563b39,_0x5ba77e,_0x53247c,_0x39cfaa,_0x23ec38,_0x3f54d1,_0x3973d2,_0x515a12,_0x11d0a0){const _0x1bd061=_0x2bd3fa;_0x5ba77e=Math[_0x1bd061(0x18a)](_0x5ba77e),_0x53247c=Math['round'](_0x53247c),_0x39cfaa=Math[_0x1bd061(0x18a)](_0x39cfaa),_0x23ec38=Math['round'](_0x23ec38),_0x3f54d1=Math[_0x1bd061(0x18a)](_0x3f54d1),_0x3973d2=Math['round'](_0x3973d2),VisuMZ['CoreEngine'][_0x1bd061(0x2a8)]['call'](this,_0x563b39,_0x5ba77e,_0x53247c,_0x39cfaa,_0x23ec38,_0x3f54d1,_0x3973d2,_0x515a12,_0x11d0a0),this[_0x1bd061(0x805)]();},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x799)]=Bitmap[_0x2bd3fa(0x77c)][_0x2bd3fa(0x3a3)],Bitmap[_0x2bd3fa(0x77c)][_0x2bd3fa(0x3a3)]=function(_0x45f893,_0xc7d6da,_0x8355b9,_0x461d44){const _0x4bf922=_0x2bd3fa;VisuMZ[_0x4bf922(0x249)]['Bitmap_clearRect'][_0x4bf922(0x1f7)](this,_0x45f893,_0xc7d6da,_0x8355b9,_0x461d44),this[_0x4bf922(0x805)]();},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x235)]=Bitmap[_0x2bd3fa(0x77c)]['fillRect'],Bitmap['prototype'][_0x2bd3fa(0x602)]=function(_0x2765f5,_0x572542,_0x58612e,_0xb82ceb,_0x5ab75b){const _0x1de2b1=_0x2bd3fa;VisuMZ[_0x1de2b1(0x249)][_0x1de2b1(0x235)][_0x1de2b1(0x1f7)](this,_0x2765f5,_0x572542,_0x58612e,_0xb82ceb,_0x5ab75b),this[_0x1de2b1(0x805)]();},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x1f4)]=Bitmap['prototype'][_0x2bd3fa(0x28b)],Bitmap['prototype'][_0x2bd3fa(0x28b)]=function(_0x2bb30f,_0x46cc0d,_0x277073,_0x719160,_0x32c814){const _0x59c97b=_0x2bd3fa;VisuMZ[_0x59c97b(0x249)][_0x59c97b(0x1f4)][_0x59c97b(0x1f7)](this,_0x2bb30f,_0x46cc0d,_0x277073,_0x719160,_0x32c814),this['markCoreEngineModified']();},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x6a4)]=Bitmap[_0x2bd3fa(0x77c)][_0x2bd3fa(0x450)],Bitmap['prototype'][_0x2bd3fa(0x450)]=function(_0x598d06,_0x5b1fd2,_0x126311,_0x5f2d21,_0x45aa0d,_0x54f3e5,_0x24bff8){const _0x41e4c7=_0x2bd3fa;VisuMZ['CoreEngine']['Bitmap_gradientFillRect'][_0x41e4c7(0x1f7)](this,_0x598d06,_0x5b1fd2,_0x126311,_0x5f2d21,_0x45aa0d,_0x54f3e5,_0x24bff8),this[_0x41e4c7(0x805)]();},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x652)]=Bitmap[_0x2bd3fa(0x77c)]['drawCircle'],Bitmap['prototype'][_0x2bd3fa(0x724)]=function(_0x55e8cc,_0xad4f16,_0x3a8180,_0x52f309){const _0x31b626=_0x2bd3fa;_0x55e8cc=Math[_0x31b626(0x18a)](_0x55e8cc),_0xad4f16=Math[_0x31b626(0x18a)](_0xad4f16),_0x3a8180=Math[_0x31b626(0x18a)](_0x3a8180),VisuMZ[_0x31b626(0x249)]['Bitmap_drawCircle']['call'](this,_0x55e8cc,_0xad4f16,_0x3a8180,_0x52f309),this[_0x31b626(0x805)]();},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x358)]=Bitmap[_0x2bd3fa(0x77c)]['measureTextWidth'],Bitmap[_0x2bd3fa(0x77c)][_0x2bd3fa(0x64a)]=function(_0x3c7859){const _0x494e62=_0x2bd3fa;return Math[_0x494e62(0x2f0)](VisuMZ[_0x494e62(0x249)]['Bitmap_measureTextWidth'][_0x494e62(0x1f7)](this,_0x3c7859));},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x4bf)]=Bitmap[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1af)],Bitmap[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1af)]=function(_0xd491eb,_0x185a61,_0x16f3b0,_0x52c3f5,_0x1c2ac5,_0x53709f){const _0x248e76=_0x2bd3fa;_0x185a61=Math[_0x248e76(0x18a)](_0x185a61),_0x16f3b0=Math[_0x248e76(0x18a)](_0x16f3b0),_0x52c3f5=Math[_0x248e76(0x18a)](_0x52c3f5),_0x1c2ac5=Math[_0x248e76(0x18a)](_0x1c2ac5),VisuMZ[_0x248e76(0x249)][_0x248e76(0x4bf)][_0x248e76(0x1f7)](this,_0xd491eb,_0x185a61,_0x16f3b0,_0x52c3f5,_0x1c2ac5,_0x53709f),this[_0x248e76(0x805)]();},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x4c3)]=Bitmap['prototype']['_drawTextOutline'],Bitmap['prototype'][_0x2bd3fa(0x5c6)]=function(_0x17ba78,_0xac1c97,_0x5c2c6b,_0x270107){const _0x77baf7=_0x2bd3fa;if(VisuMZ['CoreEngine']['Settings'][_0x77baf7(0x762)]['FontShadows'])'NWVkV'!==_0x77baf7(0x52f)?_0x39d430['render'](_0x5a4f42):this['_drawTextShadow'](_0x17ba78,_0xac1c97,_0x5c2c6b,_0x270107);else{if('qYRTP'!==_0x77baf7(0x613))return _0x165d46[_0x77baf7(0x6a0)][_0x77baf7(0x2a4)][_0x77baf7(0x1f7)](this);else VisuMZ[_0x77baf7(0x249)][_0x77baf7(0x4c3)][_0x77baf7(0x1f7)](this,_0x17ba78,_0xac1c97,_0x5c2c6b,_0x270107);}},Bitmap[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5cf)]=function(_0x50fe67,_0x354060,_0x1acc81,_0x429484){const _0x5022c9=_0x2bd3fa,_0x193afd=this[_0x5022c9(0x1c3)];_0x193afd[_0x5022c9(0x27e)]=this[_0x5022c9(0x2b6)],_0x193afd[_0x5022c9(0x847)](_0x50fe67,_0x354060+0x2,_0x1acc81+0x2,_0x429484);},VisuMZ[_0x2bd3fa(0x249)]['Input_clear']=Input['clear'],Input[_0x2bd3fa(0x2e8)]=function(){const _0xe9506=_0x2bd3fa;VisuMZ[_0xe9506(0x249)][_0xe9506(0x6e8)][_0xe9506(0x1f7)](this),this[_0xe9506(0x71f)]=undefined,this['_inputSpecialKeyCode']=undefined,this[_0xe9506(0x3a8)]=Input['keyRepeatWait'];},VisuMZ[_0x2bd3fa(0x249)]['Input_update']=Input[_0x2bd3fa(0x859)],Input[_0x2bd3fa(0x859)]=function(){const _0x5318a1=_0x2bd3fa;VisuMZ[_0x5318a1(0x249)][_0x5318a1(0x82e)][_0x5318a1(0x1f7)](this);if(this[_0x5318a1(0x3a8)])this['_gamepadWait']--;},VisuMZ['CoreEngine'][_0x2bd3fa(0x40e)]=Input[_0x2bd3fa(0x959)],Input[_0x2bd3fa(0x959)]=function(){const _0x542612=_0x2bd3fa;if(this['_gamepadWait'])return;VisuMZ[_0x542612(0x249)][_0x542612(0x40e)][_0x542612(0x1f7)](this);},VisuMZ[_0x2bd3fa(0x249)]['Input_setupEventHandlers']=Input[_0x2bd3fa(0x597)],Input[_0x2bd3fa(0x597)]=function(){const _0x322659=_0x2bd3fa;VisuMZ[_0x322659(0x249)][_0x322659(0x834)][_0x322659(0x1f7)](this),document[_0x322659(0x8e5)]('keypress',this[_0x322659(0x5d0)][_0x322659(0x174)](this));},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x2e0)]=Input[_0x2bd3fa(0x68c)],Input[_0x2bd3fa(0x68c)]=function(_0x2a56de){const _0x301d0e=_0x2bd3fa;this[_0x301d0e(0x468)]=_0x2a56de[_0x301d0e(0x7a5)],VisuMZ['CoreEngine'][_0x301d0e(0x2e0)][_0x301d0e(0x1f7)](this,_0x2a56de);},Input[_0x2bd3fa(0x5d0)]=function(_0x473329){const _0x446f3f=_0x2bd3fa;this[_0x446f3f(0x2c3)](_0x473329);},Input[_0x2bd3fa(0x2c3)]=function(_0x30295b){const _0x2c6f61=_0x2bd3fa;this[_0x2c6f61(0x468)]=_0x30295b['keyCode'];let _0x17a36d=String[_0x2c6f61(0x903)](_0x30295b[_0x2c6f61(0x89e)]);this[_0x2c6f61(0x71f)]===undefined?this[_0x2c6f61(0x71f)]=_0x17a36d:_0x2c6f61(0x3d0)===_0x2c6f61(0x3d0)?this[_0x2c6f61(0x71f)]+=_0x17a36d:this[_0x2c6f61(0x2e8)]();},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x86f)]=Input['_shouldPreventDefault'],Input[_0x2bd3fa(0x4e1)]=function(_0x2b7770){const _0x4318a3=_0x2bd3fa;if(_0x2b7770===0x8)return![];return VisuMZ[_0x4318a3(0x249)][_0x4318a3(0x86f)][_0x4318a3(0x1f7)](this,_0x2b7770);},Input[_0x2bd3fa(0x751)]=function(_0x1e0bcb){const _0x1759b1=_0x2bd3fa;if(_0x1e0bcb[_0x1759b1(0x306)](/backspace/i))return this[_0x1759b1(0x468)]===0x8;if(_0x1e0bcb[_0x1759b1(0x306)](/enter/i))return this['_inputSpecialKeyCode']===0xd;if(_0x1e0bcb[_0x1759b1(0x306)](/escape/i))return this[_0x1759b1(0x468)]===0x1b;},Input[_0x2bd3fa(0x23d)]=function(){const _0x260189=_0x2bd3fa;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x260189(0x522)](this[_0x260189(0x468)]);},Input[_0x2bd3fa(0x68b)]=function(){const _0x17e1a8=_0x2bd3fa;return[0x25,0x26,0x27,0x28][_0x17e1a8(0x522)](this['_inputSpecialKeyCode']);},Input[_0x2bd3fa(0x53c)]=function(){const _0x4aef5b=_0x2bd3fa;if(navigator[_0x4aef5b(0x39c)]){const _0x193a83=navigator['getGamepads']();if(_0x193a83){if('dnqdb'==='OcDsN')this[_0x4aef5b(0x631)]();else for(const _0x273d83 of _0x193a83){if(_0x4aef5b(0x1d3)===_0x4aef5b(0x1d3)){if(_0x273d83&&_0x273d83[_0x4aef5b(0x43e)])return!![];}else return 0x1;}}}return![];},Input[_0x2bd3fa(0x620)]=function(){const _0x212b99=_0x2bd3fa;if(navigator[_0x212b99(0x39c)]){const _0x4249f2=navigator[_0x212b99(0x39c)]();if(_0x4249f2)for(const _0x5f459c of _0x4249f2){if(_0x5f459c&&_0x5f459c[_0x212b99(0x43e)]){if(this['isGamepadButtonPressed'](_0x5f459c))return!![];}}}return![];},Input[_0x2bd3fa(0x190)]=function(_0x12dbef){const _0x926fc5=_0x2bd3fa,_0x1f0f40=_0x12dbef[_0x926fc5(0x25a)];for(let _0x47cbf5=0x0;_0x47cbf5<_0x1f0f40[_0x926fc5(0x7e1)];_0x47cbf5++){if(_0x1f0f40[_0x47cbf5][_0x926fc5(0x3b2)])return!![];}return![];},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x2ad)]=Tilemap['prototype'][_0x2bd3fa(0x191)],Tilemap[_0x2bd3fa(0x77c)][_0x2bd3fa(0x191)]=function(_0xc49ffc,_0x34722d,_0x6a7222,_0x1275c0){const _0x2b2119=_0x2bd3fa;if($gameMap&&$gameMap[_0x2b2119(0x541)]())return;VisuMZ[_0x2b2119(0x249)][_0x2b2119(0x2ad)][_0x2b2119(0x1f7)](this,_0xc49ffc,_0x34722d,_0x6a7222,_0x1275c0);},Tilemap[_0x2bd3fa(0x8b0)]['prototype'][_0x2bd3fa(0x6e9)]=function(){const _0x32e5ef=_0x2bd3fa;this[_0x32e5ef(0x94c)]();for(let _0x2b187c=0x0;_0x2b187c<Tilemap[_0x32e5ef(0x8e2)][_0x32e5ef(0x1b2)];_0x2b187c++){const _0x49903c=new PIXI[(_0x32e5ef(0x7fb))]();_0x49903c[_0x32e5ef(0x64b)](0x800,0x800),VisuMZ['CoreEngine'][_0x32e5ef(0x8fc)][_0x32e5ef(0x762)][_0x32e5ef(0x930)]&&(_0x49903c[_0x32e5ef(0x84f)]=PIXI[_0x32e5ef(0x71c)]['NEAREST']),this[_0x32e5ef(0x2eb)]['push'](_0x49903c);}},WindowLayer[_0x2bd3fa(0x77c)][_0x2bd3fa(0x314)]=function(){const _0x55711c=_0x2bd3fa;if(SceneManager&&SceneManager[_0x55711c(0x7d8)]){if('JdnAb'!==_0x55711c(0x1d9))return SceneManager['_scene'][_0x55711c(0x812)]();else{if(_0x1b743e[_0x55711c(0x45d)]())return;_0xa25ffc[_0x55711c(0x6e7)](_0x501ee3,_0x1817c6);const _0x38aa56=_0x5acb6d[_0x55711c(0x7fc)](_0x1b4a40[_0x55711c(0x52b)],_0x58d2a5[_0x55711c(0x170)]),_0x4d88fa=_0x442342['max'](_0x2ce402[_0x55711c(0x52b)],_0x4dbceb[_0x55711c(0x170)]),_0x46e36f=(_0x16e76e['Chance']||0x0)/0x64;for(let _0x14e5d9=_0x38aa56;_0x14e5d9<=_0x4d88fa;_0x14e5d9++){const _0x9e456d=_0x3f5c24[_0x55711c(0x88f)]()<=_0x46e36f;_0x21d8b3[_0x55711c(0x3ce)](_0x14e5d9,_0x9e456d);}}}else return!![];},VisuMZ[_0x2bd3fa(0x249)]['WindowLayer_render']=WindowLayer[_0x2bd3fa(0x77c)][_0x2bd3fa(0x189)],WindowLayer['prototype'][_0x2bd3fa(0x189)]=function render(_0x588c5e){const _0x255b02=_0x2bd3fa;if(this[_0x255b02(0x314)]())VisuMZ['CoreEngine']['WindowLayer_render'][_0x255b02(0x1f7)](this,_0x588c5e);else{if(_0x255b02(0x422)!=='DSnOk')return!![];else this[_0x255b02(0x7ca)](_0x588c5e);}},WindowLayer[_0x2bd3fa(0x77c)][_0x2bd3fa(0x7ca)]=function render(_0x5818c9){const _0x51734e=_0x2bd3fa;if(!this['visible'])return;const _0x4dbd50=new PIXI['Graphics'](),_0x3d71b0=_0x5818c9['gl'],_0x25c393=this[_0x51734e(0x8b7)][_0x51734e(0x31f)]();_0x5818c9[_0x51734e(0x60e)][_0x51734e(0x2af)](),_0x4dbd50['transform']=this['transform'],_0x5818c9[_0x51734e(0x3a5)]['flush'](),_0x3d71b0[_0x51734e(0x3d4)](_0x3d71b0[_0x51734e(0x6d3)]);while(_0x25c393['length']>0x0){const _0x118be3=_0x25c393[_0x51734e(0x45b)]();_0x118be3[_0x51734e(0x313)]&&_0x118be3[_0x51734e(0x463)]&&_0x118be3[_0x51734e(0x19e)]>0x0&&(_0x3d71b0[_0x51734e(0x6d6)](_0x3d71b0[_0x51734e(0x730)],0x0,~0x0),_0x3d71b0[_0x51734e(0x31e)](_0x3d71b0['KEEP'],_0x3d71b0[_0x51734e(0x6ba)],_0x3d71b0[_0x51734e(0x6ba)]),_0x118be3['render'](_0x5818c9),_0x5818c9['batch'][_0x51734e(0x4d5)](),_0x4dbd50[_0x51734e(0x2e8)](),_0x3d71b0[_0x51734e(0x6d6)](_0x3d71b0[_0x51734e(0x27a)],0x1,~0x0),_0x3d71b0[_0x51734e(0x31e)](_0x3d71b0[_0x51734e(0x3c4)],_0x3d71b0[_0x51734e(0x3c4)],_0x3d71b0[_0x51734e(0x3c4)]),_0x3d71b0[_0x51734e(0x6da)](_0x3d71b0['ZERO'],_0x3d71b0[_0x51734e(0x800)]),_0x4dbd50['render'](_0x5818c9),_0x5818c9[_0x51734e(0x3a5)][_0x51734e(0x4d5)](),_0x3d71b0[_0x51734e(0x6da)](_0x3d71b0['ONE'],_0x3d71b0['ONE_MINUS_SRC_ALPHA']));}_0x3d71b0['disable'](_0x3d71b0[_0x51734e(0x6d3)]),_0x3d71b0[_0x51734e(0x2e8)](_0x3d71b0[_0x51734e(0x55a)]),_0x3d71b0[_0x51734e(0x31a)](0x0),_0x5818c9[_0x51734e(0x3a5)][_0x51734e(0x4d5)]();for(const _0x3d33c1 of this[_0x51734e(0x8b7)]){if('tkzbH'!==_0x51734e(0x2c9)){const _0x431512=_0x424f2c[_0x51734e(0x249)]['Settings']['KeyboardInput'];return this['_inputWindow'][_0x51734e(0x67a)]===_0x51734e(0x203)?_0x431512[_0x51734e(0x7bb)]||_0x51734e(0x7bb):_0x431512[_0x51734e(0x669)]||_0x51734e(0x669);}else!_0x3d33c1[_0x51734e(0x313)]&&_0x3d33c1[_0x51734e(0x463)]&&_0x3d33c1[_0x51734e(0x189)](_0x5818c9);}_0x5818c9['batch'][_0x51734e(0x4d5)]();},DataManager[_0x2bd3fa(0x5c3)]=function(_0x5e6f78){return this['isItem'](_0x5e6f78)&&_0x5e6f78['itypeId']===0x2;},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x397)]=DataManager[_0x2bd3fa(0x41e)],DataManager[_0x2bd3fa(0x41e)]=function(){const _0x3199fd=_0x2bd3fa;VisuMZ[_0x3199fd(0x249)][_0x3199fd(0x397)][_0x3199fd(0x1f7)](this),this[_0x3199fd(0x673)](),this[_0x3199fd(0x8ec)]();},DataManager[_0x2bd3fa(0x673)]=function(){const _0x65458a=_0x2bd3fa;if($gameTemp[_0x65458a(0x4f7)]()){const _0x2b961f=VisuMZ[_0x65458a(0x249)][_0x65458a(0x8fc)]['QoL']['NewGameCommonEvent'];if(_0x2b961f>0x0)$gameTemp[_0x65458a(0x83b)](_0x2b961f);}},DataManager[_0x2bd3fa(0x8ec)]=function(){const _0x37ff8f=_0x2bd3fa,_0x9e1d79=VisuMZ[_0x37ff8f(0x249)][_0x37ff8f(0x8fc)][_0x37ff8f(0x762)][_0x37ff8f(0x546)]||0x0;if(_0x9e1d79>0x0)$gameTemp[_0x37ff8f(0x83b)](_0x9e1d79);},DataManager['createTroopNote']=function(_0x146ee9){const _0x7a2cd5=_0x2bd3fa,_0x5c51f7=$dataTroops[_0x146ee9];if(!_0x5c51f7)return'';let _0x406eb1='';_0x406eb1+=_0x5c51f7[_0x7a2cd5(0x87a)];for(const _0x22f114 of _0x5c51f7[_0x7a2cd5(0x874)]){if('lmEOh'!==_0x7a2cd5(0x36e))for(const _0x4ed3db of _0x22f114[_0x7a2cd5(0x94e)]){if(_0x7a2cd5(0x8ad)!==_0x7a2cd5(0x7fa))[0x6c,0x198]['includes'](_0x4ed3db[_0x7a2cd5(0x64d)])&&(_0x406eb1+='\x0a',_0x406eb1+=_0x4ed3db['parameters'][0x0]);else{if(!this[_0x7a2cd5(0x519)])return;for(const _0x29102d of this[_0x7a2cd5(0x519)]){_0x29102d&&_0x29102d[_0x7a2cd5(0x859)]();}}}else{_0x488225['ConvertParams'](_0x5b0300,_0x57b95c);const _0x5c2ad5=_0x453701[_0x7a2cd5(0x611)]||0x0;_0x5c889e[_0x7a2cd5(0x23e)](_0x5c2ad5);}}return _0x406eb1;},TextManager[_0x2bd3fa(0x375)]=['','','',_0x2bd3fa(0x1ef),'','',_0x2bd3fa(0x8e6),'',_0x2bd3fa(0x728),_0x2bd3fa(0x4ba),'','','CLEAR','ENTER',_0x2bd3fa(0x8fa),'',_0x2bd3fa(0x85f),'CTRL',_0x2bd3fa(0x78a),_0x2bd3fa(0x943),_0x2bd3fa(0x91a),_0x2bd3fa(0x7a9),_0x2bd3fa(0x40f),_0x2bd3fa(0x487),_0x2bd3fa(0x6c8),_0x2bd3fa(0x1f1),'',_0x2bd3fa(0x950),_0x2bd3fa(0x767),_0x2bd3fa(0x785),_0x2bd3fa(0x286),_0x2bd3fa(0x3b5),_0x2bd3fa(0x295),_0x2bd3fa(0x85c),_0x2bd3fa(0x759),_0x2bd3fa(0x395),_0x2bd3fa(0x1a4),_0x2bd3fa(0x3fd),'UP',_0x2bd3fa(0x4f9),_0x2bd3fa(0x34d),_0x2bd3fa(0x8bf),_0x2bd3fa(0x813),_0x2bd3fa(0x357),_0x2bd3fa(0x26c),_0x2bd3fa(0x3f4),_0x2bd3fa(0x1d6),'','0','1','2','3','4','5','6','7','8','9',_0x2bd3fa(0x946),_0x2bd3fa(0x80d),_0x2bd3fa(0x18f),_0x2bd3fa(0x20b),'GREATER_THAN',_0x2bd3fa(0x82d),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x2bd3fa(0x7ed),'',_0x2bd3fa(0x445),'',_0x2bd3fa(0x6a7),'NUMPAD0',_0x2bd3fa(0x2bd),_0x2bd3fa(0x7d6),_0x2bd3fa(0x59e),_0x2bd3fa(0x749),_0x2bd3fa(0x24d),_0x2bd3fa(0x4b7),_0x2bd3fa(0x8c1),'NUMPAD8','NUMPAD9','MULTIPLY',_0x2bd3fa(0x2ea),_0x2bd3fa(0x33e),'SUBTRACT','DECIMAL',_0x2bd3fa(0x464),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x2bd3fa(0x4ee),_0x2bd3fa(0x578),_0x2bd3fa(0x622),'F13','F14',_0x2bd3fa(0x896),_0x2bd3fa(0x2b2),'F17',_0x2bd3fa(0x2df),'F19',_0x2bd3fa(0x6e6),'F21',_0x2bd3fa(0x2a6),_0x2bd3fa(0x6b3),_0x2bd3fa(0x802),'','','','','','','','',_0x2bd3fa(0x45e),'SCROLL_LOCK','WIN_OEM_FJ_JISHO','WIN_OEM_FJ_MASSHOU',_0x2bd3fa(0x948),'WIN_OEM_FJ_LOYA',_0x2bd3fa(0x319),'','','','','','','','','',_0x2bd3fa(0x4d9),_0x2bd3fa(0x462),_0x2bd3fa(0x647),_0x2bd3fa(0x180),_0x2bd3fa(0x95d),'PERCENT','AMPERSAND','UNDERSCORE',_0x2bd3fa(0x1ec),_0x2bd3fa(0x628),_0x2bd3fa(0x7e3),_0x2bd3fa(0x696),_0x2bd3fa(0x457),_0x2bd3fa(0x819),_0x2bd3fa(0x93e),_0x2bd3fa(0x7a7),_0x2bd3fa(0x617),'','','','',_0x2bd3fa(0x888),_0x2bd3fa(0x210),'VOLUME_UP','','','SEMICOLON',_0x2bd3fa(0x20b),_0x2bd3fa(0x291),'MINUS',_0x2bd3fa(0x4e5),_0x2bd3fa(0x413),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x2bd3fa(0x7cb),_0x2bd3fa(0x8a9),_0x2bd3fa(0x29e),_0x2bd3fa(0x829),'',_0x2bd3fa(0x31d),_0x2bd3fa(0x521),'',_0x2bd3fa(0x6af),'WIN_ICO_00','','WIN_ICO_CLEAR','','','WIN_OEM_RESET',_0x2bd3fa(0x265),'WIN_OEM_PA1',_0x2bd3fa(0x1f6),_0x2bd3fa(0x5be),_0x2bd3fa(0x7a2),'WIN_OEM_CUSEL','WIN_OEM_ATTN',_0x2bd3fa(0x5db),_0x2bd3fa(0x8f0),'WIN_OEM_AUTO','WIN_OEM_ENLW','WIN_OEM_BACKTAB',_0x2bd3fa(0x7f2),_0x2bd3fa(0x83c),_0x2bd3fa(0x6cd),_0x2bd3fa(0x8d3),_0x2bd3fa(0x7fd),'ZOOM','',_0x2bd3fa(0x356),'WIN_OEM_CLEAR',''],TextManager['buttonAssistOk']=VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x8fc)][_0x2bd3fa(0x220)][_0x2bd3fa(0x39a)],TextManager['buttonAssistCancel']=VisuMZ['CoreEngine'][_0x2bd3fa(0x8fc)][_0x2bd3fa(0x220)][_0x2bd3fa(0x5bb)],TextManager[_0x2bd3fa(0x594)]=VisuMZ['CoreEngine'][_0x2bd3fa(0x8fc)][_0x2bd3fa(0x220)][_0x2bd3fa(0x43f)],VisuMZ['CoreEngine']['TextManager_param']=TextManager['param'],TextManager[_0x2bd3fa(0x2f7)]=function(_0x2b789f){const _0x39154e=_0x2bd3fa;if(typeof _0x2b789f===_0x39154e(0x3d8))return VisuMZ[_0x39154e(0x249)]['TextManager_param']['call'](this,_0x2b789f);else{if(_0x39154e(0x953)==='DEXCq')return this['paramName'](_0x2b789f);else this['drawIconBySize'](_0x8c15af,_0x513fe9,_0x4cf321,this[_0x39154e(0x791)]()),_0x9b52f0-=this[_0x39154e(0x791)]()+0x2,_0x40162d+=this[_0x39154e(0x791)]()+0x2;}},TextManager[_0x2bd3fa(0x65a)]=function(_0x17ae11){const _0x57a6be=_0x2bd3fa;_0x17ae11=String(_0x17ae11||'')[_0x57a6be(0x345)]();const _0x38436c=VisuMZ[_0x57a6be(0x249)][_0x57a6be(0x8fc)][_0x57a6be(0x7f9)];if(_0x17ae11===_0x57a6be(0x274))return $dataSystem[_0x57a6be(0x833)][_0x57a6be(0x50b)][0x0];if(_0x17ae11==='MAXMP')return $dataSystem[_0x57a6be(0x833)][_0x57a6be(0x50b)][0x1];if(_0x17ae11===_0x57a6be(0x64e))return $dataSystem['terms'][_0x57a6be(0x50b)][0x2];if(_0x17ae11===_0x57a6be(0x62f))return $dataSystem['terms'][_0x57a6be(0x50b)][0x3];if(_0x17ae11===_0x57a6be(0x1ba))return $dataSystem[_0x57a6be(0x833)][_0x57a6be(0x50b)][0x4];if(_0x17ae11==='MDF')return $dataSystem[_0x57a6be(0x833)][_0x57a6be(0x50b)][0x5];if(_0x17ae11===_0x57a6be(0x2bc))return $dataSystem[_0x57a6be(0x833)][_0x57a6be(0x50b)][0x6];if(_0x17ae11===_0x57a6be(0x182))return $dataSystem['terms'][_0x57a6be(0x50b)][0x7];if(_0x17ae11===_0x57a6be(0x362))return _0x38436c[_0x57a6be(0x234)];if(_0x17ae11==='EVA')return _0x38436c[_0x57a6be(0x957)];if(_0x17ae11===_0x57a6be(0x8da))return _0x38436c[_0x57a6be(0x19f)];if(_0x17ae11===_0x57a6be(0x20d))return _0x38436c['XParamVocab3'];if(_0x17ae11===_0x57a6be(0x8db))return _0x38436c[_0x57a6be(0x449)];if(_0x17ae11===_0x57a6be(0x5e0))return _0x38436c[_0x57a6be(0x426)];if(_0x17ae11==='CNT')return _0x38436c[_0x57a6be(0x2c0)];if(_0x17ae11==='HRG')return _0x38436c['XParamVocab7'];if(_0x17ae11===_0x57a6be(0x574))return _0x38436c[_0x57a6be(0x876)];if(_0x17ae11===_0x57a6be(0x5ba))return _0x38436c[_0x57a6be(0x8a7)];if(_0x17ae11===_0x57a6be(0x8b4))return _0x38436c[_0x57a6be(0x370)];if(_0x17ae11==='GRD')return _0x38436c[_0x57a6be(0x1eb)];if(_0x17ae11===_0x57a6be(0x4cf))return _0x38436c['SParamVocab2'];if(_0x17ae11===_0x57a6be(0x20a))return _0x38436c['SParamVocab3'];if(_0x17ae11===_0x57a6be(0x502))return _0x38436c[_0x57a6be(0x378)];if(_0x17ae11===_0x57a6be(0x28a))return _0x38436c['SParamVocab5'];if(_0x17ae11===_0x57a6be(0x334))return _0x38436c[_0x57a6be(0x605)];if(_0x17ae11===_0x57a6be(0x3da))return _0x38436c[_0x57a6be(0x47c)];if(_0x17ae11===_0x57a6be(0x5d6))return _0x38436c[_0x57a6be(0x310)];if(_0x17ae11===_0x57a6be(0x2e4))return _0x38436c[_0x57a6be(0x4f0)];if(VisuMZ[_0x57a6be(0x249)][_0x57a6be(0x6bf)][_0x17ae11])return VisuMZ[_0x57a6be(0x249)][_0x57a6be(0x6bf)][_0x17ae11];return'';},TextManager[_0x2bd3fa(0x855)]=function(_0x5847f4){const _0x324cd1=_0x2bd3fa;if(_0x5847f4===_0x324cd1(0x391))_0x5847f4=_0x324cd1(0x904);let _0x310a5b=[];for(let _0x4f7951 in Input['keyMapper']){_0x4f7951=Number(_0x4f7951);if(_0x4f7951>=0x60&&_0x4f7951<=0x69)continue;if([0x12,0x20][_0x324cd1(0x448)](_0x4f7951))continue;_0x5847f4===Input['keyMapper'][_0x4f7951]&&_0x310a5b[_0x324cd1(0x599)](_0x4f7951);}for(let _0x11b281=0x0;_0x11b281<_0x310a5b[_0x324cd1(0x7e1)];_0x11b281++){_0x324cd1(0x93c)!=='Irvxk'?_0x310a5b[_0x11b281]=TextManager['stringKeyMap'][_0x310a5b[_0x11b281]]:(this['scale']['x']!==0x0&&(this[_0x324cd1(0x3b4)][_0x324cd1(0x722)]['x']=0x1/this[_0x324cd1(0x722)]['x'],this[_0x324cd1(0x3b4)]['x']=-(this['x']/this[_0x324cd1(0x722)]['x'])),this[_0x324cd1(0x722)]['y']!==0x0&&(this[_0x324cd1(0x3b4)][_0x324cd1(0x722)]['y']=0x1/this['scale']['y'],this[_0x324cd1(0x3b4)]['y']=-(this['y']/this[_0x324cd1(0x722)]['y'])));}return this['makeInputButtonString'](_0x310a5b);},TextManager['makeInputButtonString']=function(_0x4c1df6){const _0x1327fb=_0x2bd3fa,_0x18bf85=VisuMZ['CoreEngine'][_0x1327fb(0x8fc)][_0x1327fb(0x220)],_0x2aa392=_0x18bf85['KeyUnlisted'],_0x277f3d=_0x4c1df6[_0x1327fb(0x7bd)](),_0x361941=_0x1327fb(0x3a7)[_0x1327fb(0x5a0)](_0x277f3d);return _0x18bf85[_0x361941]?_0x18bf85[_0x361941]:_0x2aa392[_0x1327fb(0x5a0)](_0x277f3d);},TextManager[_0x2bd3fa(0x239)]=function(_0x52c4fd,_0xa380bb){const _0x32e17e=_0x2bd3fa,_0x249242=VisuMZ['CoreEngine'][_0x32e17e(0x8fc)][_0x32e17e(0x220)],_0x14ba63=_0x249242[_0x32e17e(0x50a)],_0x1bbb91=this['getInputButtonString'](_0x52c4fd),_0xf178b1=this[_0x32e17e(0x855)](_0xa380bb);return _0x14ba63[_0x32e17e(0x5a0)](_0x1bbb91,_0xf178b1);},VisuMZ[_0x2bd3fa(0x249)]['ColorManager_loadWindowskin']=ColorManager[_0x2bd3fa(0x7af)],ColorManager['loadWindowskin']=function(){const _0x3ba8bd=_0x2bd3fa;VisuMZ['CoreEngine'][_0x3ba8bd(0x3ba)][_0x3ba8bd(0x1f7)](this),this[_0x3ba8bd(0x945)]=this[_0x3ba8bd(0x945)]||{};},ColorManager[_0x2bd3fa(0x41f)]=function(_0x202f83,_0x22f9dc){const _0x45c34f=_0x2bd3fa;return _0x22f9dc=String(_0x22f9dc),this[_0x45c34f(0x945)]=this[_0x45c34f(0x945)]||{},_0x22f9dc['match'](/#(.*)/i)?this['_colorCache'][_0x202f83]=_0x45c34f(0x233)[_0x45c34f(0x5a0)](String(RegExp['$1'])):this[_0x45c34f(0x945)][_0x202f83]=this[_0x45c34f(0x3db)](Number(_0x22f9dc)),this['_colorCache'][_0x202f83];},ColorManager[_0x2bd3fa(0x17a)]=function(_0x13647f){const _0x347de8=_0x2bd3fa;_0x13647f=String(_0x13647f);if(_0x13647f[_0x347de8(0x306)](/#(.*)/i))return _0x347de8(0x233)[_0x347de8(0x5a0)](String(RegExp['$1']));else{if(_0x347de8(0x213)!==_0x347de8(0x213))_0x3ab6e3[_0x347de8(0x249)][_0x347de8(0x63d)][_0x347de8(0x1f7)](this),this[_0x347de8(0x934)]();else return this[_0x347de8(0x3db)](Number(_0x13647f));}},ColorManager[_0x2bd3fa(0x537)]=function(){this['_colorCache']={};},ColorManager[_0x2bd3fa(0x32d)]=function(){const _0x92bd94=_0x2bd3fa,_0x2517ab='_stored_normalColor';this[_0x92bd94(0x945)]=this[_0x92bd94(0x945)]||{};if(this[_0x92bd94(0x945)][_0x2517ab])return this[_0x92bd94(0x945)][_0x2517ab];const _0x9bd815=VisuMZ[_0x92bd94(0x249)][_0x92bd94(0x8fc)]['Color'][_0x92bd94(0x4ef)];return this['getColorDataFromPluginParameters'](_0x2517ab,_0x9bd815);},ColorManager['systemColor']=function(){const _0x3662a5=_0x2bd3fa,_0x176ec8=_0x3662a5(0x62a);this['_colorCache']=this[_0x3662a5(0x945)]||{};if(this[_0x3662a5(0x945)][_0x176ec8])return this[_0x3662a5(0x945)][_0x176ec8];const _0x344b9e=VisuMZ['CoreEngine'][_0x3662a5(0x8fc)]['Color'][_0x3662a5(0x52a)];return this[_0x3662a5(0x41f)](_0x176ec8,_0x344b9e);},ColorManager[_0x2bd3fa(0x8e1)]=function(){const _0x5abd59=_0x2bd3fa,_0x26d1d8=_0x5abd59(0x4c0);this[_0x5abd59(0x945)]=this['_colorCache']||{};if(this[_0x5abd59(0x945)][_0x26d1d8])return this[_0x5abd59(0x945)][_0x26d1d8];const _0x5eb60a=VisuMZ[_0x5abd59(0x249)][_0x5abd59(0x8fc)][_0x5abd59(0x394)][_0x5abd59(0x2e1)];return this['getColorDataFromPluginParameters'](_0x26d1d8,_0x5eb60a);},ColorManager[_0x2bd3fa(0x8d2)]=function(){const _0x40ddd6=_0x2bd3fa,_0x1037cc=_0x40ddd6(0x1d1);this[_0x40ddd6(0x945)]=this[_0x40ddd6(0x945)]||{};if(this[_0x40ddd6(0x945)][_0x1037cc])return this['_colorCache'][_0x1037cc];const _0x3436f3=VisuMZ[_0x40ddd6(0x249)][_0x40ddd6(0x8fc)]['Color'][_0x40ddd6(0x372)];return this[_0x40ddd6(0x41f)](_0x1037cc,_0x3436f3);},ColorManager[_0x2bd3fa(0x469)]=function(){const _0x575591=_0x2bd3fa,_0x28d3c4=_0x575591(0x4df);this[_0x575591(0x945)]=this[_0x575591(0x945)]||{};if(this[_0x575591(0x945)][_0x28d3c4])return this[_0x575591(0x945)][_0x28d3c4];const _0x2964bd=VisuMZ[_0x575591(0x249)][_0x575591(0x8fc)][_0x575591(0x394)][_0x575591(0x677)];return this[_0x575591(0x41f)](_0x28d3c4,_0x2964bd);},ColorManager[_0x2bd3fa(0x90d)]=function(){const _0x335416=_0x2bd3fa,_0xe88fa3=_0x335416(0x7be);this[_0x335416(0x945)]=this[_0x335416(0x945)]||{};if(this[_0x335416(0x945)][_0xe88fa3])return this[_0x335416(0x945)][_0xe88fa3];const _0x4676e8=VisuMZ[_0x335416(0x249)]['Settings']['Color'][_0x335416(0x913)];return this[_0x335416(0x41f)](_0xe88fa3,_0x4676e8);},ColorManager[_0x2bd3fa(0x4c4)]=function(){const _0x25bb23=_0x2bd3fa,_0x11c06c=_0x25bb23(0x7c3);this[_0x25bb23(0x945)]=this[_0x25bb23(0x945)]||{};if(this[_0x25bb23(0x945)][_0x11c06c])return this[_0x25bb23(0x945)][_0x11c06c];const _0x3cf501=VisuMZ[_0x25bb23(0x249)][_0x25bb23(0x8fc)][_0x25bb23(0x394)][_0x25bb23(0x2f3)];return this[_0x25bb23(0x41f)](_0x11c06c,_0x3cf501);},ColorManager[_0x2bd3fa(0x5ea)]=function(){const _0x213a55=_0x2bd3fa,_0x46948b=_0x213a55(0x296);this[_0x213a55(0x945)]=this[_0x213a55(0x945)]||{};if(this[_0x213a55(0x945)][_0x46948b])return this[_0x213a55(0x945)][_0x46948b];const _0x9ee131=VisuMZ['CoreEngine'][_0x213a55(0x8fc)][_0x213a55(0x394)][_0x213a55(0x8f8)];return this[_0x213a55(0x41f)](_0x46948b,_0x9ee131);},ColorManager[_0x2bd3fa(0x269)]=function(){const _0x22e7e3=_0x2bd3fa,_0xf2976='_stored_mpGaugeColor2';this[_0x22e7e3(0x945)]=this[_0x22e7e3(0x945)]||{};if(this[_0x22e7e3(0x945)][_0xf2976])return this[_0x22e7e3(0x945)][_0xf2976];const _0x498522=VisuMZ[_0x22e7e3(0x249)][_0x22e7e3(0x8fc)][_0x22e7e3(0x394)][_0x22e7e3(0x58c)];return this[_0x22e7e3(0x41f)](_0xf2976,_0x498522);},ColorManager[_0x2bd3fa(0x52e)]=function(){const _0xf8bb66=_0x2bd3fa,_0x3b8672=_0xf8bb66(0x924);this[_0xf8bb66(0x945)]=this[_0xf8bb66(0x945)]||{};if(this[_0xf8bb66(0x945)][_0x3b8672])return this[_0xf8bb66(0x945)][_0x3b8672];const _0x357744=VisuMZ[_0xf8bb66(0x249)][_0xf8bb66(0x8fc)][_0xf8bb66(0x394)][_0xf8bb66(0x735)];return this['getColorDataFromPluginParameters'](_0x3b8672,_0x357744);},ColorManager[_0x2bd3fa(0x7ce)]=function(){const _0x4d1374=_0x2bd3fa,_0x2cfb52='_stored_powerUpColor';this[_0x4d1374(0x945)]=this[_0x4d1374(0x945)]||{};if(this[_0x4d1374(0x945)][_0x2cfb52])return this[_0x4d1374(0x945)][_0x2cfb52];const _0x4a290a=VisuMZ['CoreEngine'][_0x4d1374(0x8fc)][_0x4d1374(0x394)]['ColorPowerUp'];return this[_0x4d1374(0x41f)](_0x2cfb52,_0x4a290a);},ColorManager[_0x2bd3fa(0x741)]=function(){const _0x11ffa3=_0x2bd3fa,_0x2348de=_0x11ffa3(0x1ab);this[_0x11ffa3(0x945)]=this[_0x11ffa3(0x945)]||{};if(this[_0x11ffa3(0x945)][_0x2348de])return this[_0x11ffa3(0x945)][_0x2348de];const _0x4224c6=VisuMZ[_0x11ffa3(0x249)][_0x11ffa3(0x8fc)]['Color'][_0x11ffa3(0x4d3)];return this['getColorDataFromPluginParameters'](_0x2348de,_0x4224c6);},ColorManager[_0x2bd3fa(0x93f)]=function(){const _0x6d43cc=_0x2bd3fa,_0x4ff5b4=_0x6d43cc(0x4eb);this['_colorCache']=this[_0x6d43cc(0x945)]||{};if(this[_0x6d43cc(0x945)][_0x4ff5b4])return this[_0x6d43cc(0x945)][_0x4ff5b4];const _0x56df01=VisuMZ['CoreEngine'][_0x6d43cc(0x8fc)][_0x6d43cc(0x394)]['ColorCTGauge1'];return this[_0x6d43cc(0x41f)](_0x4ff5b4,_0x56df01);},ColorManager['ctGaugeColor2']=function(){const _0x4a7194=_0x2bd3fa,_0x397c5f='_stored_ctGaugeColor2';this['_colorCache']=this['_colorCache']||{};if(this[_0x4a7194(0x945)][_0x397c5f])return this[_0x4a7194(0x945)][_0x397c5f];const _0x64a8bb=VisuMZ[_0x4a7194(0x249)][_0x4a7194(0x8fc)][_0x4a7194(0x394)][_0x4a7194(0x4b1)];return this[_0x4a7194(0x41f)](_0x397c5f,_0x64a8bb);},ColorManager['tpGaugeColor1']=function(){const _0x3a1a75=_0x2bd3fa,_0x1a3a7b=_0x3a1a75(0x246);this[_0x3a1a75(0x945)]=this[_0x3a1a75(0x945)]||{};if(this[_0x3a1a75(0x945)][_0x1a3a7b])return this['_colorCache'][_0x1a3a7b];const _0xca32ed=VisuMZ[_0x3a1a75(0x249)][_0x3a1a75(0x8fc)][_0x3a1a75(0x394)][_0x3a1a75(0x846)];return this[_0x3a1a75(0x41f)](_0x1a3a7b,_0xca32ed);},ColorManager[_0x2bd3fa(0x7b1)]=function(){const _0x2c4309=_0x2bd3fa,_0x287758='_stored_tpGaugeColor2';this[_0x2c4309(0x945)]=this[_0x2c4309(0x945)]||{};if(this[_0x2c4309(0x945)][_0x287758])return this[_0x2c4309(0x945)][_0x287758];const _0x206d5f=VisuMZ[_0x2c4309(0x249)][_0x2c4309(0x8fc)][_0x2c4309(0x394)][_0x2c4309(0x289)];return this[_0x2c4309(0x41f)](_0x287758,_0x206d5f);},ColorManager[_0x2bd3fa(0x5bd)]=function(){const _0x1725e3=_0x2bd3fa,_0x43a410=_0x1725e3(0x1ea);this[_0x1725e3(0x945)]=this[_0x1725e3(0x945)]||{};if(this[_0x1725e3(0x945)][_0x43a410])return this[_0x1725e3(0x945)][_0x43a410];const _0x10e079=VisuMZ[_0x1725e3(0x249)][_0x1725e3(0x8fc)][_0x1725e3(0x394)][_0x1725e3(0x928)];return this['getColorDataFromPluginParameters'](_0x43a410,_0x10e079);},ColorManager[_0x2bd3fa(0x7d3)]=function(){const _0x515d3b=_0x2bd3fa,_0x10e0fd='_stored_pendingColor';this['_colorCache']=this[_0x515d3b(0x945)]||{};if(this[_0x515d3b(0x945)][_0x10e0fd])return this[_0x515d3b(0x945)][_0x10e0fd];const _0x32313a=VisuMZ['CoreEngine'][_0x515d3b(0x8fc)][_0x515d3b(0x394)][_0x515d3b(0x928)];return this[_0x515d3b(0x41f)](_0x10e0fd,_0x32313a);},ColorManager[_0x2bd3fa(0x248)]=function(){const _0x425c94=_0x2bd3fa,_0x5bc76d=_0x425c94(0x347);this[_0x425c94(0x945)]=this['_colorCache']||{};if(this[_0x425c94(0x945)][_0x5bc76d])return this[_0x425c94(0x945)][_0x5bc76d];const _0x179276=VisuMZ[_0x425c94(0x249)]['Settings']['Color'][_0x425c94(0x512)];return this[_0x425c94(0x41f)](_0x5bc76d,_0x179276);},ColorManager[_0x2bd3fa(0x733)]=function(){const _0x33ab3b=_0x2bd3fa,_0x1ac34c='_stored_expGaugeColor2';this['_colorCache']=this[_0x33ab3b(0x945)]||{};if(this[_0x33ab3b(0x945)][_0x1ac34c])return this[_0x33ab3b(0x945)][_0x1ac34c];const _0x5a7e78=VisuMZ['CoreEngine'][_0x33ab3b(0x8fc)][_0x33ab3b(0x394)][_0x33ab3b(0x56e)];return this['getColorDataFromPluginParameters'](_0x1ac34c,_0x5a7e78);},ColorManager[_0x2bd3fa(0x958)]=function(){const _0x27a854=_0x2bd3fa,_0x538d77=_0x27a854(0x3f7);this[_0x27a854(0x945)]=this[_0x27a854(0x945)]||{};if(this[_0x27a854(0x945)][_0x538d77])return this[_0x27a854(0x945)][_0x538d77];const _0x404f33=VisuMZ[_0x27a854(0x249)]['Settings'][_0x27a854(0x394)][_0x27a854(0x629)];return this[_0x27a854(0x41f)](_0x538d77,_0x404f33);},ColorManager[_0x2bd3fa(0x5c0)]=function(){const _0x354e60=_0x2bd3fa,_0x36a1e6=_0x354e60(0x66a);this['_colorCache']=this[_0x354e60(0x945)]||{};if(this['_colorCache'][_0x36a1e6])return this[_0x354e60(0x945)][_0x36a1e6];const _0x18e4e8=VisuMZ[_0x354e60(0x249)]['Settings'][_0x354e60(0x394)][_0x354e60(0x6f4)];return this[_0x354e60(0x41f)](_0x36a1e6,_0x18e4e8);},ColorManager[_0x2bd3fa(0x898)]=function(_0x579f50){const _0x3c7c7f=_0x2bd3fa;return VisuMZ[_0x3c7c7f(0x249)][_0x3c7c7f(0x8fc)]['Color'][_0x3c7c7f(0x1b5)][_0x3c7c7f(0x1f7)](this,_0x579f50);},ColorManager['mpColor']=function(_0x498506){const _0x4f8c53=_0x2bd3fa;return VisuMZ[_0x4f8c53(0x249)][_0x4f8c53(0x8fc)][_0x4f8c53(0x394)][_0x4f8c53(0x32e)][_0x4f8c53(0x1f7)](this,_0x498506);},ColorManager['tpColor']=function(_0x5f459d){const _0x5a1f84=_0x2bd3fa;return VisuMZ[_0x5a1f84(0x249)][_0x5a1f84(0x8fc)][_0x5a1f84(0x394)][_0x5a1f84(0x7e9)][_0x5a1f84(0x1f7)](this,_0x5f459d);},ColorManager[_0x2bd3fa(0x396)]=function(_0x4b1993){const _0x47c225=_0x2bd3fa;return VisuMZ[_0x47c225(0x249)][_0x47c225(0x8fc)][_0x47c225(0x394)][_0x47c225(0x2f8)]['call'](this,_0x4b1993);},ColorManager[_0x2bd3fa(0x77b)]=function(_0x5b8ebe){const _0x59da43=_0x2bd3fa;return VisuMZ[_0x59da43(0x249)][_0x59da43(0x8fc)]['Color'][_0x59da43(0x2dc)][_0x59da43(0x1f7)](this,_0x5b8ebe);},ColorManager[_0x2bd3fa(0x2b6)]=function(){const _0x2f6fcb=_0x2bd3fa;return VisuMZ[_0x2f6fcb(0x249)][_0x2f6fcb(0x8fc)][_0x2f6fcb(0x394)][_0x2f6fcb(0x922)];},ColorManager[_0x2bd3fa(0x38a)]=function(){const _0x423ce6=_0x2bd3fa;return VisuMZ[_0x423ce6(0x249)][_0x423ce6(0x8fc)][_0x423ce6(0x394)][_0x423ce6(0x955)]||_0x423ce6(0x91e);},ColorManager[_0x2bd3fa(0x8a0)]=function(){const _0x2e9821=_0x2bd3fa;return VisuMZ['CoreEngine']['Settings']['Color'][_0x2e9821(0x261)]||_0x2e9821(0x91f);},ColorManager[_0x2bd3fa(0x5b1)]=function(){const _0x477022=_0x2bd3fa;return VisuMZ[_0x477022(0x249)][_0x477022(0x8fc)]['Color'][_0x477022(0x407)];},ColorManager[_0x2bd3fa(0x76d)]=function(){const _0x1eb3b0=_0x2bd3fa;return VisuMZ[_0x1eb3b0(0x249)]['Settings']['Color'][_0x1eb3b0(0x2c1)];},ColorManager['itemBackColor1']=function(){const _0x30e55a=_0x2bd3fa;return VisuMZ[_0x30e55a(0x249)][_0x30e55a(0x8fc)][_0x30e55a(0x394)][_0x30e55a(0x7ac)];},ColorManager['itemBackColor2']=function(){const _0x3b6d10=_0x2bd3fa;return VisuMZ[_0x3b6d10(0x249)][_0x3b6d10(0x8fc)][_0x3b6d10(0x394)][_0x3b6d10(0x188)];},SceneManager[_0x2bd3fa(0x7c1)]=[],SceneManager[_0x2bd3fa(0x577)]=function(){const _0x55d879=_0x2bd3fa;return this['_scene']&&this[_0x55d879(0x7d8)][_0x55d879(0x482)]===Scene_Battle;},SceneManager[_0x2bd3fa(0x4b4)]=function(){const _0x4e13d2=_0x2bd3fa;return this[_0x4e13d2(0x7d8)]&&this[_0x4e13d2(0x7d8)][_0x4e13d2(0x482)]===Scene_Map;},SceneManager[_0x2bd3fa(0x551)]=function(){const _0xcf992a=_0x2bd3fa;return this[_0xcf992a(0x7d8)]&&this[_0xcf992a(0x7d8)]instanceof Scene_Map;},VisuMZ[_0x2bd3fa(0x249)]['SceneManager_initialize']=SceneManager[_0x2bd3fa(0x4d6)],SceneManager[_0x2bd3fa(0x4d6)]=function(){const _0x42372d=_0x2bd3fa;VisuMZ[_0x42372d(0x249)][_0x42372d(0x4f5)][_0x42372d(0x1f7)](this),this[_0x42372d(0x327)]();},VisuMZ['CoreEngine']['SceneManager_onKeyDown']=SceneManager['onKeyDown'],SceneManager['onKeyDown']=function(_0xf923fc){const _0x55b998=_0x2bd3fa;if($gameTemp)this['onKeyDownKeysF6F7'](_0xf923fc);VisuMZ[_0x55b998(0x249)][_0x55b998(0x830)]['call'](this,_0xf923fc);},SceneManager[_0x2bd3fa(0x278)]=function(_0x552100){const _0x50f175=_0x2bd3fa;if(!_0x552100[_0x50f175(0x3c5)]&&!_0x552100[_0x50f175(0x5ee)])switch(_0x552100[_0x50f175(0x7a5)]){case 0x54:this[_0x50f175(0x931)]();break;case 0x75:this[_0x50f175(0x4da)]();break;case 0x76:if(Input[_0x50f175(0x451)](_0x50f175(0x45b))||Input['isPressed'](_0x50f175(0x373)))return;this[_0x50f175(0x70d)]();break;}},SceneManager[_0x2bd3fa(0x4da)]=function(){const _0x115aec=_0x2bd3fa;if($gameTemp[_0x115aec(0x4f7)]()&&VisuMZ[_0x115aec(0x249)][_0x115aec(0x8fc)][_0x115aec(0x762)][_0x115aec(0x292)]){ConfigManager[_0x115aec(0x664)]!==0x0?_0x115aec(0x240)!==_0x115aec(0x227)?(ConfigManager[_0x115aec(0x89f)]=0x0,ConfigManager[_0x115aec(0x8cc)]=0x0,ConfigManager['meVolume']=0x0,ConfigManager[_0x115aec(0x664)]=0x0):(this[_0x115aec(0x3b4)][_0x115aec(0x722)]['y']=0x1/this['scale']['y'],this[_0x115aec(0x3b4)]['y']=-(this['y']/this[_0x115aec(0x722)]['y'])):(ConfigManager['bgmVolume']=0x64,ConfigManager[_0x115aec(0x8cc)]=0x64,ConfigManager[_0x115aec(0x25d)]=0x64,ConfigManager[_0x115aec(0x664)]=0x64);ConfigManager[_0x115aec(0x183)]();if(this[_0x115aec(0x7d8)][_0x115aec(0x482)]===Scene_Options){if(_0x115aec(0x374)!=='DAbpE'){if(this['_scene'][_0x115aec(0x6a9)])this[_0x115aec(0x7d8)][_0x115aec(0x6a9)][_0x115aec(0x171)]();if(this['_scene']['_listWindow'])this[_0x115aec(0x7d8)][_0x115aec(0x2e3)][_0x115aec(0x171)]();}else _0x5ce01b[_0x115aec(0x249)][_0x115aec(0x572)]['call'](this,_0x5676e8);}}},SceneManager[_0x2bd3fa(0x70d)]=function(){const _0x3b8f2e=_0x2bd3fa;$gameTemp[_0x3b8f2e(0x4f7)]()&&VisuMZ[_0x3b8f2e(0x249)][_0x3b8f2e(0x8fc)][_0x3b8f2e(0x762)][_0x3b8f2e(0x81c)]&&($gameTemp[_0x3b8f2e(0x5d2)]=!$gameTemp['_playTestFastMode']);},SceneManager[_0x2bd3fa(0x931)]=function(){const _0x4409e4=_0x2bd3fa;if(!$gameTemp[_0x4409e4(0x4f7)]())return;if(!SceneManager[_0x4409e4(0x577)]())return;for(const _0xaef144 of $gameParty[_0x4409e4(0x3ed)]()){if(_0x4409e4(0x216)!=='WRdZC'){if(!_0xaef144)continue;_0xaef144[_0x4409e4(0x769)](_0xaef144['maxTp']());}else this['_itemWindow']['setBackgroundType'](_0x534ac7[_0x4409e4(0x6a0)][_0x4409e4(0x63a)]);}},SceneManager[_0x2bd3fa(0x327)]=function(){const _0x41bd62=_0x2bd3fa;this['_sideButtonLayout']=![],this['_hideButtons']=!VisuMZ[_0x41bd62(0x249)][_0x41bd62(0x8fc)]['UI'][_0x41bd62(0x5ca)];},SceneManager[_0x2bd3fa(0x2c4)]=function(_0x423af7){const _0x24ace7=_0x2bd3fa;VisuMZ[_0x24ace7(0x249)][_0x24ace7(0x8fc)]['UI']['SideButtons']&&(this[_0x24ace7(0x37e)]=_0x423af7);},SceneManager[_0x2bd3fa(0x4a8)]=function(){const _0x32d631=_0x2bd3fa;return this[_0x32d631(0x37e)];},SceneManager['areButtonsHidden']=function(){const _0xde5e42=_0x2bd3fa;return this[_0xde5e42(0x877)];},SceneManager[_0x2bd3fa(0x2cb)]=function(){const _0x521e1e=_0x2bd3fa;return this['areButtonsHidden']()||this[_0x521e1e(0x4a8)]();},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x649)]=SceneManager[_0x2bd3fa(0x257)],SceneManager[_0x2bd3fa(0x257)]=function(){const _0x5cd6b4=_0x2bd3fa;if(VisuMZ[_0x5cd6b4(0x249)]['Settings'][_0x5cd6b4(0x762)][_0x5cd6b4(0x909)])return'UEtLt'===_0x5cd6b4(0x750)?VisuMZ['CoreEngine'][_0x5cd6b4(0x649)][_0x5cd6b4(0x1f7)](this):this[_0x5cd6b4(0x2d4)]!==_0x45ead0[_0x5cd6b4(0x215)]||this['_lastX']!==_0x54e121['_x']||this[_0x5cd6b4(0x7cc)]!==_0x157e64['_y'];else{if('TJcoJ'!==_0x5cd6b4(0x646))_0x425140[_0x5cd6b4(0x249)][_0x5cd6b4(0x24b)][_0x5cd6b4(0x1f7)](this),this['setCoreEngineUpdateWindowBg']();else return!![];}},SceneManager[_0x2bd3fa(0x699)]=function(_0x51bc9d){const _0x5aa10e=_0x2bd3fa;if(_0x51bc9d instanceof Error){if('wwWFv'===_0x5aa10e(0x6fb)){let _0x161839=_0x305678[_0x142ba5],_0x1cc005=this['textSizeEx'](_0x161839)['width'],_0x10bed8=_0x1edd56[_0x5aa10e(0x7a0)]((this[_0x5aa10e(0x711)][_0x5aa10e(0x73f)]-_0x1cc005)/0x2);this['drawTextEx'](_0x161839,_0x10bed8,_0x13545a),_0x173926+=this[_0x5aa10e(0x4fb)]();}else this[_0x5aa10e(0x232)](_0x51bc9d);}else{if(_0x51bc9d instanceof Array&&_0x51bc9d[0x0]==='LoadError'){if(_0x5aa10e(0x488)===_0x5aa10e(0x488))this[_0x5aa10e(0x5c5)](_0x51bc9d);else return _0x2e22b0[_0x5aa10e(0x2cb)]()?this[_0x5aa10e(0x483)]():_0xd1638c[_0x5aa10e(0x249)][_0x5aa10e(0x95f)]['call'](this);}else this[_0x5aa10e(0x79b)](_0x51bc9d);}this[_0x5aa10e(0x968)]();},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x53a)]=BattleManager[_0x2bd3fa(0x4fe)],BattleManager[_0x2bd3fa(0x4fe)]=function(){const _0x54a499=_0x2bd3fa;if(VisuMZ[_0x54a499(0x249)]['Settings'][_0x54a499(0x762)][_0x54a499(0x3ec)])this[_0x54a499(0x925)]();else return VisuMZ['CoreEngine'][_0x54a499(0x53a)][_0x54a499(0x1f7)](this);},BattleManager[_0x2bd3fa(0x925)]=function(){const _0x18f6b7=_0x2bd3fa;return $gameParty[_0x18f6b7(0x4d8)](),SoundManager[_0x18f6b7(0x658)](),this[_0x18f6b7(0x2fd)](),!![];},BattleManager[_0x2bd3fa(0x824)]=function(){const _0x13ef38=_0x2bd3fa;return $gameSystem[_0x13ef38(0x856)]()>=0x1;},BattleManager[_0x2bd3fa(0x199)]=function(){const _0x3a1a92=_0x2bd3fa;return $gameSystem[_0x3a1a92(0x856)]()===0x1;},VisuMZ['CoreEngine']['Game_Temp_initialize']=Game_Temp[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4d6)],Game_Temp[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4d6)]=function(){const _0x161514=_0x2bd3fa;VisuMZ[_0x161514(0x249)][_0x161514(0x415)][_0x161514(0x1f7)](this),this[_0x161514(0x893)](),this[_0x161514(0x6e1)](),this[_0x161514(0x65e)]();},Game_Temp[_0x2bd3fa(0x77c)][_0x2bd3fa(0x893)]=function(){const _0x45cbb6=_0x2bd3fa;if(VisuMZ[_0x45cbb6(0x249)]['Settings'][_0x45cbb6(0x762)]['ForceNoPlayTest']){if('educN'!==_0x45cbb6(0x923))for(const _0x452edc of _0x266f8a){this['createFauxAnimationSprite']([_0x452edc],_0x4f589c,_0x124100,_0x963ce0,_0xdca4fb),_0x16962a+=_0x3c6426;}else this[_0x45cbb6(0x2ab)]=![];}},Game_Temp[_0x2bd3fa(0x77c)][_0x2bd3fa(0x831)]=function(_0xe3e971){this['_lastPluginCommandInterpreter']=_0xe3e971;},Game_Temp[_0x2bd3fa(0x77c)]['getLastPluginCommandInterpreter']=function(){const _0x2af63e=_0x2bd3fa;return this[_0x2af63e(0x45f)];},Game_Temp[_0x2bd3fa(0x77c)]['clearForcedGameTroopSettingsCoreEngine']=function(){this['_forcedTroopView']=undefined,this['_forcedBattleSys']=undefined;},Game_Temp['prototype'][_0x2bd3fa(0x626)]=function(_0x2fe66c){const _0x5ed727=_0x2bd3fa;$gameMap&&$dataMap&&$dataMap[_0x5ed727(0x377)]&&this[_0x5ed727(0x19a)]($dataMap['note']);const _0x3e60cd=$dataTroops[_0x2fe66c];if(_0x3e60cd){if('pWzzk'===_0x5ed727(0x8de)){let _0x36ee54=DataManager[_0x5ed727(0x4fc)](_0x3e60cd['id']);this[_0x5ed727(0x19a)](_0x36ee54);}else return this[_0x5ed727(0x60b)]()||this[_0x5ed727(0x4a8)]();}},Game_Temp['prototype']['parseForcedGameTroopSettingsCoreEngine']=function(_0x37f555){const _0x55ce5d=_0x2bd3fa;if(!_0x37f555)return;if(_0x37f555[_0x55ce5d(0x306)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x55ce5d(0x752)]='FV';else{if(_0x37f555[_0x55ce5d(0x306)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i)){if(_0x55ce5d(0x49a)!==_0x55ce5d(0x49a)){if(!this[_0x55ce5d(0x865)]())return;_0x567c05=_0x42d6dd||![],_0x14aeb2=_0x4cb2ec||![];if(_0x5a873d[_0x44cbd7]){const _0x463b03={'targets':_0xf5413b,'animationId':_0x1b05e0,'mirror':_0xe92c10,'mute':_0x1c3818};this[_0x55ce5d(0x455)][_0x55ce5d(0x599)](_0x463b03);for(const _0x1b75f9 of _0x1d8dc4){_0x1b75f9[_0x55ce5d(0x4ea)]&&_0x1b75f9[_0x55ce5d(0x4ea)]();}}}else this[_0x55ce5d(0x752)]='SV';}else{if(_0x37f555['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x55ce5d(0x64f)===_0x55ce5d(0x64f)){const _0xc0e568=String(RegExp['$1']);if(_0xc0e568[_0x55ce5d(0x306)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0xc0e568[_0x55ce5d(0x306)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(_0x55ce5d(0x34c)==='ndujc'?this[_0x55ce5d(0x242)]():this[_0x55ce5d(0x752)]='SV');}else return![];}}}if(_0x37f555[_0x55ce5d(0x306)](/<(?:DTB)>/i))this[_0x55ce5d(0x6b5)]=0x0;else{if(_0x37f555[_0x55ce5d(0x306)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x55ce5d(0x6b5)]=0x1;else{if(_0x37f555[_0x55ce5d(0x306)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x55ce5d(0x6b5)]=0x2;else{if(_0x37f555[_0x55ce5d(0x306)](/<(?:CTB)>/i))_0x55ce5d(0x4b8)==='mbjIk'?Imported[_0x55ce5d(0x2fe)]&&(_0x55ce5d(0x625)===_0x55ce5d(0x625)?this[_0x55ce5d(0x6b5)]=_0x55ce5d(0x27c):this[_0x55ce5d(0x6b5)]=0x2):(this[_0x55ce5d(0x711)][_0x55ce5d(0x66b)]=this[_0x55ce5d(0x5a6)](),this[_0x55ce5d(0x711)][_0x55ce5d(0x1af)](_0x449eca,_0xa64268,_0x598b35,_0x4e5d33,this[_0x55ce5d(0x791)](),_0x55ce5d(0x811)));else{if(_0x37f555[_0x55ce5d(0x306)](/<(?:STB)>/i))_0x55ce5d(0x7ab)===_0x55ce5d(0x7ab)?Imported[_0x55ce5d(0x787)]&&(this[_0x55ce5d(0x6b5)]=_0x55ce5d(0x731)):(_0x4a6f48[_0x55ce5d(0x249)]['Graphics_centerElement'][_0x55ce5d(0x1f7)](this,_0x33228b),this['_centerElementCoreEngine'](_0x4b9dbe));else{if(_0x37f555['match'](/<(?:BTB)>/i)){if(Imported[_0x55ce5d(0x498)]){if(_0x55ce5d(0x3a1)!==_0x55ce5d(0x83a))this[_0x55ce5d(0x6b5)]='BTB';else{const _0x15714b=_0x3a518a[_0x55ce5d(0x74c)]||0x0;(_0x15714b<0x0||_0x15714b>0x64||_0x157df5[_0x55ce5d(0x53e)]()||_0x517019['isTriggered'](_0x55ce5d(0x391)))&&(_0x56ec5b[_0x55ce5d(0x74c)]=_0x11968d,_0xb6d3e4[_0x55ce5d(0x2e8)](),_0x1279c2[_0x55ce5d(0x2e8)]());const _0x1846b4=_0x11a627[_0x55ce5d(0x4e6)](_0x15714b);return _0x1846b4&&(_0x1846b4['_x']=_0x576c01['_x'],_0x1846b4['_y']=_0x2d15ae['_y']),_0x31c41f[_0x55ce5d(0x249)][_0x55ce5d(0x757)](),_0x72d215[_0x55ce5d(0x74c)]!==_0x38e273;}}}else{if(_0x37f555[_0x55ce5d(0x306)](/<(?:FTB)>/i))Imported['VisuMZ_2_BattleSystemFTB']&&(_0x55ce5d(0x891)!==_0x55ce5d(0x59d)?this[_0x55ce5d(0x6b5)]=_0x55ce5d(0x849):_0x5ec13c['VisuMZ_2_BattleSystemBTB']&&(this['_forcedBattleSys']=_0x55ce5d(0x409)));else{if(_0x37f555[_0x55ce5d(0x306)](/<(?:OTB)>/i)){if('bxoME'!=='AfdoM')Imported[_0x55ce5d(0x355)]&&(this[_0x55ce5d(0x6b5)]=_0x55ce5d(0x400));else return _0x26ea45[_0x55ce5d(0x249)][_0x55ce5d(0x3b6)][_0x55ce5d(0x1f7)](this,_0x27df66,_0xa0cb9f);}else{if(_0x37f555[_0x55ce5d(0x306)](/<(?:ETB)>/i)){if(Imported[_0x55ce5d(0x25c)]){if('RzdFP'!==_0x55ce5d(0x7e2))this[_0x55ce5d(0x6b5)]='ETB';else{if(!this[_0x55ce5d(0x506)])return![];return _0x352400[_0x55ce5d(0x249)][_0x55ce5d(0x8fc)][_0x55ce5d(0x836)]['EnableNameInput'];}}}else{if(_0x37f555['match'](/<(?:PTB)>/i))Imported[_0x55ce5d(0x324)]&&(this[_0x55ce5d(0x6b5)]=_0x55ce5d(0x567));else{if(_0x37f555[_0x55ce5d(0x306)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2dc6c6=String(RegExp['$1']);if(_0x2dc6c6[_0x55ce5d(0x306)](/DTB/i))this[_0x55ce5d(0x6b5)]=0x0;else{if(_0x2dc6c6['match'](/(?:TPB|ATB)[ ]ACTIVE/i)){if(_0x55ce5d(0x900)===_0x55ce5d(0x73c)){if(this[_0x55ce5d(0x255)][_0x55ce5d(0x3fb)[_0x55ce5d(0x5a0)](_0x5262b9)]!==_0x1b1fd0[_0x55ce5d(0x5f3)['format'](_0x560047)]())return this[_0x55ce5d(0x171)]();if(this['_data'][_0x55ce5d(0x7e0)[_0x55ce5d(0x5a0)](_0x271669)]!==_0x29c825[_0x55ce5d(0x8bd)[_0x55ce5d(0x5a0)](_0x3e90c8)]())return this['refresh']();}else this[_0x55ce5d(0x6b5)]=0x1;}else{if(_0x2dc6c6['match'](/(?:TPB|ATB)[ ]WAIT/i))this[_0x55ce5d(0x6b5)]=0x2;else{if(_0x2dc6c6[_0x55ce5d(0x306)](/CTB/i)){if('EfjHk'===_0x55ce5d(0x7a6)){if(Imported['VisuMZ_2_BattleSystemCTB']){if(_0x55ce5d(0x507)==='UrTJb'){const _0x3f5299=_0x1be48c[_0x55ce5d(0x249)][_0x55ce5d(0x8fc)]['ScreenShake'];if(_0x3f5299&&_0x3f5299[_0x55ce5d(0x376)])return _0x3f5299[_0x55ce5d(0x376)][_0x55ce5d(0x1f7)](this);this['x']+=_0x270a65[_0x55ce5d(0x18a)](_0x5d4847[_0x55ce5d(0x6b9)]());}else this['_forcedBattleSys']='CTB';}}else{const _0x297f77=this[_0x55ce5d(0x607)](),_0xbbad6b=this[_0x55ce5d(0x77e)](_0x4b65fb);this['drawItem'](_0x297f77,_0xbbad6b,_0x300f61),_0x2b3d5b++;}}else{if(_0x2dc6c6[_0x55ce5d(0x306)](/STB/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this['_forcedBattleSys']=_0x55ce5d(0x731));else{if(_0x2dc6c6[_0x55ce5d(0x306)](/BTB/i)){if(Imported[_0x55ce5d(0x498)]){if(_0x55ce5d(0x720)!==_0x55ce5d(0x63b))this[_0x55ce5d(0x6b5)]='BTB';else{this[_0x55ce5d(0x691)](),this[_0x55ce5d(0x711)][_0x55ce5d(0x2e8)](),this['contents'][_0x55ce5d(0x66b)]=_0x32a7b3[_0x55ce5d(0x249)][_0x55ce5d(0x8fc)][_0x55ce5d(0x3d3)][_0x55ce5d(0x921)];const _0x52a938=_0x3c4080[_0x55ce5d(0x249)]['Settings']['Gold']['GoldIcon'],_0x2c904a=this[_0x55ce5d(0x433)](0x0);if(_0x52a938>0x0){const _0x5bca57=_0x2c904a['y']+(this[_0x55ce5d(0x4fb)]()-_0x434894[_0x55ce5d(0x250)])/0x2;this[_0x55ce5d(0x8c8)](_0x52a938,_0x2c904a['x'],_0x5bca57);const _0x58164e=_0x34cfa8['iconWidth']+0x4;_0x2c904a['x']+=_0x58164e,_0x2c904a[_0x55ce5d(0x73f)]-=_0x58164e;}this['changeTextColor'](_0xc2a9b['systemColor']()),this[_0x55ce5d(0x1af)](this[_0x55ce5d(0x8e7)](),_0x2c904a['x'],_0x2c904a['y'],_0x2c904a[_0x55ce5d(0x73f)],_0x55ce5d(0x811));const _0x47f1f2=this['textWidth'](this[_0x55ce5d(0x8e7)]())+0x6;;_0x2c904a['x']+=_0x47f1f2,_0x2c904a[_0x55ce5d(0x73f)]-=_0x47f1f2,this[_0x55ce5d(0x610)]();const _0x5db0ac=this[_0x55ce5d(0x611)](),_0x2d6c74=this['textWidth'](this[_0x55ce5d(0x843)]?_0x275210[_0x55ce5d(0x862)](this['value']()):this[_0x55ce5d(0x611)]());_0x2d6c74>_0x2c904a['width']?this[_0x55ce5d(0x1af)](_0x4f7bcd['CoreEngine'][_0x55ce5d(0x8fc)][_0x55ce5d(0x3d3)][_0x55ce5d(0x198)],_0x2c904a['x'],_0x2c904a['y'],_0x2c904a[_0x55ce5d(0x73f)],'right'):this[_0x55ce5d(0x1af)](this['value'](),_0x2c904a['x'],_0x2c904a['y'],_0x2c904a[_0x55ce5d(0x73f)],_0x55ce5d(0x359)),this[_0x55ce5d(0x691)]();}}}else{if(_0x2dc6c6[_0x55ce5d(0x306)](/FTB/i)){if(_0x55ce5d(0x1cb)===_0x55ce5d(0x1cb)){if(Imported[_0x55ce5d(0x61a)]){if(_0x55ce5d(0x467)!==_0x55ce5d(0x467)){let _0x2f39f5=this[_0x55ce5d(0x59b)]();const _0x2b06f4=this[_0x55ce5d(0x70e)](),_0x25899b=this[_0x55ce5d(0x623)]();if(this[_0x55ce5d(0x3cb)]()&&(_0x2f39f5<_0x2b06f4||_0x4ea832&&_0x25899b===0x1)){_0x2f39f5+=_0x25899b;if(_0x2f39f5>=_0x2b06f4)_0x2f39f5=_0x2b06f4-0x1;this[_0x55ce5d(0x969)](_0x2f39f5);}else!this['isUseModernControls']()&&((_0x2f39f5<_0x2b06f4-_0x25899b||_0x7b80ac&&_0x25899b===0x1)&&this[_0x55ce5d(0x969)]((_0x2f39f5+_0x25899b)%_0x2b06f4));}else this[_0x55ce5d(0x6b5)]='FTB';}}else{if(_0x2e1a43[_0x55ce5d(0x254)](_0x55ce5d(0x6ad))){var _0x564a24=_0x3a339e(_0x55ce5d(0x5dd))[_0x55ce5d(0x45a)][_0x55ce5d(0x62c)]();_0x4d2e72[_0x55ce5d(0x323)]();if(_0x21bd3e)_0x55fa74(_0x564a24[_0x55ce5d(0x46b)]['bind'](_0x564a24),0x190);}}}else{if(_0x2dc6c6[_0x55ce5d(0x306)](/OTB/i)){if(Imported['VisuMZ_2_BattleSystemOTB']){if('QGrtq'===_0x55ce5d(0x67b)){return _0xd23add['prototype'][_0x55ce5d(0x207)][_0x55ce5d(0x1f7)](this)+_0x3d69ea[_0x55ce5d(0x249)][_0x55ce5d(0x8fc)][_0x55ce5d(0x45a)]['ItemHeight'];;}else this[_0x55ce5d(0x6b5)]='OTB';}}else{if(_0x2dc6c6[_0x55ce5d(0x306)](/ETB/i))Imported[_0x55ce5d(0x25c)]&&(this['_forcedBattleSys']=_0x55ce5d(0x1f5));else _0x2dc6c6[_0x55ce5d(0x306)](/PTB/i)&&(Imported[_0x55ce5d(0x324)]&&(_0x55ce5d(0x6eb)!==_0x55ce5d(0x6eb)?this['_forcedBattleSys']=_0x55ce5d(0x1f5):this['_forcedBattleSys']=_0x55ce5d(0x567)));}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6e1)]=function(){const _0x246fc0=_0x2bd3fa;this[_0x246fc0(0x455)]=[];},Game_Temp[_0x2bd3fa(0x77c)][_0x2bd3fa(0x458)]=function(_0x201f99,_0x516579,_0x952810,_0x1ca374){const _0x397fca=_0x2bd3fa;if(!this[_0x397fca(0x865)]())return;_0x952810=_0x952810||![],_0x1ca374=_0x1ca374||![];if($dataAnimations[_0x516579]){const _0x300a1b={'targets':_0x201f99,'animationId':_0x516579,'mirror':_0x952810,'mute':_0x1ca374};this[_0x397fca(0x455)]['push'](_0x300a1b);for(const _0x4eff0f of _0x201f99){_0x4eff0f[_0x397fca(0x4ea)]&&('QOLRG'==='gKKrk'?this[_0x397fca(0x385)][_0x397fca(0x558)](_0x42acb9['layoutSettings']['HelpBgType']):_0x4eff0f[_0x397fca(0x4ea)]());}}},Game_Temp[_0x2bd3fa(0x77c)]['showFauxAnimations']=function(){return!![];},Game_Temp[_0x2bd3fa(0x77c)]['retrieveFauxAnimation']=function(){const _0x3850d0=_0x2bd3fa;return this[_0x3850d0(0x455)][_0x3850d0(0x45b)]();},Game_Temp[_0x2bd3fa(0x77c)][_0x2bd3fa(0x65e)]=function(){const _0x225a67=_0x2bd3fa;this[_0x225a67(0x23b)]=[];},Game_Temp[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5c1)]=function(_0x239e94,_0x200ee8,_0x4879f8,_0x6ae1,_0x31751a){const _0x356391=_0x2bd3fa;if(!this['showPointAnimations']())return;_0x6ae1=_0x6ae1||![],_0x31751a=_0x31751a||![];if($dataAnimations[_0x4879f8]){const _0x591a0b={'x':_0x239e94,'y':_0x200ee8,'animationId':_0x4879f8,'mirror':_0x6ae1,'mute':_0x31751a};this['_pointAnimationQueue'][_0x356391(0x599)](_0x591a0b);}},Game_Temp[_0x2bd3fa(0x77c)][_0x2bd3fa(0x2da)]=function(){return!![];},Game_Temp[_0x2bd3fa(0x77c)]['retrievePointAnimation']=function(){const _0x4cafe3=_0x2bd3fa;return this['_pointAnimationQueue'][_0x4cafe3(0x45b)]();},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x29f)]=Game_System[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4d6)],Game_System['prototype']['initialize']=function(){const _0xc7926c=_0x2bd3fa;VisuMZ[_0xc7926c(0x249)][_0xc7926c(0x29f)][_0xc7926c(0x1f7)](this),this[_0xc7926c(0x61e)]();},Game_System[_0x2bd3fa(0x77c)][_0x2bd3fa(0x61e)]=function(){const _0x831501=_0x2bd3fa;this[_0x831501(0x79e)]={'SideView':$dataSystem[_0x831501(0x74b)],'BattleSystem':this[_0x831501(0x58b)](),'FontSize':$dataSystem[_0x831501(0x75b)][_0x831501(0x66b)],'Padding':0xc};},Game_System[_0x2bd3fa(0x77c)][_0x2bd3fa(0x566)]=function(){const _0xd85584=_0x2bd3fa;if($gameTemp[_0xd85584(0x752)]==='SV')return!![];else{if($gameTemp[_0xd85584(0x752)]==='FV')return![];}if(this['_CoreEngineSettings']===undefined)this[_0xd85584(0x61e)]();if(this[_0xd85584(0x79e)][_0xd85584(0x579)]===undefined)this[_0xd85584(0x61e)]();return this['_CoreEngineSettings'][_0xd85584(0x579)];},Game_System[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6df)]=function(_0x19a2b8){const _0x226609=_0x2bd3fa;if(this[_0x226609(0x79e)]===undefined)this['initCoreEngine']();if(this[_0x226609(0x79e)][_0x226609(0x579)]===undefined)this['initCoreEngine']();this['_CoreEngineSettings'][_0x226609(0x579)]=_0x19a2b8;},Game_System[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8b1)]=function(){const _0x15d83e=_0x2bd3fa;if(this[_0x15d83e(0x79e)]===undefined)this[_0x15d83e(0x61e)]();this[_0x15d83e(0x79e)][_0x15d83e(0x365)]=this[_0x15d83e(0x58b)]();},Game_System[_0x2bd3fa(0x77c)]['initialBattleSystem']=function(){const _0x412f9b=_0x2bd3fa,_0x12544a=(VisuMZ[_0x412f9b(0x249)][_0x412f9b(0x8fc)]['BattleSystem']||'DATABASE')[_0x412f9b(0x345)]()[_0x412f9b(0x8c9)]();return VisuMZ[_0x412f9b(0x249)][_0x412f9b(0x589)](_0x12544a);},Game_System['prototype'][_0x2bd3fa(0x856)]=function(){const _0x47bc6d=_0x2bd3fa;if($gameTemp[_0x47bc6d(0x6b5)]!==undefined)return $gameTemp['_forcedBattleSys'];if(this[_0x47bc6d(0x79e)]===undefined)this[_0x47bc6d(0x61e)]();if(this[_0x47bc6d(0x79e)][_0x47bc6d(0x365)]===undefined)this[_0x47bc6d(0x8b1)]();return this[_0x47bc6d(0x79e)][_0x47bc6d(0x365)];},Game_System[_0x2bd3fa(0x77c)][_0x2bd3fa(0x63e)]=function(_0x41e023){const _0x15bf34=_0x2bd3fa;if(this[_0x15bf34(0x79e)]===undefined)this[_0x15bf34(0x61e)]();if(this[_0x15bf34(0x79e)]['BattleSystem']===undefined)this[_0x15bf34(0x8b1)]();this[_0x15bf34(0x79e)][_0x15bf34(0x365)]=_0x41e023;},Game_System[_0x2bd3fa(0x77c)][_0x2bd3fa(0x717)]=function(){const _0x2b8d0c=_0x2bd3fa;if(this['_CoreEngineSettings']===undefined)this[_0x2b8d0c(0x61e)]();if(this['_CoreEngineSettings'][_0x2b8d0c(0x57b)]===undefined)this[_0x2b8d0c(0x61e)]();return this[_0x2b8d0c(0x79e)]['FontSize'];},Game_System[_0x2bd3fa(0x77c)][_0x2bd3fa(0x290)]=function(_0x14402f){const _0x3ae3eb=_0x2bd3fa;if(this['_CoreEngineSettings']===undefined)this[_0x3ae3eb(0x61e)]();if(this[_0x3ae3eb(0x79e)][_0x3ae3eb(0x22f)]===undefined)this['initCoreEngine']();this['_CoreEngineSettings'][_0x3ae3eb(0x57b)]=_0x14402f;},Game_System[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1ae)]=function(){const _0xa64668=_0x2bd3fa;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0xa64668(0x79e)][_0xa64668(0x419)]===undefined)this[_0xa64668(0x61e)]();return this['_CoreEngineSettings']['Padding'];},Game_System[_0x2bd3fa(0x77c)]['setWindowPadding']=function(_0xd59417){const _0x59c59e=_0x2bd3fa;if(this[_0x59c59e(0x79e)]===undefined)this['initCoreEngine']();if(this[_0x59c59e(0x79e)]['TimeProgress']===undefined)this[_0x59c59e(0x61e)]();this[_0x59c59e(0x79e)][_0x59c59e(0x419)]=_0xd59417;},VisuMZ[_0x2bd3fa(0x249)]['Game_Screen_initialize']=Game_Screen[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4d6)],Game_Screen[_0x2bd3fa(0x77c)]['initialize']=function(){const _0xde5ae7=_0x2bd3fa;VisuMZ[_0xde5ae7(0x249)][_0xde5ae7(0x34b)][_0xde5ae7(0x1f7)](this),this[_0xde5ae7(0x88a)]();},Game_Screen[_0x2bd3fa(0x77c)][_0x2bd3fa(0x88a)]=function(){const _0x43870a=_0x2bd3fa,_0x35eccd=VisuMZ[_0x43870a(0x249)][_0x43870a(0x8fc)]['ScreenShake'];this[_0x43870a(0x32b)]=_0x35eccd?.['DefaultStyle']||_0x43870a(0x88f);},Game_Screen['prototype'][_0x2bd3fa(0x208)]=function(){if(this['_coreEngineShakeStyle']===undefined)this['initCoreEngineScreenShake']();return this['_coreEngineShakeStyle'];},Game_Screen[_0x2bd3fa(0x77c)][_0x2bd3fa(0x3e7)]=function(_0x4f7123){const _0x22ec54=_0x2bd3fa;if(this[_0x22ec54(0x32b)]===undefined)this['initCoreEngineScreenShake']();this[_0x22ec54(0x32b)]=_0x4f7123[_0x22ec54(0x2a9)]()[_0x22ec54(0x8c9)]();},Game_Picture[_0x2bd3fa(0x77c)][_0x2bd3fa(0x418)]=function(){const _0x19d895=_0x2bd3fa;if($gameParty[_0x19d895(0x45d)]())return![];return this[_0x19d895(0x87a)]()&&this[_0x19d895(0x87a)]()[_0x19d895(0x8a3)](0x0)==='!';},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x727)]=Game_Picture[_0x2bd3fa(0x77c)]['x'],Game_Picture[_0x2bd3fa(0x77c)]['x']=function(){const _0x4e505d=_0x2bd3fa;if(this[_0x4e505d(0x418)]()){if(_0x4e505d(0x32c)!==_0x4e505d(0x305))return this[_0x4e505d(0x3ac)]();else{if(this['_CoreEngineSettings']===_0x33b585)this[_0x4e505d(0x61e)]();if(this[_0x4e505d(0x79e)]['TimeProgress']===_0x78191f)this['initCoreEngine']();this[_0x4e505d(0x79e)][_0x4e505d(0x419)]=_0x380cf9;}}else return VisuMZ[_0x4e505d(0x249)]['Game_Picture_x'][_0x4e505d(0x1f7)](this);},Game_Picture[_0x2bd3fa(0x77c)][_0x2bd3fa(0x3ac)]=function(){const _0x458f95=_0x2bd3fa,_0x5cdbe4=$gameMap[_0x458f95(0x7d4)]()*$gameMap[_0x458f95(0x309)]();return this['_x']-_0x5cdbe4;},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x781)]=Game_Picture['prototype']['y'],Game_Picture[_0x2bd3fa(0x77c)]['y']=function(){const _0x430668=_0x2bd3fa;if(this[_0x430668(0x418)]()){if('FwPUL'===_0x430668(0x7a8))return this['yScrollLinkedOffset']();else _0x38a104[_0x430668(0x249)][_0x430668(0x808)][_0x430668(0x1f7)](this);}else{if(_0x430668(0x2ae)!==_0x430668(0x2ae))this['_helpWindow']&&this[_0x430668(0x385)][_0x430668(0x558)](_0x320709[_0x430668(0x6a0)][_0x430668(0x6f7)]),this['_listWindow']&&this[_0x430668(0x2e3)][_0x430668(0x558)](_0x4b1234[_0x430668(0x6a0)][_0x430668(0x475)]);else return VisuMZ[_0x430668(0x249)]['Game_Picture_y'][_0x430668(0x1f7)](this);}},Game_Picture['prototype'][_0x2bd3fa(0x839)]=function(){const _0x180a71=_0x2bd3fa,_0x2afee7=$gameMap[_0x180a71(0x3bc)]()*$gameMap['tileHeight']();return this['_y']-_0x2afee7;},Game_Picture['prototype'][_0x2bd3fa(0x76b)]=function(_0x594cf4){this['_coreEasingType']=_0x594cf4;},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x3d7)]=Game_Picture[_0x2bd3fa(0x77c)][_0x2bd3fa(0x671)],Game_Picture[_0x2bd3fa(0x77c)][_0x2bd3fa(0x671)]=function(_0x37ec74){const _0x120093=_0x2bd3fa;this[_0x120093(0x92b)]=this['_coreEasingType']||0x0;if([0x0,0x1,0x2,0x3]['includes'](this[_0x120093(0x92b)])){if('iKARn'===_0x120093(0x707))_0x3159eb['bgmVolume']=0x0,_0x306ba2['bgsVolume']=0x0,_0x5b49f9[_0x120093(0x25d)]=0x0,_0x44a563[_0x120093(0x664)]=0x0;else return VisuMZ[_0x120093(0x249)][_0x120093(0x3d7)][_0x120093(0x1f7)](this,_0x37ec74);}else{if('llHrQ'==='llHrQ')return VisuMZ[_0x120093(0x616)](_0x37ec74,this['_coreEasingType']);else this['processTouchModernControls']();}},VisuMZ['CoreEngine'][_0x2bd3fa(0x37d)]=Game_Action[_0x2bd3fa(0x77c)][_0x2bd3fa(0x27b)],Game_Action[_0x2bd3fa(0x77c)]['itemHit']=function(_0x4e9669){const _0x3e3e11=_0x2bd3fa;return VisuMZ[_0x3e3e11(0x249)][_0x3e3e11(0x8fc)][_0x3e3e11(0x762)][_0x3e3e11(0x58e)]?this[_0x3e3e11(0x568)](_0x4e9669):'FHZym'!==_0x3e3e11(0x3f1)?_0x55dd89[_0x3e3e11(0x6a0)][_0x3e3e11(0x4e0)][_0x3e3e11(0x1f7)](this):VisuMZ[_0x3e3e11(0x249)][_0x3e3e11(0x37d)]['call'](this,_0x4e9669);},Game_Action[_0x2bd3fa(0x77c)][_0x2bd3fa(0x568)]=function(_0x419953){const _0xb30f89=_0x2bd3fa,_0x2f6b00=this[_0xb30f89(0x79d)](_0x419953),_0x47fac8=this[_0xb30f89(0x662)](_0x419953),_0x1b3644=this[_0xb30f89(0x275)](_0x419953);return _0x2f6b00*(_0x47fac8-_0x1b3644);},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x621)]=Game_Action[_0x2bd3fa(0x77c)][_0x2bd3fa(0x832)],Game_Action[_0x2bd3fa(0x77c)][_0x2bd3fa(0x832)]=function(_0x3112c5){const _0x9d3eb1=_0x2bd3fa;return VisuMZ[_0x9d3eb1(0x249)][_0x9d3eb1(0x8fc)][_0x9d3eb1(0x762)][_0x9d3eb1(0x58e)]?0x0:VisuMZ[_0x9d3eb1(0x249)]['Game_Action_itemEva'][_0x9d3eb1(0x1f7)](this,_0x3112c5);},Game_Action[_0x2bd3fa(0x77c)][_0x2bd3fa(0x79d)]=function(_0x1b38ee){const _0x32e5d8=_0x2bd3fa;return this['item']()[_0x32e5d8(0x863)]*0.01;},Game_Action[_0x2bd3fa(0x77c)][_0x2bd3fa(0x662)]=function(_0x24c0f3){const _0x38f72=_0x2bd3fa;if(VisuMZ[_0x38f72(0x249)][_0x38f72(0x8fc)]['QoL'][_0x38f72(0x926)]&&this[_0x38f72(0x706)]())return 0x1;if(this[_0x38f72(0x5b6)]()){if('vvjew'===_0x38f72(0x39b)){if(VisuMZ[_0x38f72(0x249)][_0x38f72(0x8fc)][_0x38f72(0x762)]['AccuracyBoost']&&this['subject']()[_0x38f72(0x258)]())return this['subject']()[_0x38f72(0x4ce)]+0.05;else{if(_0x38f72(0x6d4)===_0x38f72(0x6d4))return this[_0x38f72(0x88e)]()[_0x38f72(0x4ce)];else this['contents'][_0x38f72(0x66b)]>=0x18&&(this[_0x38f72(0x711)][_0x38f72(0x66b)]-=0x6);}}else return this[_0x38f72(0x5fa)]()['level'];}else return 0x1;},Game_Action[_0x2bd3fa(0x77c)][_0x2bd3fa(0x275)]=function(_0x38b52f){const _0x22bd1d=_0x2bd3fa;if(this[_0x22bd1d(0x88e)]()['isActor']()===_0x38b52f[_0x22bd1d(0x258)]())return 0x0;if(this[_0x22bd1d(0x5b6)]())return VisuMZ[_0x22bd1d(0x249)][_0x22bd1d(0x8fc)][_0x22bd1d(0x762)][_0x22bd1d(0x926)]&&_0x38b52f[_0x22bd1d(0x8d8)]()?_0x38b52f[_0x22bd1d(0x573)]-0.05:'fdURc'!==_0x22bd1d(0x7f5)?_0x2c5e89[_0x22bd1d(0x249)][_0x22bd1d(0x8fc)][_0x22bd1d(0x762)][_0x22bd1d(0x3bd)]&&_0x4da6b0[_0x22bd1d(0x5c3)](_0x4ed33a)?![]:_0x554199[_0x22bd1d(0x249)][_0x22bd1d(0x428)][_0x22bd1d(0x1f7)](this,_0x1f251a):_0x38b52f['eva'];else{if(this[_0x22bd1d(0x5cb)]()){if(_0x22bd1d(0x8b9)===_0x22bd1d(0x8b9))return _0x38b52f[_0x22bd1d(0x3ef)];else{var _0x5464e5=_0x26b90e(_0xc832e3['$1'])/0x64;_0x3e6ac4*=_0x5464e5;}}else{if(_0x22bd1d(0x547)===_0x22bd1d(0x547))return 0x0;else{var _0x1501da=_0x3fbbfa(_0x2ec691['$1']);try{_0x10a64f*=_0x15daff(_0x1501da);}catch(_0x5925d3){if(_0x2b422e[_0x22bd1d(0x4f7)]())_0x39fa15[_0x22bd1d(0x253)](_0x5925d3);}}}}},VisuMZ[_0x2bd3fa(0x249)]['Game_Action_updateLastTarget']=Game_Action['prototype']['updateLastTarget'],Game_Action['prototype'][_0x2bd3fa(0x42e)]=function(_0x468ed4){const _0x6f6075=_0x2bd3fa;VisuMZ[_0x6f6075(0x249)]['Game_Action_updateLastTarget'][_0x6f6075(0x1f7)](this,_0x468ed4);if(VisuMZ[_0x6f6075(0x249)][_0x6f6075(0x8fc)]['QoL']['ImprovedAccuracySystem'])return;const _0xc169bb=_0x468ed4['result']();_0xc169bb['missed']&&(0x1-this[_0x6f6075(0x832)](_0x468ed4)>this[_0x6f6075(0x27b)](_0x468ed4)&&(_0xc169bb[_0x6f6075(0x388)]=![],_0xc169bb['evaded']=!![]));},VisuMZ[_0x2bd3fa(0x249)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1fa)],Game_BattlerBase['prototype']['initMembers']=function(){const _0x436fa7=_0x2bd3fa;this['_cache']={},VisuMZ[_0x436fa7(0x249)]['Game_BattlerBase_initMembers'][_0x436fa7(0x1f7)](this);},VisuMZ[_0x2bd3fa(0x249)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x171)],Game_BattlerBase[_0x2bd3fa(0x77c)]['refresh']=function(){const _0x47536d=_0x2bd3fa;this[_0x47536d(0x3fa)]={},VisuMZ[_0x47536d(0x249)][_0x47536d(0x22a)]['call'](this);},Game_BattlerBase['prototype'][_0x2bd3fa(0x525)]=function(_0x25394e){const _0x2c45e0=_0x2bd3fa;return this['_cache']=this['_cache']||{},this[_0x2c45e0(0x3fa)][_0x25394e]!==undefined;},Game_BattlerBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x41a)]=function(_0x435af2){const _0x47ff91=_0x2bd3fa,_0x5310c2=(_0xd47a59,_0x208be6)=>{const _0xb588ff=_0x4271;if(_0xb588ff(0x17b)==='jbXDz')return _0x3d3b1a(_0x4f75a3)['toLocaleString'](_0xd05174,_0x529e4a)+',';else{if(!_0x208be6)return _0xd47a59;if(_0x208be6[_0xb588ff(0x377)][_0xb588ff(0x306)](VisuMZ[_0xb588ff(0x249)][_0xb588ff(0x6bc)][_0xb588ff(0x41a)][_0x435af2])){var _0xfe18fa=Number(RegExp['$1']);_0xd47a59+=_0xfe18fa;}if(_0x208be6[_0xb588ff(0x377)]['match'](VisuMZ[_0xb588ff(0x249)]['RegExp'][_0xb588ff(0x41d)][_0x435af2])){var _0x29445c=String(RegExp['$1']);try{_0xd47a59+=eval(_0x29445c);}catch(_0x48bd1a){if($gameTemp['isPlaytest']())console['log'](_0x48bd1a);}}return _0xd47a59;}};return this[_0x47ff91(0x2f9)]()[_0x47ff91(0x192)](_0x5310c2,this[_0x47ff91(0x360)][_0x435af2]);},Game_BattlerBase['prototype'][_0x2bd3fa(0x4a7)]=function(_0x3998c7){const _0x203db3=_0x2bd3fa;var _0xdeb1d0=_0x203db3(0x57c)+(this[_0x203db3(0x258)]()?_0x203db3(0x54e):_0x203db3(0x35e))+_0x203db3(0x297)+_0x3998c7;if(this[_0x203db3(0x525)](_0xdeb1d0))return this[_0x203db3(0x3fa)][_0xdeb1d0];this['_cache'][_0xdeb1d0]=eval(VisuMZ[_0x203db3(0x249)][_0x203db3(0x8fc)][_0x203db3(0x7f9)][_0xdeb1d0]);const _0xc0871d=(_0x2d0c93,_0x20320d)=>{const _0x16cdfb=_0x203db3;if(!_0x20320d)return _0x2d0c93;if(_0x20320d[_0x16cdfb(0x377)][_0x16cdfb(0x306)](VisuMZ[_0x16cdfb(0x249)][_0x16cdfb(0x6bc)][_0x16cdfb(0x4a7)][_0x3998c7])){if('jCRlt'===_0x16cdfb(0x591)){var _0x2646aa=Number(RegExp['$1']);if(_0x2646aa===0x0)_0x2646aa=Number[_0x16cdfb(0x798)];_0x2d0c93=Math['max'](_0x2d0c93,_0x2646aa);}else this[_0x16cdfb(0x367)](_0x45ad78);}if(_0x20320d['note']['match'](VisuMZ[_0x16cdfb(0x249)][_0x16cdfb(0x6bc)]['paramMaxJS'][_0x3998c7])){if('KpgQd'!==_0x16cdfb(0x281))return _0x4fcaba[_0x16cdfb(0x249)][_0x16cdfb(0x8fc)][_0x16cdfb(0x762)][_0x16cdfb(0x926)]&&_0x3de70a[_0x16cdfb(0x8d8)]()?_0x2fcd29['eva']-0.05:_0x37db7a[_0x16cdfb(0x573)];else{var _0x344143=String(RegExp['$1']);try{_0x16cdfb(0x5f9)!==_0x16cdfb(0x78f)?_0x2d0c93=Math['max'](_0x2d0c93,Number(eval(_0x344143))):this['_inputWindow'][_0x16cdfb(0x558)](_0x4fe483[_0x16cdfb(0x6a0)]['InputBgType']);}catch(_0x3e3c7d){if('mpnpn'===_0x16cdfb(0x8d1))this[_0x16cdfb(0x346)](_0x27ede7,_0x439e5a,_0x8e4422,_0x52b2a4,_0x3c5190);else{if($gameTemp[_0x16cdfb(0x4f7)]())console[_0x16cdfb(0x253)](_0x3e3c7d);}}}}return _0x2d0c93;};if(this[_0x203db3(0x3fa)][_0xdeb1d0]===0x0)this[_0x203db3(0x3fa)][_0xdeb1d0]=Number[_0x203db3(0x798)];return this['_cache'][_0xdeb1d0]=this[_0x203db3(0x2f9)]()['reduce'](_0xc0871d,this[_0x203db3(0x3fa)][_0xdeb1d0]),this[_0x203db3(0x3fa)][_0xdeb1d0];},Game_BattlerBase[_0x2bd3fa(0x77c)]['paramRate']=function(_0x1be9e5){const _0x5ac933=_0x2bd3fa,_0x4f3d38=this[_0x5ac933(0x78b)](Game_BattlerBase[_0x5ac933(0x5c7)],_0x1be9e5),_0x5b862b=(_0x552c0a,_0x3d14b0)=>{const _0x3fa5f4=_0x5ac933;if(!_0x3d14b0)return _0x552c0a;if(_0x3d14b0[_0x3fa5f4(0x377)]['match'](VisuMZ[_0x3fa5f4(0x249)][_0x3fa5f4(0x6bc)][_0x3fa5f4(0x60a)][_0x1be9e5])){var _0x4e3195=Number(RegExp['$1'])/0x64;_0x552c0a*=_0x4e3195;}if(_0x3d14b0[_0x3fa5f4(0x377)][_0x3fa5f4(0x306)](VisuMZ[_0x3fa5f4(0x249)][_0x3fa5f4(0x6bc)][_0x3fa5f4(0x1c9)][_0x1be9e5])){var _0x4e3195=Number(RegExp['$1']);_0x552c0a*=_0x4e3195;}if(_0x3d14b0['note'][_0x3fa5f4(0x306)](VisuMZ[_0x3fa5f4(0x249)]['RegExp'][_0x3fa5f4(0x1a2)][_0x1be9e5])){if(_0x3fa5f4(0x1c7)===_0x3fa5f4(0x91c))this['_x']=this['_targetX'],this['_y']=this[_0x3fa5f4(0x756)],this[_0x3fa5f4(0x1a0)]=this[_0x3fa5f4(0x500)],this[_0x3fa5f4(0x71a)]=this[_0x3fa5f4(0x60c)],this[_0x3fa5f4(0x6c3)]=this['_targetOpacity'],this['_anchor']&&(this[_0x3fa5f4(0x1c4)]['x']=this[_0x3fa5f4(0x187)]['x'],this['_anchor']['y']=this[_0x3fa5f4(0x187)]['y']);else{var _0x33dd80=String(RegExp['$1']);try{_0x552c0a*=eval(_0x33dd80);}catch(_0x3e74cc){if(_0x3fa5f4(0x3ad)===_0x3fa5f4(0x3ad)){if($gameTemp[_0x3fa5f4(0x4f7)]())console[_0x3fa5f4(0x253)](_0x3e74cc);}else _0x37b258[_0x3fa5f4(0x247)](),_0x475747[_0x3fa5f4(0x679)]=new _0x8a43e3(),_0x155967['addChild'](_0xea002a[_0x3fa5f4(0x679)]);}}}return _0x552c0a;};return this[_0x5ac933(0x2f9)]()['reduce'](_0x5b862b,_0x4f3d38);},Game_BattlerBase[_0x2bd3fa(0x77c)]['paramFlatBonus']=function(_0x39de77){const _0x3c95bc=_0x2bd3fa,_0x1b3823=(_0x1864ff,_0x1e021e)=>{const _0x393735=_0x4271;if(!_0x1e021e)return _0x1864ff;if(_0x1e021e[_0x393735(0x377)][_0x393735(0x306)](VisuMZ[_0x393735(0x249)][_0x393735(0x6bc)][_0x393735(0x3bb)][_0x39de77])){var _0x47f2c7=Number(RegExp['$1']);_0x1864ff+=_0x47f2c7;}if(_0x1e021e[_0x393735(0x377)][_0x393735(0x306)](VisuMZ[_0x393735(0x249)]['RegExp']['paramFlatJS'][_0x39de77])){var _0x320f2a=String(RegExp['$1']);try{if('GzRjG'===_0x393735(0x742))return this[_0x393735(0x404)]()?_0x75c79d[_0x393735(0x855)](_0x393735(0x7ae)):_0x234480[_0x393735(0x77c)]['buttonAssistKey1'][_0x393735(0x1f7)](this);else _0x1864ff+=eval(_0x320f2a);}catch(_0x18da1e){if($gameTemp[_0x393735(0x4f7)]())console[_0x393735(0x253)](_0x18da1e);}}return _0x1864ff;};return this[_0x3c95bc(0x2f9)]()[_0x3c95bc(0x192)](_0x1b3823,0x0);},Game_BattlerBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x2f7)]=function(_0x25eb4d){const _0x6c6650=_0x2bd3fa;let _0x371053=_0x6c6650(0x2f7)+_0x25eb4d+'Total';if(this[_0x6c6650(0x525)](_0x371053))return this[_0x6c6650(0x3fa)][_0x371053];return this[_0x6c6650(0x3fa)][_0x371053]=Math[_0x6c6650(0x18a)](VisuMZ['CoreEngine'][_0x6c6650(0x8fc)][_0x6c6650(0x7f9)][_0x6c6650(0x3b8)][_0x6c6650(0x1f7)](this,_0x25eb4d)),this['_cache'][_0x371053];},Game_BattlerBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x3cf)]=function(_0x2261b3){const _0x4f81d6=_0x2bd3fa,_0x371111=(_0x51df66,_0x489e37)=>{const _0x38bfff=_0x4271;if('ygsjl'!==_0x38bfff(0x531))this[_0x38bfff(0x794)]()?this[_0x38bfff(0x1fc)]():_0x332b2d[_0x38bfff(0x249)]['Window_Gold_refresh']['call'](this);else{if(!_0x489e37)return _0x51df66;if(_0x489e37[_0x38bfff(0x377)][_0x38bfff(0x306)](VisuMZ[_0x38bfff(0x249)][_0x38bfff(0x6bc)][_0x38bfff(0x7b4)][_0x2261b3])){if('nDAsV'==='nDAsV'){var _0x3db4de=Number(RegExp['$1'])/0x64;_0x51df66+=_0x3db4de;}else return _0x573468['ceil'](_0x1fb44a['CoreEngine']['Bitmap_measureTextWidth']['call'](this,_0x3f05e2));}if(_0x489e37[_0x38bfff(0x377)][_0x38bfff(0x306)](VisuMZ[_0x38bfff(0x249)]['RegExp'][_0x38bfff(0x2a7)][_0x2261b3])){var _0x3db4de=Number(RegExp['$1']);_0x51df66+=_0x3db4de;}if(_0x489e37['note'][_0x38bfff(0x306)](VisuMZ['CoreEngine'][_0x38bfff(0x6bc)][_0x38bfff(0x674)][_0x2261b3])){var _0x2a8081=String(RegExp['$1']);try{_0x38bfff(0x92e)!=='CZgZN'?(_0x34da3f[_0x38bfff(0x2e8)](),this['deselect']()):_0x51df66+=eval(_0x2a8081);}catch(_0x5c9380){if(_0x38bfff(0x31b)!==_0x38bfff(0x31b)){const _0x518a3e=_0x38bfff(0x4a6);this[_0x38bfff(0x945)]=this[_0x38bfff(0x945)]||{};if(this[_0x38bfff(0x945)][_0x518a3e])return this[_0x38bfff(0x945)][_0x518a3e];const _0x50777a=_0x2413b4[_0x38bfff(0x249)][_0x38bfff(0x8fc)]['Color'][_0x38bfff(0x56e)];return this['getColorDataFromPluginParameters'](_0x518a3e,_0x50777a);}else{if($gameTemp[_0x38bfff(0x4f7)]())console[_0x38bfff(0x253)](_0x5c9380);}}}return _0x51df66;}};return this['traitObjects']()[_0x4f81d6(0x192)](_0x371111,0x0);},Game_BattlerBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x899)]=function(_0xe736c){const _0x3c8345=_0x2bd3fa,_0x5245ae=(_0x2d58b3,_0x4bee5f)=>{const _0x5afae2=_0x4271;if(_0x5afae2(0x3f2)!=='NJkjv'){if(!_0x4bee5f)return _0x2d58b3;if(_0x4bee5f[_0x5afae2(0x377)][_0x5afae2(0x306)](VisuMZ[_0x5afae2(0x249)][_0x5afae2(0x6bc)]['xparamRate1'][_0xe736c])){var _0x2bfc95=Number(RegExp['$1'])/0x64;_0x2d58b3*=_0x2bfc95;}if(_0x4bee5f['note']['match'](VisuMZ[_0x5afae2(0x249)]['RegExp'][_0x5afae2(0x54f)][_0xe736c])){var _0x2bfc95=Number(RegExp['$1']);_0x2d58b3*=_0x2bfc95;}if(_0x4bee5f['note'][_0x5afae2(0x306)](VisuMZ[_0x5afae2(0x249)][_0x5afae2(0x6bc)][_0x5afae2(0x403)][_0xe736c])){var _0x3e5438=String(RegExp['$1']);try{_0x2d58b3*=eval(_0x3e5438);}catch(_0xc4fdf5){if($gameTemp[_0x5afae2(0x4f7)]())console[_0x5afae2(0x253)](_0xc4fdf5);}}return _0x2d58b3;}else this[_0x5afae2(0x223)]=_0x302970;};return this[_0x3c8345(0x2f9)]()[_0x3c8345(0x192)](_0x5245ae,0x1);},Game_BattlerBase['prototype'][_0x2bd3fa(0x20c)]=function(_0x255908){const _0x466864=_0x2bd3fa,_0x2e622b=(_0x1cd60b,_0x4860a6)=>{const _0x3862dc=_0x4271;if(!_0x4860a6)return _0x1cd60b;if(_0x4860a6[_0x3862dc(0x377)][_0x3862dc(0x306)](VisuMZ['CoreEngine'][_0x3862dc(0x6bc)]['xparamFlat1'][_0x255908])){var _0x5a7f0e=Number(RegExp['$1'])/0x64;_0x1cd60b+=_0x5a7f0e;}if(_0x4860a6[_0x3862dc(0x377)][_0x3862dc(0x306)](VisuMZ[_0x3862dc(0x249)]['RegExp']['xparamFlat2'][_0x255908])){var _0x5a7f0e=Number(RegExp['$1']);_0x1cd60b+=_0x5a7f0e;}if(_0x4860a6['note'][_0x3862dc(0x306)](VisuMZ['CoreEngine'][_0x3862dc(0x6bc)][_0x3862dc(0x342)][_0x255908])){var _0x460e3c=String(RegExp['$1']);try{if(_0x3862dc(0x8cb)===_0x3862dc(0x619)){_0x143da1['ConvertParams'](_0x1c31dd,_0x147f3b);const _0x4de38f=_0x13095f['URL'];_0x262375['openURL'](_0x4de38f);}else _0x1cd60b+=eval(_0x460e3c);}catch(_0x2d89ce){if($gameTemp['isPlaytest']())console[_0x3862dc(0x253)](_0x2d89ce);}}return _0x1cd60b;};return this[_0x466864(0x2f9)]()[_0x466864(0x192)](_0x2e622b,0x0);},Game_BattlerBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x518)]=function(_0x3484e1){const _0x24e921=_0x2bd3fa;let _0x574648=_0x24e921(0x518)+_0x3484e1+'Total';if(this[_0x24e921(0x525)](_0x574648))return this[_0x24e921(0x3fa)][_0x574648];return this[_0x24e921(0x3fa)][_0x574648]=VisuMZ[_0x24e921(0x249)][_0x24e921(0x8fc)]['Param']['XParameterFormula']['call'](this,_0x3484e1),this['_cache'][_0x574648];},Game_BattlerBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x889)]=function(_0x18e6b7){const _0x3e22d8=_0x2bd3fa,_0x2dba0d=(_0x44d5d0,_0x16509e)=>{const _0x363c00=_0x4271;if(_0x363c00(0x615)===_0x363c00(0x615)){if(!_0x16509e)return _0x44d5d0;if(_0x16509e['note'][_0x363c00(0x306)](VisuMZ[_0x363c00(0x249)][_0x363c00(0x6bc)]['sparamPlus1'][_0x18e6b7])){if(_0x363c00(0x24a)!==_0x363c00(0x1ed)){var _0x40312b=Number(RegExp['$1'])/0x64;_0x44d5d0+=_0x40312b;}else switch(_0x67fc4c[_0x363c00(0x249)][_0x363c00(0x8fc)]['QoL'][_0x363c00(0x382)]){case _0x363c00(0x5da):return!![];case _0x363c00(0x6ea):return![];default:return _0x2eb458[_0x363c00(0x249)][_0x363c00(0x8d6)][_0x363c00(0x1f7)](this);}}if(_0x16509e[_0x363c00(0x377)][_0x363c00(0x306)](VisuMZ[_0x363c00(0x249)][_0x363c00(0x6bc)]['sparamPlus2'][_0x18e6b7])){var _0x40312b=Number(RegExp['$1']);_0x44d5d0+=_0x40312b;}if(_0x16509e[_0x363c00(0x377)][_0x363c00(0x306)](VisuMZ[_0x363c00(0x249)][_0x363c00(0x6bc)][_0x363c00(0x7cf)][_0x18e6b7])){var _0x4b8ef6=String(RegExp['$1']);try{_0x363c00(0x656)!==_0x363c00(0x83e)?_0x44d5d0+=eval(_0x4b8ef6):this[_0x363c00(0x945)][_0x27b81f]=this[_0x363c00(0x3db)](_0x85eebe(_0x4e77b8));}catch(_0x5b46be){if(_0x363c00(0x766)!==_0x363c00(0x966)){if($gameTemp[_0x363c00(0x4f7)]())console[_0x363c00(0x253)](_0x5b46be);}else return _0x2206f8[_0x363c00(0x6a0)]['StatusParamsRect']['call'](this);}}return _0x44d5d0;}else{const _0x131dec=_0x2a7952['CoreEngine'][_0x363c00(0x8fc)]['ScreenResolution'];if(!_0x131dec)return![];if(_0xa1de4d[_0x363c00(0x7b6)]>='1.3.0'&&!_0x131dec['RepositionEnemies130'])return![];return _0x131dec[_0x363c00(0x74f)];}};return this[_0x3e22d8(0x2f9)]()[_0x3e22d8(0x192)](_0x2dba0d,0x0);},Game_BattlerBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x783)]=function(_0x3bf39c){const _0x1b507e=_0x2bd3fa,_0x4d506a=(_0x49ad3b,_0xdc7a29)=>{const _0x25de2a=_0x4271;if(!_0xdc7a29)return _0x49ad3b;if(_0xdc7a29['note'][_0x25de2a(0x306)](VisuMZ['CoreEngine']['RegExp'][_0x25de2a(0x4ac)][_0x3bf39c])){var _0x18aaa7=Number(RegExp['$1'])/0x64;_0x49ad3b*=_0x18aaa7;}if(_0xdc7a29[_0x25de2a(0x377)][_0x25de2a(0x306)](VisuMZ[_0x25de2a(0x249)][_0x25de2a(0x6bc)][_0x25de2a(0x303)][_0x3bf39c])){var _0x18aaa7=Number(RegExp['$1']);_0x49ad3b*=_0x18aaa7;}if(_0xdc7a29[_0x25de2a(0x377)]['match'](VisuMZ[_0x25de2a(0x249)]['RegExp'][_0x25de2a(0x7c2)][_0x3bf39c])){if('MfNDM'!=='fblIU'){var _0x1fa3d7=String(RegExp['$1']);try{_0x49ad3b*=eval(_0x1fa3d7);}catch(_0x3d8270){if($gameTemp[_0x25de2a(0x4f7)]())console[_0x25de2a(0x253)](_0x3d8270);}}else this['switchModes'](_0x25de2a(0x42f));}return _0x49ad3b;};return this[_0x1b507e(0x2f9)]()[_0x1b507e(0x192)](_0x4d506a,0x1);},Game_BattlerBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1a7)]=function(_0x249150){const _0x230d20=_0x2bd3fa,_0x16882d=(_0x2835e0,_0x38a083)=>{const _0x2ca1b9=_0x4271;if(!_0x38a083)return _0x2835e0;if(_0x38a083['note'][_0x2ca1b9(0x306)](VisuMZ[_0x2ca1b9(0x249)][_0x2ca1b9(0x6bc)][_0x2ca1b9(0x609)][_0x249150])){if(_0x2ca1b9(0x329)!==_0x2ca1b9(0x329))_0x44e8dd[_0x2ca1b9(0x2e8)](),this[_0x2ca1b9(0x596)](_0x2ca1b9(0x203));else{var _0x328a95=Number(RegExp['$1'])/0x64;_0x2835e0+=_0x328a95;}}if(_0x38a083[_0x2ca1b9(0x377)][_0x2ca1b9(0x306)](VisuMZ[_0x2ca1b9(0x249)][_0x2ca1b9(0x6bc)][_0x2ca1b9(0x439)][_0x249150])){var _0x328a95=Number(RegExp['$1']);_0x2835e0+=_0x328a95;}if(_0x38a083[_0x2ca1b9(0x377)][_0x2ca1b9(0x306)](VisuMZ[_0x2ca1b9(0x249)][_0x2ca1b9(0x6bc)][_0x2ca1b9(0x283)][_0x249150])){if(_0x2ca1b9(0x6d8)!==_0x2ca1b9(0x6d8))return 0x0;else{var _0x3b52f7=String(RegExp['$1']);try{_0x2ca1b9(0x461)===_0x2ca1b9(0x461)?_0x2835e0+=eval(_0x3b52f7):_0x10a2c9['_playTestFastMode']=!_0x1f4cfb[_0x2ca1b9(0x5d2)];}catch(_0x360119){if(_0x2ca1b9(0x51e)===_0x2ca1b9(0x51e)){if($gameTemp[_0x2ca1b9(0x4f7)]())console[_0x2ca1b9(0x253)](_0x360119);}else this[_0x2ca1b9(0x75d)][_0x2ca1b9(0x558)](_0x332be8[_0x2ca1b9(0x6a0)][_0x2ca1b9(0x63a)]);}}}return _0x2835e0;};return this[_0x230d20(0x2f9)]()['reduce'](_0x16882d,0x0);},Game_BattlerBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5ad)]=function(_0x18392f){const _0x468fd8=_0x2bd3fa;let _0x3f5848='sparam'+_0x18392f+_0x468fd8(0x8b2);if(this[_0x468fd8(0x525)](_0x3f5848))return this[_0x468fd8(0x3fa)][_0x3f5848];return this[_0x468fd8(0x3fa)][_0x3f5848]=VisuMZ[_0x468fd8(0x249)][_0x468fd8(0x8fc)][_0x468fd8(0x7f9)][_0x468fd8(0x919)][_0x468fd8(0x1f7)](this,_0x18392f),this[_0x468fd8(0x3fa)][_0x3f5848];},Game_BattlerBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8f1)]=function(_0x3a08e3,_0x3f6b71){const _0x1bb638=_0x2bd3fa;if(typeof paramId===_0x1bb638(0x3d8))return this[_0x1bb638(0x2f7)](_0x3a08e3);_0x3a08e3=String(_0x3a08e3||'')[_0x1bb638(0x345)]();if(_0x3a08e3===_0x1bb638(0x274))return this['param'](0x0);if(_0x3a08e3===_0x1bb638(0x881))return this[_0x1bb638(0x2f7)](0x1);if(_0x3a08e3==='ATK')return this['param'](0x2);if(_0x3a08e3===_0x1bb638(0x62f))return this[_0x1bb638(0x2f7)](0x3);if(_0x3a08e3===_0x1bb638(0x1ba))return this[_0x1bb638(0x2f7)](0x4);if(_0x3a08e3===_0x1bb638(0x335))return this[_0x1bb638(0x2f7)](0x5);if(_0x3a08e3===_0x1bb638(0x2bc))return this[_0x1bb638(0x2f7)](0x6);if(_0x3a08e3===_0x1bb638(0x182))return this[_0x1bb638(0x2f7)](0x7);if(_0x3a08e3===_0x1bb638(0x362))return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this['xparam'](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x3a08e3===_0x1bb638(0x6a2))return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this[_0x1bb638(0x518)](0x1)*0x64))+'%':this[_0x1bb638(0x518)](0x1);if(_0x3a08e3===_0x1bb638(0x8da))return _0x3f6b71?String(Math['round'](this[_0x1bb638(0x518)](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x3a08e3===_0x1bb638(0x20d))return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this['xparam'](0x3)*0x64))+'%':this[_0x1bb638(0x518)](0x3);if(_0x3a08e3===_0x1bb638(0x8db))return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this['xparam'](0x4)*0x64))+'%':this[_0x1bb638(0x518)](0x4);if(_0x3a08e3==='MRF')return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this[_0x1bb638(0x518)](0x5)*0x64))+'%':this[_0x1bb638(0x518)](0x5);if(_0x3a08e3===_0x1bb638(0x2c6))return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this['xparam'](0x6)*0x64))+'%':this[_0x1bb638(0x518)](0x6);if(_0x3a08e3==='HRG')return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this[_0x1bb638(0x518)](0x7)*0x64))+'%':this['xparam'](0x7);if(_0x3a08e3===_0x1bb638(0x574))return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this[_0x1bb638(0x518)](0x8)*0x64))+'%':this[_0x1bb638(0x518)](0x8);if(_0x3a08e3===_0x1bb638(0x5ba))return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this[_0x1bb638(0x518)](0x9)*0x64))+'%':this[_0x1bb638(0x518)](0x9);if(_0x3a08e3==='TGR')return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this[_0x1bb638(0x5ad)](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x3a08e3===_0x1bb638(0x30a))return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this[_0x1bb638(0x5ad)](0x1)*0x64))+'%':this[_0x1bb638(0x5ad)](0x1);if(_0x3a08e3===_0x1bb638(0x4cf))return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this[_0x1bb638(0x5ad)](0x2)*0x64))+'%':this[_0x1bb638(0x5ad)](0x2);if(_0x3a08e3===_0x1bb638(0x20a))return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this['sparam'](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x3a08e3===_0x1bb638(0x502))return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this[_0x1bb638(0x5ad)](0x4)*0x64))+'%':this[_0x1bb638(0x5ad)](0x4);if(_0x3a08e3==='TCR')return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this['sparam'](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x3a08e3==='PDR')return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this['sparam'](0x6)*0x64))+'%':this[_0x1bb638(0x5ad)](0x6);if(_0x3a08e3===_0x1bb638(0x3da))return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this[_0x1bb638(0x5ad)](0x7)*0x64))+'%':this[_0x1bb638(0x5ad)](0x7);if(_0x3a08e3===_0x1bb638(0x5d6))return _0x3f6b71?String(Math[_0x1bb638(0x18a)](this[_0x1bb638(0x5ad)](0x8)*0x64))+'%':this[_0x1bb638(0x5ad)](0x8);if(_0x3a08e3===_0x1bb638(0x2e4))return _0x3f6b71?String(Math['round'](this[_0x1bb638(0x5ad)](0x9)*0x64))+'%':this[_0x1bb638(0x5ad)](0x9);if(VisuMZ['CoreEngine'][_0x1bb638(0x738)][_0x3a08e3]){const _0x3c21bb=VisuMZ[_0x1bb638(0x249)]['CustomParamAbb'][_0x3a08e3],_0xeae490=this[_0x3c21bb];return VisuMZ[_0x1bb638(0x249)]['CustomParamType'][_0x3a08e3]===_0x1bb638(0x95a)?_0xeae490:_0x3f6b71?String(Math[_0x1bb638(0x18a)](_0xeae490*0x64))+'%':_0xeae490;}return'';},Game_BattlerBase['prototype'][_0x2bd3fa(0x5d4)]=function(){const _0x44de51=_0x2bd3fa;return this[_0x44de51(0x725)]()&&this[_0x44de51(0x87d)]<this[_0x44de51(0x412)]*VisuMZ['CoreEngine'][_0x44de51(0x8fc)][_0x44de51(0x7f9)][_0x44de51(0x6b4)];},Game_Battler[_0x2bd3fa(0x77c)][_0x2bd3fa(0x700)]=function(){const _0x2b8c27=_0x2bd3fa;SoundManager[_0x2b8c27(0x4ed)](),this[_0x2b8c27(0x1c0)]('evade');},VisuMZ['CoreEngine'][_0x2bd3fa(0x8a1)]=Game_Actor[_0x2bd3fa(0x77c)][_0x2bd3fa(0x59c)],Game_Actor[_0x2bd3fa(0x77c)][_0x2bd3fa(0x59c)]=function(_0x2bde05){const _0x128e3a=_0x2bd3fa;if(this[_0x128e3a(0x4bd)]>0x63)return this[_0x128e3a(0x962)](_0x2bde05);return VisuMZ[_0x128e3a(0x249)][_0x128e3a(0x8a1)][_0x128e3a(0x1f7)](this,_0x2bde05);},Game_Actor[_0x2bd3fa(0x77c)][_0x2bd3fa(0x962)]=function(_0xb1635f){const _0x98f15a=_0x2bd3fa,_0x238f64=this[_0x98f15a(0x55c)]()[_0x98f15a(0x50b)][_0xb1635f][0x63],_0x4483db=this['currentClass']()[_0x98f15a(0x50b)][_0xb1635f][0x62];return _0x238f64+(_0x238f64-_0x4483db)*(this[_0x98f15a(0x4bd)]-0x63);},VisuMZ['CoreEngine'][_0x2bd3fa(0x5ab)]=Game_Actor[_0x2bd3fa(0x77c)][_0x2bd3fa(0x19d)],Game_Actor['prototype'][_0x2bd3fa(0x19d)]=function(_0x236196,_0x3b8714){const _0xd0125b=_0x2bd3fa;$gameTemp[_0xd0125b(0x624)]=!![],VisuMZ['CoreEngine']['Game_Actor_changeClass'][_0xd0125b(0x1f7)](this,_0x236196,_0x3b8714),$gameTemp[_0xd0125b(0x624)]=undefined;},VisuMZ['CoreEngine']['Game_Actor_levelUp']=Game_Actor[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4cd)],Game_Actor[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4cd)]=function(){const _0x3f657e=_0x2bd3fa;VisuMZ[_0x3f657e(0x249)]['Game_Actor_levelUp'][_0x3f657e(0x1f7)](this);if(!$gameTemp[_0x3f657e(0x624)])this[_0x3f657e(0x2bf)]();},Game_Actor[_0x2bd3fa(0x77c)]['levelUpRecovery']=function(){const _0x4b549b=_0x2bd3fa;this[_0x4b549b(0x3fa)]={};if(VisuMZ[_0x4b549b(0x249)][_0x4b549b(0x8fc)][_0x4b549b(0x762)][_0x4b549b(0x89c)])this[_0x4b549b(0x87d)]=this[_0x4b549b(0x412)];if(VisuMZ[_0x4b549b(0x249)][_0x4b549b(0x8fc)]['QoL'][_0x4b549b(0x39d)])this[_0x4b549b(0x5f5)]=this[_0x4b549b(0x515)];},Game_Actor[_0x2bd3fa(0x77c)]['expRate']=function(){const _0x2aecd=_0x2bd3fa;if(this[_0x2aecd(0x176)]())return 0x1;const _0x5c77e9=this['nextLevelExp']()-this[_0x2aecd(0x1d4)](),_0x5b39b6=this['currentExp']()-this[_0x2aecd(0x1d4)]();return(_0x5b39b6/_0x5c77e9)['clamp'](0x0,0x1);},Game_Actor[_0x2bd3fa(0x77c)][_0x2bd3fa(0x2f9)]=function(){const _0xf0e9f1=_0x2bd3fa,_0x2f39fc=Game_Battler[_0xf0e9f1(0x77c)][_0xf0e9f1(0x2f9)]['call'](this);for(const _0x1337c4 of this['equips']()){_0x1337c4&&_0x2f39fc['push'](_0x1337c4);}return _0x2f39fc[_0xf0e9f1(0x599)](this['currentClass'](),this['actor']()),_0x2f39fc;},Object[_0x2bd3fa(0x81a)](Game_Enemy['prototype'],_0x2bd3fa(0x4bd),{'get':function(){const _0x114620=_0x2bd3fa;return this[_0x114620(0x8c3)]();},'configurable':!![]}),Game_Enemy[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8c3)]=function(){const _0x5de77c=_0x2bd3fa;return this[_0x5de77c(0x5fa)]()['level'];},Game_Enemy[_0x2bd3fa(0x77c)][_0x2bd3fa(0x26a)]=function(){const _0x4d137e=_0x2bd3fa;if(!this[_0x4d137e(0x1d2)]){if(_0x4d137e(0x3f8)===_0x4d137e(0x695)){var _0x1f2deb=_0x5a939f(_0x5cd2e6['$1'])/0x64;_0x4e9875*=_0x1f2deb;}else{this[_0x4d137e(0x7f7)]+=Math[_0x4d137e(0x18a)]((Graphics[_0x4d137e(0x30f)]-0x270)/0x2),this[_0x4d137e(0x7f7)]-=Math[_0x4d137e(0x7a0)]((Graphics[_0x4d137e(0x30f)]-Graphics[_0x4d137e(0x6d2)])/0x2);if($gameSystem[_0x4d137e(0x566)]())_0x4d137e(0x2be)===_0x4d137e(0x2be)?this[_0x4d137e(0x2ba)]-=Math[_0x4d137e(0x7a0)]((Graphics[_0x4d137e(0x73f)]-Graphics[_0x4d137e(0x88d)])/0x2):_0x1b4805[_0x4d137e(0x474)](_0xa37c8f);else{if(_0x4d137e(0x659)!==_0x4d137e(0x659)){const _0x7a9c84=_0x8c6b2c[_0x4d137e(0x1f0)]();if(_0x7a9c84)_0x7a9c84[_0x4d137e(0x72a)](_0x3cd322);}else this[_0x4d137e(0x2ba)]+=Math['round']((Graphics[_0x4d137e(0x88d)]-0x330)/0x2);}}}this['_repositioned']=!![];},Game_Party[_0x2bd3fa(0x77c)][_0x2bd3fa(0x7c4)]=function(){const _0x1e069f=_0x2bd3fa;return VisuMZ['CoreEngine'][_0x1e069f(0x8fc)][_0x1e069f(0x3d3)]['GoldMax'];},VisuMZ[_0x2bd3fa(0x249)]['Game_Party_consumeItem']=Game_Party[_0x2bd3fa(0x77c)][_0x2bd3fa(0x23a)],Game_Party[_0x2bd3fa(0x77c)][_0x2bd3fa(0x23a)]=function(_0x19ea9d){const _0x4cc307=_0x2bd3fa;if(VisuMZ[_0x4cc307(0x249)]['Settings'][_0x4cc307(0x762)][_0x4cc307(0x3bd)]&&DataManager[_0x4cc307(0x5c3)](_0x19ea9d))return;VisuMZ[_0x4cc307(0x249)][_0x4cc307(0x351)]['call'](this,_0x19ea9d);},Game_Party[_0x2bd3fa(0x77c)]['setupBattleTestItems']=function(){const _0x39a08b=_0x2bd3fa,_0xb85882=VisuMZ['CoreEngine'][_0x39a08b(0x8fc)][_0x39a08b(0x762)],_0x5c55b5=_0xb85882['BTestAddedQuantity']??0x63;let _0x236514=[];if(_0xb85882[_0x39a08b(0x228)]??!![]){if(_0x39a08b(0x2d9)!==_0x39a08b(0x2d9))return this['runCombinedScrollingTextAsCode'](_0x1ae5f4);else _0x236514=_0x236514[_0x39a08b(0x431)]($dataItems);}(_0xb85882['BTestWeapons']??!![])&&(_0x236514=_0x236514[_0x39a08b(0x431)]($dataWeapons));(_0xb85882['BTestArmors']??!![])&&(_0x236514=_0x236514[_0x39a08b(0x431)]($dataArmors));for(const _0x2e20f0 of _0x236514){if(!_0x2e20f0)continue;if(_0x2e20f0[_0x39a08b(0x87a)][_0x39a08b(0x8c9)]()<=0x0)continue;if(_0x2e20f0[_0x39a08b(0x87a)][_0x39a08b(0x306)](/-----/i))continue;this[_0x39a08b(0x288)](_0x2e20f0,_0x5c55b5);}},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x606)]=Game_Troop[_0x2bd3fa(0x77c)][_0x2bd3fa(0x26e)],Game_Troop[_0x2bd3fa(0x77c)][_0x2bd3fa(0x26e)]=function(_0x278760){const _0x2a0bdb=_0x2bd3fa;$gameTemp[_0x2a0bdb(0x8b5)](),$gameTemp[_0x2a0bdb(0x626)](_0x278760),VisuMZ['CoreEngine']['Game_Troop_setup'][_0x2a0bdb(0x1f7)](this,_0x278760);},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x5d3)]=Game_Map[_0x2bd3fa(0x77c)][_0x2bd3fa(0x26e)],Game_Map[_0x2bd3fa(0x77c)][_0x2bd3fa(0x26e)]=function(_0x1dbdc7){const _0x4de8b3=_0x2bd3fa;VisuMZ[_0x4de8b3(0x249)][_0x4de8b3(0x5d3)]['call'](this,_0x1dbdc7),this[_0x4de8b3(0x4f6)](_0x1dbdc7);},Game_Map[_0x2bd3fa(0x77c)]['setupCoreEngine']=function(){const _0x5d7807=_0x2bd3fa;this[_0x5d7807(0x7d5)]=VisuMZ[_0x5d7807(0x249)][_0x5d7807(0x8fc)]['QoL'][_0x5d7807(0x905)]||![];if($dataMap&&$dataMap[_0x5d7807(0x377)]){if(_0x5d7807(0x2f1)!==_0x5d7807(0x2cc)){if($dataMap[_0x5d7807(0x377)][_0x5d7807(0x306)](/<SHOW TILE SHADOWS>/i))this[_0x5d7807(0x7d5)]=![];if($dataMap[_0x5d7807(0x377)][_0x5d7807(0x306)](/<HIDE TILE SHADOWS>/i))this['_hideTileShadows']=!![];}else _0x5ca227[_0x5d7807(0x249)][_0x5d7807(0x5d1)][_0x5d7807(0x1f7)](this,_0x53d967);}},Game_Map[_0x2bd3fa(0x77c)][_0x2bd3fa(0x541)]=function(){const _0x38a855=_0x2bd3fa;if(this[_0x38a855(0x7d5)]===undefined)this['setupCoreEngine']();return this[_0x38a855(0x7d5)];},VisuMZ[_0x2bd3fa(0x249)]['Game_Character_processMoveCommand']=Game_Character[_0x2bd3fa(0x77c)][_0x2bd3fa(0x398)],Game_Character[_0x2bd3fa(0x77c)][_0x2bd3fa(0x398)]=function(_0x34bdfa){const _0x4d9a39=_0x2bd3fa;try{if(_0x4d9a39(0x5aa)!==_0x4d9a39(0x3c3))VisuMZ['CoreEngine'][_0x4d9a39(0x1b7)][_0x4d9a39(0x1f7)](this,_0x34bdfa);else{const _0x8f725a=[_0x4d9a39(0x1e9),'battlebacks1',_0x4d9a39(0x754),_0x4d9a39(0x2d2),_0x4d9a39(0x4f2),'faces',_0x4d9a39(0x826),_0x4d9a39(0x746),_0x4d9a39(0x2e7),'sv_enemies',_0x4d9a39(0x21c),_0x4d9a39(0x3b0),'titles1',_0x4d9a39(0x575)];for(const _0x4fcce7 of _0x8f725a){const _0xdc8b8b=_0x541094[_0x4d9a39(0x249)][_0x4d9a39(0x8fc)][_0x4d9a39(0x65c)][_0x4fcce7],_0x446a91=_0x4d9a39(0x371)[_0x4d9a39(0x5a0)](_0x4fcce7);for(const _0x41c46f of _0xdc8b8b){_0x4ffbb8[_0x4d9a39(0x723)](_0x446a91,_0x41c46f);}}}}catch(_0x2f73d0){if(_0x4d9a39(0x62e)===_0x4d9a39(0x201)){const _0x5435ab=this[_0x4d9a39(0x3d2)],_0x3b9ac3=this['_viewportSize'],_0x48055c=this['_animation'][_0x4d9a39(0x83d)]*(this[_0x4d9a39(0x748)]?-0x1:0x1)-_0x5435ab/0x2,_0x5cc425=this['_animation'][_0x4d9a39(0x6db)]-_0x3b9ac3/0x2,_0x714c5b=this[_0x4d9a39(0x4af)](_0x5270b5);_0x3408d4['gl'][_0x4d9a39(0x87f)](_0x48055c+_0x714c5b['x'],_0x5cc425+_0x714c5b['y'],_0x5435ab,_0x3b9ac3);}else{if($gameTemp[_0x4d9a39(0x4f7)]())console['log'](_0x2f73d0);}}},Game_Player[_0x2bd3fa(0x77c)][_0x2bd3fa(0x789)]=function(){const _0x43b6f0=_0x2bd3fa,_0x2b0a2c=$gameMap[_0x43b6f0(0x414)]();this[_0x43b6f0(0x797)]=Math[_0x43b6f0(0x5ac)](_0x2b0a2c)+Math[_0x43b6f0(0x5ac)](_0x2b0a2c)+this['encounterStepsMinimum']();},Game_Player[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6b1)]=function(){const _0x51f3b6=_0x2bd3fa;return $dataMap&&$dataMap[_0x51f3b6(0x377)]&&$dataMap[_0x51f3b6(0x377)][_0x51f3b6(0x306)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x51f3b6(0x249)][_0x51f3b6(0x8fc)]['QoL']['EncounterRateMinimum'];},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x3b6)]=Game_Event[_0x2bd3fa(0x77c)][_0x2bd3fa(0x17e)],Game_Event[_0x2bd3fa(0x77c)]['isCollidedWithEvents']=function(_0x194a3d,_0x4b3f64){const _0x308dfc=_0x2bd3fa;if(this[_0x308dfc(0x4dc)]())return this['checkSmartEventCollision'](_0x194a3d,_0x4b3f64);else{if(_0x308dfc(0x804)!==_0x308dfc(0x7a4))return VisuMZ['CoreEngine']['Game_Event_isCollidedWithEvents'][_0x308dfc(0x1f7)](this,_0x194a3d,_0x4b3f64);else{this[_0x308dfc(0x468)]=_0x5d4487[_0x308dfc(0x7a5)];let _0x4f09bc=_0x3a9d4a['fromCharCode'](_0x51cdc0['charCode']);this[_0x308dfc(0x71f)]===_0x383fdd?this[_0x308dfc(0x71f)]=_0x4f09bc:this['_inputString']+=_0x4f09bc;}}},Game_Event[_0x2bd3fa(0x77c)]['isSmartEventCollisionOn']=function(){const _0x1ace11=_0x2bd3fa;return VisuMZ[_0x1ace11(0x249)][_0x1ace11(0x8fc)]['QoL'][_0x1ace11(0x50f)];},Game_Event['prototype']['checkSmartEventCollision']=function(_0x564ed2,_0x4bf63e){const _0x5beb7a=_0x2bd3fa;if(!this[_0x5beb7a(0x825)]())return![];else{const _0x9c4ef5=$gameMap[_0x5beb7a(0x7ff)](_0x564ed2,_0x4bf63e)['filter'](_0x27ed9c=>_0x27ed9c['isNormalPriority']());return _0x9c4ef5[_0x5beb7a(0x7e1)]>0x0;}},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x4d7)]=Game_Interpreter['prototype'][_0x2bd3fa(0x2ee)],Game_Interpreter[_0x2bd3fa(0x77c)][_0x2bd3fa(0x2ee)]=function(_0x2b3637){const _0x32c62f=_0x2bd3fa,_0x5a0a8b=this[_0x32c62f(0x951)]();return _0x5a0a8b[_0x32c62f(0x306)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x32c62f(0x7a3)](_0x5a0a8b):VisuMZ[_0x32c62f(0x249)][_0x32c62f(0x4d7)][_0x32c62f(0x1f7)](this,_0x2b3637);},Game_Interpreter[_0x2bd3fa(0x77c)]['getCombinedScrollingText']=function(){const _0x20ddfa=_0x2bd3fa;let _0x1a0f7a='',_0x2087e8=this[_0x20ddfa(0x442)]+0x1;while(this[_0x20ddfa(0x5eb)][_0x2087e8]&&this[_0x20ddfa(0x5eb)][_0x2087e8][_0x20ddfa(0x64d)]===0x195){_0x20ddfa(0x1fe)!==_0x20ddfa(0x1fe)?this[_0x20ddfa(0x596)](_0x20ddfa(0x42f)):(_0x1a0f7a+=this[_0x20ddfa(0x5eb)][_0x2087e8]['parameters'][0x0]+'\x0a',_0x2087e8++);}return _0x1a0f7a;},Game_Interpreter['prototype']['runCombinedScrollingTextAsCode']=function(_0x55a28f){const _0x283776=_0x2bd3fa;try{eval(_0x55a28f);}catch(_0x8a996d){if($gameTemp[_0x283776(0x4f7)]()){if(_0x283776(0x7e7)!==_0x283776(0x7e7))return _0x58afb0[_0x283776(0x249)][_0x283776(0x8fc)][_0x283776(0x45a)][_0x283776(0x299)];else console[_0x283776(0x253)](_0x283776(0x25b)),console['log'](_0x8a996d);}}return!![];},VisuMZ[_0x2bd3fa(0x249)]['Game_Interpreter_command111']=Game_Interpreter['prototype'][_0x2bd3fa(0x8e0)],Game_Interpreter[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8e0)]=function(_0x194e98){const _0x4eba2c=_0x2bd3fa;try{VisuMZ[_0x4eba2c(0x249)]['Game_Interpreter_command111'][_0x4eba2c(0x1f7)](this,_0x194e98);}catch(_0x5a9bed){$gameTemp[_0x4eba2c(0x4f7)]()&&(_0x4eba2c(0x46d)===_0x4eba2c(0x46d)?(console[_0x4eba2c(0x253)]('Conditional\x20Branch\x20Script\x20Error'),console[_0x4eba2c(0x253)](_0x5a9bed)):(_0x21ca3c+=_0x2937f2,_0xb2abe3+=_0x1e0178,_0x444b80+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'[_0x4eba2c(0x5a0)](_0x13ac0a['id'],_0x374103[_0x4eba2c(0x87a)]),_0x305323+=_0xc12f07,_0x328443+=_0x2634b8,_0x318f1a+=_0x3a166d,_0x55c83c+=_0x4eba2c(0x3e4)[_0x4eba2c(0x5a0)](_0x6c4ebc['id'],_0x356cfe[_0x4eba2c(0x87a)]),_0x224894+=_0x774e62)),this[_0x4eba2c(0x758)]();}return!![];},VisuMZ[_0x2bd3fa(0x249)]['Game_Interpreter_command122']=Game_Interpreter[_0x2bd3fa(0x77c)][_0x2bd3fa(0x944)],Game_Interpreter[_0x2bd3fa(0x77c)][_0x2bd3fa(0x944)]=function(_0xac2fd2){const _0x1bb3ca=_0x2bd3fa;try{'hBwsY'==='hBwsY'?VisuMZ['CoreEngine'][_0x1bb3ca(0x5d1)][_0x1bb3ca(0x1f7)](this,_0xac2fd2):this[_0x1bb3ca(0x969)](0x0);}catch(_0x72c4a7){$gameTemp['isPlaytest']()&&(_0x1bb3ca(0x285)!=='JvMac'?_0x4cc67b[_0x1bb3ca(0x249)]['Sprite_Actor_setActorHome'][_0x1bb3ca(0x1f7)](this,_0x509ad1):(console[_0x1bb3ca(0x253)](_0x1bb3ca(0x66d)),console[_0x1bb3ca(0x253)](_0x72c4a7)));}return!![];},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x808)]=Game_Interpreter['prototype'][_0x2bd3fa(0x2ec)],Game_Interpreter[_0x2bd3fa(0x77c)][_0x2bd3fa(0x2ec)]=function(){const _0x1d6991=_0x2bd3fa;try{VisuMZ[_0x1d6991(0x249)]['Game_Interpreter_command355'][_0x1d6991(0x1f7)](this);}catch(_0xe023fa){$gameTemp[_0x1d6991(0x4f7)]()&&(console[_0x1d6991(0x253)](_0x1d6991(0x5ff)),console['log'](_0xe023fa));}return!![];},VisuMZ[_0x2bd3fa(0x249)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6aa)],Game_Interpreter['prototype'][_0x2bd3fa(0x6aa)]=function(_0x47cb9b){const _0x38a905=_0x2bd3fa;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x38a905(0x249)]['Game_Interpreter_PluginCommand']['call'](this,_0x47cb9b);},Scene_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x62b)]=function(){const _0x56acbf=_0x2bd3fa;return VisuMZ[_0x56acbf(0x249)][_0x56acbf(0x8fc)]['UI']['FadeSpeed'];},Scene_Base[_0x2bd3fa(0x77c)]['isBottomHelpMode']=function(){const _0x4cc0f2=_0x2bd3fa;return VisuMZ[_0x4cc0f2(0x249)]['Settings']['UI']['BottomHelp'];},Scene_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x3c8)]=function(){const _0x20a31f=_0x2bd3fa;return VisuMZ[_0x20a31f(0x249)][_0x20a31f(0x8fc)]['UI'][_0x20a31f(0x287)];},Scene_Base['prototype'][_0x2bd3fa(0x936)]=function(){const _0x2d2cec=_0x2bd3fa;return VisuMZ['CoreEngine'][_0x2d2cec(0x8fc)]['UI']['RightMenus'];},Scene_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x650)]=function(){const _0x2059e2=_0x2bd3fa;return VisuMZ[_0x2059e2(0x249)][_0x2059e2(0x8fc)]['UI'][_0x2059e2(0x82b)];},Scene_Base[_0x2bd3fa(0x77c)]['buttonAreaHeight']=function(){const _0x2a4ddc=_0x2bd3fa;return VisuMZ['CoreEngine'][_0x2a4ddc(0x8fc)]['UI'][_0x2a4ddc(0x260)];},Scene_Base['prototype']['isWindowMaskingEnabled']=function(){const _0x118e77=_0x2bd3fa;return VisuMZ['CoreEngine'][_0x118e77(0x8fc)]['Window'][_0x118e77(0x299)];},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x697)]=Scene_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x61c)],Scene_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x61c)]=function(){const _0x1a3cee=_0x2bd3fa;VisuMZ['CoreEngine']['Scene_Base_createWindowLayer'][_0x1a3cee(0x1f7)](this),this['createButtonAssistWindow'](),this['_windowLayer']['x']=Math[_0x1a3cee(0x18a)](this[_0x1a3cee(0x721)]['x']),this[_0x1a3cee(0x721)]['y']=Math[_0x1a3cee(0x18a)](this[_0x1a3cee(0x721)]['y']);},Scene_Base[_0x2bd3fa(0x77c)]['createButtonAssistWindow']=function(){},Scene_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5e5)]=function(){const _0x152e53=_0x2bd3fa;return TextManager['getInputMultiButtonStrings']('pageup',_0x152e53(0x1b0));},Scene_Base[_0x2bd3fa(0x77c)]['buttonAssistKey2']=function(){const _0x113580=_0x2bd3fa;return TextManager[_0x113580(0x855)](_0x113580(0x7ae));},Scene_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8af)]=function(){const _0x489a01=_0x2bd3fa;return TextManager[_0x489a01(0x855)](_0x489a01(0x45b));},Scene_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x890)]=function(){const _0x8f2e51=_0x2bd3fa;return TextManager[_0x8f2e51(0x855)]('ok');},Scene_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4ad)]=function(){return TextManager['getInputButtonString']('cancel');},Scene_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x7bf)]=function(){const _0x402060=_0x2bd3fa;return this[_0x402060(0x44c)]&&this[_0x402060(0x44c)][_0x402060(0x463)]?TextManager[_0x402060(0x594)]:'';},Scene_Base['prototype'][_0x2bd3fa(0x3cc)]=function(){return'';},Scene_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x35a)]=function(){return'';},Scene_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x71e)]=function(){return TextManager['buttonAssistOk'];},Scene_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x43a)]=function(){const _0x67fb15=_0x2bd3fa;return TextManager[_0x67fb15(0x28d)];},Scene_Base[_0x2bd3fa(0x77c)]['buttonAssistOffset1']=function(){return 0x0;},Scene_Base['prototype'][_0x2bd3fa(0x5d8)]=function(){return 0x0;},Scene_Base[_0x2bd3fa(0x77c)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0x2bd3fa(0x77c)]['buttonAssistOffset4']=function(){return 0x0;},Scene_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x716)]=function(){return 0x0;},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x7a1)]=Scene_Boot[_0x2bd3fa(0x77c)][_0x2bd3fa(0x7df)],Scene_Boot[_0x2bd3fa(0x77c)][_0x2bd3fa(0x7df)]=function(){const _0xfa6089=_0x2bd3fa;VisuMZ[_0xfa6089(0x249)][_0xfa6089(0x7a1)][_0xfa6089(0x1f7)](this),this[_0xfa6089(0x5ed)]();},Scene_Boot[_0x2bd3fa(0x77c)]['loadGameImagesCoreEngine']=function(){const _0x160019=_0x2bd3fa,_0x49f651=[_0x160019(0x1e9),_0x160019(0x820),_0x160019(0x754),'characters','enemies',_0x160019(0x582),_0x160019(0x826),_0x160019(0x746),'sv_actors',_0x160019(0x40c),_0x160019(0x21c),_0x160019(0x3b0),_0x160019(0x454),_0x160019(0x575)];for(const _0x3f4cd2 of _0x49f651){const _0x26d5b0=VisuMZ[_0x160019(0x249)][_0x160019(0x8fc)][_0x160019(0x65c)][_0x3f4cd2],_0x22ce05=_0x160019(0x371)[_0x160019(0x5a0)](_0x3f4cd2);for(const _0x317b54 of _0x26d5b0){ImageManager[_0x160019(0x723)](_0x22ce05,_0x317b54);}}},VisuMZ['CoreEngine'][_0x2bd3fa(0x965)]=Scene_Boot[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4d4)],Scene_Boot['prototype'][_0x2bd3fa(0x4d4)]=function(){const _0x4c0af3=_0x2bd3fa;Utils[_0x4c0af3(0x254)](_0x4c0af3(0x6ad))&&VisuMZ[_0x4c0af3(0x249)]['Settings'][_0x4c0af3(0x762)][_0x4c0af3(0x6f2)]?this[_0x4c0af3(0x2e6)]():_0x4c0af3(0x89a)==='JSXnP'?VisuMZ['CoreEngine']['Scene_Boot_startNormalGame']['call'](this):(_0x3d1851+=this['_list'][_0x22420b][_0x4c0af3(0x614)][0x0]+'\x0a',_0x4fd648++);},Scene_Boot[_0x2bd3fa(0x77c)][_0x2bd3fa(0x2e6)]=function(){const _0x13206e=_0x2bd3fa;DataManager[_0x13206e(0x41e)](),SceneManager[_0x13206e(0x871)](Scene_Map);},Scene_Boot[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8df)]=function(){const _0x183b8f=_0x2bd3fa,_0x23ecba=$dataSystem[_0x183b8f(0x75b)][_0x183b8f(0x7ea)],_0x8d5b28=$dataSystem[_0x183b8f(0x75b)][_0x183b8f(0x214)],_0x340639=VisuMZ['CoreEngine']['Settings']['UI']['BoxMargin'];Graphics[_0x183b8f(0x88d)]=_0x23ecba-_0x340639*0x2,Graphics[_0x183b8f(0x6d2)]=_0x8d5b28-_0x340639*0x2,this[_0x183b8f(0x4b0)]();},VisuMZ['CoreEngine'][_0x2bd3fa(0x520)]=Scene_Boot[_0x2bd3fa(0x77c)]['updateDocumentTitle'],Scene_Boot[_0x2bd3fa(0x77c)][_0x2bd3fa(0x880)]=function(){const _0x46ade6=_0x2bd3fa;if(this['isFullDocumentTitle']()){if(_0x46ade6(0x4e4)!==_0x46ade6(0x4d1))this[_0x46ade6(0x24e)]();else{if(!_0x11d016[_0x46ade6(0x4f7)]())return;if(!_0x1af0b0[_0x46ade6(0x481)]())return;_0x36ac29[_0x46ade6(0x7d8)]['_active']=![],_0x50263b[_0x46ade6(0x249)][_0x46ade6(0x708)]();}}else VisuMZ[_0x46ade6(0x249)][_0x46ade6(0x520)][_0x46ade6(0x1f7)](this);},Scene_Boot[_0x2bd3fa(0x77c)][_0x2bd3fa(0x601)]=function(){const _0x11d0bf=_0x2bd3fa;if(Scene_Title[_0x11d0bf(0x897)]==='')return![];if(Scene_Title[_0x11d0bf(0x897)]===_0x11d0bf(0x8d0))return![];if(Scene_Title[_0x11d0bf(0x5f8)]==='')return![];if(Scene_Title[_0x11d0bf(0x5f8)]===_0x11d0bf(0x341))return![];return!![];},Scene_Boot['prototype'][_0x2bd3fa(0x24e)]=function(){const _0x3d5c8b=_0x2bd3fa,_0x4dc76d=$dataSystem[_0x3d5c8b(0x302)],_0x237a0b=Scene_Title[_0x3d5c8b(0x897)]||'',_0x560734=Scene_Title[_0x3d5c8b(0x5f8)]||'',_0x64c6c=VisuMZ['CoreEngine']['Settings'][_0x3d5c8b(0x6de)][_0x3d5c8b(0x5f0)][_0x3d5c8b(0x3b7)],_0x260bdc=_0x64c6c[_0x3d5c8b(0x5a0)](_0x4dc76d,_0x237a0b,_0x560734);document[_0x3d5c8b(0x540)]=_0x260bdc;},Scene_Boot[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4b0)]=function(){const _0x354db1=_0x2bd3fa;if(VisuMZ['CoreEngine'][_0x354db1(0x8fc)]['UI']['SideButtons']){if(_0x354db1(0x8f3)===_0x354db1(0x8f3)){const _0x501893=Graphics[_0x354db1(0x73f)]-Graphics[_0x354db1(0x88d)]-VisuMZ[_0x354db1(0x249)]['Settings']['UI'][_0x354db1(0x882)]*0x2,_0x588d1f=Sprite_Button[_0x354db1(0x77c)][_0x354db1(0x907)]['call'](this)*0x4;if(_0x501893>=_0x588d1f)SceneManager['setSideButtonLayout'](!![]);}else this[_0x354db1(0x949)]('Linear'),this[_0x354db1(0x3f3)]=_0xcfd916;}},Scene_Title[_0x2bd3fa(0x897)]=VisuMZ['CoreEngine'][_0x2bd3fa(0x8fc)][_0x2bd3fa(0x6de)][_0x2bd3fa(0x5f0)][_0x2bd3fa(0x8d0)],Scene_Title[_0x2bd3fa(0x5f8)]=VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x8fc)]['MenuLayout']['Title']['Version'],Scene_Title[_0x2bd3fa(0x70a)]=VisuMZ['CoreEngine']['Settings'][_0x2bd3fa(0x21a)],VisuMZ['CoreEngine'][_0x2bd3fa(0x90c)]=Scene_Title['prototype'][_0x2bd3fa(0x79a)],Scene_Title['prototype'][_0x2bd3fa(0x79a)]=function(){const _0x126259=_0x2bd3fa;VisuMZ[_0x126259(0x249)][_0x126259(0x8fc)][_0x126259(0x6de)][_0x126259(0x5f0)][_0x126259(0x79a)]['call'](this);if(Scene_Title['subtitle']!==''&&Scene_Title['subtitle']!==_0x126259(0x8d0))this[_0x126259(0x3df)]();if(Scene_Title[_0x126259(0x5f8)]!==''&&Scene_Title[_0x126259(0x5f8)]!==_0x126259(0x341))this[_0x126259(0x194)]();},Scene_Title[_0x2bd3fa(0x77c)][_0x2bd3fa(0x3df)]=function(){const _0x996f2b=_0x2bd3fa;VisuMZ[_0x996f2b(0x249)][_0x996f2b(0x8fc)]['MenuLayout'][_0x996f2b(0x5f0)][_0x996f2b(0x3df)][_0x996f2b(0x1f7)](this);},Scene_Title[_0x2bd3fa(0x77c)]['drawGameVersion']=function(){const _0x2cb6d0=_0x2bd3fa;VisuMZ[_0x2cb6d0(0x249)][_0x2cb6d0(0x8fc)][_0x2cb6d0(0x6de)][_0x2cb6d0(0x5f0)][_0x2cb6d0(0x194)][_0x2cb6d0(0x1f7)](this);},Scene_Title[_0x2bd3fa(0x77c)]['createCommandWindow']=function(){const _0x57f5d9=_0x2bd3fa;this[_0x57f5d9(0x44a)]();const _0x1dd0e4=$dataSystem[_0x57f5d9(0x2d7)]['background'],_0x4abbce=this[_0x57f5d9(0x93b)]();this[_0x57f5d9(0x364)]=new Window_TitleCommand(_0x4abbce),this[_0x57f5d9(0x364)]['setBackgroundType'](_0x1dd0e4);const _0x4ac896=this[_0x57f5d9(0x93b)]();this[_0x57f5d9(0x364)][_0x57f5d9(0x1a1)](_0x4ac896['x'],_0x4ac896['y'],_0x4ac896[_0x57f5d9(0x73f)],_0x4ac896['height']),this[_0x57f5d9(0x5a9)](this[_0x57f5d9(0x364)]);},Scene_Title[_0x2bd3fa(0x77c)][_0x2bd3fa(0x2f6)]=function(){const _0x1adbc1=_0x2bd3fa;if(this[_0x1adbc1(0x364)]){if('qUGbp'===_0x1adbc1(0x316))return this[_0x1adbc1(0x364)]['maxItems']();else var _0x15dfdf=_0x2b8a2d[_0x1adbc1(0x616)](_0x16f24c*0x2,_0x1adbc1(0x416))*0.5;}else return _0x1adbc1(0x34a)===_0x1adbc1(0x2b9)?_0x3b92d5[_0x1adbc1(0x249)]['Settings'][_0x1adbc1(0x394)][_0x1adbc1(0x7e9)]['call'](this,_0x32f397):VisuMZ[_0x1adbc1(0x249)][_0x1adbc1(0x8fc)][_0x1adbc1(0x1c6)][_0x1adbc1(0x7e1)];},Scene_Title[_0x2bd3fa(0x77c)]['commandWindowRect']=function(){const _0x1cc970=_0x2bd3fa;return VisuMZ[_0x1cc970(0x249)][_0x1cc970(0x8fc)][_0x1cc970(0x6de)]['Title']['CommandRect'][_0x1cc970(0x1f7)](this);},Scene_Title['prototype'][_0x2bd3fa(0x44a)]=function(){const _0x134064=_0x2bd3fa;for(const _0x1cf438 of Scene_Title[_0x134064(0x70a)]){const _0x484f72=new Sprite_TitlePictureButton(_0x1cf438);this[_0x134064(0x6b6)](_0x484f72);}},VisuMZ[_0x2bd3fa(0x249)]['Scene_Map_initialize']=Scene_Map['prototype']['initialize'],Scene_Map['prototype'][_0x2bd3fa(0x4d6)]=function(){const _0x5ca949=_0x2bd3fa;VisuMZ[_0x5ca949(0x249)][_0x5ca949(0x477)][_0x5ca949(0x1f7)](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),this[_0x5ca949(0x8ca)]();},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x7b7)]=Scene_Map['prototype'][_0x2bd3fa(0x841)],Scene_Map[_0x2bd3fa(0x77c)][_0x2bd3fa(0x841)]=function(){const _0x50c082=_0x2bd3fa;VisuMZ[_0x50c082(0x249)][_0x50c082(0x7b7)][_0x50c082(0x1f7)](this);if($gameTemp['_playTestFastMode']&&!$gameMessage[_0x50c082(0x892)]()){if(_0x50c082(0x241)==='Olhnz')this[_0x50c082(0x2ed)](),SceneManager['updateEffekseer']();else{let _0x2882e2=_0x129ae3[_0x50c082(0x6fe)](_0x2b9214)[_0x50c082(0x401)]();this[_0x50c082(0x693)]()&&(_0x2882e2=_0x5b32c3[_0x50c082(0x862)](_0x2882e2));const _0x441a6a=this[_0x50c082(0x66b)](),_0x529d14=_0x48ac82[_0x50c082(0x7a0)](_0x441a6a*0.75);for(let _0x238227=0x0;_0x238227<_0x2882e2[_0x50c082(0x7e1)];_0x238227++){const _0x56b09d=this[_0x50c082(0x81b)](_0x529d14,_0x441a6a);_0x56b09d[_0x50c082(0x44e)][_0x50c082(0x1af)](_0x2882e2[_0x238227],0x0,0x0,_0x529d14,_0x441a6a,'center'),_0x56b09d['x']=(_0x238227-(_0x2882e2[_0x50c082(0x7e1)]-0x1)/0x2)*_0x529d14,_0x56b09d['dy']=-_0x238227;}}}},Scene_Map[_0x2bd3fa(0x77c)]['terminate']=function(){const _0x583e13=_0x2bd3fa;Scene_Message[_0x583e13(0x77c)][_0x583e13(0x6b0)][_0x583e13(0x1f7)](this),!SceneManager[_0x583e13(0x57e)](Scene_Battle)&&('FSIBB'!==_0x583e13(0x740)?(this['_spriteset'][_0x583e13(0x859)](),this['_mapNameWindow'][_0x583e13(0x4c7)](),this[_0x583e13(0x721)]['visible']=![],SceneManager[_0x583e13(0x284)]()):(_0x2b5bb5[_0x583e13(0x249)]['Game_Picture_initBasic'][_0x583e13(0x1f7)](this),this[_0x583e13(0x1c4)]={'x':0x0,'y':0x0},this[_0x583e13(0x187)]={'x':0x0,'y':0x0})),$gameScreen['clearZoom'](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x2bd3fa(0x249)]['Scene_Map_createMenuButton']=Scene_Map['prototype'][_0x2bd3fa(0x2ce)],Scene_Map[_0x2bd3fa(0x77c)]['createMenuButton']=function(){const _0x16998b=_0x2bd3fa;VisuMZ[_0x16998b(0x249)]['Scene_Map_createMenuButton'][_0x16998b(0x1f7)](this),SceneManager['isSideButtonLayout']()&&(_0x16998b(0x91b)===_0x16998b(0x24c)?this[_0x16998b(0x1fc)]():this[_0x16998b(0x744)]());},Scene_Map['prototype'][_0x2bd3fa(0x744)]=function(){const _0x433fb2=_0x2bd3fa;this['_menuButton']['x']=Graphics[_0x433fb2(0x88d)]+0x4;},VisuMZ[_0x2bd3fa(0x249)]['Scene_Map_updateScene']=Scene_Map[_0x2bd3fa(0x77c)][_0x2bd3fa(0x840)],Scene_Map[_0x2bd3fa(0x77c)][_0x2bd3fa(0x840)]=function(){const _0x13cbf2=_0x2bd3fa;VisuMZ[_0x13cbf2(0x249)][_0x13cbf2(0x1d5)][_0x13cbf2(0x1f7)](this),this[_0x13cbf2(0x4f3)](),this[_0x13cbf2(0x516)]();},Scene_Map['prototype']['updateDashToggle']=function(){const _0x3753d2=_0x2bd3fa;Input['isTriggered'](_0x3753d2(0x1bd))&&(_0x3753d2(0x1b3)===_0x3753d2(0x4c5)?_0x4be2bc['loadBitmap'](_0x588dc9,_0x71a2e9):(ConfigManager[_0x3753d2(0x844)]=!ConfigManager[_0x3753d2(0x844)],ConfigManager['save']()));},Scene_Map['prototype']['clearOnceParallelInterpreters']=function(){this['_onceParallelInterpreters']=[];},Scene_Map['prototype'][_0x2bd3fa(0x516)]=function(){const _0x385967=_0x2bd3fa;if(!this['_onceParallelInterpreters'])return;for(const _0x320cd2 of this[_0x385967(0x519)]){if(_0x385967(0x5cc)!==_0x385967(0x544)){if(_0x320cd2){if(_0x385967(0x77f)==='OKzDD'){var _0x48ff9e=_0xcffdba(_0x41c452['$1']);try{_0x38de6f+=_0x4a5345(_0x48ff9e);}catch(_0x4d1ffd){if(_0x4d72d2['isPlaytest']())_0x2d11e3[_0x385967(0x253)](_0x4d1ffd);}}else _0x320cd2[_0x385967(0x859)]();}}else return _0x5418d2['CoreEngine'][_0x385967(0x8fc)]['Color']['ItemBackColor2'];}},Scene_Map['prototype'][_0x2bd3fa(0x307)]=function(_0x50ddf1){const _0xcb3d3a=$dataCommonEvents[_0x50ddf1];if(!_0xcb3d3a)return;const _0x76ed53=new Game_OnceParallelInterpreter();this['addOnceParallelInterpreter'](_0x76ed53),_0x76ed53['setCommonEvent'](_0x50ddf1);},Scene_Map[_0x2bd3fa(0x77c)][_0x2bd3fa(0x715)]=function(_0x196496){const _0x12abaa=_0x2bd3fa;this[_0x12abaa(0x519)]=this[_0x12abaa(0x519)]||[],this[_0x12abaa(0x519)][_0x12abaa(0x599)](_0x196496);},Scene_Map['prototype'][_0x2bd3fa(0x264)]=function(_0x5961a5){const _0x58261c=_0x2bd3fa;this[_0x58261c(0x519)]=this[_0x58261c(0x519)]||[],this[_0x58261c(0x519)][_0x58261c(0x774)](_0x5961a5);};function Game_OnceParallelInterpreter(){const _0x1a36ed=_0x2bd3fa;this[_0x1a36ed(0x4d6)](...arguments);}function _0x4271(_0x4be006,_0x86a499){const _0x488110=_0x4881();return _0x4271=function(_0x42713d,_0x180989){_0x42713d=_0x42713d-0x16e;let _0x44df02=_0x488110[_0x42713d];return _0x44df02;},_0x4271(_0x4be006,_0x86a499);}Game_OnceParallelInterpreter[_0x2bd3fa(0x77c)]=Object[_0x2bd3fa(0x5e4)](Game_Interpreter[_0x2bd3fa(0x77c)]),Game_OnceParallelInterpreter[_0x2bd3fa(0x77c)][_0x2bd3fa(0x482)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5ce)]=function(_0x1716a1){const _0x3bb4e5=_0x2bd3fa,_0xa62a48=$dataCommonEvents[_0x1716a1];_0xa62a48?this[_0x3bb4e5(0x26e)](_0xa62a48[_0x3bb4e5(0x94e)],0x0):this['terminate']();},Game_OnceParallelInterpreter[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6b0)]=function(){const _0x46e086=_0x2bd3fa;if(!SceneManager['isSceneMap']())return;SceneManager[_0x46e086(0x7d8)][_0x46e086(0x264)](this),Game_Interpreter['prototype'][_0x46e086(0x6b0)][_0x46e086(0x1f7)](this);},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x8d4)]=Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x55e)],Scene_MenuBase[_0x2bd3fa(0x77c)]['helpAreaTop']=function(){const _0x31bc31=_0x2bd3fa;let _0xe016f0=0x0;if(SceneManager[_0x31bc31(0x2cb)]())_0x31bc31(0x8cf)===_0x31bc31(0x8cf)?_0xe016f0=this['helpAreaTopSideButtonLayout']():this[_0x31bc31(0x752)]='SV';else{if(_0x31bc31(0x2fc)!=='wYfzi')try{_0x1ff6fa[_0x31bc31(0x249)][_0x31bc31(0x1b7)][_0x31bc31(0x1f7)](this,_0x37774c);}catch(_0x459f3c){if(_0x281803['isPlaytest']())_0x4dd262[_0x31bc31(0x253)](_0x459f3c);}else _0xe016f0=VisuMZ['CoreEngine']['Scene_MenuBase_helpAreaTop'][_0x31bc31(0x1f7)](this);}if(this[_0x31bc31(0x8ef)]()&&this[_0x31bc31(0x57f)]()===_0x31bc31(0x6f3)){if(_0x31bc31(0x942)!==_0x31bc31(0x5cd))_0xe016f0+=Window_ButtonAssist[_0x31bc31(0x77c)][_0x31bc31(0x4fb)]();else return _0x40403b['prototype']['buttonAssistText1']['call'](this);}return _0xe016f0;},Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1b1)]=function(){const _0xde5ff7=_0x2bd3fa;return this['isBottomHelpMode']()?this[_0xde5ff7(0x28c)]():0x0;},VisuMZ['CoreEngine'][_0x2bd3fa(0x95f)]=Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8ea)],Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8ea)]=function(){const _0x25fc32=_0x2bd3fa;return SceneManager[_0x25fc32(0x2cb)]()?this[_0x25fc32(0x483)]():VisuMZ[_0x25fc32(0x249)]['Scene_MenuBase_mainAreaTop'][_0x25fc32(0x1f7)](this);},Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x483)]=function(){const _0x43e906=_0x2bd3fa;if(!this['isBottomHelpMode']())return this[_0x43e906(0x89b)]();else{if(_0x43e906(0x51b)==='XueGk')return 0x0;else this[_0x43e906(0x243)]['update'](),this[_0x43e906(0x184)][_0x43e906(0x4c7)](),this[_0x43e906(0x721)][_0x43e906(0x463)]=![],_0x19fa13[_0x43e906(0x284)]();}},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x22e)]=Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x71b)],Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x71b)]=function(){const _0x1fb4af=_0x2bd3fa;let _0x5cae77=0x0;if(SceneManager[_0x1fb4af(0x2cb)]())_0x5cae77=this['mainAreaHeightSideButtonLayout']();else{if('GADSU'!=='QXgog')_0x5cae77=VisuMZ[_0x1fb4af(0x249)]['Scene_MenuBase_mainAreaHeight'][_0x1fb4af(0x1f7)](this);else return _0x410366[_0x1fb4af(0x249)][_0x1fb4af(0x8fc)][_0x1fb4af(0x220)][_0x1fb4af(0x348)];}return this[_0x1fb4af(0x8ef)]()&&this[_0x1fb4af(0x57f)]()!==_0x1fb4af(0x4f4)&&(_0x1fb4af(0x202)!==_0x1fb4af(0x202)?this[_0x1fb4af(0x44e)]['destroy']():_0x5cae77-=Window_ButtonAssist[_0x1fb4af(0x77c)][_0x1fb4af(0x4fb)]()),_0x5cae77;},Scene_MenuBase[_0x2bd3fa(0x77c)]['mainAreaHeightSideButtonLayout']=function(){const _0x559f1f=_0x2bd3fa;return Graphics['boxHeight']-this[_0x559f1f(0x363)]();},VisuMZ['CoreEngine'][_0x2bd3fa(0x634)]=Scene_MenuBase['prototype'][_0x2bd3fa(0x17f)],Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x17f)]=function(){const _0x503602=_0x2bd3fa;this[_0x503602(0x630)]=new PIXI[(_0x503602(0x80c))][(_0x503602(0x2bb))](clamp=!![]),this[_0x503602(0x2a1)]=new Sprite(),this[_0x503602(0x2a1)]['bitmap']=SceneManager[_0x503602(0x8d7)](),this['_backgroundSprite']['filters']=[this[_0x503602(0x630)]],this['addChild'](this[_0x503602(0x2a1)]),this[_0x503602(0x4cb)](0xc0),this[_0x503602(0x4cb)](this[_0x503602(0x7c6)]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x7c6)]=function(){const _0x4ecc39=_0x2bd3fa,_0x18bcfa=String(this[_0x4ecc39(0x482)][_0x4ecc39(0x87a)]),_0xbab01c=this[_0x4ecc39(0x4e8)](_0x18bcfa);return _0xbab01c?_0xbab01c[_0x4ecc39(0x29a)]:0xc0;},Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4c1)]=function(){const _0xa3eab7=_0x2bd3fa,_0x22f72c=String(this['constructor']['name']),_0x31be14=this[_0xa3eab7(0x4e8)](_0x22f72c);if(_0x31be14&&(_0x31be14[_0xa3eab7(0x446)]!==''||_0x31be14[_0xa3eab7(0x224)]!=='')){if(_0xa3eab7(0x1fd)!=='BBMXR')return _0x3a2e97[_0xa3eab7(0x249)][_0xa3eab7(0x8fc)][_0xa3eab7(0x45a)][_0xa3eab7(0x263)];else this[_0xa3eab7(0x69b)]=new Sprite(ImageManager['loadTitle1'](_0x31be14[_0xa3eab7(0x446)])),this[_0xa3eab7(0x916)]=new Sprite(ImageManager[_0xa3eab7(0x7f3)](_0x31be14[_0xa3eab7(0x224)])),this[_0xa3eab7(0x6b6)](this[_0xa3eab7(0x69b)]),this[_0xa3eab7(0x6b6)](this[_0xa3eab7(0x916)]),this[_0xa3eab7(0x69b)][_0xa3eab7(0x44e)][_0xa3eab7(0x687)](this[_0xa3eab7(0x788)][_0xa3eab7(0x174)](this,this[_0xa3eab7(0x69b)])),this[_0xa3eab7(0x916)]['bitmap'][_0xa3eab7(0x687)](this[_0xa3eab7(0x788)][_0xa3eab7(0x174)](this,this[_0xa3eab7(0x916)]));}},Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4e8)]=function(_0x1b065e){const _0x48b6dc=_0x2bd3fa;return VisuMZ[_0x48b6dc(0x249)]['Settings']['MenuBg'][_0x1b065e]||VisuMZ[_0x48b6dc(0x249)][_0x48b6dc(0x8fc)][_0x48b6dc(0x251)][_0x48b6dc(0x408)];},Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x788)]=function(_0x69eec6){const _0x3b0ff3=_0x2bd3fa;this['scaleSprite'](_0x69eec6),this[_0x3b0ff3(0x78c)](_0x69eec6);},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x1d7)]=Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4be)],Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4be)]=function(){const _0x59cf7e=_0x2bd3fa;VisuMZ['CoreEngine']['Scene_MenuBase_createCancelButton']['call'](this),SceneManager[_0x59cf7e(0x4a8)]()&&this[_0x59cf7e(0x937)]();},Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x937)]=function(){const _0x143cfd=_0x2bd3fa;this[_0x143cfd(0x3fc)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x702)]=Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8ff)],Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8ff)]=function(){const _0x5e8629=_0x2bd3fa;VisuMZ[_0x5e8629(0x249)]['Scene_MenuBase_createPageButtons'][_0x5e8629(0x1f7)](this),SceneManager['isSideButtonLayout']()&&this[_0x5e8629(0x851)]();},Scene_MenuBase['prototype']['movePageButtonSideButtonLayout']=function(){const _0x1df7db=_0x2bd3fa;this[_0x1df7db(0x44c)]['x']=-0x1*(this[_0x1df7db(0x44c)][_0x1df7db(0x73f)]+this['_pagedownButton'][_0x1df7db(0x73f)]+0x8),this[_0x1df7db(0x3b3)]['x']=-0x1*(this[_0x1df7db(0x3b3)][_0x1df7db(0x73f)]+0x4);},Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8ef)]=function(){const _0x4c0f31=_0x2bd3fa;return VisuMZ[_0x4c0f31(0x249)]['Settings'][_0x4c0f31(0x220)]['Enable'];},Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x57f)]=function(){const _0x5c7601=_0x2bd3fa;if(SceneManager[_0x5c7601(0x4a8)]()||SceneManager['areButtonsHidden']()){if(_0x5c7601(0x940)!==_0x5c7601(0x221))return VisuMZ[_0x5c7601(0x249)][_0x5c7601(0x8fc)]['ButtonAssist'][_0x5c7601(0x6d1)];else this['_helpWindow']['setBackgroundType'](_0x1b0573['layoutSettings'][_0x5c7601(0x6f7)]);}else return'button';},Scene_MenuBase[_0x2bd3fa(0x77c)]['createButtonAssistWindow']=function(){const _0x27b94c=_0x2bd3fa;if(!this[_0x27b94c(0x8ef)]())return;const _0x1dfbf9=this['buttonAssistWindowRect']();this[_0x27b94c(0x2ff)]=new Window_ButtonAssist(_0x1dfbf9),this['addWindow'](this[_0x27b94c(0x2ff)]);},Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6f9)]=function(){const _0x1ce0e1=_0x2bd3fa;return this[_0x1ce0e1(0x57f)]()===_0x1ce0e1(0x4f4)?this[_0x1ce0e1(0x90b)]():'kSXiQ'==='kSXiQ'?this[_0x1ce0e1(0x4b3)]():this[_0x1ce0e1(0x52d)]()['filter'](_0x36afc3=>this[_0x1ce0e1(0x763)](_0x36afc3)&&this[_0x1ce0e1(0x530)]()['includes'](_0x36afc3[_0x1ce0e1(0x222)]));},Scene_MenuBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x90b)]=function(){const _0x185bf5=_0x2bd3fa,_0x5a7591=ConfigManager[_0x185bf5(0x4a9)]?(Sprite_Button['prototype'][_0x185bf5(0x907)]()+0x6)*0x2:0x0,_0x36325d=this[_0x185bf5(0x963)](),_0x3a5cf4=Graphics['boxWidth']-_0x5a7591*0x2,_0x47387a=this[_0x185bf5(0x581)]();return new Rectangle(_0x5a7591,_0x36325d,_0x3a5cf4,_0x47387a);},Scene_MenuBase['prototype'][_0x2bd3fa(0x4b3)]=function(){const _0x5c36fc=_0x2bd3fa,_0x3527f1=Graphics[_0x5c36fc(0x88d)],_0x4ee4c5=Window_ButtonAssist[_0x5c36fc(0x77c)][_0x5c36fc(0x4fb)](),_0x32bf33=0x0;let _0x134ee4=0x0;return this[_0x5c36fc(0x57f)]()==='top'?_0x134ee4=0x0:_0x134ee4=Graphics[_0x5c36fc(0x6d2)]-_0x4ee4c5,new Rectangle(_0x32bf33,_0x134ee4,_0x3527f1,_0x4ee4c5);},Scene_Menu[_0x2bd3fa(0x6a0)]=VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x8fc)]['MenuLayout'][_0x2bd3fa(0x429)],VisuMZ[_0x2bd3fa(0x249)]['Scene_Menu_create']=Scene_Menu[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5e4)],Scene_Menu['prototype'][_0x2bd3fa(0x5e4)]=function(){const _0x5b2787=_0x2bd3fa;VisuMZ[_0x5b2787(0x249)][_0x5b2787(0x24b)][_0x5b2787(0x1f7)](this),this[_0x5b2787(0x34e)]();},Scene_Menu[_0x2bd3fa(0x77c)][_0x2bd3fa(0x34e)]=function(){const _0x4f7967=_0x2bd3fa;this['_commandWindow']&&this[_0x4f7967(0x364)][_0x4f7967(0x558)](Scene_Menu['layoutSettings'][_0x4f7967(0x760)]),this[_0x4f7967(0x593)]&&(_0x4f7967(0x709)===_0x4f7967(0x709)?this[_0x4f7967(0x593)][_0x4f7967(0x558)](Scene_Menu[_0x4f7967(0x6a0)][_0x4f7967(0x94f)]):_0x44d64e+=_0x1c20cd+_0x4f7967(0x600)['format'](_0x49c815,_0x571fda[_0x4f7967(0x87a)]||'Unnamed')+_0x4ce518),this[_0x4f7967(0x4dd)]&&this[_0x4f7967(0x4dd)][_0x4f7967(0x558)](Scene_Menu[_0x4f7967(0x6a0)][_0x4f7967(0x380)]);},Scene_Menu[_0x2bd3fa(0x77c)][_0x2bd3fa(0x93b)]=function(){const _0x37e4ba=_0x2bd3fa;return Scene_Menu[_0x37e4ba(0x6a0)]['CommandRect'][_0x37e4ba(0x1f7)](this);},Scene_Menu[_0x2bd3fa(0x77c)][_0x2bd3fa(0x869)]=function(){const _0x2866fe=_0x2bd3fa;return Scene_Menu[_0x2866fe(0x6a0)][_0x2866fe(0x2a4)]['call'](this);},Scene_Menu[_0x2bd3fa(0x77c)][_0x2bd3fa(0x651)]=function(){return Scene_Menu['layoutSettings']['StatusRect']['call'](this);},Scene_Item[_0x2bd3fa(0x6a0)]=VisuMZ[_0x2bd3fa(0x249)]['Settings'][_0x2bd3fa(0x6de)]['ItemMenu'],VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x34f)]=Scene_Item[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5e4)],Scene_Item[_0x2bd3fa(0x77c)]['create']=function(){const _0x44df02=_0x2bd3fa;VisuMZ[_0x44df02(0x249)][_0x44df02(0x34f)]['call'](this),this[_0x44df02(0x34e)]();},Scene_Item[_0x2bd3fa(0x77c)]['setCoreEngineUpdateWindowBg']=function(){const _0x2aa888=_0x2bd3fa;this[_0x2aa888(0x385)]&&(_0x2aa888(0x62d)!==_0x2aa888(0x73e)?this['_helpWindow']['setBackgroundType'](Scene_Item[_0x2aa888(0x6a0)][_0x2aa888(0x6f7)]):_0x58148f=_0x7f25c3['CoreEngine'][_0x2aa888(0x8d4)]['call'](this));this[_0x2aa888(0x894)]&&this[_0x2aa888(0x894)][_0x2aa888(0x558)](Scene_Item[_0x2aa888(0x6a0)][_0x2aa888(0x219)]);this[_0x2aa888(0x75d)]&&this[_0x2aa888(0x75d)][_0x2aa888(0x558)](Scene_Item[_0x2aa888(0x6a0)][_0x2aa888(0x63a)]);if(this[_0x2aa888(0x1e8)]){if(_0x2aa888(0x681)!==_0x2aa888(0x883))this['_actorWindow'][_0x2aa888(0x558)](Scene_Item[_0x2aa888(0x6a0)]['ActorBgType']);else{try{_0xa5f73e[_0x2aa888(0x249)][_0x2aa888(0x808)][_0x2aa888(0x1f7)](this);}catch(_0x4c7b58){_0x7d85f8['isPlaytest']()&&(_0x54ff84[_0x2aa888(0x253)](_0x2aa888(0x5ff)),_0x2991ba['log'](_0x4c7b58));}return!![];}}},Scene_Item['prototype']['helpWindowRect']=function(){const _0x2a9d19=_0x2bd3fa;return Scene_Item[_0x2a9d19(0x6a0)][_0x2a9d19(0x4e0)][_0x2a9d19(0x1f7)](this);},Scene_Item[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4d0)]=function(){const _0x18c60f=_0x2bd3fa;return Scene_Item[_0x18c60f(0x6a0)][_0x18c60f(0x6b8)][_0x18c60f(0x1f7)](this);},Scene_Item[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5b2)]=function(){const _0x2cb381=_0x2bd3fa;return Scene_Item['layoutSettings'][_0x2cb381(0x79c)][_0x2cb381(0x1f7)](this);},Scene_Item[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6fd)]=function(){const _0x6fb421=_0x2bd3fa;return Scene_Item[_0x6fb421(0x6a0)][_0x6fb421(0x1dc)][_0x6fb421(0x1f7)](this);},Scene_Skill[_0x2bd3fa(0x6a0)]=VisuMZ['CoreEngine'][_0x2bd3fa(0x8fc)][_0x2bd3fa(0x6de)][_0x2bd3fa(0x732)],VisuMZ['CoreEngine'][_0x2bd3fa(0x845)]=Scene_Skill[_0x2bd3fa(0x77c)]['create'],Scene_Skill[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5e4)]=function(){const _0x4a0185=_0x2bd3fa;VisuMZ[_0x4a0185(0x249)]['Scene_Skill_create'][_0x4a0185(0x1f7)](this),this[_0x4a0185(0x34e)]();},Scene_Skill[_0x2bd3fa(0x77c)][_0x2bd3fa(0x34e)]=function(){const _0x1c974a=_0x2bd3fa;if(this[_0x1c974a(0x385)]){if(_0x1c974a(0x30c)!==_0x1c974a(0x30c))return this[_0x1c974a(0x171)]();else this[_0x1c974a(0x385)]['setBackgroundType'](Scene_Skill['layoutSettings'][_0x1c974a(0x6f7)]);}this[_0x1c974a(0x72f)]&&this[_0x1c974a(0x72f)]['setBackgroundType'](Scene_Skill[_0x1c974a(0x6a0)][_0x1c974a(0x206)]);this[_0x1c974a(0x4dd)]&&this[_0x1c974a(0x4dd)][_0x1c974a(0x558)](Scene_Skill[_0x1c974a(0x6a0)]['StatusBgType']);this[_0x1c974a(0x75d)]&&(_0x1c974a(0x95e)!==_0x1c974a(0x95e)?this[_0x1c974a(0x657)]['setBackgroundType'](_0x2a6464[_0x1c974a(0x6a0)][_0x1c974a(0x736)]):this[_0x1c974a(0x75d)][_0x1c974a(0x558)](Scene_Skill['layoutSettings'][_0x1c974a(0x63a)]));if(this[_0x1c974a(0x1e8)]){if(_0x1c974a(0x300)===_0x1c974a(0x300))this['_actorWindow']['setBackgroundType'](Scene_Skill['layoutSettings'][_0x1c974a(0x7c5)]);else{var _0x5ef6f4=_0x5270e3(_0x591767['$1']);_0x1395e3+=_0x5ef6f4;}}},Scene_Skill['prototype'][_0x2bd3fa(0x828)]=function(){const _0x1464f1=_0x2bd3fa;return Scene_Skill[_0x1464f1(0x6a0)]['HelpRect'][_0x1464f1(0x1f7)](this);},Scene_Skill[_0x2bd3fa(0x77c)][_0x2bd3fa(0x2a2)]=function(){const _0x1ee00e=_0x2bd3fa;return Scene_Skill[_0x1ee00e(0x6a0)][_0x1ee00e(0x496)]['call'](this);},Scene_Skill[_0x2bd3fa(0x77c)][_0x2bd3fa(0x651)]=function(){const _0x238e65=_0x2bd3fa;return Scene_Skill[_0x238e65(0x6a0)]['StatusRect'][_0x238e65(0x1f7)](this);},Scene_Skill[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5b2)]=function(){const _0x28c11e=_0x2bd3fa;return Scene_Skill[_0x28c11e(0x6a0)][_0x28c11e(0x79c)][_0x28c11e(0x1f7)](this);},Scene_Skill['prototype'][_0x2bd3fa(0x6fd)]=function(){const _0x3a7135=_0x2bd3fa;return Scene_Skill['layoutSettings'][_0x3a7135(0x1dc)][_0x3a7135(0x1f7)](this);},Scene_Equip[_0x2bd3fa(0x6a0)]=VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x8fc)][_0x2bd3fa(0x6de)][_0x2bd3fa(0x244)],VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x668)]=Scene_Equip[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5e4)],Scene_Equip[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5e4)]=function(){const _0xbe6307=_0x2bd3fa;VisuMZ['CoreEngine'][_0xbe6307(0x668)]['call'](this),this[_0xbe6307(0x34e)]();},Scene_Equip['prototype'][_0x2bd3fa(0x34e)]=function(){const _0x5f1773=_0x2bd3fa;this['_helpWindow']&&(_0x5f1773(0x472)===_0x5f1773(0x36b)?(_0x518803['CoreEngine'][_0x5f1773(0x29f)][_0x5f1773(0x1f7)](this),this[_0x5f1773(0x61e)]()):this[_0x5f1773(0x385)][_0x5f1773(0x558)](Scene_Equip[_0x5f1773(0x6a0)][_0x5f1773(0x6f7)])),this[_0x5f1773(0x4dd)]&&this['_statusWindow'][_0x5f1773(0x558)](Scene_Equip[_0x5f1773(0x6a0)]['StatusBgType']),this[_0x5f1773(0x364)]&&(_0x5f1773(0x5b4)!=='sKLUx'?(_0x45badc+=_0x1cd742+'\x0a',_0x412e4f+=_0x5f1773(0x765),_0x1f6535[_0x5f1773(0x614)][0x4]!==''&&_0x40bb6b[_0x5f1773(0x614)][0x4]!==_0x594f32&&(_0x3620ca+=_0x5f1773(0x7e8)['format'](_0x5f1492[_0x5f1773(0x614)][0x4]))):this[_0x5f1773(0x364)][_0x5f1773(0x558)](Scene_Equip[_0x5f1773(0x6a0)]['CommandBgType'])),this[_0x5f1773(0x657)]&&this[_0x5f1773(0x657)][_0x5f1773(0x558)](Scene_Equip['layoutSettings'][_0x5f1773(0x736)]),this[_0x5f1773(0x75d)]&&this['_itemWindow'][_0x5f1773(0x558)](Scene_Equip[_0x5f1773(0x6a0)][_0x5f1773(0x63a)]);},Scene_Equip['prototype'][_0x2bd3fa(0x828)]=function(){const _0x2a31fb=_0x2bd3fa;return Scene_Equip[_0x2a31fb(0x6a0)][_0x2a31fb(0x4e0)][_0x2a31fb(0x1f7)](this);},Scene_Equip[_0x2bd3fa(0x77c)]['statusWindowRect']=function(){const _0x2e6241=_0x2bd3fa;return Scene_Equip[_0x2e6241(0x6a0)][_0x2e6241(0x69f)][_0x2e6241(0x1f7)](this);},Scene_Equip[_0x2bd3fa(0x77c)]['commandWindowRect']=function(){const _0x368e4a=_0x2bd3fa;return Scene_Equip[_0x368e4a(0x6a0)][_0x368e4a(0x50d)]['call'](this);},Scene_Equip['prototype'][_0x2bd3fa(0x8dc)]=function(){const _0x1db35f=_0x2bd3fa;return Scene_Equip['layoutSettings'][_0x1db35f(0x27f)][_0x1db35f(0x1f7)](this);},Scene_Equip[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5b2)]=function(){const _0x58466b=_0x2bd3fa;return Scene_Equip[_0x58466b(0x6a0)]['ItemRect']['call'](this);},Scene_Status['layoutSettings']=VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x8fc)][_0x2bd3fa(0x6de)][_0x2bd3fa(0x524)],VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x49e)]=Scene_Status[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5e4)],Scene_Status[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5e4)]=function(){const _0x4ad4b4=_0x2bd3fa;VisuMZ[_0x4ad4b4(0x249)][_0x4ad4b4(0x49e)][_0x4ad4b4(0x1f7)](this),this[_0x4ad4b4(0x34e)]();},Scene_Status[_0x2bd3fa(0x77c)]['setCoreEngineUpdateWindowBg']=function(){const _0x1788d2=_0x2bd3fa;this[_0x1788d2(0x393)]&&this['_profileWindow'][_0x1788d2(0x558)](Scene_Status['layoutSettings'][_0x1788d2(0x5dc)]),this[_0x1788d2(0x4dd)]&&this[_0x1788d2(0x4dd)][_0x1788d2(0x558)](Scene_Status['layoutSettings'][_0x1788d2(0x380)]),this[_0x1788d2(0x3d5)]&&this['_statusParamsWindow']['setBackgroundType'](Scene_Status[_0x1788d2(0x6a0)][_0x1788d2(0x78d)]),this[_0x1788d2(0x3af)]&&this['_statusEquipWindow'][_0x1788d2(0x558)](Scene_Status[_0x1788d2(0x6a0)][_0x1788d2(0x72d)]);},Scene_Status[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6e5)]=function(){const _0x30722b=_0x2bd3fa;return Scene_Status[_0x30722b(0x6a0)][_0x30722b(0x179)][_0x30722b(0x1f7)](this);},Scene_Status[_0x2bd3fa(0x77c)]['statusWindowRect']=function(){const _0x3e4251=_0x2bd3fa;return Scene_Status['layoutSettings'][_0x3e4251(0x69f)][_0x3e4251(0x1f7)](this);},Scene_Status[_0x2bd3fa(0x77c)][_0x2bd3fa(0x818)]=function(){const _0x36203b=_0x2bd3fa;return Scene_Status[_0x36203b(0x6a0)]['StatusParamsRect'][_0x36203b(0x1f7)](this);},Scene_Status[_0x2bd3fa(0x77c)]['statusEquipWindowRect']=function(){const _0x45b582=_0x2bd3fa;return Scene_Status[_0x45b582(0x6a0)][_0x45b582(0x2d3)][_0x45b582(0x1f7)](this);},Scene_Options['layoutSettings']=VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x8fc)]['MenuLayout'][_0x2bd3fa(0x2e9)],VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x8f2)]=Scene_Options[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5e4)],Scene_Options[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5e4)]=function(){const _0x2bb6f4=_0x2bd3fa;VisuMZ[_0x2bb6f4(0x249)][_0x2bb6f4(0x8f2)][_0x2bb6f4(0x1f7)](this),this[_0x2bb6f4(0x34e)]();},Scene_Options['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x3ccd72=_0x2bd3fa;this[_0x3ccd72(0x6a9)]&&this['_optionsWindow'][_0x3ccd72(0x558)](Scene_Options[_0x3ccd72(0x6a0)]['OptionsBgType']);},Scene_Options[_0x2bd3fa(0x77c)][_0x2bd3fa(0x33a)]=function(){const _0x398582=_0x2bd3fa;return Scene_Options[_0x398582(0x6a0)]['OptionsRect'][_0x398582(0x1f7)](this);},Scene_Save[_0x2bd3fa(0x6a0)]=VisuMZ['CoreEngine']['Settings'][_0x2bd3fa(0x6de)]['SaveMenu'],Scene_Save[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5e4)]=function(){const _0x596b03=_0x2bd3fa;Scene_File[_0x596b03(0x77c)][_0x596b03(0x5e4)]['call'](this),this[_0x596b03(0x34e)]();},Scene_Save['prototype'][_0x2bd3fa(0x34e)]=function(){const _0x49f52c=_0x2bd3fa;this[_0x49f52c(0x385)]&&(_0x49f52c(0x386)===_0x49f52c(0x22b)?_0x20aacc+=_0x49f52c(0x6b7):this[_0x49f52c(0x385)][_0x49f52c(0x558)](Scene_Save[_0x49f52c(0x6a0)][_0x49f52c(0x6f7)])),this[_0x49f52c(0x2e3)]&&this[_0x49f52c(0x2e3)][_0x49f52c(0x558)](Scene_Save[_0x49f52c(0x6a0)][_0x49f52c(0x475)]);},Scene_Save[_0x2bd3fa(0x77c)][_0x2bd3fa(0x828)]=function(){const _0x498cd3=_0x2bd3fa;return Scene_Save[_0x498cd3(0x6a0)][_0x498cd3(0x4e0)][_0x498cd3(0x1f7)](this);},Scene_Save[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1f9)]=function(){const _0x852bf2=_0x2bd3fa;return Scene_Save[_0x852bf2(0x6a0)][_0x852bf2(0x642)]['call'](this);},Scene_Load['layoutSettings']=VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x8fc)][_0x2bd3fa(0x6de)]['LoadMenu'],Scene_Load['prototype']['create']=function(){const _0x3fa799=_0x2bd3fa;Scene_File[_0x3fa799(0x77c)][_0x3fa799(0x5e4)][_0x3fa799(0x1f7)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load['prototype'][_0x2bd3fa(0x34e)]=function(){const _0x14a198=_0x2bd3fa;if(this[_0x14a198(0x385)]){if(_0x14a198(0x245)===_0x14a198(0x279)){if(_0x4dd533)_0x29604e['ParseTilesetNotetags'](_0x482bcb);}else this[_0x14a198(0x385)]['setBackgroundType'](Scene_Load['layoutSettings']['HelpBgType']);}if(this[_0x14a198(0x2e3)]){if(_0x14a198(0x8eb)==='PLRRI')this[_0x14a198(0x2e3)][_0x14a198(0x558)](Scene_Load[_0x14a198(0x6a0)][_0x14a198(0x475)]);else return _0x236e68[_0x14a198(0x855)](_0x14a198(0x7ae));}},Scene_Load[_0x2bd3fa(0x77c)][_0x2bd3fa(0x828)]=function(){const _0x3a6f07=_0x2bd3fa;return Scene_Load[_0x3a6f07(0x6a0)][_0x3a6f07(0x4e0)]['call'](this);},Scene_Load[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1f9)]=function(){const _0x381da1=_0x2bd3fa;return Scene_Load[_0x381da1(0x6a0)][_0x381da1(0x642)][_0x381da1(0x1f7)](this);},Scene_GameEnd[_0x2bd3fa(0x6a0)]=VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x8fc)]['MenuLayout'][_0x2bd3fa(0x5fc)],VisuMZ[_0x2bd3fa(0x249)]['Scene_GameEnd_createBackground']=Scene_GameEnd[_0x2bd3fa(0x77c)][_0x2bd3fa(0x17f)],Scene_GameEnd[_0x2bd3fa(0x77c)]['createBackground']=function(){const _0x26e7b8=_0x2bd3fa;Scene_MenuBase[_0x26e7b8(0x77c)][_0x26e7b8(0x17f)][_0x26e7b8(0x1f7)](this);},Scene_GameEnd[_0x2bd3fa(0x77c)][_0x2bd3fa(0x381)]=function(){const _0x1a2304=_0x2bd3fa,_0x144113=this[_0x1a2304(0x93b)]();this[_0x1a2304(0x364)]=new Window_GameEnd(_0x144113),this[_0x1a2304(0x364)][_0x1a2304(0x353)](_0x1a2304(0x391),this['popScene'][_0x1a2304(0x174)](this)),this[_0x1a2304(0x5a9)](this[_0x1a2304(0x364)]),this['_commandWindow'][_0x1a2304(0x558)](Scene_GameEnd[_0x1a2304(0x6a0)][_0x1a2304(0x760)]);},Scene_GameEnd[_0x2bd3fa(0x77c)][_0x2bd3fa(0x93b)]=function(){const _0x9c22ce=_0x2bd3fa;return Scene_GameEnd[_0x9c22ce(0x6a0)][_0x9c22ce(0x50d)][_0x9c22ce(0x1f7)](this);},Scene_Shop[_0x2bd3fa(0x6a0)]=VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x8fc)][_0x2bd3fa(0x6de)][_0x2bd3fa(0x441)],VisuMZ['CoreEngine']['Scene_Shop_create']=Scene_Shop[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5e4)],Scene_Shop[_0x2bd3fa(0x77c)]['create']=function(){const _0x3d75b8=_0x2bd3fa;VisuMZ[_0x3d75b8(0x249)][_0x3d75b8(0x430)][_0x3d75b8(0x1f7)](this),this[_0x3d75b8(0x34e)]();},Scene_Shop[_0x2bd3fa(0x77c)]['setCoreEngineUpdateWindowBg']=function(){const _0xf2b402=_0x2bd3fa;this[_0xf2b402(0x385)]&&this[_0xf2b402(0x385)][_0xf2b402(0x558)](Scene_Shop[_0xf2b402(0x6a0)][_0xf2b402(0x6f7)]);this['_goldWindow']&&('QckFI'!==_0xf2b402(0x8c4)?this[_0xf2b402(0x593)][_0xf2b402(0x558)](Scene_Shop[_0xf2b402(0x6a0)][_0xf2b402(0x94f)]):this[_0xf2b402(0x4db)]=_0x398d4f);this['_commandWindow']&&this[_0xf2b402(0x364)][_0xf2b402(0x558)](Scene_Shop[_0xf2b402(0x6a0)][_0xf2b402(0x760)]);this[_0xf2b402(0x94a)]&&(_0xf2b402(0x27d)==='nzsKP'?_0x1a1dbb[_0xf2b402(0x5fb)][_0xf2b402(0x1f7)](this,_0x441810):this['_dummyWindow']['setBackgroundType'](Scene_Shop[_0xf2b402(0x6a0)][_0xf2b402(0x8f6)]));this[_0xf2b402(0x18e)]&&this['_numberWindow']['setBackgroundType'](Scene_Shop[_0xf2b402(0x6a0)][_0xf2b402(0x81e)]);this[_0xf2b402(0x4dd)]&&this[_0xf2b402(0x4dd)][_0xf2b402(0x558)](Scene_Shop[_0xf2b402(0x6a0)][_0xf2b402(0x380)]);if(this['_buyWindow']){if(_0xf2b402(0x485)===_0xf2b402(0x485))this[_0xf2b402(0x6bd)][_0xf2b402(0x558)](Scene_Shop[_0xf2b402(0x6a0)][_0xf2b402(0x737)]);else return _0x29f02b['mainFontSize']()-0x8;}this[_0xf2b402(0x894)]&&(_0xf2b402(0x7cd)!==_0xf2b402(0x43b)?this[_0xf2b402(0x894)][_0xf2b402(0x558)](Scene_Shop[_0xf2b402(0x6a0)][_0xf2b402(0x219)]):(_0x321256[_0xf2b402(0x249)][_0xf2b402(0x427)][_0xf2b402(0x1f7)](this),this[_0xf2b402(0x34e)]())),this['_sellWindow']&&this[_0xf2b402(0x33b)]['setBackgroundType'](Scene_Shop[_0xf2b402(0x6a0)]['SellBgType']);},Scene_Shop['prototype'][_0x2bd3fa(0x828)]=function(){const _0x448e72=_0x2bd3fa;return Scene_Shop[_0x448e72(0x6a0)][_0x448e72(0x4e0)]['call'](this);},Scene_Shop[_0x2bd3fa(0x77c)][_0x2bd3fa(0x869)]=function(){const _0x2ef73f=_0x2bd3fa;return Scene_Shop[_0x2ef73f(0x6a0)][_0x2ef73f(0x2a4)][_0x2ef73f(0x1f7)](this);},Scene_Shop['prototype'][_0x2bd3fa(0x93b)]=function(){const _0x2c6568=_0x2bd3fa;return Scene_Shop[_0x2c6568(0x6a0)][_0x2c6568(0x50d)][_0x2c6568(0x1f7)](this);},Scene_Shop[_0x2bd3fa(0x77c)][_0x2bd3fa(0x932)]=function(){const _0x2b47d0=_0x2bd3fa;return Scene_Shop[_0x2b47d0(0x6a0)]['DummyRect'][_0x2b47d0(0x1f7)](this);},Scene_Shop[_0x2bd3fa(0x77c)]['numberWindowRect']=function(){const _0x4d32d9=_0x2bd3fa;return Scene_Shop[_0x4d32d9(0x6a0)]['NumberRect'][_0x4d32d9(0x1f7)](this);},Scene_Shop['prototype'][_0x2bd3fa(0x651)]=function(){const _0x1aefd0=_0x2bd3fa;return Scene_Shop['layoutSettings'][_0x1aefd0(0x69f)][_0x1aefd0(0x1f7)](this);},Scene_Shop[_0x2bd3fa(0x77c)][_0x2bd3fa(0x795)]=function(){const _0xb0807d=_0x2bd3fa;return Scene_Shop[_0xb0807d(0x6a0)][_0xb0807d(0x704)][_0xb0807d(0x1f7)](this);},Scene_Shop['prototype'][_0x2bd3fa(0x4d0)]=function(){const _0x3fc294=_0x2bd3fa;return Scene_Shop[_0x3fc294(0x6a0)][_0x3fc294(0x6b8)][_0x3fc294(0x1f7)](this);},Scene_Shop[_0x2bd3fa(0x77c)]['sellWindowRect']=function(){const _0x2328ea=_0x2bd3fa;return Scene_Shop[_0x2328ea(0x6a0)][_0x2328ea(0x1ad)][_0x2328ea(0x1f7)](this);},Scene_Name[_0x2bd3fa(0x6a0)]=VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x8fc)][_0x2bd3fa(0x6de)]['NameMenu'],VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x427)]=Scene_Name[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5e4)],Scene_Name[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5e4)]=function(){const _0x1d0708=_0x2bd3fa;VisuMZ['CoreEngine'][_0x1d0708(0x427)]['call'](this),this[_0x1d0708(0x34e)]();},Scene_Name['prototype'][_0x2bd3fa(0x34e)]=function(){const _0x51ae9e=_0x2bd3fa;this[_0x51ae9e(0x587)]&&(_0x51ae9e(0x32a)!==_0x51ae9e(0x2f4)?this[_0x51ae9e(0x587)]['setBackgroundType'](Scene_Name['layoutSettings'][_0x51ae9e(0x3f6)]):this[_0x51ae9e(0x6ae)](_0x5c20bb)),this['_inputWindow']&&this[_0x51ae9e(0x506)][_0x51ae9e(0x558)](Scene_Name[_0x51ae9e(0x6a0)][_0x51ae9e(0x508)]);},Scene_Name[_0x2bd3fa(0x77c)][_0x2bd3fa(0x363)]=function(){return 0x0;},Scene_Name['prototype']['editWindowRect']=function(){const _0x5ac47e=_0x2bd3fa;return Scene_Name[_0x5ac47e(0x6a0)][_0x5ac47e(0x2e2)][_0x5ac47e(0x1f7)](this);},Scene_Name[_0x2bd3fa(0x77c)][_0x2bd3fa(0x50e)]=function(){const _0x596c6f=_0x2bd3fa;return Scene_Name['layoutSettings'][_0x596c6f(0x92f)][_0x596c6f(0x1f7)](this);},Scene_Name[_0x2bd3fa(0x77c)][_0x2bd3fa(0x404)]=function(){const _0x3b0a14=_0x2bd3fa;if(!this[_0x3b0a14(0x506)])return![];return VisuMZ['CoreEngine'][_0x3b0a14(0x8fc)]['KeyboardInput']['EnableNameInput'];},Scene_Name['prototype'][_0x2bd3fa(0x5e5)]=function(){const _0xc9243d=_0x2bd3fa;if(this[_0xc9243d(0x404)]()){if(_0xc9243d(0x47b)===_0xc9243d(0x81d)){const _0xdc3197=_0x8a84c2(this[_0xc9243d(0x482)][_0xc9243d(0x87a)]),_0x57e857=this['getCustomBackgroundSettings'](_0xdc3197);return _0x57e857?_0x57e857[_0xc9243d(0x29a)]:0xc0;}else return TextManager[_0xc9243d(0x855)](_0xc9243d(0x7ae));}else{if(_0xc9243d(0x6a6)===_0xc9243d(0x410)){if(!_0x31bcee[_0xc9243d(0x4f7)]())return;if(!_0x471f95['isNwjs']())return;if(!_0x1fef06)return;if(_0x22438f[_0xc9243d(0x906)]()<=0x0)return;_0x598e5e['ConvertParams'](_0x8cae1,_0x3296d3);const _0xa94d8e='Map%1'[_0xc9243d(0x5a0)](_0x5babfe[_0xc9243d(0x906)]()[_0xc9243d(0x181)](0x3)),_0x869040=_0x3bbb14[_0xc9243d(0x249)]['ExtractStrFromMap'](_0x3b0fab[_0xc9243d(0x906)]());_0x181774[_0xc9243d(0x249)]['ExportString'](_0x869040,_0xa94d8e,!![]);}else return Scene_MenuBase[_0xc9243d(0x77c)]['buttonAssistKey1']['call'](this);}},Scene_Name[_0x2bd3fa(0x77c)]['buttonAssistText1']=function(){const _0x269c9e=_0x2bd3fa;if(this[_0x269c9e(0x404)]()){const _0x386440=VisuMZ['CoreEngine'][_0x269c9e(0x8fc)]['KeyboardInput'];return this[_0x269c9e(0x506)]['_mode']===_0x269c9e(0x203)?_0x386440['Keyboard']||'Keyboard':_0x386440[_0x269c9e(0x669)]||_0x269c9e(0x669);}else{if(_0x269c9e(0x320)!=='ehzUP')return Scene_MenuBase[_0x269c9e(0x77c)][_0x269c9e(0x7bf)]['call'](this);else this[_0x269c9e(0x4d6)](...arguments);}},VisuMZ[_0x2bd3fa(0x249)]['Scene_Name_onInputOk']=Scene_Name[_0x2bd3fa(0x77c)][_0x2bd3fa(0x866)],Scene_Name[_0x2bd3fa(0x77c)][_0x2bd3fa(0x866)]=function(){const _0xa01dd9=_0x2bd3fa;this[_0xa01dd9(0x493)]()?this[_0xa01dd9(0x1b4)]():VisuMZ[_0xa01dd9(0x249)][_0xa01dd9(0x96b)][_0xa01dd9(0x1f7)](this);},Scene_Name[_0x2bd3fa(0x77c)][_0x2bd3fa(0x493)]=function(){const _0x81c957=_0x2bd3fa,_0x2d2f60=VisuMZ[_0x81c957(0x249)][_0x81c957(0x8fc)][_0x81c957(0x836)];if(!_0x2d2f60)return![];const _0x1c76cc=_0x2d2f60[_0x81c957(0x86a)];if(!_0x1c76cc)return![];const _0xe42be8=this['_editWindow'][_0x81c957(0x87a)]()[_0x81c957(0x2a9)]();for(const _0x34ee54 of _0x1c76cc){if(_0xe42be8[_0x81c957(0x448)](_0x34ee54['toLowerCase']()))return!![];}return![];},Scene_Name[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1b4)]=function(){const _0x1092e9=_0x2bd3fa;SoundManager[_0x1092e9(0x333)]();},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x177)]=Scene_Battle[_0x2bd3fa(0x77c)][_0x2bd3fa(0x859)],Scene_Battle[_0x2bd3fa(0x77c)][_0x2bd3fa(0x859)]=function(){const _0x5bb39e=_0x2bd3fa;VisuMZ['CoreEngine'][_0x5bb39e(0x177)][_0x5bb39e(0x1f7)](this);if($gameTemp[_0x5bb39e(0x5d2)])this[_0x5bb39e(0x54a)]();},Scene_Battle[_0x2bd3fa(0x77c)][_0x2bd3fa(0x54a)]=function(){const _0x4271ee=_0x2bd3fa;!BattleManager[_0x4271ee(0x48f)]()&&!this['_playtestF7Looping']&&!$gameMessage[_0x4271ee(0x892)]()&&(this[_0x4271ee(0x76c)]=!![],this[_0x4271ee(0x859)](),SceneManager['updateEffekseer'](),this['_playtestF7Looping']=![]);},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x961)]=Scene_Battle[_0x2bd3fa(0x77c)]['createCancelButton'],Scene_Battle['prototype'][_0x2bd3fa(0x4be)]=function(){const _0x4af471=_0x2bd3fa;VisuMZ['CoreEngine'][_0x4af471(0x961)][_0x4af471(0x1f7)](this),SceneManager[_0x4af471(0x4a8)]()&&this[_0x4af471(0x734)]();},Scene_Battle[_0x2bd3fa(0x77c)][_0x2bd3fa(0x734)]=function(){const _0x55204a=_0x2bd3fa;this[_0x55204a(0x3fc)]['x']=Graphics[_0x55204a(0x88d)]+0x4;if(this[_0x55204a(0x3c8)]())this['_cancelButton']['y']=Graphics['boxHeight']-this[_0x55204a(0x581)]();else{if(_0x55204a(0x7ad)===_0x55204a(0x7ad))this[_0x55204a(0x3fc)]['y']=0x0;else{var _0x2bab8b=_0x4d22af(_0x2d4e5e['$1']);try{_0x4cca2e+=_0x32e7d2(_0x2bab8b);}catch(_0x58d1bf){if(_0x5ce3cb['isPlaytest']())_0x2213f5[_0x55204a(0x253)](_0x58d1bf);}}}},VisuMZ['CoreEngine']['Sprite_Button_initialize']=Sprite_Button[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4d6)],Sprite_Button[_0x2bd3fa(0x77c)]['initialize']=function(_0x273060){const _0x182fdd=_0x2bd3fa;VisuMZ[_0x182fdd(0x249)]['Sprite_Button_initialize']['call'](this,_0x273060),this[_0x182fdd(0x4a5)]();},Sprite_Button[_0x2bd3fa(0x77c)]['initButtonHidden']=function(){const _0x1977cd=_0x2bd3fa,_0x5a6532=VisuMZ[_0x1977cd(0x249)][_0x1977cd(0x8fc)]['UI'];this['_isButtonHidden']=![];switch(this[_0x1977cd(0x8fb)]){case _0x1977cd(0x391):this['_isButtonHidden']=!_0x5a6532[_0x1977cd(0x65d)];break;case _0x1977cd(0x92c):case _0x1977cd(0x1b0):this[_0x1977cd(0x204)]=!_0x5a6532[_0x1977cd(0x52c)];break;case'down':case'up':case _0x1977cd(0x2a5):case _0x1977cd(0x85a):case'ok':this[_0x1977cd(0x204)]=!_0x5a6532[_0x1977cd(0x2a3)];break;case _0x1977cd(0x672):this['_isButtonHidden']=!_0x5a6532[_0x1977cd(0x3fe)];break;}},VisuMZ['CoreEngine'][_0x2bd3fa(0x1a5)]=Sprite_Button[_0x2bd3fa(0x77c)][_0x2bd3fa(0x858)],Sprite_Button[_0x2bd3fa(0x77c)][_0x2bd3fa(0x858)]=function(){const _0x39dc86=_0x2bd3fa;if(SceneManager[_0x39dc86(0x60b)]()||this['_isButtonHidden']){if(_0x39dc86(0x338)!==_0x39dc86(0x338))return _0x27f38b['layoutSettings']['ProfileRect'][_0x39dc86(0x1f7)](this);else this['hideButtonFromView']();}else VisuMZ['CoreEngine'][_0x39dc86(0x1a5)][_0x39dc86(0x1f7)](this);},Sprite_Button[_0x2bd3fa(0x77c)][_0x2bd3fa(0x21d)]=function(){const _0x42919f=_0x2bd3fa;this[_0x42919f(0x463)]=![],this[_0x42919f(0x8ed)]=0x0,this['x']=Graphics[_0x42919f(0x73f)]*0xa,this['y']=Graphics[_0x42919f(0x30f)]*0xa;},VisuMZ[_0x2bd3fa(0x249)]['Sprite_Battler_startMove']=Sprite_Battler['prototype'][_0x2bd3fa(0x2c2)],Sprite_Battler[_0x2bd3fa(0x77c)][_0x2bd3fa(0x2c2)]=function(_0x4e371b,_0x4beafd,_0x2db45d){const _0x442c30=_0x2bd3fa;if(this[_0x442c30(0x1e7)]!==_0x4e371b||this['_targetOffsetY']!==_0x4beafd){if('KHjAq'===_0x442c30(0x640))this[_0x442c30(0x949)](_0x442c30(0x389)),this[_0x442c30(0x3f3)]=_0x2db45d;else{const _0x515b06=_0x4a2765[_0x442c30(0x249)]['Settings'][_0x442c30(0x220)];_0x515b06[_0x442c30(0x2d5)]=_0x515b06['KeySHIFT']||_0x442c30(0x76e),_0x515b06[_0x442c30(0x432)]=_0x515b06['KeyTAB']||_0x442c30(0x5e1);}}VisuMZ['CoreEngine'][_0x442c30(0x50c)]['call'](this,_0x4e371b,_0x4beafd,_0x2db45d);},Sprite_Battler[_0x2bd3fa(0x77c)][_0x2bd3fa(0x949)]=function(_0x8e7e74){const _0x174191=_0x2bd3fa;this[_0x174191(0x4db)]=_0x8e7e74;},Sprite_Battler[_0x2bd3fa(0x77c)][_0x2bd3fa(0x3e3)]=function(){const _0x4a3f2d=_0x2bd3fa;if(this[_0x4a3f2d(0x494)]<=0x0)return;const _0x1f83f0=this[_0x4a3f2d(0x494)],_0x38c96f=this['_movementWholeDuration'],_0x5084a0=this[_0x4a3f2d(0x4db)];this['_offsetX']=this[_0x4a3f2d(0x644)](this[_0x4a3f2d(0x77d)],this[_0x4a3f2d(0x1e7)],_0x1f83f0,_0x38c96f,_0x5084a0),this['_offsetY']=this[_0x4a3f2d(0x644)](this[_0x4a3f2d(0x1a3)],this[_0x4a3f2d(0x1be)],_0x1f83f0,_0x38c96f,_0x5084a0),this[_0x4a3f2d(0x494)]--;if(this[_0x4a3f2d(0x494)]<=0x0)this['onMoveEnd']();},Sprite_Battler['prototype'][_0x2bd3fa(0x644)]=function(_0xbbf093,_0x41bac4,_0x40cdb3,_0x24f07b,_0x4fe0dc){const _0x55e938=_0x2bd3fa,_0x2f1241=VisuMZ[_0x55e938(0x616)]((_0x24f07b-_0x40cdb3)/_0x24f07b,_0x4fe0dc||_0x55e938(0x389)),_0x45d823=VisuMZ[_0x55e938(0x616)]((_0x24f07b-_0x40cdb3+0x1)/_0x24f07b,_0x4fe0dc||_0x55e938(0x389)),_0xd17f7f=(_0xbbf093-_0x41bac4*_0x2f1241)/(0x1-_0x2f1241);return _0xd17f7f+(_0x41bac4-_0xd17f7f)*_0x45d823;},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x56f)]=Sprite_Actor[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4c6)],Sprite_Actor[_0x2bd3fa(0x77c)]['setActorHome']=function(_0x2ecfc2){const _0x1ffcf9=_0x2bd3fa;if(VisuMZ[_0x1ffcf9(0x249)][_0x1ffcf9(0x8fc)]['UI'][_0x1ffcf9(0x29b)])this['setActorHomeRepositioned'](_0x2ecfc2);else{if(_0x1ffcf9(0x929)===_0x1ffcf9(0x6c6))return 0.5*_0x16c68c[_0x1ffcf9(0x6e0)](0x2,0xa*_0x564fb8);else VisuMZ['CoreEngine'][_0x1ffcf9(0x56f)][_0x1ffcf9(0x1f7)](this,_0x2ecfc2);}},Sprite_Actor[_0x2bd3fa(0x77c)][_0x2bd3fa(0x367)]=function(_0x15a0b8){const _0x49cdd8=_0x2bd3fa;let _0x3d2c95=Math[_0x49cdd8(0x18a)](Graphics['width']/0x2+0xc0);_0x3d2c95-=Math['floor']((Graphics[_0x49cdd8(0x73f)]-Graphics[_0x49cdd8(0x88d)])/0x2),_0x3d2c95+=_0x15a0b8*0x20;let _0x4a84eb=Graphics['height']-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x4a84eb-=Math[_0x49cdd8(0x7a0)]((Graphics[_0x49cdd8(0x30f)]-Graphics['boxHeight'])/0x2),_0x4a84eb+=_0x15a0b8*0x30,this[_0x49cdd8(0x8ce)](_0x3d2c95,_0x4a84eb);},Sprite_Actor[_0x2bd3fa(0x77c)][_0x2bd3fa(0x3f9)]=function(){const _0xc6e177=_0x2bd3fa;this[_0xc6e177(0x2c2)](0x4b0,0x0,0x78);},Sprite_Animation[_0x2bd3fa(0x77c)]['setMute']=function(_0x4978e0){this['_muteSound']=_0x4978e0;},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x74e)]=Sprite_Animation[_0x2bd3fa(0x77c)][_0x2bd3fa(0x2aa)],Sprite_Animation[_0x2bd3fa(0x77c)][_0x2bd3fa(0x2aa)]=function(){const _0x24c246=_0x2bd3fa;if(this[_0x24c246(0x514)])return;VisuMZ[_0x24c246(0x249)]['Sprite_Animation_processSoundTimings'][_0x24c246(0x1f7)](this);},VisuMZ['CoreEngine'][_0x2bd3fa(0x489)]=Sprite_Animation[_0x2bd3fa(0x77c)][_0x2bd3fa(0x54b)],Sprite_Animation[_0x2bd3fa(0x77c)]['setViewport']=function(_0xd19d9){const _0x1bb00f=_0x2bd3fa;this[_0x1bb00f(0x31c)]()?this[_0x1bb00f(0x6ae)](_0xd19d9):VisuMZ['CoreEngine'][_0x1bb00f(0x489)][_0x1bb00f(0x1f7)](this,_0xd19d9);},Sprite_Animation['prototype']['isAnimationOffsetXMirrored']=function(){const _0x3fd41d=_0x2bd3fa;if(!this[_0x3fd41d(0x70f)])return![];const _0x54c906=this[_0x3fd41d(0x70f)][_0x3fd41d(0x87a)]||'';if(_0x54c906[_0x3fd41d(0x306)](/<MIRROR OFFSET X>/i))return!![];if(_0x54c906[_0x3fd41d(0x306)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ['CoreEngine'][_0x3fd41d(0x8fc)][_0x3fd41d(0x762)]['AnimationMirrorOffset'];},Sprite_Animation[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6ae)]=function(_0x5289b){const _0x4e5ec6=_0x2bd3fa,_0x75d7aa=this[_0x4e5ec6(0x3d2)],_0x417b05=this[_0x4e5ec6(0x3d2)],_0x21fcb7=this['_animation'][_0x4e5ec6(0x83d)]*(this[_0x4e5ec6(0x748)]?-0x1:0x1)-_0x75d7aa/0x2,_0x510d4e=this[_0x4e5ec6(0x70f)][_0x4e5ec6(0x6db)]-_0x417b05/0x2,_0x23cee7=this[_0x4e5ec6(0x4af)](_0x5289b);_0x5289b['gl'][_0x4e5ec6(0x87f)](_0x21fcb7+_0x23cee7['x'],_0x510d4e+_0x23cee7['y'],_0x75d7aa,_0x417b05);},Sprite_Animation['prototype'][_0x2bd3fa(0x5c8)]=function(_0x5cadac){const _0x19d36c=_0x2bd3fa;if(_0x5cadac[_0x19d36c(0x276)]){}const _0x4f2919=this[_0x19d36c(0x70f)][_0x19d36c(0x87a)];let _0xd9d0b6=_0x5cadac[_0x19d36c(0x30f)]*_0x5cadac[_0x19d36c(0x722)]['y'],_0x5e92a9=0x0,_0x2dba63=-_0xd9d0b6/0x2;if(_0x4f2919[_0x19d36c(0x306)](/<(?:HEAD|HEADER|TOP)>/i))_0x2dba63=-_0xd9d0b6;if(_0x4f2919[_0x19d36c(0x306)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x2dba63=0x0;if(this['_animation'][_0x19d36c(0x197)])_0x2dba63=0x0;if(_0x4f2919[_0x19d36c(0x306)](/<(?:LEFT)>/i))_0x5e92a9=-_0x5cadac[_0x19d36c(0x73f)]/0x2;if(_0x4f2919[_0x19d36c(0x306)](/<(?:RIGHT)>/i))_0x5e92a9=_0x5cadac[_0x19d36c(0x73f)]/0x2;_0x4f2919[_0x19d36c(0x306)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x5e92a9=Number(RegExp['$1'])*_0x5cadac[_0x19d36c(0x73f)]);_0x4f2919[_0x19d36c(0x306)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x2dba63=(0x1-Number(RegExp['$1']))*-_0xd9d0b6);_0x4f2919[_0x19d36c(0x306)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&('XMzMx'===_0x19d36c(0x3bf)?(_0x5e92a9=Number(RegExp['$1'])*_0x5cadac[_0x19d36c(0x73f)],_0x2dba63=(0x1-Number(RegExp['$2']))*-_0xd9d0b6):_0x385893[_0x19d36c(0x61a)]&&(this[_0x19d36c(0x6b5)]=_0x19d36c(0x849)));if(_0x4f2919[_0x19d36c(0x306)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x5e92a9+=Number(RegExp['$1']);if(_0x4f2919['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x2dba63+=Number(RegExp['$1']);_0x4f2919[_0x19d36c(0x306)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x5e92a9+=Number(RegExp['$1']),_0x2dba63+=Number(RegExp['$2']));const _0x504632=new Point(_0x5e92a9,_0x2dba63);return _0x5cadac[_0x19d36c(0x259)](),_0x5cadac[_0x19d36c(0x8fe)][_0x19d36c(0x842)](_0x504632);},Sprite_AnimationMV[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6a8)]=function(_0x1b05a5){this['_muteSound']=_0x1b05a5;},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x6c2)]=Sprite_AnimationMV[_0x2bd3fa(0x77c)]['processTimingData'],Sprite_AnimationMV['prototype'][_0x2bd3fa(0x4ae)]=function(_0x365ab0){const _0x349fae=_0x2bd3fa;if(this[_0x349fae(0x514)]){_0x365ab0=JsonEx[_0x349fae(0x20e)](_0x365ab0);if(_0x365ab0['se']){if(_0x349fae(0x8c5)===_0x349fae(0x8c5))_0x365ab0['se'][_0x349fae(0x517)]=0x0;else{var _0x486521=_0x50016a(_0x123fee['$1']);_0x40fbcf*=_0x486521;}}}VisuMZ[_0x349fae(0x249)][_0x349fae(0x6c2)][_0x349fae(0x1f7)](this,_0x365ab0);},Sprite_Damage[_0x2bd3fa(0x77c)][_0x2bd3fa(0x74a)]=function(_0x25a5f1){const _0x353f06=_0x2bd3fa;let _0x4726e9=Math[_0x353f06(0x6fe)](_0x25a5f1)['toString']();if(this[_0x353f06(0x693)]()){if(_0x353f06(0x784)!==_0x353f06(0x784))return _0xfd97c4[_0x353f06(0x249)][_0x353f06(0x781)]['call'](this);else _0x4726e9=VisuMZ[_0x353f06(0x862)](_0x4726e9);}const _0x3f7831=this['fontSize'](),_0x150af5=Math[_0x353f06(0x7a0)](_0x3f7831*0.75);for(let _0x329759=0x0;_0x329759<_0x4726e9[_0x353f06(0x7e1)];_0x329759++){if(_0x353f06(0x209)===_0x353f06(0x8e3))_0x26ce70[_0x353f06(0x723)](_0x4926f7,_0x590792);else{const _0x2523a0=this[_0x353f06(0x81b)](_0x150af5,_0x3f7831);_0x2523a0['bitmap'][_0x353f06(0x1af)](_0x4726e9[_0x329759],0x0,0x0,_0x150af5,_0x3f7831,'center'),_0x2523a0['x']=(_0x329759-(_0x4726e9[_0x353f06(0x7e1)]-0x1)/0x2)*_0x150af5,_0x2523a0['dy']=-_0x329759;}}},Sprite_Damage[_0x2bd3fa(0x77c)][_0x2bd3fa(0x693)]=function(){const _0x3d1264=_0x2bd3fa;return VisuMZ[_0x3d1264(0x249)][_0x3d1264(0x8fc)][_0x3d1264(0x762)]['DigitGroupingDamageSprites'];},Sprite_Damage[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1df)]=function(){const _0x1a995d=_0x2bd3fa;return ColorManager[_0x1a995d(0x38a)]();},VisuMZ['CoreEngine']['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x2bd3fa(0x77c)][_0x2bd3fa(0x771)],Sprite_Gauge[_0x2bd3fa(0x77c)][_0x2bd3fa(0x771)]=function(){const _0x5d6992=_0x2bd3fa;return VisuMZ[_0x5d6992(0x249)][_0x5d6992(0x692)][_0x5d6992(0x1f7)](this)['clamp'](0x0,0x1);},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x870)]=Sprite_Gauge[_0x2bd3fa(0x77c)]['currentValue'],Sprite_Gauge['prototype'][_0x2bd3fa(0x86d)]=function(){const _0x26a81c=_0x2bd3fa;let _0x496426=VisuMZ[_0x26a81c(0x249)]['Sprite_Gauge_currentValue'][_0x26a81c(0x1f7)](this);return _0x496426;},Sprite_Gauge[_0x2bd3fa(0x77c)][_0x2bd3fa(0x933)]=function(){const _0x282676=_0x2bd3fa;let _0x59afa1=this['currentValue']();this['useDigitGrouping']()&&(_0x59afa1=VisuMZ[_0x282676(0x862)](_0x59afa1));const _0x3feb58=this[_0x282676(0x6a5)]()-0x1,_0x432a9f=this['textHeight']?this[_0x282676(0x387)]():this[_0x282676(0x4a4)]();this[_0x282676(0x6ab)](),this[_0x282676(0x44e)][_0x282676(0x1af)](_0x59afa1,0x0,0x0,_0x3feb58,_0x432a9f,_0x282676(0x359));},Sprite_Gauge[_0x2bd3fa(0x77c)][_0x2bd3fa(0x47a)]=function(){return 0x3;},Sprite_Gauge[_0x2bd3fa(0x77c)][_0x2bd3fa(0x693)]=function(){const _0x109453=_0x2bd3fa;return VisuMZ[_0x109453(0x249)][_0x109453(0x8fc)]['QoL'][_0x109453(0x390)];},Sprite_Gauge[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1df)]=function(){const _0x20ea06=_0x2bd3fa;return ColorManager[_0x20ea06(0x8a0)]();},VisuMZ['CoreEngine'][_0x2bd3fa(0x282)]=Sprite_Picture[_0x2bd3fa(0x77c)]['loadBitmap'],Sprite_Picture['prototype'][_0x2bd3fa(0x723)]=function(){const _0x2b3fef=_0x2bd3fa;this[_0x2b3fef(0x87e)][_0x2b3fef(0x306)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x2b3fef(0x256)](Number(RegExp['$1'])):VisuMZ['CoreEngine'][_0x2b3fef(0x282)][_0x2b3fef(0x1f7)](this);},Sprite_Picture[_0x2bd3fa(0x77c)][_0x2bd3fa(0x256)]=function(_0x42d4f4){const _0xafac27=_0x2bd3fa,_0x473e05=ImageManager[_0xafac27(0x492)],_0x7d829a=ImageManager['iconHeight'],_0x3c584f=this[_0xafac27(0x87e)][_0xafac27(0x306)](/SMOOTH/i);this[_0xafac27(0x44e)]=new Bitmap(_0x473e05,_0x7d829a);const _0x41557=ImageManager[_0xafac27(0x55f)]('IconSet'),_0x3b0381=_0x42d4f4%0x10*_0x473e05,_0x30526f=Math['floor'](_0x42d4f4/0x10)*_0x7d829a;this['bitmap'][_0xafac27(0x340)]=_0x3c584f,this['bitmap'][_0xafac27(0x583)](_0x41557,_0x3b0381,_0x30526f,_0x473e05,_0x7d829a,0x0,0x0,_0x473e05,_0x7d829a);};function Sprite_TitlePictureButton(){const _0x408ed4=_0x2bd3fa;this[_0x408ed4(0x4d6)](...arguments);}Sprite_TitlePictureButton[_0x2bd3fa(0x77c)]=Object[_0x2bd3fa(0x5e4)](Sprite_Clickable[_0x2bd3fa(0x77c)]),Sprite_TitlePictureButton[_0x2bd3fa(0x77c)]['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton['prototype'][_0x2bd3fa(0x4d6)]=function(_0x2474ef){const _0xc07010=_0x2bd3fa;Sprite_Clickable['prototype'][_0xc07010(0x4d6)][_0xc07010(0x1f7)](this),this[_0xc07010(0x255)]=_0x2474ef,this[_0xc07010(0x223)]=null,this[_0xc07010(0x26e)]();},Sprite_TitlePictureButton[_0x2bd3fa(0x77c)][_0x2bd3fa(0x26e)]=function(){const _0x519f7f=_0x2bd3fa;this['x']=Graphics[_0x519f7f(0x73f)],this['y']=Graphics[_0x519f7f(0x30f)],this['visible']=![],this[_0x519f7f(0x654)]();},Sprite_TitlePictureButton[_0x2bd3fa(0x77c)]['setupButtonImage']=function(){const _0x1f63fc=_0x2bd3fa;this['bitmap']=ImageManager[_0x1f63fc(0x238)](this[_0x1f63fc(0x255)][_0x1f63fc(0x705)]),this[_0x1f63fc(0x44e)][_0x1f63fc(0x687)](this[_0x1f63fc(0x46f)][_0x1f63fc(0x174)](this));},Sprite_TitlePictureButton[_0x2bd3fa(0x77c)][_0x2bd3fa(0x46f)]=function(){const _0x398a37=_0x2bd3fa;this[_0x398a37(0x255)]['OnLoadJS'][_0x398a37(0x1f7)](this),this['_data'][_0x398a37(0x604)]['call'](this),this['setClickHandler'](this[_0x398a37(0x255)][_0x398a37(0x17c)]['bind'](this));},Sprite_TitlePictureButton[_0x2bd3fa(0x77c)][_0x2bd3fa(0x859)]=function(){const _0x4863c5=_0x2bd3fa;Sprite_Clickable['prototype'][_0x4863c5(0x859)][_0x4863c5(0x1f7)](this),this[_0x4863c5(0x858)](),this[_0x4863c5(0x4de)]();},Sprite_TitlePictureButton[_0x2bd3fa(0x77c)][_0x2bd3fa(0x62b)]=function(){const _0x30d12f=_0x2bd3fa;return VisuMZ[_0x30d12f(0x249)][_0x30d12f(0x8fc)]['MenuLayout']['Title']['ButtonFadeSpeed'];},Sprite_TitlePictureButton['prototype'][_0x2bd3fa(0x858)]=function(){const _0x376a53=_0x2bd3fa;if(this['_pressed']||this[_0x376a53(0x1d0)]){if(_0x376a53(0x773)===_0x376a53(0x5a1))return _0x376a53(0x233)[_0x376a53(0x5a0)](_0x36f651(_0x5d7b3f['$1']));else this[_0x376a53(0x8ed)]=0xff;}else this['opacity']+=this[_0x376a53(0x463)]?this[_0x376a53(0x62b)]():-0x1*this[_0x376a53(0x62b)](),this[_0x376a53(0x8ed)]=Math[_0x376a53(0x7fc)](0xc0,this[_0x376a53(0x8ed)]);},Sprite_TitlePictureButton[_0x2bd3fa(0x77c)][_0x2bd3fa(0x739)]=function(_0x5a9bf5){const _0x3e1079=_0x2bd3fa;this[_0x3e1079(0x223)]=_0x5a9bf5;},Sprite_TitlePictureButton['prototype'][_0x2bd3fa(0x38f)]=function(){const _0x1a1b56=_0x2bd3fa;if(this[_0x1a1b56(0x223)]){if(_0x1a1b56(0x964)!==_0x1a1b56(0x964)){this[_0x1a1b56(0x711)][_0x1a1b56(0x2e8)]();const _0x253dc3=_0x1caa7b['_pictureCoordinatesMode'],_0x3549a6=_0x316e4f[_0x1a1b56(0x4e6)](_0x253dc3);if(!_0x3549a6)return;this[_0x1a1b56(0x2d4)]=_0x3549a6[_0x1a1b56(0x215)],this[_0x1a1b56(0x670)]=_0x3549a6['_x'],this['_lastY']=_0x3549a6['_y'];const _0x534ac6=_0x43000b['itemBackColor1']();this[_0x1a1b56(0x711)][_0x1a1b56(0x602)](0x0,0x0,this['innerWidth'],this[_0x1a1b56(0x69a)],_0x534ac6);const _0x4b5614='\x20Origin:\x20%1'[_0x1a1b56(0x5a0)](_0x3549a6[_0x1a1b56(0x215)]===0x0?'Upper\x20Left':_0x1a1b56(0x6b2)),_0x1942b2=_0x1a1b56(0x643)[_0x1a1b56(0x5a0)](_0x3549a6['_x']),_0x4ab1a0=_0x1a1b56(0x632)['format'](_0x3549a6['_y']),_0xae32e1=_0x1a1b56(0x92a)[_0x1a1b56(0x5a0)](_0x491e7b[_0x1a1b56(0x855)](_0x1a1b56(0x391)));let _0x2cc8da=_0x391dfb[_0x1a1b56(0x7a0)](this[_0x1a1b56(0x683)]/0x4);this[_0x1a1b56(0x1af)](_0x4b5614,_0x2cc8da*0x0,0x0,_0x2cc8da),this[_0x1a1b56(0x1af)](_0x1942b2,_0x2cc8da*0x1,0x0,_0x2cc8da,_0x1a1b56(0x504)),this['drawText'](_0x4ab1a0,_0x2cc8da*0x2,0x0,_0x2cc8da,'center');const _0x2b654a=this['textSizeEx'](_0xae32e1)['width'],_0x20ab5b=this['innerWidth']-_0x2b654a;this[_0x1a1b56(0x536)](_0xae32e1,_0x20ab5b,0x0,_0x2b654a);}else this[_0x1a1b56(0x223)]();}},VisuMZ['CoreEngine'][_0x2bd3fa(0x68f)]=Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4d6)],Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4d6)]=function(){const _0x4f5416=_0x2bd3fa;VisuMZ[_0x4f5416(0x249)]['Spriteset_Base_initialize'][_0x4f5416(0x1f7)](this),this[_0x4f5416(0x3dc)]();},Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x3dc)]=function(){const _0x4270d7=_0x2bd3fa;this[_0x4270d7(0x354)]=[],this[_0x4270d7(0x88b)]=[],this['_cacheScaleX']=this['scale']['x'],this[_0x4270d7(0x339)]=this[_0x4270d7(0x722)]['y'];},VisuMZ[_0x2bd3fa(0x249)]['Spriteset_Base_destroy']=Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8b3)],Spriteset_Base['prototype']['destroy']=function(_0x3eeb55){const _0x47ad7c=_0x2bd3fa;this['removeAllFauxAnimations'](),this[_0x47ad7c(0x491)](),VisuMZ[_0x47ad7c(0x249)]['Spriteset_Base_destroy']['call'](this,_0x3eeb55);},VisuMZ['CoreEngine'][_0x2bd3fa(0x23f)]=Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x859)],Spriteset_Base['prototype'][_0x2bd3fa(0x859)]=function(){const _0x5e2ca3=_0x2bd3fa;VisuMZ['CoreEngine'][_0x5e2ca3(0x23f)]['call'](this),this[_0x5e2ca3(0x452)](),this['updateFauxAnimations'](),this['updatePointAnimations']();},Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x452)]=function(){const _0x56a2ee=_0x2bd3fa;if(!VisuMZ[_0x56a2ee(0x249)][_0x56a2ee(0x8fc)][_0x56a2ee(0x762)][_0x56a2ee(0x40d)])return;if(this['_cacheScaleX']===this[_0x56a2ee(0x722)]['x']&&this[_0x56a2ee(0x339)]===this[_0x56a2ee(0x722)]['y'])return;this[_0x56a2ee(0x70b)](),this['_cacheScaleX']=this[_0x56a2ee(0x722)]['x'],this[_0x56a2ee(0x339)]=this[_0x56a2ee(0x722)]['y'];},Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x70b)]=function(){const _0x8f1325=_0x2bd3fa;this[_0x8f1325(0x722)]['x']!==0x0&&(this[_0x8f1325(0x3b4)][_0x8f1325(0x722)]['x']=0x1/this[_0x8f1325(0x722)]['x'],this[_0x8f1325(0x3b4)]['x']=-(this['x']/this[_0x8f1325(0x722)]['x'])),this[_0x8f1325(0x722)]['y']!==0x0&&(this[_0x8f1325(0x3b4)][_0x8f1325(0x722)]['y']=0x1/this[_0x8f1325(0x722)]['y'],this[_0x8f1325(0x3b4)]['y']=-(this['y']/this[_0x8f1325(0x722)]['y']));},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x80f)]=Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8aa)],Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8aa)]=function(){const _0x1f9657=_0x2bd3fa;VisuMZ[_0x1f9657(0x249)][_0x1f9657(0x80f)][_0x1f9657(0x1f7)](this),this[_0x1f9657(0x3ee)]();},Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x3ee)]=function(){const _0x342bed=_0x2bd3fa;if(!$gameScreen)return;if($gameScreen[_0x342bed(0x918)]<=0x0)return;this['x']-=Math['round']($gameScreen['shake']());const _0x2ebd5b=$gameScreen[_0x342bed(0x208)]();switch($gameScreen[_0x342bed(0x208)]()){case _0x342bed(0x3f0):this['updatePositionCoreEngineShakeOriginal']();break;case _0x342bed(0x5fe):this['updatePositionCoreEngineShakeHorz']();break;case _0x342bed(0x89d):this[_0x342bed(0x5de)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x437)]=function(){const _0x1a800b=_0x2bd3fa,_0x207926=VisuMZ[_0x1a800b(0x249)][_0x1a800b(0x8fc)]['ScreenShake'];if(_0x207926&&_0x207926[_0x1a800b(0x376)]){if(_0x1a800b(0x4b2)==='oRBWA'){_0x4b11e1+=_0x583a3d;if(_0x38f570>=_0x337c86)_0x70956b=_0x5424ea-0x1;this[_0x1a800b(0x969)](_0xdaf195);}else return _0x207926[_0x1a800b(0x376)][_0x1a800b(0x1f7)](this);}this['x']+=Math[_0x1a800b(0x18a)]($gameScreen['shake']());},Spriteset_Base['prototype']['updatePositionCoreEngineShakeRand']=function(){const _0x137477=_0x2bd3fa,_0x1da598=VisuMZ[_0x137477(0x249)][_0x137477(0x8fc)][_0x137477(0x332)];if(_0x1da598&&_0x1da598[_0x137477(0x7dd)])return _0x1da598['randomJS'][_0x137477(0x1f7)](this);const _0x1e05bf=$gameScreen[_0x137477(0x772)]*0.75,_0x45eb43=$gameScreen['_shakeSpeed']*0.6,_0x5de069=$gameScreen[_0x137477(0x918)];this['x']+=Math['round'](Math[_0x137477(0x5ac)](_0x1e05bf)-Math[_0x137477(0x5ac)](_0x45eb43))*(Math['min'](_0x5de069,0x1e)*0.5),this['y']+=Math['round'](Math[_0x137477(0x5ac)](_0x1e05bf)-Math['randomInt'](_0x45eb43))*(Math[_0x137477(0x7fc)](_0x5de069,0x1e)*0.5);},Spriteset_Base['prototype']['updatePositionCoreEngineShakeHorz']=function(){const _0x5b5ae2=_0x2bd3fa,_0x4c036a=VisuMZ[_0x5b5ae2(0x249)][_0x5b5ae2(0x8fc)][_0x5b5ae2(0x332)];if(_0x4c036a&&_0x4c036a[_0x5b5ae2(0x211)]){if(_0x5b5ae2(0x3b9)===_0x5b5ae2(0x3b9))return _0x4c036a['horzJS'][_0x5b5ae2(0x1f7)](this);else this['_forcedBattleSys']='CTB';}const _0x128608=$gameScreen[_0x5b5ae2(0x772)]*0.75,_0x2976cf=$gameScreen[_0x5b5ae2(0x5c9)]*0.6,_0x3dd552=$gameScreen[_0x5b5ae2(0x918)];this['x']+=Math[_0x5b5ae2(0x18a)](Math[_0x5b5ae2(0x5ac)](_0x128608)-Math[_0x5b5ae2(0x5ac)](_0x2976cf))*(Math['min'](_0x3dd552,0x1e)*0.5);},Spriteset_Base[_0x2bd3fa(0x77c)]['updatePositionCoreEngineShakeVert']=function(){const _0x5a69b9=_0x2bd3fa,_0x414d8a=VisuMZ['CoreEngine'][_0x5a69b9(0x8fc)][_0x5a69b9(0x332)];if(_0x414d8a&&_0x414d8a[_0x5a69b9(0x7ba)])return _0x414d8a[_0x5a69b9(0x7ba)][_0x5a69b9(0x1f7)](this);const _0x265674=$gameScreen[_0x5a69b9(0x772)]*0.75,_0x19728c=$gameScreen[_0x5a69b9(0x5c9)]*0.6,_0x4a165d=$gameScreen[_0x5a69b9(0x918)];this['y']+=Math[_0x5a69b9(0x18a)](Math[_0x5a69b9(0x5ac)](_0x265674)-Math[_0x5a69b9(0x5ac)](_0x19728c))*(Math[_0x5a69b9(0x7fc)](_0x4a165d,0x1e)*0.5);},Spriteset_Base['prototype'][_0x2bd3fa(0x3e2)]=function(){const _0x4925e7=_0x2bd3fa;for(const _0x403e92 of this[_0x4925e7(0x354)]){_0x4925e7(0x64c)===_0x4925e7(0x7bc)?(this[_0x4925e7(0x76c)]=!![],this[_0x4925e7(0x859)](),_0x535b5a[_0x4925e7(0x21e)](),this['_playtestF7Looping']=![]):!_0x403e92[_0x4925e7(0x7d9)]()&&this[_0x4925e7(0x538)](_0x403e92);}this[_0x4925e7(0x543)]();},Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x543)]=function(){const _0x5127c0=_0x2bd3fa;for(;;){if(_0x5127c0(0x231)!==_0x5127c0(0x37b)){const _0x255c1e=$gameTemp[_0x5127c0(0x82a)]();if(_0x255c1e)_0x5127c0(0x1c8)==='AqZyZ'?this['createFauxAnimation'](_0x255c1e):_0x173e75+=_0x1e31aa+_0x5127c0(0x53f);else break;}else return _0x1a6330['CoreEngine'][_0x5127c0(0x8fc)]['Color'][_0x5127c0(0x2dc)][_0x5127c0(0x1f7)](this,_0x1abe89);}},Spriteset_Base['prototype'][_0x2bd3fa(0x873)]=function(_0x6515de){const _0x5f2f88=_0x2bd3fa,_0x4dd13f=$dataAnimations[_0x6515de[_0x5f2f88(0x4f8)]],_0x3959a9=_0x6515de[_0x5f2f88(0x7fe)],_0x21710b=_0x6515de[_0x5f2f88(0x879)],_0x34e4a2=_0x6515de[_0x5f2f88(0x8ab)];let _0x203477=this[_0x5f2f88(0x4fa)]();const _0x66247f=this['animationNextDelay']();if(this[_0x5f2f88(0x775)](_0x4dd13f))for(const _0x316e09 of _0x3959a9){this[_0x5f2f88(0x346)]([_0x316e09],_0x4dd13f,_0x21710b,_0x203477,_0x34e4a2),_0x203477+=_0x66247f;}else _0x5f2f88(0x5f1)!=='dKVtZ'?this[_0x5f2f88(0x6b5)]=_0x5f2f88(0x27c):this[_0x5f2f88(0x346)](_0x3959a9,_0x4dd13f,_0x21710b,_0x203477,_0x34e4a2);},Spriteset_Base[_0x2bd3fa(0x77c)]['createFauxAnimationSprite']=function(_0xb4cce6,_0x7cf9dc,_0x3584cb,_0x2190cf,_0x6a09e8){const _0x28bf87=_0x2bd3fa,_0xa151cb=this['isMVAnimation'](_0x7cf9dc),_0x150072=new(_0xa151cb?Sprite_AnimationMV:Sprite_Animation)(),_0x40414a=this[_0x28bf87(0x229)](_0xb4cce6);this[_0x28bf87(0x823)](_0xb4cce6[0x0])&&(_0x3584cb=!_0x3584cb),_0x150072[_0x28bf87(0x86e)]=_0xb4cce6,_0x150072['setup'](_0x40414a,_0x7cf9dc,_0x3584cb,_0x2190cf),_0x150072['setMute'](_0x6a09e8),this[_0x28bf87(0x6ac)][_0x28bf87(0x6b6)](_0x150072),this[_0x28bf87(0x354)][_0x28bf87(0x599)](_0x150072);},Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x538)]=function(_0x1194da){const _0x4d0bf4=_0x2bd3fa;this[_0x4d0bf4(0x354)][_0x4d0bf4(0x774)](_0x1194da),this['_effectsContainer'][_0x4d0bf4(0x535)](_0x1194da);for(const _0x11ae9a of _0x1194da['targetObjects']){_0x11ae9a[_0x4d0bf4(0x3e9)]&&_0x11ae9a[_0x4d0bf4(0x3e9)]();}_0x1194da[_0x4d0bf4(0x8b3)]();},Spriteset_Base['prototype'][_0x2bd3fa(0x175)]=function(){const _0x5319b1=_0x2bd3fa;for(const _0x5062ae of this[_0x5319b1(0x354)]){this[_0x5319b1(0x538)](_0x5062ae);}},Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x780)]=function(){const _0x29d468=_0x2bd3fa;return this[_0x29d468(0x354)][_0x29d468(0x7e1)]>0x0;},Spriteset_Base[_0x2bd3fa(0x77c)]['updatePointAnimations']=function(){const _0xa6dcb2=_0x2bd3fa;for(const _0x5bd74d of this[_0xa6dcb2(0x88b)]){if(!_0x5bd74d[_0xa6dcb2(0x7d9)]()){if(_0xa6dcb2(0x713)===_0xa6dcb2(0x3ae))return this[_0xa6dcb2(0x53b)]()?_0x2816dc[_0xa6dcb2(0x249)]['Game_Action_numRepeats'][_0xa6dcb2(0x1f7)](this):0x0;else this[_0xa6dcb2(0x49b)](_0x5bd74d);}}this[_0xa6dcb2(0x902)]();},Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x902)]=function(){const _0x3e86e0=_0x2bd3fa;for(;;){const _0x5d4863=$gameTemp[_0x3e86e0(0x667)]();if(_0x5d4863)_0x3e86e0(0x914)==='VdKGc'?this[_0x3e86e0(0x68a)](_0x5d4863):(_0x2c9868[_0x3e86e0(0x249)][_0x3e86e0(0x477)][_0x3e86e0(0x1f7)](this),_0x9ee91f[_0x3e86e0(0x8b5)](),this[_0x3e86e0(0x8ca)]());else{if(_0x3e86e0(0x424)!==_0x3e86e0(0x6a3))break;else this[_0x3e86e0(0x6b5)]=_0x3e86e0(0x731);}}},Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x68a)]=function(_0x1825b5){const _0x3ea47f=_0x2bd3fa,_0x34f37b=$dataAnimations[_0x1825b5[_0x3ea47f(0x4f8)]],_0x341aa6=this[_0x3ea47f(0x5b5)](_0x1825b5),_0x5e18f9=_0x1825b5['mirror'],_0x8276cc=_0x1825b5[_0x3ea47f(0x8ab)];let _0x371d5b=this['animationBaseDelay']();const _0x35ed30=this[_0x3ea47f(0x37f)]();if(this[_0x3ea47f(0x775)](_0x34f37b)){if(_0x3ea47f(0x3ab)!=='RLPRj'){if(!this[_0x3ea47f(0x825)]())return![];else{const _0xc95efa=_0x249a89['eventsXyNt'](_0x23e8e8,_0x11dea3)[_0x3ea47f(0x38e)](_0x6349c2=>_0x6349c2['isNormalPriority']());return _0xc95efa['length']>0x0;}}else for(const _0x6c9f3d of _0x341aa6){_0x3ea47f(0x205)===_0x3ea47f(0x205)?(this['createPointAnimationSprite']([_0x6c9f3d],_0x34f37b,_0x5e18f9,_0x371d5b,_0x8276cc),_0x371d5b+=_0x35ed30):this['drawText'](_0x967105['CoreEngine'][_0x3ea47f(0x8fc)]['Gold'][_0x3ea47f(0x198)],_0x50dbc7,_0x2826df,_0x1fa039,_0x3ea47f(0x359));}}else{if('CSMVu'!==_0x3ea47f(0x561)){const _0x47ce6d=_0x44cd81[_0x3ea47f(0x88f)]()<=_0x4b086f;_0x594baa[_0x3ea47f(0x3ce)](_0xf2498,_0x47ce6d);}else this[_0x3ea47f(0x369)](_0x341aa6,_0x34f37b,_0x5e18f9,_0x371d5b,_0x8276cc);}},Spriteset_Base[_0x2bd3fa(0x77c)]['createPointAnimationTargets']=function(_0x528703){const _0x262ba5=_0x2bd3fa,_0x2fe80d=new Sprite_Clickable();_0x2fe80d['x']=_0x528703['x'],_0x2fe80d['y']=_0x528703['y'],_0x2fe80d['z']=0x64;const _0x2c4e74=this[_0x262ba5(0x33f)]();return _0x2c4e74['addChild'](_0x2fe80d),[_0x2fe80d];},Spriteset_Base['prototype'][_0x2bd3fa(0x33f)]=function(){return this;},Spriteset_Map[_0x2bd3fa(0x77c)]['getPointAnimationLayer']=function(){const _0x4a222b=_0x2bd3fa;return this[_0x4a222b(0x549)]||this;},Spriteset_Battle[_0x2bd3fa(0x77c)][_0x2bd3fa(0x33f)]=function(){const _0x282192=_0x2bd3fa;return this[_0x282192(0x55b)]||this;},Spriteset_Base['prototype'][_0x2bd3fa(0x369)]=function(_0x15f64a,_0x1d1569,_0x184ae3,_0x586b18,_0x29fe1a){const _0x5b114b=_0x2bd3fa,_0x814273=this['isMVAnimation'](_0x1d1569),_0x220f86=new(_0x814273?Sprite_AnimationMV:Sprite_Animation)();_0x220f86['targetObjects']=_0x15f64a,_0x220f86['setup'](_0x15f64a,_0x1d1569,_0x184ae3,_0x586b18),_0x220f86[_0x5b114b(0x6a8)](_0x29fe1a),this[_0x5b114b(0x6ac)][_0x5b114b(0x6b6)](_0x220f86),this[_0x5b114b(0x88b)][_0x5b114b(0x599)](_0x220f86);},Spriteset_Base[_0x2bd3fa(0x77c)]['removePointAnimation']=function(_0xc30536){const _0x30c2e0=_0x2bd3fa;this[_0x30c2e0(0x88b)][_0x30c2e0(0x774)](_0xc30536),this[_0x30c2e0(0x6ac)][_0x30c2e0(0x535)](_0xc30536);for(const _0x161eac of _0xc30536[_0x30c2e0(0x86e)]){_0x161eac[_0x30c2e0(0x3e9)]&&_0x161eac[_0x30c2e0(0x3e9)]();const _0x2d73ce=this[_0x30c2e0(0x33f)]();if(_0x2d73ce)_0x2d73ce[_0x30c2e0(0x535)](_0x161eac);}_0xc30536[_0x30c2e0(0x8b3)]();},Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x491)]=function(){const _0x4f774c=_0x2bd3fa;for(const _0x4a5bcb of this['_pointAnimationSprites']){if(_0x4f774c(0x2ef)===_0x4f774c(0x6d9)){_0xe7d1ce[_0x4f774c(0x212)]();if(!_0x316301[_0x4f774c(0x481)]()){const _0x7b89c0=_0x1014d6[_0x4f774c(0x5f2)](_0x2112ef,'_blank');}else{const _0x35e5df=_0xb20008['platform']==_0x4f774c(0x96c)?_0x4f774c(0x5f2):_0x502451['platform']==_0x4f774c(0x676)?_0x4f774c(0x815):_0x4f774c(0x349);_0x213d95(_0x4f774c(0x8ac))[_0x4f774c(0x1bc)](_0x35e5df+'\x20'+_0x1d04de);}}else this[_0x4f774c(0x49b)](_0x4a5bcb);}},Spriteset_Base['prototype']['isPointAnimationPlaying']=function(){const _0x18d181=_0x2bd3fa;return this[_0x18d181(0x88b)][_0x18d181(0x7e1)]>0x0;},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x1f2)]=Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x569)],Spriteset_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x569)]=function(){const _0x13c9ea=_0x2bd3fa;return VisuMZ[_0x13c9ea(0x249)][_0x13c9ea(0x1f2)][_0x13c9ea(0x1f7)](this)||this[_0x13c9ea(0x5c4)]();},Spriteset_Battle['prototype']['createBackground']=function(){const _0x2a26ae=_0x2bd3fa;this[_0x2a26ae(0x630)]=new PIXI[(_0x2a26ae(0x80c))][(_0x2a26ae(0x2bb))](clamp=!![]),this[_0x2a26ae(0x2a1)]=new Sprite(),this[_0x2a26ae(0x2a1)]['bitmap']=SceneManager[_0x2a26ae(0x8d7)](),this[_0x2a26ae(0x2a1)]['filters']=[this['_backgroundFilter']],this['_baseSprite']['addChild'](this['_backgroundSprite']);},VisuMZ['CoreEngine'][_0x2bd3fa(0x6ca)]=Spriteset_Battle['prototype'][_0x2bd3fa(0x421)],Spriteset_Battle[_0x2bd3fa(0x77c)][_0x2bd3fa(0x421)]=function(){const _0x2738e9=_0x2bd3fa;this[_0x2738e9(0x4bc)]()&&(_0x2738e9(0x532)===_0x2738e9(0x532)?this[_0x2738e9(0x8bb)]():(_0x3e7b89=_0x204cdc(_0x18cbe3['$1'])*_0x49064d[_0x2738e9(0x73f)],_0x27198e=(0x1-_0x116002(_0x47ea11['$2']))*-_0x511058)),VisuMZ[_0x2738e9(0x249)][_0x2738e9(0x6ca)]['call'](this);},Spriteset_Battle['prototype'][_0x2bd3fa(0x4bc)]=function(){const _0x3dac73=_0x2bd3fa,_0x50edd0=VisuMZ[_0x3dac73(0x249)]['Settings']['ScreenResolution'];if(!_0x50edd0)return![];if(Utils[_0x3dac73(0x7b6)]>='1.3.0'&&!_0x50edd0[_0x3dac73(0x861)])return![];return _0x50edd0[_0x3dac73(0x74f)];},Spriteset_Battle[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8bb)]=function(){const _0x31aa7e=_0x2bd3fa;for(member of $gameTroop[_0x31aa7e(0x3ed)]()){member[_0x31aa7e(0x26a)]();}},VisuMZ[_0x2bd3fa(0x249)]['Window_Base_initialize']=Window_Base['prototype'][_0x2bd3fa(0x4d6)],Window_Base[_0x2bd3fa(0x77c)]['initialize']=function(_0x4a73e0){const _0x57029e=_0x2bd3fa;_0x4a73e0['x']=Math[_0x57029e(0x18a)](_0x4a73e0['x']),_0x4a73e0['y']=Math[_0x57029e(0x18a)](_0x4a73e0['y']),_0x4a73e0[_0x57029e(0x73f)]=Math[_0x57029e(0x18a)](_0x4a73e0[_0x57029e(0x73f)]),_0x4a73e0[_0x57029e(0x30f)]=Math[_0x57029e(0x18a)](_0x4a73e0[_0x57029e(0x30f)]),this['initDigitGrouping'](),VisuMZ['CoreEngine'][_0x57029e(0x326)][_0x57029e(0x1f7)](this,_0x4a73e0),this['initCoreEasing']();},Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x718)]=function(){const _0x4f4285=_0x2bd3fa;this['_digitGrouping']=VisuMZ['CoreEngine'][_0x4f4285(0x8fc)][_0x4f4285(0x762)]['DigitGroupingStandardText'],this[_0x4f4285(0x1ca)]=VisuMZ[_0x4f4285(0x249)][_0x4f4285(0x8fc)]['QoL'][_0x4f4285(0x4ab)];},Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4fb)]=function(){const _0x13a747=_0x2bd3fa;return VisuMZ[_0x13a747(0x249)][_0x13a747(0x8fc)]['Window'][_0x13a747(0x263)];},Window_Base[_0x2bd3fa(0x77c)]['itemPadding']=function(){const _0x9de50=_0x2bd3fa;return VisuMZ[_0x9de50(0x249)][_0x9de50(0x8fc)][_0x9de50(0x45a)]['ItemPadding'];},Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5bc)]=function(){const _0x3e0d17=_0x2bd3fa;$gameSystem[_0x3e0d17(0x529)]?this[_0x3e0d17(0x6dd)]=$gameSystem[_0x3e0d17(0x529)]():this[_0x3e0d17(0x6dd)]=VisuMZ[_0x3e0d17(0x249)][_0x3e0d17(0x8fc)]['Window']['BackOpacity'];},Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x436)]=function(){const _0x44cc9a=_0x2bd3fa;return VisuMZ['CoreEngine']['Settings'][_0x44cc9a(0x45a)][_0x44cc9a(0x729)];},Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1e0)]=function(){const _0x10cb1f=_0x2bd3fa;return VisuMZ[_0x10cb1f(0x249)][_0x10cb1f(0x8fc)][_0x10cb1f(0x45a)][_0x10cb1f(0x58f)];},VisuMZ['CoreEngine'][_0x2bd3fa(0x539)]=Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x859)],Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x859)]=function(){const _0x3f6dc9=_0x2bd3fa;VisuMZ[_0x3f6dc9(0x249)][_0x3f6dc9(0x539)][_0x3f6dc9(0x1f7)](this),this['updateCoreEasing']();},Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x557)]=function(){const _0x271344=_0x2bd3fa;if(this['_opening']){if(_0x271344(0x36d)===_0x271344(0x58a)){_0x3de0d9=_0x4fb148(_0x5abd8b||'')['toUpperCase']();const _0x1db020=_0x59392a['CoreEngine'][_0x271344(0x8fc)][_0x271344(0x7f9)];if(_0x324a14===_0x271344(0x274))return _0x17ad9e[_0x271344(0x833)][_0x271344(0x50b)][0x0];if(_0x5cdbf4===_0x271344(0x881))return _0x457ffd['terms'][_0x271344(0x50b)][0x1];if(_0xe66126==='ATK')return _0x5ee403['terms'][_0x271344(0x50b)][0x2];if(_0x446d5e===_0x271344(0x62f))return _0x2e903e[_0x271344(0x833)][_0x271344(0x50b)][0x3];if(_0x994e98===_0x271344(0x1ba))return _0x5a4d51[_0x271344(0x833)][_0x271344(0x50b)][0x4];if(_0x5434ee===_0x271344(0x335))return _0x3f5d37['terms'][_0x271344(0x50b)][0x5];if(_0x410553===_0x271344(0x2bc))return _0x560e5d['terms'][_0x271344(0x50b)][0x6];if(_0x1437dc==='LUK')return _0x6e6afa[_0x271344(0x833)][_0x271344(0x50b)][0x7];if(_0x31ce57===_0x271344(0x362))return _0x1db020[_0x271344(0x234)];if(_0x889a9f==='EVA')return _0x1db020[_0x271344(0x957)];if(_0x510ae2===_0x271344(0x8da))return _0x1db020[_0x271344(0x19f)];if(_0x1bda4d===_0x271344(0x20d))return _0x1db020['XParamVocab3'];if(_0x3a73b8===_0x271344(0x8db))return _0x1db020[_0x271344(0x449)];if(_0x21250b==='MRF')return _0x1db020['XParamVocab5'];if(_0x534933===_0x271344(0x2c6))return _0x1db020[_0x271344(0x2c0)];if(_0x1185bd==='HRG')return _0x1db020[_0x271344(0x526)];if(_0x28e6a4===_0x271344(0x574))return _0x1db020[_0x271344(0x876)];if(_0x57e7c5==='TRG')return _0x1db020[_0x271344(0x8a7)];if(_0x297f2e===_0x271344(0x8b4))return _0x1db020[_0x271344(0x370)];if(_0xf6aaa2===_0x271344(0x30a))return _0x1db020['SParamVocab1'];if(_0x37e6be==='REC')return _0x1db020['SParamVocab2'];if(_0x2e59d2===_0x271344(0x20a))return _0x1db020['SParamVocab3'];if(_0x1c4230===_0x271344(0x502))return _0x1db020[_0x271344(0x378)];if(_0x2b992b==='TCR')return _0x1db020[_0x271344(0x603)];if(_0x4bb5d9===_0x271344(0x334))return _0x1db020[_0x271344(0x605)];if(_0x4caf61===_0x271344(0x3da))return _0x1db020['SParamVocab7'];if(_0x1cae76===_0x271344(0x5d6))return _0x1db020[_0x271344(0x310)];if(_0x38e70b===_0x271344(0x2e4))return _0x1db020[_0x271344(0x4f0)];if(_0x27dd81[_0x271344(0x249)][_0x271344(0x6bf)][_0xa0b1d7])return _0x16fcf0[_0x271344(0x249)][_0x271344(0x6bf)][_0x337719];return'';}else this[_0x271344(0x19e)]+=this[_0x271344(0x1e0)](),this[_0x271344(0x8f4)]()&&(this[_0x271344(0x2b3)]=![]);}},Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x459)]=function(){const _0x52d63d=_0x2bd3fa;if(this[_0x52d63d(0x18b)]){this[_0x52d63d(0x19e)]-=this[_0x52d63d(0x1e0)]();if(this[_0x52d63d(0x745)]()){if(_0x52d63d(0x3a9)===_0x52d63d(0x3a9))this[_0x52d63d(0x18b)]=![];else{if(_0x4c1e12['CoreEngine'][_0x52d63d(0x8fc)][_0x52d63d(0x762)]['KeyItemProtect']&&_0x5a8bfb['isKeyItem'](_0xa2373))return;_0x56fb35[_0x52d63d(0x249)][_0x52d63d(0x351)][_0x52d63d(0x1f7)](this,_0x46fd8b);}}}},VisuMZ['CoreEngine']['Window_Base_drawText']=Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1af)],Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1af)]=function(_0x44a4c8,_0x5a9c32,_0x105ec2,_0xc53419,_0x5919c5){const _0x8fc1df=_0x2bd3fa;if(this[_0x8fc1df(0x693)]())_0x44a4c8=VisuMZ[_0x8fc1df(0x862)](_0x44a4c8);VisuMZ['CoreEngine'][_0x8fc1df(0x337)][_0x8fc1df(0x1f7)](this,_0x44a4c8,_0x5a9c32,_0x105ec2,_0xc53419,_0x5919c5);},Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x693)]=function(){const _0x5a1917=_0x2bd3fa;return this[_0x5a1917(0x843)];},VisuMZ['CoreEngine'][_0x2bd3fa(0x85e)]=Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x564)],Window_Base['prototype'][_0x2bd3fa(0x564)]=function(_0x2819c1,_0xfba1dd,_0x1c1934,_0x50d739){const _0x5d9f42=_0x2bd3fa;var _0x1a6db6=VisuMZ['CoreEngine']['Window_Base_createTextState'][_0x5d9f42(0x1f7)](this,_0x2819c1,_0xfba1dd,_0x1c1934,_0x50d739);if(this[_0x5d9f42(0x88c)]())_0x1a6db6['text']=VisuMZ[_0x5d9f42(0x862)](_0x1a6db6['text']);return _0x1a6db6;},Window_Base['prototype'][_0x2bd3fa(0x88c)]=function(){return this['_digitGroupingEx'];},Window_Base[_0x2bd3fa(0x77c)]['enableDigitGrouping']=function(_0x1d34fe){const _0x45fbeb=_0x2bd3fa;this[_0x45fbeb(0x843)]=_0x1d34fe;},Window_Base['prototype']['enableDigitGroupingEx']=function(_0x4a82e1){const _0x3359b5=_0x2bd3fa;this[_0x3359b5(0x1ca)]=_0x4a82e1;},VisuMZ['CoreEngine']['Window_Base_drawIcon']=Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8c8)],Window_Base[_0x2bd3fa(0x77c)]['drawIcon']=function(_0x20770f,_0x4e41bf,_0x1e7f44){const _0x3f38ba=_0x2bd3fa;_0x4e41bf=Math[_0x3f38ba(0x18a)](_0x4e41bf),_0x1e7f44=Math['round'](_0x1e7f44),VisuMZ['CoreEngine'][_0x3f38ba(0x743)]['call'](this,_0x20770f,_0x4e41bf,_0x1e7f44);},VisuMZ['CoreEngine'][_0x2bd3fa(0x466)]=Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x3c1)],Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x3c1)]=function(_0x5da60d,_0x12a718,_0x4ee695,_0x2ee88b,_0x26e7cd,_0x288261){const _0x1c2a7a=_0x2bd3fa;_0x26e7cd=_0x26e7cd||ImageManager[_0x1c2a7a(0x8e4)],_0x288261=_0x288261||ImageManager[_0x1c2a7a(0x8a6)],_0x4ee695=Math[_0x1c2a7a(0x18a)](_0x4ee695),_0x2ee88b=Math[_0x1c2a7a(0x18a)](_0x2ee88b),_0x26e7cd=Math[_0x1c2a7a(0x18a)](_0x26e7cd),_0x288261=Math[_0x1c2a7a(0x18a)](_0x288261),VisuMZ['CoreEngine'][_0x1c2a7a(0x466)][_0x1c2a7a(0x1f7)](this,_0x5da60d,_0x12a718,_0x4ee695,_0x2ee88b,_0x26e7cd,_0x288261);},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x85d)]=Window_Base[_0x2bd3fa(0x77c)]['drawCharacter'],Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x74d)]=function(_0x3cf704,_0x392082,_0x5f3c19,_0x579ec5){const _0x24e481=_0x2bd3fa;_0x5f3c19=Math['round'](_0x5f3c19),_0x579ec5=Math[_0x24e481(0x18a)](_0x579ec5),VisuMZ[_0x24e481(0x249)][_0x24e481(0x85d)][_0x24e481(0x1f7)](this,_0x3cf704,_0x392082,_0x5f3c19,_0x579ec5);},VisuMZ[_0x2bd3fa(0x249)]['Window_Selectable_itemRect']=Window_Selectable[_0x2bd3fa(0x77c)][_0x2bd3fa(0x637)],Window_Selectable[_0x2bd3fa(0x77c)]['itemRect']=function(_0x21a27a){const _0x4c43c7=_0x2bd3fa;let _0x787492=VisuMZ[_0x4c43c7(0x249)][_0x4c43c7(0x920)]['call'](this,_0x21a27a);return _0x787492['x']=Math[_0x4c43c7(0x18a)](_0x787492['x']),_0x787492['y']=Math[_0x4c43c7(0x18a)](_0x787492['y']),_0x787492[_0x4c43c7(0x73f)]=Math[_0x4c43c7(0x18a)](_0x787492['width']),_0x787492[_0x4c43c7(0x30f)]=Math[_0x4c43c7(0x18a)](_0x787492[_0x4c43c7(0x30f)]),_0x787492;},VisuMZ['CoreEngine'][_0x2bd3fa(0x5e2)]=Window_StatusBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x947)],Window_StatusBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x947)]=function(_0x4b0db0,_0x3d8c8c,_0x3f9fbd){const _0x421e6e=_0x2bd3fa;_0x3d8c8c=Math[_0x421e6e(0x18a)](_0x3d8c8c),_0x3f9fbd=Math[_0x421e6e(0x18a)](_0x3f9fbd),VisuMZ['CoreEngine'][_0x421e6e(0x5e2)][_0x421e6e(0x1f7)](this,_0x4b0db0,_0x3d8c8c,_0x3f9fbd);},Window_Base[_0x2bd3fa(0x77c)]['initCoreEasing']=function(){const _0x48c964=_0x2bd3fa;this[_0x48c964(0x87b)]={'duration':0x0,'wholeDuration':0x0,'type':_0x48c964(0x8fd),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this[_0x48c964(0x722)]['y'],'targetOpacity':this[_0x48c964(0x8ed)],'targetBackOpacity':this[_0x48c964(0x6dd)],'targetContentsOpacity':this[_0x48c964(0x7b5)]};},Window_Base['prototype']['updateCoreEasing']=function(){const _0x23dcca=_0x2bd3fa;if(!this[_0x23dcca(0x87b)])return;if(this[_0x23dcca(0x87b)][_0x23dcca(0x218)]<=0x0)return;this['x']=this[_0x23dcca(0x2fb)](this['x'],this[_0x23dcca(0x87b)][_0x23dcca(0x2dd)]),this['y']=this[_0x23dcca(0x2fb)](this['y'],this['_coreEasing'][_0x23dcca(0x7b3)]),this['scale']['x']=this[_0x23dcca(0x2fb)](this[_0x23dcca(0x722)]['x'],this['_coreEasing'][_0x23dcca(0x854)]),this[_0x23dcca(0x722)]['y']=this[_0x23dcca(0x2fb)](this[_0x23dcca(0x722)]['y'],this['_coreEasing']['targetScaleY']),this[_0x23dcca(0x8ed)]=this['applyCoreEasing'](this['opacity'],this['_coreEasing'][_0x23dcca(0x3dd)]),this['backOpacity']=this[_0x23dcca(0x2fb)](this[_0x23dcca(0x6dd)],this[_0x23dcca(0x87b)][_0x23dcca(0x38b)]),this[_0x23dcca(0x7b5)]=this[_0x23dcca(0x2fb)](this['contentsOpacity'],this[_0x23dcca(0x87b)][_0x23dcca(0x5d5)]),this[_0x23dcca(0x87b)][_0x23dcca(0x218)]--;},Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x2fb)]=function(_0x240782,_0x4d8e91){const _0x5c37e5=_0x2bd3fa;if(!this[_0x5c37e5(0x87b)])return _0x4d8e91;const _0x2ac3b6=this[_0x5c37e5(0x87b)][_0x5c37e5(0x218)],_0x3cd077=this[_0x5c37e5(0x87b)][_0x5c37e5(0x7de)],_0xfd9ca7=this['calcCoreEasing']((_0x3cd077-_0x2ac3b6)/_0x3cd077),_0x224715=this[_0x5c37e5(0x505)]((_0x3cd077-_0x2ac3b6+0x1)/_0x3cd077),_0x38b092=(_0x240782-_0x4d8e91*_0xfd9ca7)/(0x1-_0xfd9ca7);return _0x38b092+(_0x4d8e91-_0x38b092)*_0x224715;},Window_Base['prototype'][_0x2bd3fa(0x505)]=function(_0x430465){const _0x5cb453=_0x2bd3fa;if(!this[_0x5cb453(0x87b)])return _0x430465;return VisuMZ[_0x5cb453(0x616)](_0x430465,this[_0x5cb453(0x87b)][_0x5cb453(0x3aa)]||_0x5cb453(0x8fd));},Window_Base[_0x2bd3fa(0x77c)]['anchorCoreEasing']=function(_0x35d52c,_0x41b307){const _0x26b41f=_0x2bd3fa;if(!this['_coreEasing'])return;this['x']=this[_0x26b41f(0x87b)][_0x26b41f(0x2dd)],this['y']=this[_0x26b41f(0x87b)][_0x26b41f(0x7b3)],this[_0x26b41f(0x722)]['x']=this[_0x26b41f(0x87b)][_0x26b41f(0x854)],this[_0x26b41f(0x722)]['y']=this[_0x26b41f(0x87b)]['targetScaleY'],this['opacity']=this[_0x26b41f(0x87b)][_0x26b41f(0x3dd)],this[_0x26b41f(0x6dd)]=this[_0x26b41f(0x87b)][_0x26b41f(0x38b)],this[_0x26b41f(0x7b5)]=this[_0x26b41f(0x87b)]['targetContentsOpacity'],this['setupCoreEasing'](_0x35d52c,_0x41b307,this['x'],this['y'],this[_0x26b41f(0x722)]['x'],this[_0x26b41f(0x722)]['y'],this[_0x26b41f(0x8ed)],this['backOpacity'],this['contentsOpacity']);},Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x868)]=function(_0x4b2a84,_0x123beb,_0x587ae1,_0x1fadf6,_0x52d71c,_0x25c603,_0x1f843d,_0xd57582,_0x26bcab){this['_coreEasing']={'duration':_0x4b2a84,'wholeDuration':_0x4b2a84,'type':_0x123beb,'targetX':_0x587ae1,'targetY':_0x1fadf6,'targetScaleX':_0x52d71c,'targetScaleY':_0x25c603,'targetOpacity':_0x1f843d,'targetBackOpacity':_0xd57582,'targetContentsOpacity':_0x26bcab};},Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x2cf)]=function(_0x2d1cb7,_0x370ad1,_0x535363,_0x25ce58,_0x5f31f9){const _0x81264e=_0x2bd3fa;this[_0x81264e(0x691)](),this[_0x81264e(0x711)]['fontSize']=VisuMZ[_0x81264e(0x249)][_0x81264e(0x8fc)][_0x81264e(0x3d3)]['GoldFontSize'];const _0x2ac66a=VisuMZ[_0x81264e(0x249)]['Settings'][_0x81264e(0x3d3)]['GoldIcon'];if(_0x2ac66a>0x0&&_0x370ad1===TextManager[_0x81264e(0x8e7)]){const _0x2b89e4=_0x25ce58+(this['lineHeight']()-ImageManager[_0x81264e(0x250)])/0x2;this['drawIcon'](_0x2ac66a,_0x535363+(_0x5f31f9-ImageManager[_0x81264e(0x492)]),_0x2b89e4),_0x5f31f9-=ImageManager[_0x81264e(0x492)]+0x4;}else this[_0x81264e(0x1bf)](ColorManager[_0x81264e(0x2b1)]()),this[_0x81264e(0x1af)](_0x370ad1,_0x535363,_0x25ce58,_0x5f31f9,_0x81264e(0x359)),_0x5f31f9-=this[_0x81264e(0x4ff)](_0x370ad1)+0x6;this[_0x81264e(0x610)]();const _0x498840=this[_0x81264e(0x4ff)](this[_0x81264e(0x843)]?VisuMZ['GroupDigits'](_0x2d1cb7):_0x2d1cb7);_0x498840>_0x5f31f9?this[_0x81264e(0x1af)](VisuMZ['CoreEngine'][_0x81264e(0x8fc)]['Gold'][_0x81264e(0x198)],_0x535363,_0x25ce58,_0x5f31f9,_0x81264e(0x359)):this[_0x81264e(0x1af)](_0x2d1cb7,_0x535363,_0x25ce58,_0x5f31f9,_0x81264e(0x359)),this[_0x81264e(0x691)]();},Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x885)]=function(_0x31f14b,_0x4e0d20,_0x310ff3,_0x1a1011,_0x27fe6d){const _0x291083=_0x2bd3fa,_0x548bc7=ImageManager[_0x291083(0x55f)](_0x291083(0x43c)),_0x7acd=ImageManager[_0x291083(0x492)],_0x21c37c=ImageManager['iconHeight'],_0x10e45d=_0x31f14b%0x10*_0x7acd,_0x2bd404=Math[_0x291083(0x7a0)](_0x31f14b/0x10)*_0x21c37c,_0x51cc23=_0x1a1011,_0x271bad=_0x1a1011;this['contents'][_0x291083(0x1c2)][_0x291083(0x48b)]=_0x27fe6d,this[_0x291083(0x711)]['blt'](_0x548bc7,_0x10e45d,_0x2bd404,_0x7acd,_0x21c37c,_0x4e0d20,_0x310ff3,_0x51cc23,_0x271bad),this[_0x291083(0x711)]['_context']['imageSmoothingEnabled']=!![];},Window_Base[_0x2bd3fa(0x77c)]['drawGauge']=function(_0x1e69e7,_0x4b6e33,_0x36f07e,_0x104aa2,_0x2e109e,_0x256747){const _0x3dfe67=_0x2bd3fa,_0x4879bb=Math[_0x3dfe67(0x7a0)]((_0x36f07e-0x2)*_0x104aa2),_0x7b8d41=Sprite_Gauge[_0x3dfe67(0x77c)]['gaugeHeight'][_0x3dfe67(0x1f7)](this),_0x579b47=_0x4b6e33+this[_0x3dfe67(0x4fb)]()-_0x7b8d41-0x2;this[_0x3dfe67(0x711)]['fillRect'](_0x1e69e7,_0x579b47,_0x36f07e,_0x7b8d41,ColorManager[_0x3dfe67(0x469)]()),this[_0x3dfe67(0x711)][_0x3dfe67(0x450)](_0x1e69e7+0x1,_0x579b47+0x1,_0x4879bb,_0x7b8d41-0x2,_0x2e109e,_0x256747);},Window_Selectable['prototype'][_0x2bd3fa(0x81f)]=function(_0xe9b3c9){const _0xf028=_0x2bd3fa;let _0x14cb50=this[_0xf028(0x59b)]();const _0x296af2=this[_0xf028(0x70e)](),_0x55c405=this[_0xf028(0x623)]();if(this['isUseModernControls']()&&(_0x14cb50<_0x296af2||_0xe9b3c9&&_0x55c405===0x1)){_0x14cb50+=_0x55c405;if(_0x14cb50>=_0x296af2)_0x14cb50=_0x296af2-0x1;this['smoothSelect'](_0x14cb50);}else{if(!this[_0xf028(0x3cb)]()){if(_0x14cb50<_0x296af2-_0x55c405||_0xe9b3c9&&_0x55c405===0x1){if(_0xf028(0x484)==='UyXXS')return this[_0xf028(0x44c)]&&this[_0xf028(0x44c)]['visible']?_0x56c11e[_0xf028(0x594)]:'';else this[_0xf028(0x969)]((_0x14cb50+_0x55c405)%_0x296af2);}}}},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x572)]=Window_Selectable[_0x2bd3fa(0x77c)]['cursorDown'],Window_Selectable[_0x2bd3fa(0x77c)][_0x2bd3fa(0x81f)]=function(_0x829e9f){const _0x35af5f=_0x2bd3fa;if(this[_0x35af5f(0x3cb)]()&&_0x829e9f&&this[_0x35af5f(0x623)]()===0x1&&this[_0x35af5f(0x59b)]()===this[_0x35af5f(0x70e)]()-0x1){if(_0x35af5f(0x838)!==_0x35af5f(0x75a))this[_0x35af5f(0x969)](0x0);else return this[_0x35af5f(0x88e)]()[_0x35af5f(0x4ce)];}else VisuMZ[_0x35af5f(0x249)]['Window_Selectable_cursorDown'][_0x35af5f(0x1f7)](this,_0x829e9f);},Window_Selectable['prototype'][_0x2bd3fa(0x703)]=function(_0x3d093e){const _0x224f92=_0x2bd3fa;let _0x4b52b2=Math[_0x224f92(0x523)](0x0,this[_0x224f92(0x59b)]());const _0x298f5f=this['maxItems'](),_0x208b02=this[_0x224f92(0x623)]();if(this['isUseModernControls']()&&_0x4b52b2>0x0||_0x3d093e&&_0x208b02===0x1){_0x4b52b2-=_0x208b02;if(_0x4b52b2<=0x0)_0x4b52b2=0x0;this['smoothSelect'](_0x4b52b2);}else!this[_0x224f92(0x3cb)]()&&(_0x224f92(0x1e5)==='nEpYg'?this[_0x224f92(0x873)](_0x10dbdc):(_0x4b52b2>=_0x208b02||_0x3d093e&&_0x208b02===0x1)&&this[_0x224f92(0x969)]((_0x4b52b2-_0x208b02+_0x298f5f)%_0x298f5f));},VisuMZ['CoreEngine']['Window_Selectable_cursorUp']=Window_Selectable[_0x2bd3fa(0x77c)]['cursorUp'],Window_Selectable['prototype'][_0x2bd3fa(0x703)]=function(_0xf78659){const _0x3c9d4e=_0x2bd3fa;this[_0x3c9d4e(0x3cb)]()&&_0xf78659&&this[_0x3c9d4e(0x623)]()===0x1&&this[_0x3c9d4e(0x59b)]()===0x0?this[_0x3c9d4e(0x969)](this[_0x3c9d4e(0x70e)]()-0x1):'QUlRe'==='QUlRe'?VisuMZ[_0x3c9d4e(0x249)][_0x3c9d4e(0x4d2)][_0x3c9d4e(0x1f7)](this,_0xf78659):this[_0x3c9d4e(0x703)](_0xe05aac[_0x3c9d4e(0x19c)]('up'));},Window_Selectable[_0x2bd3fa(0x77c)][_0x2bd3fa(0x3cb)]=function(){const _0x2ae21b=_0x2bd3fa;return VisuMZ[_0x2ae21b(0x249)]['Settings'][_0x2ae21b(0x762)][_0x2ae21b(0x4e7)];},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x8d9)]=Window_Selectable['prototype'][_0x2bd3fa(0x56d)],Window_Selectable['prototype']['processCursorMove']=function(){const _0x10742e=_0x2bd3fa;if(this[_0x10742e(0x3cb)]()){if(_0x10742e(0x3f5)===_0x10742e(0x3f5))this[_0x10742e(0x83f)](),this[_0x10742e(0x1e6)]();else return _0x10742e(0x409);}else _0x10742e(0x298)!==_0x10742e(0x298)?_0x2ec197[_0x10742e(0x249)][_0x10742e(0x8fc)]['UI'][_0x10742e(0x29b)]?this['setActorHomeRepositioned'](_0x508e54):_0x26bf79[_0x10742e(0x249)][_0x10742e(0x56f)][_0x10742e(0x1f7)](this,_0xf97914):VisuMZ[_0x10742e(0x249)][_0x10742e(0x8d9)][_0x10742e(0x1f7)](this);},Window_Selectable[_0x2bd3fa(0x77c)][_0x2bd3fa(0x41b)]=function(){return!![];},Window_Selectable['prototype'][_0x2bd3fa(0x83f)]=function(){const _0x375a10=_0x2bd3fa;if(this[_0x375a10(0x7e6)]()){if(_0x375a10(0x361)===_0x375a10(0x4a3))this[_0x375a10(0x217)]();else{const _0x4b48af=this['index']();Input['isRepeated'](_0x375a10(0x6d0))&&(Input[_0x375a10(0x451)](_0x375a10(0x45b))&&this['allowShiftScrolling']()?this['cursorPagedown']():this['cursorDown'](Input[_0x375a10(0x19c)](_0x375a10(0x6d0))));if(Input['isRepeated']('up')){if(Input[_0x375a10(0x451)](_0x375a10(0x45b))&&this['allowShiftScrolling']()){if(_0x375a10(0x56b)!=='BnKQK')this[_0x375a10(0x25f)]();else return _0x5b8c15[_0x375a10(0x77c)][_0x375a10(0x5e5)][_0x375a10(0x1f7)](this);}else _0x375a10(0x66c)===_0x375a10(0x66c)?this['cursorUp'](Input[_0x375a10(0x19c)]('up')):this['_colorCache'][_0x2e620b]=_0x375a10(0x233)['format'](_0x54ecd5(_0x3e8605['$1']));}if(Input[_0x375a10(0x499)](_0x375a10(0x359))){if('vXTSJ'===_0x375a10(0x95c))this[_0x375a10(0x598)](Input['isTriggered'](_0x375a10(0x359)));else return-0.5*(_0x1ed669[_0x375a10(0x91d)](0x1-_0x4e59cc*_0x529fb2)-0x1);}Input[_0x375a10(0x499)](_0x375a10(0x811))&&this[_0x375a10(0x75e)](Input['isTriggered']('left')),!this[_0x375a10(0x94d)](_0x375a10(0x1b0))&&Input[_0x375a10(0x499)](_0x375a10(0x1b0))&&this['cursorPagedown'](),!this[_0x375a10(0x94d)](_0x375a10(0x92c))&&Input['isRepeated'](_0x375a10(0x92c))&&this['cursorPageup'](),this[_0x375a10(0x59b)]()!==_0x4b48af&&this[_0x375a10(0x631)]();}}},Window_Selectable[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1e6)]=function(){const _0x20a927=_0x2bd3fa;if(this[_0x20a927(0x7e6)]()){const _0x42e74b=this[_0x20a927(0x59b)]();Input[_0x20a927(0x19c)](_0x20a927(0x6ec))&&this[_0x20a927(0x969)](Math[_0x20a927(0x7fc)](this[_0x20a927(0x59b)](),0x0)),Input[_0x20a927(0x19c)](_0x20a927(0x59f))&&this[_0x20a927(0x969)](Math[_0x20a927(0x523)](this['index'](),this[_0x20a927(0x70e)]()-0x1)),this['index']()!==_0x42e74b&&this[_0x20a927(0x631)]();}},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x473)]=Window_Selectable['prototype'][_0x2bd3fa(0x4de)],Window_Selectable[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4de)]=function(){const _0x516843=_0x2bd3fa;if(this[_0x516843(0x3cb)]())this[_0x516843(0x807)]();else{if(_0x516843(0x54d)!=='ZcnMu')VisuMZ[_0x516843(0x249)][_0x516843(0x473)][_0x516843(0x1f7)](this);else return this[_0x516843(0x45f)];}},Window_Selectable['prototype'][_0x2bd3fa(0x807)]=function(){const _0x2de4b7=_0x2bd3fa;VisuMZ[_0x2de4b7(0x249)][_0x2de4b7(0x473)][_0x2de4b7(0x1f7)](this);},Window_Selectable[_0x2bd3fa(0x77c)][_0x2bd3fa(0x322)]=function(){const _0x44a4ef=_0x2bd3fa;return VisuMZ[_0x44a4ef(0x249)]['Settings'][_0x44a4ef(0x45a)][_0x44a4ef(0x6ce)];},Window_Selectable[_0x2bd3fa(0x77c)]['rowSpacing']=function(){const _0x9ff020=_0x2bd3fa;return VisuMZ[_0x9ff020(0x249)][_0x9ff020(0x8fc)]['Window'][_0x9ff020(0x2c5)];},Window_Selectable[_0x2bd3fa(0x77c)][_0x2bd3fa(0x207)]=function(){const _0x51b1a9=_0x2bd3fa;return Window_Scrollable[_0x51b1a9(0x77c)][_0x51b1a9(0x207)]['call'](this)+VisuMZ[_0x51b1a9(0x249)]['Settings'][_0x51b1a9(0x45a)][_0x51b1a9(0x6a1)];;},VisuMZ[_0x2bd3fa(0x249)]['Window_Selectable_drawBackgroundRect']=Window_Selectable['prototype'][_0x2bd3fa(0x7f4)],Window_Selectable['prototype']['drawBackgroundRect']=function(_0x10119c){const _0x527fe8=_0x2bd3fa,_0x4b4608=VisuMZ[_0x527fe8(0x249)][_0x527fe8(0x8fc)][_0x527fe8(0x45a)];if(_0x4b4608['ShowItemBackground']===![])return;if(_0x4b4608[_0x527fe8(0x5fb)]){if(_0x527fe8(0x5f6)!=='nStiG')return _0x3f7e14[_0x527fe8(0x249)][_0x527fe8(0x627)][_0x527fe8(0x1f7)](this,_0x29be70);else _0x4b4608['DrawItemBackgroundJS'][_0x527fe8(0x1f7)](this,_0x10119c);}else _0x527fe8(0x548)===_0x527fe8(0x38c)?(_0x4a4a01=_0x1a2dd9[_0x527fe8(0x18a)](_0x5e2a59),_0x50610b=_0x2aa77e[_0x527fe8(0x18a)](_0x5d841a),_0x4955da=_0x2adc26[_0x527fe8(0x18a)](_0x95b54),_0x53bd3e=_0xe5b415[_0x527fe8(0x18a)](_0x35c218),_0x5b5e18=_0x5ce144[_0x527fe8(0x18a)](_0x3df48d),_0x6a467e=_0x498562[_0x527fe8(0x18a)](_0x1dc172),_0x1cfaff['CoreEngine']['Bitmap_blt'][_0x527fe8(0x1f7)](this,_0x3653d3,_0x4527b6,_0x5b65f1,_0x55dff2,_0x24ea85,_0x10c277,_0x34ae6d,_0xf6d79b,_0x340bb1),this[_0x527fe8(0x805)]()):VisuMZ['CoreEngine'][_0x527fe8(0x5a8)][_0x527fe8(0x1f7)](this,_0x10119c);},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x3c7)]=Window_Gold[_0x2bd3fa(0x77c)][_0x2bd3fa(0x171)],Window_Gold[_0x2bd3fa(0x77c)][_0x2bd3fa(0x171)]=function(){const _0x502828=_0x2bd3fa;if(this['isItemStyle']()){if(_0x502828(0x343)===_0x502828(0x343))this[_0x502828(0x1fc)]();else{if(this[_0x502828(0x693)]())_0x34638d=_0x2b0a25[_0x502828(0x862)](_0x260719);_0x241f55[_0x502828(0x249)][_0x502828(0x337)][_0x502828(0x1f7)](this,_0x35e587,_0x257f2f,_0x1b7cae,_0x5b4845,_0x26b0dc);}}else VisuMZ[_0x502828(0x249)]['Window_Gold_refresh'][_0x502828(0x1f7)](this);},Window_Gold[_0x2bd3fa(0x77c)][_0x2bd3fa(0x794)]=function(){const _0x1261bf=_0x2bd3fa;if(TextManager['currencyUnit']!==this['currencyUnit']())return![];return VisuMZ[_0x1261bf(0x249)]['Settings'][_0x1261bf(0x3d3)][_0x1261bf(0x21f)];},Window_Gold[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1fc)]=function(){const _0x19518b=_0x2bd3fa;this[_0x19518b(0x691)](),this[_0x19518b(0x711)]['clear'](),this[_0x19518b(0x711)]['fontSize']=VisuMZ[_0x19518b(0x249)][_0x19518b(0x8fc)]['Gold']['GoldFontSize'];const _0x2f7599=VisuMZ['CoreEngine'][_0x19518b(0x8fc)][_0x19518b(0x3d3)][_0x19518b(0x6cb)],_0x4db028=this[_0x19518b(0x433)](0x0);if(_0x2f7599>0x0){const _0x7dcba=_0x4db028['y']+(this['lineHeight']()-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x2f7599,_0x4db028['x'],_0x7dcba);const _0x52ea5c=ImageManager[_0x19518b(0x492)]+0x4;_0x4db028['x']+=_0x52ea5c,_0x4db028['width']-=_0x52ea5c;}this[_0x19518b(0x1bf)](ColorManager[_0x19518b(0x2b1)]()),this[_0x19518b(0x1af)](this[_0x19518b(0x8e7)](),_0x4db028['x'],_0x4db028['y'],_0x4db028[_0x19518b(0x73f)],_0x19518b(0x811));const _0x4c6952=this[_0x19518b(0x4ff)](this[_0x19518b(0x8e7)]())+0x6;;_0x4db028['x']+=_0x4c6952,_0x4db028[_0x19518b(0x73f)]-=_0x4c6952,this['resetTextColor']();const _0x2599b1=this[_0x19518b(0x611)](),_0x1e7acf=this[_0x19518b(0x4ff)](this[_0x19518b(0x843)]?VisuMZ[_0x19518b(0x862)](this[_0x19518b(0x611)]()):this[_0x19518b(0x611)]());_0x1e7acf>_0x4db028[_0x19518b(0x73f)]?this['drawText'](VisuMZ['CoreEngine'][_0x19518b(0x8fc)][_0x19518b(0x3d3)][_0x19518b(0x198)],_0x4db028['x'],_0x4db028['y'],_0x4db028[_0x19518b(0x73f)],_0x19518b(0x359)):'tvcNE'!==_0x19518b(0x67d)?this['drawText'](this[_0x19518b(0x611)](),_0x4db028['x'],_0x4db028['y'],_0x4db028[_0x19518b(0x73f)],_0x19518b(0x359)):_0x5d9f59[_0x19518b(0x324)]&&(this[_0x19518b(0x6b5)]=_0x19518b(0x567)),this['resetFontSettings']();},Window_StatusBase['prototype']['drawParamText']=function(_0x4c7aea,_0x50ec27,_0xfc8c52,_0xdd661,_0x394c7f){const _0x413882=_0x2bd3fa;_0xdd661=String(_0xdd661||'')[_0x413882(0x345)]();if(VisuMZ[_0x413882(0x249)][_0x413882(0x8fc)][_0x413882(0x7f9)][_0x413882(0x266)]){if(_0x413882(0x280)!==_0x413882(0x280)){if(this[_0x413882(0x79e)]===_0x5ea9d9)this[_0x413882(0x61e)]();if(this[_0x413882(0x79e)][_0x413882(0x365)]===_0x6af9e7)this[_0x413882(0x8b1)]();this[_0x413882(0x79e)]['BattleSystem']=_0x7ecdf2;}else{const _0x1c5332=VisuMZ[_0x413882(0x1a6)](_0xdd661);_0x394c7f?_0x413882(0x471)!==_0x413882(0x471)?this[_0x413882(0x969)](_0x160ab3[_0x413882(0x7fc)](this[_0x413882(0x59b)](),0x0)):(this[_0x413882(0x885)](_0x1c5332,_0x4c7aea,_0x50ec27,this[_0x413882(0x791)]()),_0xfc8c52-=this[_0x413882(0x791)]()+0x2,_0x4c7aea+=this[_0x413882(0x791)]()+0x2):(this[_0x413882(0x8c8)](_0x1c5332,_0x4c7aea+0x2,_0x50ec27+0x2),_0xfc8c52-=ImageManager[_0x413882(0x492)]+0x4,_0x4c7aea+=ImageManager['iconWidth']+0x4);}}const _0x21e002=TextManager[_0x413882(0x2f7)](_0xdd661);this[_0x413882(0x691)](),this['changeTextColor'](ColorManager[_0x413882(0x2b1)]());if(_0x394c7f)this[_0x413882(0x711)]['fontSize']=this['smallParamFontSize'](),this[_0x413882(0x711)]['drawText'](_0x21e002,_0x4c7aea,_0x50ec27,_0xfc8c52,this['gaugeLineHeight'](),_0x413882(0x811));else{if(_0x413882(0x8cd)!==_0x413882(0x8cd)){if(this[_0x413882(0x494)]<=0x0)return;const _0x391541=this[_0x413882(0x494)],_0x3e767a=this[_0x413882(0x3f3)],_0x1c8ef2=this[_0x413882(0x4db)];this[_0x413882(0x77d)]=this[_0x413882(0x644)](this['_offsetX'],this[_0x413882(0x1e7)],_0x391541,_0x3e767a,_0x1c8ef2),this['_offsetY']=this[_0x413882(0x644)](this[_0x413882(0x1a3)],this[_0x413882(0x1be)],_0x391541,_0x3e767a,_0x1c8ef2),this['_movementDuration']--;if(this[_0x413882(0x494)]<=0x0)this[_0x413882(0x2d0)]();}else this[_0x413882(0x1af)](_0x21e002,_0x4c7aea,_0x50ec27,_0xfc8c52);}this[_0x413882(0x691)]();},Window_StatusBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x5a6)]=function(){const _0x56253c=_0x2bd3fa;return $gameSystem[_0x56253c(0x717)]()-0x8;},Window_StatusBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6c7)]=function(_0x5aade3,_0x30adf3,_0x28126c,_0x4d2be0){const _0x1fd376=_0x2bd3fa;_0x4d2be0=_0x4d2be0||0xa8,this[_0x1fd376(0x610)]();if(VisuMZ['CoreEngine'][_0x1fd376(0x8fc)]['UI'][_0x1fd376(0x173)])this[_0x1fd376(0x536)](_0x5aade3[_0x1fd376(0x55c)]()[_0x1fd376(0x87a)],_0x30adf3,_0x28126c,_0x4d2be0);else{const _0x3fe8f3=_0x5aade3[_0x1fd376(0x55c)]()[_0x1fd376(0x87a)][_0x1fd376(0x57d)](/\\I\[(\d+)\]/gi,'');this[_0x1fd376(0x1af)](_0x3fe8f3,_0x30adf3,_0x28126c,_0x4d2be0);}},Window_StatusBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x895)]=function(_0x5562c3,_0xec5f7a,_0x5b660b,_0x962f60){const _0x12f3c4=_0x2bd3fa;_0x962f60=_0x962f60||0x10e,this[_0x12f3c4(0x610)]();if(VisuMZ[_0x12f3c4(0x249)][_0x12f3c4(0x8fc)]['UI']['TextCodeNicknames'])this[_0x12f3c4(0x536)](_0x5562c3['nickname'](),_0xec5f7a,_0x5b660b,_0x962f60);else{if('ylmsT'!==_0x12f3c4(0x479)){const _0x3abdee=_0x5562c3['nickname']()[_0x12f3c4(0x57d)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x5562c3['nickname'](),_0xec5f7a,_0x5b660b,_0x962f60);}else this[_0x12f3c4(0x630)]=new _0x7179da[(_0x12f3c4(0x80c))]['BlurFilter'](_0x415eed=!![]),this[_0x12f3c4(0x2a1)]=new _0x5aa4c4(),this[_0x12f3c4(0x2a1)]['bitmap']=_0x1bf10c[_0x12f3c4(0x8d7)](),this[_0x12f3c4(0x2a1)]['filters']=[this[_0x12f3c4(0x630)]],this['_baseSprite'][_0x12f3c4(0x6b6)](this['_backgroundSprite']);}},VisuMZ[_0x2bd3fa(0x249)]['Window_StatusBase_drawActorLevel']=Window_StatusBase[_0x2bd3fa(0x77c)]['drawActorLevel'],Window_StatusBase['prototype'][_0x2bd3fa(0x5e8)]=function(_0x3a06bf,_0x22cb33,_0x9e99c0){const _0xd8269e=_0x2bd3fa;if(this['isExpGaugeDrawn']())this[_0xd8269e(0x6c9)](_0x3a06bf,_0x22cb33,_0x9e99c0);VisuMZ[_0xd8269e(0x249)][_0xd8269e(0x90f)][_0xd8269e(0x1f7)](this,_0x3a06bf,_0x22cb33,_0x9e99c0);},Window_StatusBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x66f)]=function(){const _0x21daed=_0x2bd3fa;return VisuMZ[_0x21daed(0x249)][_0x21daed(0x8fc)]['UI'][_0x21daed(0x28e)];},Window_StatusBase[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6c9)]=function(_0x560419,_0x492100,_0x438f54){const _0x18a110=_0x2bd3fa;if(!_0x560419)return;if(!_0x560419[_0x18a110(0x258)]())return;const _0x433002=0x80,_0x6ff612=_0x560419[_0x18a110(0x40a)]();let _0x20c096=ColorManager[_0x18a110(0x248)](),_0x1d38f1=ColorManager['expGaugeColor2']();_0x6ff612>=0x1&&(_0x20c096=ColorManager[_0x18a110(0x958)](),_0x1d38f1=ColorManager['maxLvGaugeColor2']()),this['drawGauge'](_0x492100,_0x438f54,_0x433002,_0x6ff612,_0x20c096,_0x1d38f1);},Window_EquipStatus[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6f5)]=function(){const _0xa66de1=_0x2bd3fa;let _0xfe7052=0x0;for(const _0x51a3bf of VisuMZ['CoreEngine'][_0xa66de1(0x8fc)][_0xa66de1(0x7f9)][_0xa66de1(0x684)]){const _0x3a95be=this[_0xa66de1(0x607)](),_0x1146a6=this[_0xa66de1(0x77e)](_0xfe7052);this[_0xa66de1(0x901)](_0x3a95be,_0x1146a6,_0x51a3bf),_0xfe7052++;}},Window_EquipStatus[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4a0)]=function(_0x5e3134,_0x52b646,_0x589187){const _0x434c12=_0x2bd3fa,_0x2d2ead=this[_0x434c12(0x447)]()-this[_0x434c12(0x607)]()*0x2;this[_0x434c12(0x267)](_0x5e3134,_0x52b646,_0x2d2ead,_0x589187,![]);},Window_EquipStatus['prototype'][_0x2bd3fa(0x570)]=function(_0x628de4,_0x390579,_0x5b5fef){const _0x52c5d3=_0x2bd3fa,_0x1436ad=this['paramWidth']();this[_0x52c5d3(0x610)](),this[_0x52c5d3(0x1af)](this['_actor'][_0x52c5d3(0x8f1)](_0x5b5fef,!![]),_0x628de4,_0x390579,_0x1436ad,_0x52c5d3(0x359));},Window_EquipStatus[_0x2bd3fa(0x77c)][_0x2bd3fa(0x476)]=function(_0x2c6481,_0xffad63){const _0x339f5d=_0x2bd3fa,_0x4488b3=this[_0x339f5d(0x3d6)]();this[_0x339f5d(0x1bf)](ColorManager[_0x339f5d(0x2b1)]());const _0x2bbcd9=VisuMZ[_0x339f5d(0x249)][_0x339f5d(0x8fc)]['UI']['ParamArrow'];this[_0x339f5d(0x1af)](_0x2bbcd9,_0x2c6481,_0xffad63,_0x4488b3,'center');},Window_EquipStatus['prototype'][_0x2bd3fa(0x5a7)]=function(_0x216368,_0x4b2660,_0x3445f4){const _0x346634=_0x2bd3fa,_0x318af8=this[_0x346634(0x453)](),_0x3bfc96=this[_0x346634(0x6f6)][_0x346634(0x8f1)](_0x3445f4),_0x1692c6=_0x3bfc96-this[_0x346634(0x7c9)][_0x346634(0x8f1)](_0x3445f4);this[_0x346634(0x1bf)](ColorManager[_0x346634(0x396)](_0x1692c6)),this[_0x346634(0x1af)](this[_0x346634(0x6f6)][_0x346634(0x8f1)](_0x3445f4,!![]),_0x216368,_0x4b2660,_0x318af8,_0x346634(0x359));},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x417)]=Window_EquipItem[_0x2bd3fa(0x77c)][_0x2bd3fa(0x84e)],Window_EquipItem[_0x2bd3fa(0x77c)][_0x2bd3fa(0x84e)]=function(_0x7a7f00){const _0x2d0d8a=_0x2bd3fa;return _0x7a7f00&&this[_0x2d0d8a(0x7c9)]?this[_0x2d0d8a(0x7c9)][_0x2d0d8a(0x6d5)](_0x7a7f00):VisuMZ[_0x2d0d8a(0x249)][_0x2d0d8a(0x417)][_0x2d0d8a(0x1f7)](this,_0x7a7f00);},Window_StatusParams['prototype'][_0x2bd3fa(0x70e)]=function(){const _0x2e4a80=_0x2bd3fa;return VisuMZ[_0x2e4a80(0x249)][_0x2e4a80(0x8fc)][_0x2e4a80(0x7f9)][_0x2e4a80(0x684)][_0x2e4a80(0x7e1)];},Window_StatusParams['prototype'][_0x2bd3fa(0x901)]=function(_0x1630e7){const _0x38110f=_0x2bd3fa,_0x5cd5f9=this[_0x38110f(0x433)](_0x1630e7),_0x1e0c9a=VisuMZ[_0x38110f(0x249)][_0x38110f(0x8fc)]['Param']['DisplayedParams'][_0x1630e7],_0x3d52b0=TextManager[_0x38110f(0x2f7)](_0x1e0c9a),_0x285968=this[_0x38110f(0x7c9)]['paramValueByName'](_0x1e0c9a,!![]);this[_0x38110f(0x267)](_0x5cd5f9['x'],_0x5cd5f9['y'],0xa0,_0x1e0c9a,![]),this['resetTextColor'](),this['drawText'](_0x285968,_0x5cd5f9['x']+0xa0,_0x5cd5f9['y'],0x3c,_0x38110f(0x359));};if(VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x8fc)][_0x2bd3fa(0x836)][_0x2bd3fa(0x404)]){VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x8fc)][_0x2bd3fa(0x836)][_0x2bd3fa(0x7f1)]&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x2bd3fa(0x576),'OK']);;VisuMZ[_0x2bd3fa(0x249)]['Window_NameInput_initialize']=Window_NameInput[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4d6)],Window_NameInput[_0x2bd3fa(0x77c)]['initialize']=function(_0x2063ce){const _0x4fc987=_0x2bd3fa;this[_0x4fc987(0x67a)]=this[_0x4fc987(0x8d5)](),VisuMZ[_0x4fc987(0x249)]['Window_NameInput_initialize'][_0x4fc987(0x1f7)](this,_0x2063ce),this[_0x4fc987(0x67a)]==='default'?this['select'](0x0):(Input[_0x4fc987(0x2e8)](),this[_0x4fc987(0x2c8)]());},Window_NameInput[_0x2bd3fa(0x77c)][_0x2bd3fa(0x8d5)]=function(){const _0x16fa89=_0x2bd3fa;if(Input[_0x16fa89(0x53c)]())return _0x16fa89(0x42f);return VisuMZ[_0x16fa89(0x249)]['Settings'][_0x16fa89(0x836)][_0x16fa89(0x56c)]||'keyboard';},VisuMZ[_0x2bd3fa(0x249)]['Window_NameInput_processHandling']=Window_NameInput[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6cf)],Window_NameInput[_0x2bd3fa(0x77c)]['processHandling']=function(){const _0x455be1=_0x2bd3fa;if(!this[_0x455be1(0x8f4)]())return;if(!this[_0x455be1(0x4c8)])return;if(this[_0x455be1(0x67a)]===_0x455be1(0x203)&&Input[_0x455be1(0x620)]()){if(_0x455be1(0x87c)===_0x455be1(0x87c))this[_0x455be1(0x596)](_0x455be1(0x42f));else{if(_0x4a7074[_0x455be1(0x4f7)]()){const _0x1f1de8=_0x541cc8['CoreEngine'][_0x455be1(0x8fc)][_0x455be1(0x762)]['NewGameCommonEvent'];if(_0x1f1de8>0x0)_0x3d9adf['reserveCommonEvent'](_0x1f1de8);}}}else{if(Input[_0x455be1(0x751)](_0x455be1(0x6ef)))Input['clear'](),this[_0x455be1(0x917)]();else{if(Input[_0x455be1(0x19c)](_0x455be1(0x7ae)))Input['clear'](),this[_0x455be1(0x67a)]===_0x455be1(0x203)?this['switchModes']('default'):this[_0x455be1(0x596)](_0x455be1(0x203));else{if(this[_0x455be1(0x67a)]==='keyboard')this['processKeyboardHandling']();else{if(Input[_0x455be1(0x751)](_0x455be1(0x904)))Input[_0x455be1(0x2e8)](),this[_0x455be1(0x596)](_0x455be1(0x203));else{if('zaVZX'!==_0x455be1(0x5b0))VisuMZ[_0x455be1(0x249)][_0x455be1(0x8a8)][_0x455be1(0x1f7)](this);else return 0x0;}}}}}},VisuMZ[_0x2bd3fa(0x249)]['Window_NameInput_processTouch']=Window_NameInput['prototype'][_0x2bd3fa(0x4de)],Window_NameInput[_0x2bd3fa(0x77c)]['processTouch']=function(){const _0x32e231=_0x2bd3fa;if(!this['isOpenAndActive']())return;if(this['_mode']===_0x32e231(0x203)){if(TouchInput['isTriggered']()&&this[_0x32e231(0x18c)]()){if('qIMXr'!==_0x32e231(0x1d8))this[_0x32e231(0x596)]('default');else{if(!_0x444ce8[_0x32e231(0x4f7)]())return;if(!_0xdd9914[_0x32e231(0x481)]())return;if(!_0x425447[_0x32e231(0x45d)]())return;_0xa1b3d4[_0x32e231(0x6e7)](_0x2a67d0,_0x14f081);const _0x1d15ef='Troop%1'[_0x32e231(0x5a0)](_0x59ca95[_0x32e231(0x49f)]['padZero'](0x4)),_0x70f2d3=_0x1bc89a[_0x32e231(0x249)][_0x32e231(0x16e)](_0x82b862['_troopId']);_0x23fb2e['CoreEngine'][_0x32e231(0x7c0)](_0x70f2d3,_0x1d15ef,!![]);}}else TouchInput[_0x32e231(0x53e)]()&&this[_0x32e231(0x596)](_0x32e231(0x42f));}else VisuMZ[_0x32e231(0x249)]['Window_NameInput_processTouch'][_0x32e231(0x1f7)](this);},Window_NameInput[_0x2bd3fa(0x77c)]['processKeyboardHandling']=function(){const _0x39a710=_0x2bd3fa;if(Input[_0x39a710(0x751)](_0x39a710(0x2cd)))Input[_0x39a710(0x2e8)](),this['onNameOk']();else{if(Input[_0x39a710(0x71f)]!==undefined){if(_0x39a710(0x65f)===_0x39a710(0x65f)){let _0x2b42ae=Input[_0x39a710(0x71f)],_0x146fac=_0x2b42ae[_0x39a710(0x7e1)];for(let _0x4328c6=0x0;_0x4328c6<_0x146fac;++_0x4328c6){if(_0x39a710(0x4c2)!==_0x39a710(0x590))this[_0x39a710(0x587)][_0x39a710(0x271)](_0x2b42ae[_0x4328c6])?SoundManager['playOk']():SoundManager[_0x39a710(0x333)]();else return _0x5612ef[_0x39a710(0x6a0)][_0x39a710(0x4e0)][_0x39a710(0x1f7)](this);}Input['clear']();}else this[_0x39a710(0x61b)](-0x1);}}},Window_NameInput[_0x2bd3fa(0x77c)][_0x2bd3fa(0x596)]=function(_0x2d5489){const _0xc65005=_0x2bd3fa;let _0x9eb174=this['_mode'];this[_0xc65005(0x67a)]=_0x2d5489;if(_0x9eb174!==this[_0xc65005(0x67a)]){if(_0xc65005(0x6ee)!==_0xc65005(0x6ee))return'';else this[_0xc65005(0x171)](),SoundManager[_0xc65005(0x212)](),this['_mode']===_0xc65005(0x42f)?this[_0xc65005(0x61b)](0x0):this['select'](-0x1);}},VisuMZ[_0x2bd3fa(0x249)]['Window_NameInput_cursorDown']=Window_NameInput[_0x2bd3fa(0x77c)][_0x2bd3fa(0x81f)],Window_NameInput[_0x2bd3fa(0x77c)]['cursorDown']=function(_0x314d2b){const _0x4683ef=_0x2bd3fa;if(this[_0x4683ef(0x67a)]==='keyboard'&&!Input[_0x4683ef(0x68b)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x4683ef(0x249)][_0x4683ef(0x2b7)][_0x4683ef(0x1f7)](this,_0x314d2b),this['switchModes'](_0x4683ef(0x42f));},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x1c5)]=Window_NameInput[_0x2bd3fa(0x77c)][_0x2bd3fa(0x703)],Window_NameInput['prototype']['cursorUp']=function(_0x103726){const _0x2371c2=_0x2bd3fa;if(this[_0x2371c2(0x67a)]==='keyboard'&&!Input[_0x2371c2(0x68b)]())return;if(Input[_0x2371c2(0x23d)]())return;VisuMZ['CoreEngine'][_0x2371c2(0x1c5)][_0x2371c2(0x1f7)](this,_0x103726),this[_0x2371c2(0x596)](_0x2371c2(0x42f));},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x534)]=Window_NameInput[_0x2bd3fa(0x77c)][_0x2bd3fa(0x598)],Window_NameInput['prototype'][_0x2bd3fa(0x598)]=function(_0x21bdcc){const _0x2880c4=_0x2bd3fa;if(this['_mode']==='keyboard'&&!Input[_0x2880c4(0x68b)]())return;if(Input[_0x2880c4(0x23d)]())return;VisuMZ['CoreEngine'][_0x2880c4(0x534)][_0x2880c4(0x1f7)](this,_0x21bdcc),this[_0x2880c4(0x596)](_0x2880c4(0x42f));},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x59a)]=Window_NameInput[_0x2bd3fa(0x77c)]['cursorLeft'],Window_NameInput[_0x2bd3fa(0x77c)][_0x2bd3fa(0x75e)]=function(_0x318346){const _0x269f70=_0x2bd3fa;if(this[_0x269f70(0x67a)]===_0x269f70(0x203)&&!Input['isArrowPressed']())return;if(Input[_0x269f70(0x23d)]())return;VisuMZ['CoreEngine'][_0x269f70(0x59a)]['call'](this,_0x318346),this[_0x269f70(0x596)](_0x269f70(0x42f));},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x65b)]=Window_NameInput['prototype'][_0x2bd3fa(0x72c)],Window_NameInput[_0x2bd3fa(0x77c)]['cursorPagedown']=function(){const _0x339802=_0x2bd3fa;if(this[_0x339802(0x67a)]===_0x339802(0x203))return;if(Input[_0x339802(0x23d)]())return;VisuMZ[_0x339802(0x249)][_0x339802(0x65b)][_0x339802(0x1f7)](this),this[_0x339802(0x596)]('default');},VisuMZ['CoreEngine'][_0x2bd3fa(0x7db)]=Window_NameInput[_0x2bd3fa(0x77c)]['cursorPageup'],Window_NameInput[_0x2bd3fa(0x77c)][_0x2bd3fa(0x25f)]=function(){const _0x4f7330=_0x2bd3fa;if(this[_0x4f7330(0x67a)]===_0x4f7330(0x203))return;if(Input[_0x4f7330(0x23d)]())return;VisuMZ[_0x4f7330(0x249)][_0x4f7330(0x7db)][_0x4f7330(0x1f7)](this),this[_0x4f7330(0x596)](_0x4f7330(0x42f));},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x559)]=Window_NameInput[_0x2bd3fa(0x77c)][_0x2bd3fa(0x171)],Window_NameInput['prototype']['refresh']=function(){const _0x451f12=_0x2bd3fa;if(this[_0x451f12(0x67a)]===_0x451f12(0x203)){if(_0x451f12(0x635)!==_0x451f12(0x635)){this[_0x451f12(0x272)]();const _0x54ca57=this[_0x451f12(0x698)];_0x453e6c[_0x451f12(0x249)][_0x451f12(0x73b)][_0x451f12(0x1f7)](this),_0x54ca57>0x0&&this['_duration']<=0x0&&(this['_x']=this[_0x451f12(0x42a)],this['_y']=this[_0x451f12(0x756)],this[_0x451f12(0x1a0)]=this['_targetScaleX'],this['_scaleY']=this[_0x451f12(0x60c)],this['_opacity']=this[_0x451f12(0x5c2)],this[_0x451f12(0x1c4)]&&(this[_0x451f12(0x1c4)]['x']=this[_0x451f12(0x187)]['x'],this[_0x451f12(0x1c4)]['y']=this[_0x451f12(0x187)]['y']));}else{this['contents'][_0x451f12(0x2e8)](),this[_0x451f12(0x54c)][_0x451f12(0x2e8)](),this[_0x451f12(0x610)]();let _0x53bd17=VisuMZ[_0x451f12(0x249)][_0x451f12(0x8fc)][_0x451f12(0x836)]['NameInputMessage']['split']('\x0a'),_0x570c20=_0x53bd17[_0x451f12(0x7e1)],_0x39104a=(this[_0x451f12(0x69a)]-_0x570c20*this[_0x451f12(0x4fb)]())/0x2;for(let _0x43396f=0x0;_0x43396f<_0x570c20;++_0x43396f){let _0xf9001e=_0x53bd17[_0x43396f],_0x23ce3d=this[_0x451f12(0x5b9)](_0xf9001e)[_0x451f12(0x73f)],_0x2c0d0d=Math[_0x451f12(0x7a0)]((this[_0x451f12(0x711)]['width']-_0x23ce3d)/0x2);this[_0x451f12(0x536)](_0xf9001e,_0x2c0d0d,_0x39104a),_0x39104a+=this[_0x451f12(0x4fb)]();}}}else _0x451f12(0x1e3)!==_0x451f12(0x69c)?VisuMZ['CoreEngine'][_0x451f12(0x559)]['call'](this):this[_0x451f12(0x72c)]();};};VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x428)]=Window_ShopSell[_0x2bd3fa(0x77c)][_0x2bd3fa(0x84e)],Window_ShopSell[_0x2bd3fa(0x77c)]['isEnabled']=function(_0x239ba7){const _0x3afcec=_0x2bd3fa;if(VisuMZ[_0x3afcec(0x249)][_0x3afcec(0x8fc)][_0x3afcec(0x762)][_0x3afcec(0x3bd)]&&DataManager[_0x3afcec(0x5c3)](_0x239ba7)){if('wcIul'!==_0x3afcec(0x86b)){const _0xa9ea06=_0x5726f8[_0x3afcec(0x249)][_0x3afcec(0x8fc)][_0x3afcec(0x332)];if(_0xa9ea06&&_0xa9ea06['horzJS'])return _0xa9ea06[_0x3afcec(0x211)]['call'](this);const _0x3666b5=_0x26f848[_0x3afcec(0x772)]*0.75,_0x104aea=_0x43c3f6[_0x3afcec(0x5c9)]*0.6,_0x73a31d=_0x53ecdd['_shakeDuration'];this['x']+=_0x5f09ac[_0x3afcec(0x18a)](_0x2ff360[_0x3afcec(0x5ac)](_0x3666b5)-_0x4534a1[_0x3afcec(0x5ac)](_0x104aea))*(_0x586460[_0x3afcec(0x7fc)](_0x73a31d,0x1e)*0.5);}else return![];}else{if(_0x3afcec(0x2ac)!=='zxoeA')return VisuMZ['CoreEngine'][_0x3afcec(0x428)][_0x3afcec(0x1f7)](this,_0x239ba7);else{const _0x3c3364=new _0x49b88d();_0x3c3364['x']=_0x4249d3['x'],_0x3c3364['y']=_0x3d8acf['y'],_0x3c3364['z']=0x64;const _0x444c2c=this[_0x3afcec(0x33f)]();return _0x444c2c['addChild'](_0x3c3364),[_0x3c3364];}}},Window_NumberInput[_0x2bd3fa(0x77c)][_0x2bd3fa(0x3cb)]=function(){return![];};VisuMZ['CoreEngine'][_0x2bd3fa(0x8fc)]['KeyboardInput'][_0x2bd3fa(0x273)]&&(VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x655)]=Window_NumberInput['prototype'][_0x2bd3fa(0x815)],Window_NumberInput[_0x2bd3fa(0x77c)][_0x2bd3fa(0x815)]=function(){const _0x1ff1ae=_0x2bd3fa;VisuMZ[_0x1ff1ae(0x249)]['Window_NumberInput_start']['call'](this),this[_0x1ff1ae(0x61b)](this[_0x1ff1ae(0x42c)]-0x1),Input[_0x1ff1ae(0x2e8)]();},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x35d)]=Window_NumberInput[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6f0)],Window_NumberInput[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6f0)]=function(){const _0x58a3f7=_0x2bd3fa;if(!this[_0x58a3f7(0x6ff)]())return;if(Input[_0x58a3f7(0x23d)]()){if('epqJI'!=='epqJI'){const _0x221937=_0x9a386d['getGamepads']();if(_0x221937)for(const _0x1c1384 of _0x221937){if(_0x1c1384&&_0x1c1384[_0x58a3f7(0x43e)]){if(this['isGamepadButtonPressed'](_0x1c1384))return!![];}}}else this[_0x58a3f7(0x242)]();}else{if(Input[_0x58a3f7(0x751)]('backspace'))'HmzqV'!==_0x58a3f7(0x308)?this['processKeyboardBackspace']():this[_0x58a3f7(0x2e6)]();else{if(Input[_0x58a3f7(0x468)]===0x2e)this['processKeyboardDelete']();else{if(Input[_0x58a3f7(0x468)]===0x24)this[_0x58a3f7(0x325)]();else Input[_0x58a3f7(0x468)]===0x23?this[_0x58a3f7(0x193)]():VisuMZ[_0x58a3f7(0x249)][_0x58a3f7(0x35d)]['call'](this);}}}},Window_NumberInput[_0x2bd3fa(0x77c)][_0x2bd3fa(0x56d)]=function(){const _0xfa4770=_0x2bd3fa;if(!this[_0xfa4770(0x7e6)]())return;if(Input[_0xfa4770(0x23d)]()){if(_0xfa4770(0x2b8)===_0xfa4770(0x665))return _0x45926b?_0x575efd(_0xd3f092[_0xfa4770(0x18a)](_0x5ba9f9*0x64))+'%':_0x4f28a7;else this[_0xfa4770(0x242)]();}else{if('GCzZR'!=='GCzZR'){var _0x102b59=_0x49b1d1[_0xfa4770(0x249)][_0xfa4770(0x85e)][_0xfa4770(0x1f7)](this,_0x13663f,_0x9a741b,_0x3c7358,_0x3550d2);if(this[_0xfa4770(0x88c)]())_0x102b59['text']=_0x1c8451[_0xfa4770(0x862)](_0x102b59[_0xfa4770(0x584)]);return _0x102b59;}else Window_Selectable[_0xfa4770(0x77c)][_0xfa4770(0x56d)][_0xfa4770(0x1f7)](this);}},Window_NumberInput['prototype'][_0x2bd3fa(0x1e6)]=function(){},Window_NumberInput[_0x2bd3fa(0x77c)]['processKeyboardDigitChange']=function(){const _0x3cafd7=_0x2bd3fa;if(String(this[_0x3cafd7(0x8b6)])[_0x3cafd7(0x7e1)]>=this['_maxDigits'])return;const _0x5014e7=Number(String(this['_number'])+Input['_inputString']);if(isNaN(_0x5014e7))return;this[_0x3cafd7(0x8b6)]=_0x5014e7;const _0x1f2129='9'[_0x3cafd7(0x4a2)](this['_maxDigits']);this[_0x3cafd7(0x8b6)]=this[_0x3cafd7(0x8b6)]['clamp'](0x0,_0x1f2129),Input[_0x3cafd7(0x2e8)](),this[_0x3cafd7(0x171)](),SoundManager[_0x3cafd7(0x1fb)](),this['select'](this[_0x3cafd7(0x42c)]-0x1);},Window_NumberInput[_0x2bd3fa(0x77c)]['processKeyboardBackspace']=function(){const _0x3f9074=_0x2bd3fa;this[_0x3f9074(0x8b6)]=Number(String(this[_0x3f9074(0x8b6)])['slice'](0x0,-0x1)),this[_0x3f9074(0x8b6)]=Math['max'](0x0,this[_0x3f9074(0x8b6)]),Input[_0x3f9074(0x2e8)](),this['refresh'](),SoundManager[_0x3f9074(0x1fb)](),this[_0x3f9074(0x61b)](this[_0x3f9074(0x42c)]-0x1);},Window_NumberInput['prototype']['processKeyboardDelete']=function(){const _0x2d490d=_0x2bd3fa;this[_0x2d490d(0x8b6)]=Number(String(this[_0x2d490d(0x8b6)])[_0x2d490d(0x867)](0x1)),this['_number']=Math['max'](0x0,this['_number']),Input[_0x2d490d(0x2e8)](),this[_0x2d490d(0x171)](),SoundManager['playCursor'](),this[_0x2d490d(0x61b)](this[_0x2d490d(0x42c)]-0x1);});;Window_TitleCommand['_commandList']=VisuMZ[_0x2bd3fa(0x249)]['Settings'][_0x2bd3fa(0x1c6)],Window_TitleCommand[_0x2bd3fa(0x77c)][_0x2bd3fa(0x22c)]=function(){const _0x1d9865=_0x2bd3fa;this[_0x1d9865(0x68d)]();},Window_TitleCommand[_0x2bd3fa(0x77c)][_0x2bd3fa(0x68d)]=function(){const _0x19dfc4=_0x2bd3fa;for(const _0x45d57e of Window_TitleCommand[_0x19dfc4(0x8ee)]){if(_0x19dfc4(0x48d)===_0x19dfc4(0x48d)){if(_0x45d57e[_0x19dfc4(0x1ff)]['call'](this)){const _0x5631c4=_0x45d57e[_0x19dfc4(0x5e7)];let _0x2ecb9e=_0x45d57e[_0x19dfc4(0x792)];if(['',_0x19dfc4(0x710)][_0x19dfc4(0x448)](_0x2ecb9e))_0x2ecb9e=_0x45d57e['TextJS']['call'](this);const _0xe5d459=_0x45d57e['EnableJS'][_0x19dfc4(0x1f7)](this),_0x301766=_0x45d57e[_0x19dfc4(0x638)][_0x19dfc4(0x1f7)](this);this[_0x19dfc4(0x688)](_0x2ecb9e,_0x5631c4,_0xe5d459,_0x301766),this['setHandler'](_0x5631c4,_0x45d57e[_0x19dfc4(0x17c)][_0x19dfc4(0x174)](this,_0x301766));}}else _0x81d207[_0x19dfc4(0x3e9)]&&_0x4347f8[_0x19dfc4(0x3e9)]();}},Window_GameEnd[_0x2bd3fa(0x8ee)]=VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x8fc)][_0x2bd3fa(0x6de)][_0x2bd3fa(0x5fc)]['CommandList'],Window_GameEnd[_0x2bd3fa(0x77c)][_0x2bd3fa(0x22c)]=function(){this['makeCoreEngineCommandList']();},Window_GameEnd[_0x2bd3fa(0x77c)][_0x2bd3fa(0x68d)]=function(){const _0x540067=_0x2bd3fa;for(const _0x79a873 of Window_GameEnd[_0x540067(0x8ee)]){if(_0x540067(0x36a)!==_0x540067(0x528)){if(_0x79a873['ShowJS'][_0x540067(0x1f7)](this)){if(_0x540067(0x41c)!=='FAbzY'){const _0x2e09aa=_0x79a873[_0x540067(0x5e7)];let _0x516bbb=_0x79a873[_0x540067(0x792)];if(['',_0x540067(0x710)]['includes'](_0x516bbb))_0x516bbb=_0x79a873[_0x540067(0x8a2)][_0x540067(0x1f7)](this);const _0x4ef1ed=_0x79a873['EnableJS'][_0x540067(0x1f7)](this),_0x26970c=_0x79a873['ExtJS'][_0x540067(0x1f7)](this);this[_0x540067(0x688)](_0x516bbb,_0x2e09aa,_0x4ef1ed,_0x26970c),this['setHandler'](_0x2e09aa,_0x79a873[_0x540067(0x17c)][_0x540067(0x174)](this,_0x26970c));}else{let _0x3d6b70=this['currentValue']();this[_0x540067(0x693)]()&&(_0x3d6b70=_0x4da9d3[_0x540067(0x862)](_0x3d6b70));const _0x381c9a=this['bitmapWidth']()-0x1,_0x1cec7d=this[_0x540067(0x387)]?this['textHeight']():this['bitmapHeight']();this[_0x540067(0x6ab)](),this[_0x540067(0x44e)][_0x540067(0x1af)](_0x3d6b70,0x0,0x0,_0x381c9a,_0x1cec7d,_0x540067(0x359));}}}else this['_anchor']=_0x182881,this[_0x540067(0x187)]=_0x57d823[_0x540067(0x20e)](this[_0x540067(0x1c4)]);}};function Window_ButtonAssist(){const _0x2c1675=_0x2bd3fa;this[_0x2c1675(0x4d6)](...arguments);}Window_ButtonAssist[_0x2bd3fa(0x77c)]=Object['create'](Window_Base[_0x2bd3fa(0x77c)]),Window_ButtonAssist['prototype'][_0x2bd3fa(0x482)]=Window_ButtonAssist,Window_ButtonAssist['prototype']['initialize']=function(_0x3ed55d){const _0x3aaaf2=_0x2bd3fa;this[_0x3aaaf2(0x255)]={},Window_Base[_0x3aaaf2(0x77c)][_0x3aaaf2(0x4d6)][_0x3aaaf2(0x1f7)](this,_0x3ed55d),this['setBackgroundType'](VisuMZ[_0x3aaaf2(0x249)][_0x3aaaf2(0x8fc)][_0x3aaaf2(0x220)]['BgType']||0x0),this[_0x3aaaf2(0x171)]();},Window_ButtonAssist[_0x2bd3fa(0x77c)][_0x2bd3fa(0x350)]=function(){const _0x3fd4b9=_0x2bd3fa;this[_0x3fd4b9(0x711)]['fontSize']<=0x60&&(this[_0x3fd4b9(0x711)][_0x3fd4b9(0x66b)]+=0x6);},Window_ButtonAssist[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6be)]=function(){const _0x4c577a=_0x2bd3fa;this[_0x4c577a(0x711)]['fontSize']>=0x18&&(this['contents'][_0x4c577a(0x66b)]-=0x6);},Window_ButtonAssist[_0x2bd3fa(0x77c)][_0x2bd3fa(0x859)]=function(){const _0x287727=_0x2bd3fa;Window_Base[_0x287727(0x77c)][_0x287727(0x859)][_0x287727(0x1f7)](this),this[_0x287727(0x53d)]();},Window_ButtonAssist[_0x2bd3fa(0x77c)][_0x2bd3fa(0x777)]=function(){const _0x1520ff=_0x2bd3fa;this[_0x1520ff(0x478)]=SceneManager[_0x1520ff(0x7d8)][_0x1520ff(0x57f)]()!==_0x1520ff(0x4f4)?0x0:0x8;},Window_ButtonAssist[_0x2bd3fa(0x77c)]['updateKeyText']=function(){const _0x3d74df=_0x2bd3fa,_0x144983=SceneManager[_0x3d74df(0x7d8)];for(let _0x433c80=0x1;_0x433c80<=0x5;_0x433c80++){if(this[_0x3d74df(0x255)]['key%1'[_0x3d74df(0x5a0)](_0x433c80)]!==_0x144983[_0x3d74df(0x5f3)[_0x3d74df(0x5a0)](_0x433c80)]()){if(_0x3d74df(0x69e)!==_0x3d74df(0x69e))this[_0x3d74df(0x6dd)]=_0x7bbfa9[_0x3d74df(0x529)]();else return this[_0x3d74df(0x171)]();}if(this[_0x3d74df(0x255)][_0x3d74df(0x7e0)[_0x3d74df(0x5a0)](_0x433c80)]!==_0x144983[_0x3d74df(0x8bd)[_0x3d74df(0x5a0)](_0x433c80)]()){if(_0x3d74df(0x90a)==='cWJGo')this[_0x3d74df(0x63f)]=!![];else return this['refresh']();}}},Window_ButtonAssist[_0x2bd3fa(0x77c)][_0x2bd3fa(0x171)]=function(){const _0x414207=_0x2bd3fa;this[_0x414207(0x711)][_0x414207(0x2e8)]();for(let _0x2da625=0x1;_0x2da625<=0x5;_0x2da625++){this['drawSegment'](_0x2da625);}},Window_ButtonAssist[_0x2bd3fa(0x77c)]['drawSegment']=function(_0x590b53){const _0x17e389=_0x2bd3fa,_0xf422be=this[_0x17e389(0x683)]/0x5,_0x3feea0=SceneManager['_scene'],_0x3ee917=_0x3feea0[_0x17e389(0x5f3)[_0x17e389(0x5a0)](_0x590b53)](),_0x24e8b7=_0x3feea0[_0x17e389(0x8bd)[_0x17e389(0x5a0)](_0x590b53)]();this[_0x17e389(0x255)][_0x17e389(0x3fb)[_0x17e389(0x5a0)](_0x590b53)]=_0x3ee917,this[_0x17e389(0x255)][_0x17e389(0x7e0)[_0x17e389(0x5a0)](_0x590b53)]=_0x24e8b7;if(_0x3ee917==='')return;if(_0x24e8b7==='')return;const _0xe9c9ed=_0x3feea0['buttonAssistOffset%1'['format'](_0x590b53)](),_0xd697ef=this['itemPadding'](),_0xd20e20=_0xf422be*(_0x590b53-0x1)+_0xd697ef+_0xe9c9ed,_0x58ed0e=VisuMZ[_0x17e389(0x249)][_0x17e389(0x8fc)]['ButtonAssist'][_0x17e389(0x80e)];this['drawTextEx'](_0x58ed0e[_0x17e389(0x5a0)](_0x3ee917,_0x24e8b7),_0xd20e20,0x0,_0xf422be-_0xd697ef*0x2);},VisuMZ['CoreEngine'][_0x2bd3fa(0x663)]=Game_Interpreter[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1dd)],Game_Interpreter[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1dd)]=function(){const _0x13223b=_0x2bd3fa;if($gameTemp[_0x13223b(0x74c)]!==undefined)return VisuMZ[_0x13223b(0x249)][_0x13223b(0x67f)]();return VisuMZ['CoreEngine'][_0x13223b(0x663)]['call'](this);},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x67f)]=function(){const _0x4cd1b8=_0x2bd3fa,_0xa01de7=$gameTemp[_0x4cd1b8(0x74c)]||0x0;(_0xa01de7<0x0||_0xa01de7>0x64||TouchInput['isCancelled']()||Input[_0x4cd1b8(0x19c)](_0x4cd1b8(0x391)))&&($gameTemp['_pictureCoordinatesMode']=undefined,Input['clear'](),TouchInput[_0x4cd1b8(0x2e8)]());const _0x3c3dbe=$gameScreen[_0x4cd1b8(0x4e6)](_0xa01de7);return _0x3c3dbe&&(_0x4cd1b8(0x94b)!=='DxfCk'?(_0x3c3dbe['_x']=TouchInput['_x'],_0x3c3dbe['_y']=TouchInput['_y']):(_0x208af3[_0x4cd1b8(0x4f7)]()&&(_0x22053f[_0x4cd1b8(0x253)](_0x4cd1b8(0x1b9)),_0x3c143a[_0x4cd1b8(0x253)](_0x32efa0)),this[_0x4cd1b8(0x758)]())),VisuMZ['CoreEngine'][_0x4cd1b8(0x757)](),$gameTemp[_0x4cd1b8(0x74c)]!==undefined;},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x757)]=function(){const _0x6ca925=_0x2bd3fa,_0x55a2c1=SceneManager[_0x6ca925(0x7d8)];if(!_0x55a2c1)return;!_0x55a2c1[_0x6ca925(0x679)]&&(SoundManager[_0x6ca925(0x247)](),_0x55a2c1[_0x6ca925(0x679)]=new Window_PictureCoordinates(),_0x55a2c1[_0x6ca925(0x6b6)](_0x55a2c1['_pictureCoordinatesWindow']));if($gameTemp['_pictureCoordinatesMode']===undefined){if(_0x6ca925(0x406)==='YFoEu')SoundManager['playCancel'](),_0x55a2c1[_0x6ca925(0x535)](_0x55a2c1[_0x6ca925(0x679)]),_0x55a2c1[_0x6ca925(0x679)]=undefined;else return _0x41f30d[_0x6ca925(0x77c)][_0x6ca925(0x4ff)][_0x6ca925(0x1f7)](this,_0x3feb0f);}};function Window_PictureCoordinates(){const _0x6366bd=_0x2bd3fa;this[_0x6366bd(0x4d6)](...arguments);}Window_PictureCoordinates[_0x2bd3fa(0x77c)]=Object[_0x2bd3fa(0x5e4)](Window_Base[_0x2bd3fa(0x77c)]),Window_PictureCoordinates['prototype'][_0x2bd3fa(0x482)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x2bd3fa(0x77c)][_0x2bd3fa(0x4d6)]=function(){const _0x319ca9=_0x2bd3fa;this[_0x319ca9(0x2d4)]=_0x319ca9(0x79f),this[_0x319ca9(0x670)]=_0x319ca9(0x79f),this[_0x319ca9(0x7cc)]=_0x319ca9(0x79f);const _0x3e27f0=this['windowRect']();Window_Base[_0x319ca9(0x77c)][_0x319ca9(0x4d6)][_0x319ca9(0x1f7)](this,_0x3e27f0),this[_0x319ca9(0x558)](0x2);},Window_PictureCoordinates[_0x2bd3fa(0x77c)][_0x2bd3fa(0x747)]=function(){const _0xa84bef=_0x2bd3fa;let _0x563773=0x0,_0xe02ef3=Graphics[_0xa84bef(0x30f)]-this[_0xa84bef(0x4fb)](),_0x1c7168=Graphics[_0xa84bef(0x73f)],_0x4daa17=this[_0xa84bef(0x4fb)]();return new Rectangle(_0x563773,_0xe02ef3,_0x1c7168,_0x4daa17);},Window_PictureCoordinates['prototype'][_0x2bd3fa(0x777)]=function(){const _0x89c3d5=_0x2bd3fa;this[_0x89c3d5(0x478)]=0x0;},Window_PictureCoordinates[_0x2bd3fa(0x77c)][_0x2bd3fa(0x859)]=function(){const _0x158fb0=_0x2bd3fa;Window_Base['prototype'][_0x158fb0(0x859)][_0x158fb0(0x1f7)](this),this[_0x158fb0(0x3d1)]();},Window_PictureCoordinates['prototype'][_0x2bd3fa(0x3d1)]=function(){if(!this['needsUpdate']())return;this['refresh']();},Window_PictureCoordinates['prototype'][_0x2bd3fa(0x2f5)]=function(){const _0x4cdfce=_0x2bd3fa,_0x1d26f6=$gameTemp[_0x4cdfce(0x74c)],_0xe302bf=$gameScreen['picture'](_0x1d26f6);if(_0xe302bf){if(_0x4cdfce(0x4bb)===_0x4cdfce(0x852)){const _0x17d11f=_0x2ac67b[_0x4cdfce(0x1f7)](this);return _0x25be88===_0x4cdfce(0x95a)?_0x16abfc[_0x4cdfce(0x18a)](_0x17d11f):_0x17d11f;}else return this[_0x4cdfce(0x2d4)]!==_0xe302bf[_0x4cdfce(0x215)]||this[_0x4cdfce(0x670)]!==_0xe302bf['_x']||this[_0x4cdfce(0x7cc)]!==_0xe302bf['_y'];}else return _0x4cdfce(0x4f1)!==_0x4cdfce(0x67e)?![]:this['useFontWidthFix']()?this[_0x4cdfce(0x711)]['measureTextWidthNoRounding'](_0x28793a):_0x1de2c4[_0x4cdfce(0x77c)][_0x4cdfce(0x4ff)][_0x4cdfce(0x1f7)](this,_0x2672d3);},Window_PictureCoordinates[_0x2bd3fa(0x77c)][_0x2bd3fa(0x171)]=function(){const _0x34d77c=_0x2bd3fa;this[_0x34d77c(0x711)][_0x34d77c(0x2e8)]();const _0x5ce2b1=$gameTemp[_0x34d77c(0x74c)],_0x569cfa=$gameScreen[_0x34d77c(0x4e6)](_0x5ce2b1);if(!_0x569cfa)return;this[_0x34d77c(0x2d4)]=_0x569cfa[_0x34d77c(0x215)],this['_lastX']=_0x569cfa['_x'],this[_0x34d77c(0x7cc)]=_0x569cfa['_y'];const _0xaa430a=ColorManager[_0x34d77c(0x562)]();this[_0x34d77c(0x711)][_0x34d77c(0x602)](0x0,0x0,this[_0x34d77c(0x683)],this[_0x34d77c(0x69a)],_0xaa430a);const _0x2e3573='\x20Origin:\x20%1'[_0x34d77c(0x5a0)](_0x569cfa[_0x34d77c(0x215)]===0x0?_0x34d77c(0x910):_0x34d77c(0x6b2)),_0x34a0c5=_0x34d77c(0x643)[_0x34d77c(0x5a0)](_0x569cfa['_x']),_0x16de14=_0x34d77c(0x632)[_0x34d77c(0x5a0)](_0x569cfa['_y']),_0x5f2d82=_0x34d77c(0x92a)[_0x34d77c(0x5a0)](TextManager[_0x34d77c(0x855)](_0x34d77c(0x391)));let _0x23dc83=Math[_0x34d77c(0x7a0)](this[_0x34d77c(0x683)]/0x4);this[_0x34d77c(0x1af)](_0x2e3573,_0x23dc83*0x0,0x0,_0x23dc83),this['drawText'](_0x34a0c5,_0x23dc83*0x1,0x0,_0x23dc83,_0x34d77c(0x504)),this['drawText'](_0x16de14,_0x23dc83*0x2,0x0,_0x23dc83,'center');const _0x46a9a9=this[_0x34d77c(0x5b9)](_0x5f2d82)['width'],_0x35b1bf=this[_0x34d77c(0x683)]-_0x46a9a9;this[_0x34d77c(0x536)](_0x5f2d82,_0x35b1bf,0x0,_0x46a9a9);},VisuMZ['ShowDevTools']=function(_0x1d832a){const _0x1a1c93=_0x2bd3fa;if(Utils[_0x1a1c93(0x254)](_0x1a1c93(0x6ad))){if(_0x1a1c93(0x956)!==_0x1a1c93(0x956))_0x53c888[_0x1a1c93(0x474)](_0x2c52b8);else{var _0x3438fe=require(_0x1a1c93(0x5dd))[_0x1a1c93(0x45a)][_0x1a1c93(0x62c)]();SceneManager[_0x1a1c93(0x323)]();if(_0x1d832a)setTimeout(_0x3438fe['focus']['bind'](_0x3438fe),0x190);}}},VisuMZ[_0x2bd3fa(0x616)]=function(_0x7ccf5c,_0xb519a){const _0x405758=_0x2bd3fa;_0xb519a=_0xb519a[_0x405758(0x345)]();var _0x350e88=1.70158,_0x4e416b=0.7;switch(_0xb519a){case _0x405758(0x8fd):return _0x7ccf5c;case _0x405758(0x6fa):return-0x1*Math[_0x405758(0x29c)](_0x7ccf5c*(Math['PI']/0x2))+0x1;case _0x405758(0x495):return Math[_0x405758(0x554)](_0x7ccf5c*(Math['PI']/0x2));case _0x405758(0x3c9):return-0.5*(Math[_0x405758(0x29c)](Math['PI']*_0x7ccf5c)-0x1);case'INQUAD':return _0x7ccf5c*_0x7ccf5c;case _0x405758(0x46c):return _0x7ccf5c*(0x2-_0x7ccf5c);case'INOUTQUAD':return _0x7ccf5c<0.5?0x2*_0x7ccf5c*_0x7ccf5c:-0x1+(0x4-0x2*_0x7ccf5c)*_0x7ccf5c;case _0x405758(0x77a):return _0x7ccf5c*_0x7ccf5c*_0x7ccf5c;case _0x405758(0x33d):var _0x1799a3=_0x7ccf5c-0x1;return _0x1799a3*_0x1799a3*_0x1799a3+0x1;case _0x405758(0x66e):return _0x7ccf5c<0.5?0x4*_0x7ccf5c*_0x7ccf5c*_0x7ccf5c:(_0x7ccf5c-0x1)*(0x2*_0x7ccf5c-0x2)*(0x2*_0x7ccf5c-0x2)+0x1;case _0x405758(0x768):return _0x7ccf5c*_0x7ccf5c*_0x7ccf5c*_0x7ccf5c;case _0x405758(0x712):var _0x1799a3=_0x7ccf5c-0x1;return 0x1-_0x1799a3*_0x1799a3*_0x1799a3*_0x1799a3;case'INOUTQUART':var _0x1799a3=_0x7ccf5c-0x1;return _0x7ccf5c<0.5?0x8*_0x7ccf5c*_0x7ccf5c*_0x7ccf5c*_0x7ccf5c:0x1-0x8*_0x1799a3*_0x1799a3*_0x1799a3*_0x1799a3;case _0x405758(0x2ca):return _0x7ccf5c*_0x7ccf5c*_0x7ccf5c*_0x7ccf5c*_0x7ccf5c;case _0x405758(0x80b):var _0x1799a3=_0x7ccf5c-0x1;return 0x1+_0x1799a3*_0x1799a3*_0x1799a3*_0x1799a3*_0x1799a3;case _0x405758(0x4a1):var _0x1799a3=_0x7ccf5c-0x1;return _0x7ccf5c<0.5?0x10*_0x7ccf5c*_0x7ccf5c*_0x7ccf5c*_0x7ccf5c*_0x7ccf5c:0x1+0x10*_0x1799a3*_0x1799a3*_0x1799a3*_0x1799a3*_0x1799a3;case _0x405758(0x5d7):if(_0x7ccf5c===0x0)return 0x0;return Math['pow'](0x2,0xa*(_0x7ccf5c-0x1));case'OUTEXPO':if(_0x7ccf5c===0x1)return 0x1;return-Math['pow'](0x2,-0xa*_0x7ccf5c)+0x1;case _0x405758(0x317):if(_0x7ccf5c===0x0||_0x7ccf5c===0x1)return _0x7ccf5c;var _0x44697e=_0x7ccf5c*0x2,_0x36f7ea=_0x44697e-0x1;if(_0x44697e<0x1)return 0.5*Math[_0x405758(0x6e0)](0x2,0xa*_0x36f7ea);return 0.5*(-Math[_0x405758(0x6e0)](0x2,-0xa*_0x36f7ea)+0x2);case _0x405758(0x186):var _0x44697e=_0x7ccf5c/0x1;return-0x1*(Math[_0x405758(0x91d)](0x1-_0x44697e*_0x7ccf5c)-0x1);case'OUTCIRC':var _0x1799a3=_0x7ccf5c-0x1;return Math[_0x405758(0x91d)](0x1-_0x1799a3*_0x1799a3);case _0x405758(0x545):var _0x44697e=_0x7ccf5c*0x2,_0x36f7ea=_0x44697e-0x2;if(_0x44697e<0x1){if('bWPCM'!==_0x405758(0x82f)){const _0xe37251=_0x2c64cf['CoreEngine'][_0x405758(0x8fc)][_0x405758(0x762)]['NewGameCommonEvent'];if(_0xe37251>0x0)_0x37b6f4[_0x405758(0x83b)](_0xe37251);}else return-0.5*(Math[_0x405758(0x91d)](0x1-_0x44697e*_0x44697e)-0x1);}return 0.5*(Math[_0x405758(0x91d)](0x1-_0x36f7ea*_0x36f7ea)+0x1);case'INBACK':return _0x7ccf5c*_0x7ccf5c*((_0x350e88+0x1)*_0x7ccf5c-_0x350e88);case _0x405758(0x61f):var _0x44697e=_0x7ccf5c/0x1-0x1;return _0x44697e*_0x44697e*((_0x350e88+0x1)*_0x44697e+_0x350e88)+0x1;break;case _0x405758(0x3cd):var _0x44697e=_0x7ccf5c*0x2,_0x4645bf=_0x44697e-0x2,_0xfa37c0=_0x350e88*1.525;if(_0x44697e<0x1){if(_0x405758(0x51a)!==_0x405758(0x915))return 0.5*_0x44697e*_0x44697e*((_0xfa37c0+0x1)*_0x44697e-_0xfa37c0);else _0x32550f['clear'](),this['processBack']();}return 0.5*(_0x4645bf*_0x4645bf*((_0xfa37c0+0x1)*_0x4645bf+_0xfa37c0)+0x2);case _0x405758(0x30d):if(_0x7ccf5c===0x0||_0x7ccf5c===0x1){if(_0x405758(0x8a5)!==_0x405758(0x556))return _0x7ccf5c;else{if(_0x1e00ca[_0x405758(0x4f7)]())_0x5e5bd1[_0x405758(0x253)](_0x1c755b);}}var _0x44697e=_0x7ccf5c/0x1,_0x36f7ea=_0x44697e-0x1,_0x1a038c=0x1-_0x4e416b,_0xfa37c0=_0x1a038c/(0x2*Math['PI'])*Math[_0x405758(0x6e4)](0x1);return-(Math[_0x405758(0x6e0)](0x2,0xa*_0x36f7ea)*Math[_0x405758(0x554)]((_0x36f7ea-_0xfa37c0)*(0x2*Math['PI'])/_0x1a038c));case _0x405758(0x237):var _0x1a038c=0x1-_0x4e416b,_0x44697e=_0x7ccf5c*0x2;if(_0x7ccf5c===0x0||_0x7ccf5c===0x1){if(_0x405758(0x726)!==_0x405758(0x4e3))return _0x7ccf5c;else{let _0x271e76=_0x3b4dfc[_0x405758(0x71f)],_0x253123=_0x271e76[_0x405758(0x7e1)];for(let _0x586a73=0x0;_0x586a73<_0x253123;++_0x586a73){this['_editWindow']['add'](_0x271e76[_0x586a73])?_0x2863e7[_0x405758(0x212)]():_0x6e4237[_0x405758(0x333)]();}_0x2f4d41[_0x405758(0x2e8)]();}}var _0xfa37c0=_0x1a038c/(0x2*Math['PI'])*Math[_0x405758(0x6e4)](0x1);return Math['pow'](0x2,-0xa*_0x44697e)*Math[_0x405758(0x554)]((_0x44697e-_0xfa37c0)*(0x2*Math['PI'])/_0x1a038c)+0x1;case _0x405758(0x3be):var _0x1a038c=0x1-_0x4e416b;if(_0x7ccf5c===0x0||_0x7ccf5c===0x1)return _0x7ccf5c;var _0x44697e=_0x7ccf5c*0x2,_0x36f7ea=_0x44697e-0x1,_0xfa37c0=_0x1a038c/(0x2*Math['PI'])*Math['asin'](0x1);if(_0x44697e<0x1)return-0.5*(Math[_0x405758(0x6e0)](0x2,0xa*_0x36f7ea)*Math[_0x405758(0x554)]((_0x36f7ea-_0xfa37c0)*(0x2*Math['PI'])/_0x1a038c));return Math[_0x405758(0x6e0)](0x2,-0xa*_0x36f7ea)*Math['sin']((_0x36f7ea-_0xfa37c0)*(0x2*Math['PI'])/_0x1a038c)*0.5+0x1;case _0x405758(0x35f):var _0x44697e=_0x7ccf5c/0x1;if(_0x44697e<0x1/2.75)return 7.5625*_0x44697e*_0x44697e;else{if(_0x44697e<0x2/2.75){if(_0x405758(0x7d1)===_0x405758(0x7d1)){var _0x4645bf=_0x44697e-1.5/2.75;return 7.5625*_0x4645bf*_0x4645bf+0.75;}else _0x323497=_0x197f88['round'](_0x1a259e),_0x4f8310=_0x1a6ad1[_0x405758(0x18a)](_0x4c2ae5),_0x5da130[_0x405758(0x249)][_0x405758(0x743)][_0x405758(0x1f7)](this,_0x208074,_0x1312d4,_0x204077);}else{if(_0x44697e<2.5/2.75){var _0x4645bf=_0x44697e-2.25/2.75;return 7.5625*_0x4645bf*_0x4645bf+0.9375;}else{var _0x4645bf=_0x44697e-2.625/2.75;return 7.5625*_0x4645bf*_0x4645bf+0.984375;}}}case _0x405758(0x827):var _0x485ee1=0x1-VisuMZ[_0x405758(0x616)](0x1-_0x7ccf5c,_0x405758(0x3a0));return _0x485ee1;case'INOUTBOUNCE':if(_0x7ccf5c<0.5){if(_0x405758(0x1ee)!==_0x405758(0x6f1))var _0x485ee1=VisuMZ[_0x405758(0x616)](_0x7ccf5c*0x2,_0x405758(0x416))*0.5;else{if(!_0x3e1d30['isSceneMap']())return;_0x409a8a[_0x405758(0x7d8)][_0x405758(0x264)](this),_0x2606f0[_0x405758(0x77c)][_0x405758(0x6b0)][_0x405758(0x1f7)](this);}}else{if('bhIzp'!==_0x405758(0x6c4))var _0x485ee1=VisuMZ[_0x405758(0x616)](_0x7ccf5c*0x2-0x1,'outbounce')*0.5+0.5;else return this[_0x405758(0x8c3)]();}return _0x485ee1;default:return _0x7ccf5c;}},VisuMZ['GetParamIcon']=function(_0x39d310){const _0x1efa9d=_0x2bd3fa;_0x39d310=String(_0x39d310)[_0x1efa9d(0x345)]();const _0x2f1696=VisuMZ[_0x1efa9d(0x249)][_0x1efa9d(0x8fc)][_0x1efa9d(0x7f9)];if(_0x39d310===_0x1efa9d(0x274))return _0x2f1696[_0x1efa9d(0x8c2)];if(_0x39d310==='MAXMP')return _0x2f1696[_0x1efa9d(0x680)];if(_0x39d310==='ATK')return _0x2f1696[_0x1efa9d(0x3a4)];if(_0x39d310==='DEF')return _0x2f1696[_0x1efa9d(0x48a)];if(_0x39d310===_0x1efa9d(0x1ba))return _0x2f1696[_0x1efa9d(0x719)];if(_0x39d310===_0x1efa9d(0x335))return _0x2f1696[_0x1efa9d(0x185)];if(_0x39d310===_0x1efa9d(0x2bc))return _0x2f1696[_0x1efa9d(0x954)];if(_0x39d310==='LUK')return _0x2f1696[_0x1efa9d(0x366)];if(_0x39d310===_0x1efa9d(0x362))return _0x2f1696[_0x1efa9d(0x48e)];if(_0x39d310==='EVA')return _0x2f1696[_0x1efa9d(0x55d)];if(_0x39d310==='CRI')return _0x2f1696[_0x1efa9d(0x4b6)];if(_0x39d310===_0x1efa9d(0x20d))return _0x2f1696['IconXParam3'];if(_0x39d310===_0x1efa9d(0x8db))return _0x2f1696[_0x1efa9d(0x5f7)];if(_0x39d310===_0x1efa9d(0x5e0))return _0x2f1696[_0x1efa9d(0x588)];if(_0x39d310===_0x1efa9d(0x2c6))return _0x2f1696[_0x1efa9d(0x434)];if(_0x39d310===_0x1efa9d(0x195))return _0x2f1696[_0x1efa9d(0x470)];if(_0x39d310===_0x1efa9d(0x574))return _0x2f1696[_0x1efa9d(0x497)];if(_0x39d310==='TRG')return _0x2f1696[_0x1efa9d(0x71d)];if(_0x39d310===_0x1efa9d(0x8b4))return _0x2f1696['IconSParam0'];if(_0x39d310==='GRD')return _0x2f1696['IconSParam1'];if(_0x39d310==='REC')return _0x2f1696[_0x1efa9d(0x84d)];if(_0x39d310===_0x1efa9d(0x20a))return _0x2f1696['IconSParam3'];if(_0x39d310==='MCR')return _0x2f1696[_0x1efa9d(0x294)];if(_0x39d310==='TCR')return _0x2f1696[_0x1efa9d(0x5b3)];if(_0x39d310===_0x1efa9d(0x334))return _0x2f1696[_0x1efa9d(0x49d)];if(_0x39d310===_0x1efa9d(0x3da))return _0x2f1696['IconSParam7'];if(_0x39d310===_0x1efa9d(0x5d6))return _0x2f1696[_0x1efa9d(0x927)];if(_0x39d310===_0x1efa9d(0x2e4))return _0x2f1696['IconSParam9'];if(VisuMZ[_0x1efa9d(0x249)]['CustomParamIcons'][_0x39d310])return VisuMZ[_0x1efa9d(0x249)][_0x1efa9d(0x779)][_0x39d310]||0x0;return 0x0;},VisuMZ['ConvertNumberToString']=function(_0x59a73e,_0x5b56a5,_0x32c2e2){const _0x238092=_0x2bd3fa;if(_0x32c2e2===undefined&&_0x59a73e%0x1===0x0)return _0x59a73e;if(_0x32c2e2!==undefined&&['MAXHP',_0x238092(0x881),_0x238092(0x64e),_0x238092(0x62f),_0x238092(0x1ba),_0x238092(0x335),_0x238092(0x2bc),'LUK'][_0x238092(0x448)](String(_0x32c2e2)[_0x238092(0x345)]()[_0x238092(0x8c9)]()))return _0x59a73e;_0x5b56a5=_0x5b56a5||0x0;if(VisuMZ[_0x238092(0x249)][_0x238092(0x738)][_0x32c2e2]){if(_0x238092(0x35c)!==_0x238092(0x6e3)){if(VisuMZ['CoreEngine']['CustomParamType'][_0x32c2e2]==='integer'){if('nmmSF'===_0x238092(0x456))return _0x59a73e;else this[_0x238092(0x6b5)]=0x1;}else return String((_0x59a73e*0x64)[_0x238092(0x4e9)](_0x5b56a5))+'%';}else{if(_0x488a90[_0x238092(0x4f7)]())_0x5bc7ec[_0x238092(0x253)](_0x428d47);}}return String((_0x59a73e*0x64)[_0x238092(0x4e9)](_0x5b56a5))+'%';},VisuMZ[_0x2bd3fa(0x862)]=function(_0x43ff88){const _0x7210b7=_0x2bd3fa;_0x43ff88=String(_0x43ff88);if(!_0x43ff88)return _0x43ff88;if(typeof _0x43ff88!==_0x7210b7(0x95b))return _0x43ff88;const _0x29c8f7=VisuMZ[_0x7210b7(0x249)]['Settings'][_0x7210b7(0x762)][_0x7210b7(0x941)]||_0x7210b7(0x2e5),_0x5d239a={'maximumFractionDigits':0x6};_0x43ff88=_0x43ff88[_0x7210b7(0x57d)](/\[(.*?)\]/g,(_0x9f6da,_0x483610)=>{const _0x2f9138=_0x7210b7;if(_0x2f9138(0x636)===_0x2f9138(0x636))return VisuMZ[_0x2f9138(0x2b4)](_0x483610,'[',']');else this[_0x2f9138(0x364)][_0x2f9138(0x558)](_0x419f7e['layoutSettings']['CommandBgType']);}),_0x43ff88=_0x43ff88['replace'](/<(.*?)>/g,(_0x3356b8,_0x51edc3)=>{const _0x4058a3=_0x7210b7;if(_0x4058a3(0x5fd)!==_0x4058a3(0x5fd))this[_0x4058a3(0x752)]='FV';else return VisuMZ[_0x4058a3(0x2b4)](_0x51edc3,'<','>');}),_0x43ff88=_0x43ff88[_0x7210b7(0x57d)](/\{\{(.*?)\}\}/g,(_0x5b2f4d,_0x27e8f7)=>{const _0x1ecff8=_0x7210b7;if(_0x1ecff8(0x4cc)!==_0x1ecff8(0x51f))return VisuMZ[_0x1ecff8(0x2b4)](_0x27e8f7,'','');else{const _0x5c83ce=_0x1ecff8(0x347);this['_colorCache']=this[_0x1ecff8(0x945)]||{};if(this[_0x1ecff8(0x945)][_0x5c83ce])return this['_colorCache'][_0x5c83ce];const _0x2a1115=_0x4ec237['CoreEngine'][_0x1ecff8(0x8fc)][_0x1ecff8(0x394)]['ColorExpGauge1'];return this[_0x1ecff8(0x41f)](_0x5c83ce,_0x2a1115);}}),_0x43ff88=_0x43ff88[_0x7210b7(0x57d)](/(\d+\.?\d*)/g,(_0x12c7fc,_0x20ca69)=>{const _0x3cd759=_0x7210b7;if('ZknfN'===_0x3cd759(0x384)){let _0x5840c8=_0x20ca69;if(_0x5840c8[0x0]==='0')return _0x5840c8;if(_0x5840c8[_0x5840c8['length']-0x1]==='.')return Number(_0x5840c8)[_0x3cd759(0x28f)](_0x29c8f7,_0x5d239a)+'.';else return _0x5840c8[_0x5840c8[_0x3cd759(0x7e1)]-0x1]===','?_0x3cd759(0x383)!==_0x3cd759(0x383)?_0x1b2fa1[_0x3cd759(0x6a0)]['EditRect'][_0x3cd759(0x1f7)](this):Number(_0x5840c8)['toLocaleString'](_0x29c8f7,_0x5d239a)+',':Number(_0x5840c8)[_0x3cd759(0x28f)](_0x29c8f7,_0x5d239a);}else this[_0x3cd759(0x4dd)][_0x3cd759(0x558)](_0x30e028[_0x3cd759(0x6a0)][_0x3cd759(0x380)]);});let _0x19b1d0=0x3;while(_0x19b1d0--){_0x43ff88=VisuMZ[_0x7210b7(0x42b)](_0x43ff88);}return _0x43ff88;},VisuMZ[_0x2bd3fa(0x2b4)]=function(_0x1c30db,_0x1c7a66,_0x347d36){const _0x401d18=_0x2bd3fa;return _0x1c30db=_0x1c30db[_0x401d18(0x57d)](/(\d)/gi,(_0x29d048,_0x52dea5)=>'PRESERVCONVERSION(%1)'['format'](Number(_0x52dea5))),_0x401d18(0x86c)[_0x401d18(0x5a0)](_0x1c30db,_0x1c7a66,_0x347d36);},VisuMZ[_0x2bd3fa(0x42b)]=function(_0x5cfa1c){const _0x47906a=_0x2bd3fa;return _0x5cfa1c=_0x5cfa1c[_0x47906a(0x57d)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x4be062,_0xcf769b)=>Number(parseInt(_0xcf769b))),_0x5cfa1c;},VisuMZ[_0x2bd3fa(0x293)]=function(_0x47a813){const _0x3889d2=_0x2bd3fa;SoundManager['playOk']();if(!Utils[_0x3889d2(0x481)]()){const _0x578f80=window[_0x3889d2(0x5f2)](_0x47a813,'_blank');}else{if('zKQcd'==='zKQcd'){const _0x3df207=process[_0x3889d2(0x822)]==_0x3889d2(0x96c)?_0x3889d2(0x5f2):process[_0x3889d2(0x822)]==_0x3889d2(0x676)?_0x3889d2(0x815):'xdg-open';require(_0x3889d2(0x8ac))['exec'](_0x3df207+'\x20'+_0x47a813);}else(_0x86fddb<_0x44d032-_0x3c49f1||_0x108f17&&_0x4139ef===0x1)&&this[_0x3889d2(0x969)]((_0x2ec8d1+_0x103c66)%_0xebcef);}},Game_Picture[_0x2bd3fa(0x77c)][_0x2bd3fa(0x39e)]=function(){return this['_anchor'];},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x46a)]=Game_Picture[_0x2bd3fa(0x77c)][_0x2bd3fa(0x73d)],Game_Picture[_0x2bd3fa(0x77c)][_0x2bd3fa(0x73d)]=function(){const _0x3e25a3=_0x2bd3fa;VisuMZ[_0x3e25a3(0x249)][_0x3e25a3(0x46a)]['call'](this),this[_0x3e25a3(0x1c4)]={'x':0x0,'y':0x0},this[_0x3e25a3(0x187)]={'x':0x0,'y':0x0};},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x73b)]=Game_Picture['prototype'][_0x2bd3fa(0x3e3)],Game_Picture[_0x2bd3fa(0x77c)]['updateMove']=function(){const _0x502f95=_0x2bd3fa;this['updateAnchor']();const _0xb6abc8=this['_duration'];VisuMZ[_0x502f95(0x249)][_0x502f95(0x73b)][_0x502f95(0x1f7)](this),_0xb6abc8>0x0&&this[_0x502f95(0x698)]<=0x0&&(this['_x']=this[_0x502f95(0x42a)],this['_y']=this[_0x502f95(0x756)],this[_0x502f95(0x1a0)]=this[_0x502f95(0x500)],this['_scaleY']=this['_targetScaleY'],this['_opacity']=this[_0x502f95(0x5c2)],this[_0x502f95(0x1c4)]&&(this[_0x502f95(0x1c4)]['x']=this['_targetAnchor']['x'],this[_0x502f95(0x1c4)]['y']=this['_targetAnchor']['y']));},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x5bf)]=Game_Picture[_0x2bd3fa(0x77c)][_0x2bd3fa(0x686)],Game_Picture[_0x2bd3fa(0x77c)][_0x2bd3fa(0x686)]=function(_0x27ff82,_0x4a96db,_0x32eaf4,_0x2ce636,_0x4f4a77,_0x131637,_0x47bfab,_0x3c6c9a){const _0x3282a5=_0x2bd3fa;VisuMZ['CoreEngine'][_0x3282a5(0x5bf)][_0x3282a5(0x1f7)](this,_0x27ff82,_0x4a96db,_0x32eaf4,_0x2ce636,_0x4f4a77,_0x131637,_0x47bfab,_0x3c6c9a),this[_0x3282a5(0x1ce)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x4a96db]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0x2bd3fa(0x226)]=Game_Picture[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1a1)],Game_Picture['prototype'][_0x2bd3fa(0x1a1)]=function(_0x2a67a8,_0x3bc054,_0x439296,_0x38761a,_0x41c13d,_0x451a83,_0x5f3f6c,_0x323e00,_0x37f9d2){const _0x2255a2=_0x2bd3fa;VisuMZ[_0x2255a2(0x249)][_0x2255a2(0x226)][_0x2255a2(0x1f7)](this,_0x2a67a8,_0x3bc054,_0x439296,_0x38761a,_0x41c13d,_0x451a83,_0x5f3f6c,_0x323e00,_0x37f9d2),this[_0x2255a2(0x6c1)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x2a67a8]||{'x':0x0,'y':0x0});},Game_Picture[_0x2bd3fa(0x77c)][_0x2bd3fa(0x272)]=function(){const _0x383346=_0x2bd3fa;this['_duration']>0x0&&(this[_0x383346(0x1c4)]['x']=this[_0x383346(0x644)](this[_0x383346(0x1c4)]['x'],this[_0x383346(0x187)]['x']),this[_0x383346(0x1c4)]['y']=this['applyEasing'](this[_0x383346(0x1c4)]['y'],this[_0x383346(0x187)]['y']));},Game_Picture['prototype'][_0x2bd3fa(0x1ce)]=function(_0x4b4bb2){const _0x53aed0=_0x2bd3fa;this[_0x53aed0(0x1c4)]=_0x4b4bb2,this[_0x53aed0(0x187)]=JsonEx[_0x53aed0(0x20e)](this[_0x53aed0(0x1c4)]);},Game_Picture['prototype'][_0x2bd3fa(0x6c1)]=function(_0x3bff4c){const _0x40b512=_0x2bd3fa;this[_0x40b512(0x187)]=_0x3bff4c;},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x5ef)]=Sprite_Picture[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1cd)],Sprite_Picture[_0x2bd3fa(0x77c)][_0x2bd3fa(0x1cd)]=function(){const _0x32745f=_0x2bd3fa,_0x2cabff=this[_0x32745f(0x4e6)]();!_0x2cabff[_0x32745f(0x39e)]()?VisuMZ[_0x32745f(0x249)][_0x32745f(0x5ef)]['call'](this):(this[_0x32745f(0x39e)]['x']=_0x2cabff[_0x32745f(0x39e)]()['x'],this[_0x32745f(0x39e)]['y']=_0x2cabff[_0x32745f(0x39e)]()['y']);},Game_Action[_0x2bd3fa(0x77c)]['setEnemyAction']=function(_0x454f3a){const _0x40a27d=_0x2bd3fa;if(_0x454f3a){const _0x1dc4b2=_0x454f3a[_0x40a27d(0x402)];if(_0x1dc4b2===0x1&&this['subject']()['attackSkillId']()!==0x1)this[_0x40a27d(0x57a)]();else _0x1dc4b2===0x2&&this[_0x40a27d(0x88e)]()[_0x40a27d(0x8be)]()!==0x2?_0x40a27d(0x2fa)==='bjXqb'?this['setGuard']():this['_optionsWindow'][_0x40a27d(0x558)](_0x238ddf[_0x40a27d(0x6a0)][_0x40a27d(0x552)]):this[_0x40a27d(0x328)](_0x1dc4b2);}else this[_0x40a27d(0x2e8)]();},Game_Actor[_0x2bd3fa(0x77c)][_0x2bd3fa(0x19b)]=function(){const _0x213b8a=_0x2bd3fa;return this[_0x213b8a(0x52d)]()[_0x213b8a(0x38e)](_0x5a3d99=>this[_0x213b8a(0x763)](_0x5a3d99)&&this[_0x213b8a(0x530)]()[_0x213b8a(0x448)](_0x5a3d99['stypeId']));},Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x236)]=function(){const _0x150ad5=_0x2bd3fa;this['_dimmerSprite']=new Sprite(),this[_0x150ad5(0x3c6)]['bitmap']=new Bitmap(0x0,0x0),this[_0x150ad5(0x3c6)]['x']=0x0,this[_0x150ad5(0x886)](this[_0x150ad5(0x3c6)]);},Window_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x7f6)]=function(){const _0x30c46b=_0x2bd3fa;if(this[_0x30c46b(0x3c6)]){if('HfMWt'!==_0x30c46b(0x5a4)){const _0x595cc1=this['_dimmerSprite'][_0x30c46b(0x44e)],_0x330340=this[_0x30c46b(0x73f)],_0xb0b6f9=this[_0x30c46b(0x30f)],_0x4e6956=this['padding'],_0x42cbb3=ColorManager['dimColor1'](),_0x4ee213=ColorManager[_0x30c46b(0x76d)]();_0x595cc1[_0x30c46b(0x35b)](_0x330340,_0xb0b6f9),_0x595cc1['gradientFillRect'](0x0,0x0,_0x330340,_0x4e6956,_0x4ee213,_0x42cbb3,!![]),_0x595cc1[_0x30c46b(0x602)](0x0,_0x4e6956,_0x330340,_0xb0b6f9-_0x4e6956*0x2,_0x42cbb3),_0x595cc1[_0x30c46b(0x450)](0x0,_0xb0b6f9-_0x4e6956,_0x330340,_0x4e6956,_0x42cbb3,_0x4ee213,!![]),this['_dimmerSprite'][_0x30c46b(0x3ea)](0x0,0x0,_0x330340,_0xb0b6f9);}else _0x1d1871['_x']=_0xbca632['_x'],_0x2fb5d8['_y']=_0x5eaff9['_y'];}},Game_Actor['prototype'][_0x2bd3fa(0x6fc)]=function(){const _0x4fabcd=_0x2bd3fa;for(let _0x3415ff=0x0;_0x3415ff<this['numActions']();_0x3415ff++){const _0x21b176=this[_0x4fabcd(0x435)]();let _0x34657d=Number[_0x4fabcd(0x423)];this['setAction'](_0x3415ff,_0x21b176[0x0]);for(const _0x4d240f of _0x21b176){if(_0x4fabcd(0x7b2)!==_0x4fabcd(0x7b2))return this['isItem'](_0x43732c)&&_0x79a1e[_0x4fabcd(0x420)]===0x2;else{const _0x110186=_0x4d240f[_0x4fabcd(0x585)]();_0x110186>_0x34657d&&('ICnuK'!=='ICnuK'?this[_0x4fabcd(0x318)]='':(_0x34657d=_0x110186,this[_0x4fabcd(0x884)](_0x3415ff,_0x4d240f)));}}}this[_0x4fabcd(0x4ca)](_0x4fabcd(0x675));},Window_BattleItem['prototype']['isEnabled']=function(_0x48c3a7){const _0x104d27=_0x2bd3fa;if(BattleManager['actor']()){if(_0x104d27(0x639)!==_0x104d27(0x47f))return BattleManager[_0x104d27(0x1cf)]()['canUse'](_0x48c3a7);else{let _0x5662da=this['_mode'];this[_0x104d27(0x67a)]=_0x122e9b,_0x5662da!==this[_0x104d27(0x67a)]&&(this['refresh'](),_0x1da970['playOk'](),this['_mode']===_0x104d27(0x42f)?this[_0x104d27(0x61b)](0x0):this[_0x104d27(0x61b)](-0x1));}}else return'xHDeX'!==_0x104d27(0x270)?Window_ItemList[_0x104d27(0x77c)][_0x104d27(0x84e)][_0x104d27(0x1f7)](this,_0x48c3a7):_0x161002['layoutSettings'][_0x104d27(0x69f)][_0x104d27(0x1f7)](this);},VisuMZ[_0x2bd3fa(0x249)][_0x2bd3fa(0x682)]=Scene_Map[_0x2bd3fa(0x77c)][_0x2bd3fa(0x641)],Scene_Map[_0x2bd3fa(0x77c)][_0x2bd3fa(0x641)]=function(){const _0x4110ea=_0x2bd3fa;VisuMZ[_0x4110ea(0x249)][_0x4110ea(0x682)][_0x4110ea(0x1f7)](this);const _0x6d87e2=this[_0x4110ea(0x243)][_0x4110ea(0x58d)];if(_0x6d87e2)this[_0x4110ea(0x6b6)](_0x6d87e2);},VisuMZ['CoreEngine'][_0x2bd3fa(0x555)]=Scene_Battle[_0x2bd3fa(0x77c)][_0x2bd3fa(0x641)],Scene_Battle[_0x2bd3fa(0x77c)][_0x2bd3fa(0x641)]=function(){const _0x2b074c=_0x2bd3fa;VisuMZ[_0x2b074c(0x249)][_0x2b074c(0x555)][_0x2b074c(0x1f7)](this);const _0x11330b=this[_0x2b074c(0x243)][_0x2b074c(0x58d)];if(_0x11330b)this[_0x2b074c(0x6b6)](_0x11330b);},Sprite_Actor[_0x2bd3fa(0x77c)][_0x2bd3fa(0x859)]=function(){const _0x10972e=_0x2bd3fa;Sprite_Battler[_0x10972e(0x77c)][_0x10972e(0x859)]['call'](this),this[_0x10972e(0x5a5)]();if(this[_0x10972e(0x7c9)])this['updateMotion']();else this[_0x10972e(0x318)]!==''&&(this[_0x10972e(0x318)]='');},Window[_0x2bd3fa(0x77c)][_0x2bd3fa(0x438)]=function(){const _0x44d9e4=_0x2bd3fa,_0x325fa4=this['_width'],_0x2703f3=this[_0x44d9e4(0x660)],_0x2012eb=0x18,_0x9b9aa6=_0x2012eb/0x2,_0xf96bdb=0x60+_0x2012eb,_0x4f3aeb=0x0+_0x2012eb;this[_0x44d9e4(0x952)][_0x44d9e4(0x44e)]=this[_0x44d9e4(0x311)],this[_0x44d9e4(0x952)][_0x44d9e4(0x39e)]['x']=0.5,this[_0x44d9e4(0x952)]['anchor']['y']=0.5,this[_0x44d9e4(0x952)][_0x44d9e4(0x3ea)](_0xf96bdb+_0x9b9aa6,_0x4f3aeb+_0x9b9aa6+_0x2012eb,_0x2012eb,_0x9b9aa6),this[_0x44d9e4(0x952)][_0x44d9e4(0x1a1)](Math['round'](_0x325fa4/0x2),Math['round'](_0x2703f3-_0x9b9aa6)),this[_0x44d9e4(0x6cc)][_0x44d9e4(0x44e)]=this[_0x44d9e4(0x311)],this[_0x44d9e4(0x6cc)][_0x44d9e4(0x39e)]['x']=0.5,this[_0x44d9e4(0x6cc)][_0x44d9e4(0x39e)]['y']=0.5,this[_0x44d9e4(0x6cc)]['setFrame'](_0xf96bdb+_0x9b9aa6,_0x4f3aeb,_0x2012eb,_0x9b9aa6),this[_0x44d9e4(0x6cc)][_0x44d9e4(0x1a1)](Math['round'](_0x325fa4/0x2),Math[_0x44d9e4(0x18a)](_0x9b9aa6));},Window[_0x2bd3fa(0x77c)]['_refreshPauseSign']=function(){const _0x151ed7=_0x2bd3fa,_0x55d4bd=0x90,_0x375110=0x60,_0x525d74=0x18;this['_pauseSignSprite'][_0x151ed7(0x44e)]=this[_0x151ed7(0x311)],this[_0x151ed7(0x76f)][_0x151ed7(0x39e)]['x']=0.5,this[_0x151ed7(0x76f)][_0x151ed7(0x39e)]['y']=0x1,this[_0x151ed7(0x76f)]['move'](Math[_0x151ed7(0x18a)](this[_0x151ed7(0x379)]/0x2),this[_0x151ed7(0x660)]),this[_0x151ed7(0x76f)]['setFrame'](_0x55d4bd,_0x375110,_0x525d74,_0x525d74),this[_0x151ed7(0x76f)]['alpha']=0xff;},Window[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6c5)]=function(){const _0xfbc139=_0x2bd3fa,_0x547ad0=this[_0xfbc139(0x486)][_0xfbc139(0x8fe)][_0xfbc139(0x842)](new Point(0x0,0x0)),_0x5496b6=this[_0xfbc139(0x486)][_0xfbc139(0x444)];_0x5496b6['x']=_0x547ad0['x']+this[_0xfbc139(0x490)]['x'],_0x5496b6['y']=_0x547ad0['y']+this[_0xfbc139(0x490)]['y'],_0x5496b6[_0xfbc139(0x73f)]=Math[_0xfbc139(0x2f0)](this[_0xfbc139(0x683)]*this[_0xfbc139(0x722)]['x']),_0x5496b6[_0xfbc139(0x30f)]=Math[_0xfbc139(0x2f0)](this[_0xfbc139(0x69a)]*this['scale']['y']);},Window[_0x2bd3fa(0x77c)][_0x2bd3fa(0x336)]=function(){const _0x3ff4b1=_0x2bd3fa,_0x692293=this[_0x3ff4b1(0x4aa)],_0x3c28bc=Math['max'](0x0,this[_0x3ff4b1(0x379)]-_0x692293*0x2),_0x43c8bb=Math[_0x3ff4b1(0x523)](0x0,this[_0x3ff4b1(0x660)]-_0x692293*0x2),_0x4d030f=this['_backSprite'],_0x29d93c=_0x4d030f[_0x3ff4b1(0x8b7)][0x0];_0x4d030f[_0x3ff4b1(0x44e)]=this['_windowskin'],_0x4d030f[_0x3ff4b1(0x3ea)](0x0,0x0,0x60,0x60),_0x4d030f[_0x3ff4b1(0x1a1)](_0x692293,_0x692293),_0x4d030f['scale']['x']=_0x3c28bc/0x60,_0x4d030f[_0x3ff4b1(0x722)]['y']=_0x43c8bb/0x60,_0x29d93c['bitmap']=this[_0x3ff4b1(0x311)],_0x29d93c[_0x3ff4b1(0x3ea)](0x0,0x60,0x60,0x60),_0x29d93c[_0x3ff4b1(0x1a1)](0x0,0x0,_0x3c28bc,_0x43c8bb),_0x29d93c[_0x3ff4b1(0x722)]['x']=0x1/_0x4d030f['scale']['x'],_0x29d93c[_0x3ff4b1(0x722)]['y']=0x1/_0x4d030f[_0x3ff4b1(0x722)]['y'],_0x4d030f[_0x3ff4b1(0x3a2)](this[_0x3ff4b1(0x7ee)]);},Game_Temp[_0x2bd3fa(0x77c)][_0x2bd3fa(0x7b8)]=function(){const _0x143ef5=_0x2bd3fa;this[_0x143ef5(0x542)]=[],this[_0x143ef5(0x455)]=[],this['_pointAnimationQueue']=[],this[_0x143ef5(0x661)]=[];},VisuMZ[_0x2bd3fa(0x249)]['Scene_Base_terminateAnimationClearBugFix']=Scene_Base[_0x2bd3fa(0x77c)][_0x2bd3fa(0x6b0)],Scene_Base['prototype'][_0x2bd3fa(0x6b0)]=function(){const _0x594cff=_0x2bd3fa;if($gameTemp)$gameTemp[_0x594cff(0x7b8)]();VisuMZ[_0x594cff(0x249)][_0x594cff(0x252)][_0x594cff(0x1f7)](this);},Bitmap['prototype'][_0x2bd3fa(0x592)]=function(_0x4fc5e3){const _0x5c066d=_0x2bd3fa,_0x17a173=this[_0x5c066d(0x1c3)];_0x17a173[_0x5c066d(0x183)](),_0x17a173[_0x5c066d(0x44b)]=this[_0x5c066d(0x368)]();const _0x318f52=_0x17a173['measureText'](_0x4fc5e3)[_0x5c066d(0x73f)];return _0x17a173[_0x5c066d(0x6e2)](),_0x318f52;},Window_Message[_0x2bd3fa(0x77c)]['textWidth']=function(_0xefd537){const _0x1d075b=_0x2bd3fa;return this[_0x1d075b(0x465)]()?this['contents'][_0x1d075b(0x592)](_0xefd537):Window_Base['prototype']['textWidth'][_0x1d075b(0x1f7)](this,_0xefd537);},Window_Message['prototype'][_0x2bd3fa(0x465)]=function(){const _0x48a24e=_0x2bd3fa;return VisuMZ[_0x48a24e(0x249)][_0x48a24e(0x8fc)][_0x48a24e(0x762)][_0x48a24e(0x84c)]??!![];},VisuMZ[_0x2bd3fa(0x249)]['Game_Action_numRepeats']=Game_Action[_0x2bd3fa(0x77c)][_0x2bd3fa(0x304)],Game_Action[_0x2bd3fa(0x77c)][_0x2bd3fa(0x304)]=function(){const _0x2356ca=_0x2bd3fa;if(this['item']()){if(_0x2356ca(0x6d7)!==_0x2356ca(0x553))return VisuMZ[_0x2356ca(0x249)][_0x2356ca(0x405)][_0x2356ca(0x1f7)](this);else!_0x4a8443['isPlaying']()&&this[_0x2356ca(0x538)](_0x1a8ed9);}else return 0x0;},VisuMZ['CoreEngine'][_0x2bd3fa(0x32f)]=Game_Action[_0x2bd3fa(0x77c)][_0x2bd3fa(0x57a)],Game_Action[_0x2bd3fa(0x77c)]['setAttack']=function(){const _0x5aeefa=_0x2bd3fa;if(this[_0x5aeefa(0x88e)]()&&this['subject']()['canAttack']())VisuMZ[_0x5aeefa(0x249)][_0x5aeefa(0x32f)][_0x5aeefa(0x1f7)](this);else{if(_0x5aeefa(0x848)!=='OlWMR')this[_0x5aeefa(0x2e8)]();else return 0x3;}};