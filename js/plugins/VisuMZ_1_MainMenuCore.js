//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.13] [MainMenuCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Main Menu Core plugin is designed to give you more control over the Main
 * Menu outside of RPG Maker MZ's editor's control. Game devs are given control
 * over how commands work, visual aesthetics pertaining to the Main Menu, and 
 * assign menu images to actors as background portraits.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general Main Menu settings.
 * * The ability to set Menu Background Portraits for individual actors.
 * * Flexibility in changing which commands appear in the Main Menu.
 * * Add new windows like the Playtime Window and Variable windows.
 * * Change the style of how the windows are arranged in the Main Menu.
 * * Change the way the status list is displayed and the way it's displayed.
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * <Menu Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Sets the menu image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 *
 * ---
 * 
 * <Menu Portrait Offset: +x, +y>
 * <Menu Portrait Offset: -x, -y>
 * 
 * <Menu Portrait Offset X: +x>
 * <Menu Portrait Offset X: -x>
 * 
 * <Menu Portrait Offset Y: +y>
 * <Menu Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Offsets the X and Y coordinates for the menu image.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * - This only applies to the Main Menu portraits.
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
 * Actor: Change Menu Image (Group)
 * Actor: Change Menu Image (Range)
 * Actor: Change Menu Image (JS)
 * - Changes the actor's Menu Image.
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Step 1: Actor:
 *   - Select which ID(s) to affect.
 *
 *     Single:
 *     - Select which specific ID to affect.
 *
 *     Variable Reference:
 *     - Which variable is used to determine which ID to affect?
 *
 *     Range Start:
 *     - Select where the ID range begins.
 *
 *     Range End:
 *     - Select where the ID range ends.
 *
 *     Group:
 *     - Select which group of ID(s) to affect.
 *
 *     JavaScript:
 *     - JavaScript code to return an array on which ID(s) to affect.
 *
 *   Step 2: Target:
 *   - Select operation on what to change the switch(es) to.
 *   - Depending on what you pick here, one of the following actions are used
 *     in combination with the ID's picked from Step 1.
 *
 *     Filename:
 *     - Selected actor(s) will have their menu images changed to this.
 *
 *     Variable Reference:
 *     - Select the variable used to determine filename used for the selected
 *       actor(s).
 *
 *     JavaScript:
 *     - JavaScript code to determine what filename is used for the selected
 *       actor(s).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These general settings contain various settings on how the Main Menu scene
 * displays certain windows, alters how specific windows behave, and determines
 * which scenes would display actor menu images as background portraits.
 *
 * ---
 *
 * Gold Window
 * 
 *   Thinner Gold Window:
 *   - Make the Gold Window thinner in the Main Menu?
 *   - Used to match the Playtime and Variable Windows.
 * 
 *   Auto Adjust Height:
 *   - Automatically adjust the height for the thinner Gold Window?
 *
 *   Auto Adjust Y:
 *   - Automatically adjust the Y position for the thinner Gold Window?
 *
 * ---
 * 
 * Status Window
 * 
 *   Select Last?:
 *   - When picking a personal command from the Command Window, select the
 *     last picked actor or always the first?
 * 
 * ---
 *
 * Solo Party
 *
 *   Solo Quick Mode:
 *   - When selecting "Skills", "Equip", or "Status" with one party member,
 *     immediately go to the scene.
 *
 * ---
 *
 * Sub Menus
 *
 *   Menus with Actor BG's:
 *   - A list of the menus that would be compatible with Actor Menu Backgrounds
 *
 *   JS: Actor BG Action:
 *   - Code used to determine how to display the sprites upon loading.
 *
 * ---
 * 
 * Party Window
 * 
 *   Show Reserve Memebers:
 *   - Show reserve members while on the Main Menu scene?
 * 
 *   Hide Main Menu Only
 *   - If reserve members are hidden, hide them only in the main menu or
 *     all scenes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window List
 * ============================================================================
 *
 * The Command Window functions as a hub to the various scenes linked from the
 * Main Menu. These include 'Item', 'Skill', 'Equip', 'Status', 'Save', and
 * so on. This Plugin Parameter is an array that lets you add, remove, and/or
 * alter the Command Window's various commands, how they're handled, whether or
 * not they're visible, and how they react when selected.
 *
 * These will require knowledge of JavaScript to use them properly.
 *
 * ---
 *
 * Command Window List
 * 
 *   Symbol:
 *   - The symbol used for this command.
 *
 *   Icon:
 *   - Icon used for this command.
 *   - Use 0 for no icon.
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
 *   JS: Personal Code:
 *   - JavaScript code that runs once the actor list is selected with this
 *     command highlighted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Playtime Window
 * ============================================================================
 *
 * The Playtime Window is an optional feature that can be displayed in the
 * Main Menu. As its name suggests, it displays the playtime of the player's
 * current play through.
 *
 * ---
 *
 * Playtime Window
 * 
 *   Enable:
 *   - Use the Playtime Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Playtime Window?
 *
 *   Background Type:
 *   - Select background type for the Playtime window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Playtime window.
 * 
 *   Time Icon:
 *   - Icon displayed for the 'Time' label.
 * 
 *   Time Text:
 *   - Text for the display of 'Time' in the Playtime window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Playtime window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Variable Window
 * ============================================================================
 *
 * The Variable Window is an optional feature that can be displayed in the
 * Main Menu. If enabled, the Variable Window will display variables of the
 * game dev's choice in the Main Menu itself.
 *
 * ---
 *
 * Variable Window
 * 
 *   Enable:
 *   - Use the Variable Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Variable Window?
 *
 *   Background Type:
 *   - Select background type for the Variable window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Variable window.
 * 
 *   Variable List:
 *   - Select variables to be displayed into the window.
 *     Use \i[x] to determine their icon.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Variable window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window Style & Command Style Settings
 * ============================================================================
 *
 * This determines how the Main Menu appears based on the Command Window Style.
 * If anything but the 'Default' is used, then these settings will take over
 * the window placement settings for the Main Menu. This means that even if you
 * are using VisuStella's Core Engine, the window layouts will be overwritten.
 *
 * ---
 *
 * Command Window Style:
 * - Choose the positioning and style of the Main Menu Command Window.
 * - This will automatically rearrange windows.
 * 
 *   Default Vertical Side Style:
 *   - The default Main Menu layout style.
 *   - Affected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Top Horizontal Style:
 *   - Puts the Command Window at the top of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 *   Bottom Horizontal Style:
 *   - Puts the Command Window at the bottom of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the top.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Mobile Full Screen Style:
 *   - Puts the Command Window at the center of the screen with larger buttons.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is hidden until prompted to be selected.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 * ---
 *
 * Command Style Settings
 *
 *   Style:
 *   - How do you wish to draw command entries in the Command Window?
 *   - Text Only: displays only text.
 *   - Icon Only: displays only the icon.
 *   - Icon + Text: displays icon first, then text.
 *   - Automatic: determines the best fit for the size
 *
 *   Text Alignment:
 *   - Decide how you want the text to be aligned.
 *   - Left, Center, or Right
 * 
 *   Rows:
 *   - Number of visible rows.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Mobile Thickness:
 *   - The thickness of the buttons for mobile version.
 *   - Applies only to Top, Bottom, and Mobile styles.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Graphic, Status List Style, & List Style Settings
 * ============================================================================
 *
 * Choose how the contents Actor Status List Window in the Main Menu appears.
 * This can range from the which actor graphic is drawn to the style used for
 * the data that's displayed.
 *
 * ---
 *
 * Status Graphic:
 * - Choose how the graphic for actor graphics appear in status-like menus.
 * 
 *   None:
 *   - Don't display any graphic for the actors.
 * 
 *   Face:
 *   - Display the actors' faces. This is the default option in RPG Maker MZ.
 *
 *   Map Sprite:
 *   - Display the actors' map sprites.
 * 
 *   Sideview Battler:
 *   - Display the actors' sideview battlers.
 *
 * ---
 *
 * Main Menu List Style
 * - Choose how the actor status list looks in the Main Menu.
 *
 * Inner-Menu List Style
 * - Choose how the actor status list looks in the inner menus like Scene_Item,
 *   Scene_Skill, etc.
 *
 *   Default Horizontal Style:
 *   - This is the default style found in RPG Maker MZ's Main Menu.
 *
 *   Vertical Style:
 *   - Makes the display for the actor list vertical instead of horizontal.
 *
 *   Portrait Style:
 *   - Similar to the vertical style, except each actor's Menu Image is
 *     displayed in the background instead. Portraits are required.
 *   - If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 *
 *   Solo Style:
 *   - Used for solo party member games. Extends the whole view of the Status
 *     Window to accomodate a single actor.
 *
 *   Thin Horizontal Style:
 *   - Makes the selectable menu entries for the actors a single line thin.
 *
 *   Thicker Horizontal Style:
 *   - Makes the selectable menu entries for the actors two lines thick.
 *
 * ---
 *
 * List Styles
 *   JavaScript code used to determine how the individual styles are drawn.
 *
 *   JS: Default:
 *   JS: Vertical:
 *   JS: Portrait:
 *   JS: Solo:
 *   JS: Thin:
 *   JS: Thicker:
 *   - Code used to draw the data for these styles.
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
 * Version 1.13: October 21, 2021
 * * Feature Update!
 * ** Rounding update applied to picture portraits so that coordinates aren't
 *    drawn on non-whole numbers due to base images having odd values. Update
 *    made by Olivia.
 * 
 * Version 1.12: July 16, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Message Log' command.
 * *** This is for the upcoming VisuMZ_3_MessageLog plugin.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'MessageLog' option and click
 *      copy. Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.11: May 14, 2021
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Load' command after the 'Save' command.
 * *** This allows players to access the load game screen from the Main Menu.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'Load' option and click copy.
 *      Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.10: April 16, 2021
 * * Feature Update!
 * ** Default style for List Styles now have its code updated with the
 *    JS: Default plugin parameter for games whose vertical screen resolution
 *    is larger than normal.
 * *** To update this, do either of the following:
 * **** Open up the Main Menu Core Plugin Parameters. Select and press delete 
 *      on "List Style Settings". Press Enter. New updated settings will be
 *      replaced for the JS: Default settings.
 * **** Or Delete the existing VisuMZ_1_MainMenuCore.js in the Plugin Manager
 *      list and install the newest version.
 * 
 * Version 1.09: March 19, 2021
 * * Documentation Update!
 * ** Added clarity for the "Portrait Style" in Plugin Parameters section for
 *    "Status Graphic, Status List Style, & List Style Settings":
 * *** If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 * 
 * Version 1.08: February 26, 2021
 * * Feature Update!
 * ** Default Plugin Parameters for the List Style Settings defaults have been
 *    updated with tighter coordinate values to allow for more accurate display
 *    of UI element positioning. Update made by Olivia.
 * 
 * Version 1.07: January 1, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Removed "<Menu Image: filename>" version of notetag to reduce confusion
 *    and to stick with the norm declared by the Battle Core.
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Menu Portrait Offset: +x, +y>
 * *** <Menu Portrait Offset X: +x>
 * *** <Menu Portrait Offset Y: +y>
 * **** This is used with the "Portrait" style Main Menu list.
 * **** Offsets the X and Y coordinates for the menu portrait.
 * 
 * Version 1.06: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** Documentation added for the new plugin parameter.
 * * New Features!
 * ** New plugin parameter added by Yanfly.
 * *** Plugin Parameters > General > Status Window > Select Last?
 * **** When picking a personal command from the Command Window, select the
 *      last picked actor or always the first?
 * 
 * Version 1.04: October 4, 2020
 * * Feature Update!
 * ** Certain windows will now pre-load all associated image types for the
 *    actor upon being created to avoid custom JS drawing problems.
 *    Change made by Irina.
 * ** Failsafes have been added to prevent non-existent variables from crashing
 *    the game if a user does not remove them from the variable list. Change
 *    made by Irina.
 * 
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** Added the alternative notetag <Menu Portrait: filename> that also works
 *    the same way as <Menu Image: filename>.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Skill check plugin parameter for show fixed. Fixed by Yanfly and Shaz.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Command Window List > skill >
 *     JS: Show > and changing 'this.needsCommand("item")' to
 *     'this.needsCommand("skill")'
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
 * @command ChangeActorMenuImageGroup
 * @text Actor: Change Menu Image (Group)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageRange
 * @text Actor: Change Menu Image (Range)
 * @desc Changes the actor's Menu Image.
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageJS
 * @text Actor: Change Menu Image (JS)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
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
 * @param MainMenuCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to the Main Menu and related.
 * @default {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","StatusWindow":"","StatusSelectLast:eval":"false","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"[\"Scene_Skill\"]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"}
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Main Menu.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"messageLog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.MessageLogMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_3_MessageLog &&\\\\n    this.isMessageLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isMessageLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandMessageLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"combatLog\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.combatLog_BattleCmd_Name;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CombatLog &&\\\\n    this.isCombatLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCombatLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCombatLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"load\",\"Icon:num\":\"191\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return 'Load';\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandLoad();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
 *
 * @param Playtime:struct
 * @text Playtime Window
 * @type struct<Playtime>
 * @desc Settings for the Playtime Window.
 * @default {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Variable:struct
 * @text Variable Window
 * @type struct<Variable>
 * @desc Settings for the Variable Window.
 * @default {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"[\"1\",\"2\"]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param ParamBreak1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CommandWindowStyle:str
 * @text Command Window Style
 * @type select
 * @option Default Vertical Side Style
 * @value default
 * @option Top Horizontal Style
 * @value top
 * @option Thin Top Horizontal Style
 * @value thinTop
 * @option Bottom Horizontal Style
 * @value bottom
 * @option Thin Bottom Horizontal Style
 * @value thinBottom
 * @option Mobile Full Screen Style
 * @value mobile
 * @desc Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows.
 * @default top
 *
 * @param CustomCmdWin:struct
 * @text Command Style Settings
 * @parent CommandWindowStyle:str
 * @type struct<CustomCmdWin>
 * @desc Settings for the non-default Command Window Styles.
 * @default {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"}
 *
 * @param ParamBreak2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StatusGraphic:str
 * @text Status Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in status-like menus.
 * @default face
 *
 * @param StatusListStyle:str
 * @text Main Menu List Style
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the Main Menu.
 * @default portrait
 *
 * @param InnerMenuListStyle:str
 * @text Inner-Menu List Style
 * @parent StatusListStyle:str
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the inner menus
 * like Scene_Item, Scene_Skill, etc.
 * @default default
 *
 * @param ListStyles:struct
 * @text List Style Settings
 * @parent StatusListStyle:str
 * @type struct<ListStyles>
 * @desc JavaScript code used to determine how the individual styles are drawn.
 * @default {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""}
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
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this command.
 * Use 0 for no icon.
 * @default 0
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this menu command.
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
 * @default "const ext = arguments[0];"
 *
 * @param PersonalHandlerJS:func
 * @text JS: Personal Code
 * @type note
 * @desc JavaScript code that runs once the actor list is selected with this command highlighted.
 * @default "const ext = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param ThinGoldWindow:eval
 * @text Thinner Gold Window
 * @parent GoldWindow
 * @type boolean
 * @on Thinner
 * @off Normal
 * @desc Make the Gold Window thinner in the Main Menu?
 * Used to match the Playtime and Variable Windows.
 * @default true
 *
 * @param AutoGoldHeight:eval
 * @text Auto Adjust Height
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the height for the thinner Gold Window?
 * @default true
 *
 * @param AutoGoldY:eval
 * @text Auto Adjust Y
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the Y position for the thinner Gold Window?
 * @default true
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusSelectLast:eval
 * @text Select Last?
 * @parent StatusWindow
 * @type boolean
 * @on Last Picked Actor
 * @off Always First Actor
 * @desc When picking a personal command from the Command Window,
 * select the last picked actor or always the first?
 * @default false
 *
 * @param SoloParty
 * @text Solo Party
 *
 * @param SoloQuick:eval
 * @text Solo Quick Mode
 * @parent SoloParty
 * @type boolean
 * @on Quick
 * @off Normal
 * @desc When selecting "Skills", "Equip", or "Status" with one party member, immediately go to the scene.
 * @default true
 *
 * @param SubMenus
 * @text Sub Menus
 *
 * @param ActorBgMenus:arraystr
 * @text Menus with Actor BG's
 * @parent SubMenus
 * @type string[]
 * @desc A list of the menus that would be compatible with Actor Menu Backgrounds.
 * @default ["Scene_Skill","Scene_Equip","Scene_Status"]
 *
 * @param ActorBgMenuJS:func
 * @text JS: Actor BG Action
 * @parent SubMenus
 * @type note
 * @desc Code used to determine how to display the sprites upon loading.
 * @default "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;"
 *
 * @param PartyWindow
 * @text Party Window
 *
 * @param ShowReserve:eval
 * @text Show Reserve Memebers
 * @parent PartyWindow
 * @type boolean
 * @on Show Reserve Members
 * @off Hide Reserve Members
 * @desc Show reserve members while on the Main Menu scene?
 * @default true
 *
 * @param HideMainMenuOnly:eval
 * @text Hide Main Menu Only
 * @parent ShowReserve:eval
 * @type boolean
 * @on Hide in Main Menu Only
 * @off Hide in all Scenes
 * @desc If reserve members are hidden, hide them only in the main menu or all scenes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Playtime Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Playtime:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Playtime Window?
 * @default true
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Playtime Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Playtime window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Playtime window.
 * Default: 26
 * @default 20
 *
 * @param Icon:num
 * @text Time Icon
 * @desc Icon displayed for the 'Time' label.
 * @default 75
 *
 * @param Time:str
 * @text Time Text
 * @desc Text for the display of 'Time' in the Playtime window.
 * @default Time
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Playtime window.
 * @default "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Variable Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Variable:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Variable Window?
 * @default false
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Variable Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Variable window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Variable window.
 * Default: 26
 * @default 20
 *
 * @param VarList:arraynum
 * @text Variable List
 * @type variable[]
 * @desc Select variables to be displayed into the window.
 * Use \i[x] to determine their icon.
 * @default ["1","2","3"]
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Variable window.
 * @default "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Horizontal Command Window Style
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomCmdWin:
 *
 * @param Style:str
 * @text Command Style
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
 * @desc How do you wish to draw command entries in the Command Window?
 * @default auto
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Rows:num
 * @text Rows
 * @type number
 * @min 1
 * @desc Number of visible rows.
 * @default 2
 *
 * @param Cols:num
 * @text Columns
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 4
 *
 * @param MobileThickness:num
 * @text Mobile Thickness
 * @type number
 * @min 1
 * @desc The thickness of the buttons for mobile version.
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * List Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ListStyles:
 *
 * @param DefaultStyle:func
 * @text JS: Default
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + Math.floor((rect.height - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS: Vertical
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS: Portrait
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS: Solo
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
 *
 * @param ThinStyle:func
 * @text JS: Thin
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);"
 *
 * @param ThickerStyle:func
 * @text JS: Thicker
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 */
//=============================================================================

function _0x1093(){const _0x862e9a=['VarList','_list','isSoloQuickMode','exit','needsDummyWindow','options','General','\x5cI[%1]%2','_commandList','Window_MenuStatus_selectLast','InnerMenuListStyle','currentExt','HideMainMenuOnly','floor','686005RRMRjk','MobileThickness','TextStr','hxApd','width','commandFormation','commandWindowRectTopStyle','map','CustomCmdWin','fxXAp','commandStyle','isBattleMember','12ydThVL','commandWindowRectThinTopStyle','isDisplayActorMenuBackgroundImage','createVariableWindow','172235mYWjgp','_data','Scene_Menu_create','NUM','graphicType','StatusSelectLast','variables','mobile','playtimeWindowRectTopStyle','formation','fittingHeight','getMenuImage','initMenuImage','_targetX','StatusGraphic','AutoGoldY','bitmap','goldWindowRectBottomStyle','drawItem','rOczB','center','Cols','length','loadBitmap','thinGoldWindow','outnt','drawAllItems','UrrlU','sprite','actor','bottom','loadSvActor','uwwmv','thicker','min','PixelateImageRendering','Lhyke','max','commandStyleCheck','thinBottom','lcaHL','qZoCE','_duration','svbattler','variableWindowRectTopStyle','ZmRcD','characterName','playtimeWindowRectBottomStyle','MpZAD','DaGlr','itemTextAlign','itemHeight','StatusListStyle','drawItemStatus','EVAL','svActorVertCells','ThinGoldWindow','WwrgC','commandNameWindowCenter','status','adjustStatusWindowMobile','_targetY','_menuImage','drawItemStyleIconText','Icon','Scene_MenuBase_updateActor','addOptionsCommand','Scene_Menu_commandPersonal','innerWidth','Window_MenuStatus_itemHeight','AdjustCommandHeight','itemRect','left','XyGdB','onPersonalCancel','ruxeN','drawItemStatusDefaultStyle','statusWindowRect','2367603ihRNbI','systemColor','portrait','aIYaP','return\x200','create','addMainCommands','item','ZrgTG','thin','Step1End','shift','setBackgroundType','faceHeight','ZHhXq','adjustCommandHeightByVariable','Scene_Menu_commandFormation','text','parse','goldWindowRect','1508aCSDhj','mainCommandWidth','addSymbolBridge','drawIcon','eXVkO','callUpdateHelp','drawItemImage','statusWindowRectMobileStyle','createDummyWindow','Scene_Menu_onPersonalCancel','ufAlO','characterIndex','createBackground','applyThinnerGoldWindowRect','_bitmapReady','updateOpacity','_scene','drawText','ChangeActorMenuImageJS','Playtime','updateDuration','Step2','AutoGoldHeight','loadOtherActorImages','Window_MenuStatus_maxItems','_commandNameWindow','5546DGLMZQ','Scene_Menu_statusWindowRect','clear','commandWindowRectMobileStyle','TgwnF','MtDxI','VerticalStyle','ListStyles','QLxUQ','DefaultStyle','104GRLxjE','icon','maxBattleMembers','Scene_Menu_onFormationCancel','Variable','drawActorFace','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setHandler','commandPersonal','ChangeActorMenuImageGroup','MainMenuCore','playtimeText','xlZZz','commandLoad','match','WindowRect','onBitmapLoad','Scene_Menu_commandWindowRect','fill','maxVisibleItems','battleMembers','CXASe','YsVuQ','widxz','iconText','CLQvd','_dummyWindow','bind','commandNameWindowDrawBackground','SoloStyle','initialize','vertical','setTargetActor','onFormationCancel','colSpacing','hPcXj','_statusWindow','drawItemStatusThickerStyle','MxmId','replace','addSaveCommand','loadPicture','PqLWQ','height','right','12747672stgUAF','createGoldWindow','updateTimer','Window_MenuCommand_initialize','Symbol','maxItems','trim','round','battlerName','onPersonalOk','lineHeight','loadCharacter','open','mainAreaBottom','jjtlE','variableWindowRect','iconWidth','drawItemStatusSoloStyle','EnableJS','ZioXz','ExtJS','isCommandEnabled','PortraitStyle','_commandWindow','_playtimeWindow','getMenuImageOffsetX','ActorBgMenus','contents','push','drawItemActorSvBattler','3070474OMwczR','ShowJS','canCreateVariableWindow','commandNameWindowDrawText','YKWlS','CommandWindowStyle','mainAreaTop','LHeIG','tPutx','PersonalHandlerJS','createActorMenuBackgroundImageSprite','10hWeLGi','openness','adjustDefaultCommandWindowRect','aFIjD','value','_actorMenuBgSprite','format','variableWindowRectBottomStyle','showOnlyBattleMembers','none','refresh','thinTop','4041RXlRfh','iconHeight','smoothSelect','EFUuh','Scene_Menu_createStatusWindow','drawItemBackground','gQmhA','createPlaytimeWindow','Settings','popScene','Window_MenuStatus_drawItemImage','KmRrx','Step1Start','Time','commandName','Rows','svActorHorzCells','Enable','gJBjV','mainAreaHeight','solo','CoreEngine','commandWindowRectBottomStyle','version','79TPlwnT','drawPendingItemBackground','commandWindowRectThinBottomStyle','ChBAo','QoL','giYRA','addLoadListener','gameEnd','drawItemActorSprite','ARRAYEVAL','drawItemStyleIcon','toUpperCase','topIndex','HJWkm','faceWidth','setup','adjustCommandHeightByPlaytime','registerCommand','canCreatePlaytimeWindow','addOriginalCommands','playtimeWindowRect','ceil','qlChf','drawItemStatusSoloStyleOnLoad','statusWindowRectTopStyle','top','goldWindowRectTopStyle','drawItemActorMenuImage','updateCommandNameWindow','drawItemActorFace','addCommand','changeTextColor','textSizeEx','CallHandlerJS','drawItemStatusPortraitStyleOnLoad','mHPNd','ThinStyle','call','name','filter','TextAlign','constructor','drawPlaytime','note','ConvertParams','boxWidth','_actor','addWindow','includes','addFormationCommand','cancel','drawItemStatusPortraitStyle','calcWindowHeight','addGameEndCommand','YAdCv','updatePosition','parameters','selectLast','setMenuImage','FontSize','drawTextEx','ewaIe','addChild','nkgnh','concat','prototype','SNjrG','TextJS','resetFontSettings','isBigCharacter','close','getMenuImageOffsetY','currentSymbol','resetTextColor','commandWindowRect','_goldWindow','opacity','windowPadding','auto','DKWfF','Style','reserveCommonEvent','_timer','YuuCR','statusWindowRectBottomStyle','update','listStyle','index','loadFaceImages','blt','makeCommandList','members','SBldc','STRUCT','changePaintOpacity','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','JSON','isExpGaugeDrawn','BgType','drawItemStatusVerticalStyle','createCommandNameWindow','ActorBgMenuJS','save','Untitled','ShowReserve','_variableWindow','makeMainMenuCoreCommandList','innerHeight','commandWindowStyle','updateActor','Scene_MenuBase_createBackground','maxCols','ChangeActorMenuImageRange','cHwQC','zASfl','itemLineRect'];_0x1093=function(){return _0x862e9a;};return _0x1093();}const _0x5a4ffc=_0x21c1;(function(_0x582813,_0x37d270){const _0x2cb74b=_0x21c1,_0xe736ec=_0x582813();while(!![]){try{const _0x36ecd0=-parseInt(_0x2cb74b(0x1f8))/0x1*(parseInt(_0x2cb74b(0x174))/0x2)+-parseInt(_0x2cb74b(0x1e0))/0x3*(parseInt(_0x2cb74b(0x15a))/0x4)+parseInt(_0x2cb74b(0x27a))/0x5*(parseInt(_0x2cb74b(0x286))/0x6)+-parseInt(_0x2cb74b(0x28a))/0x7*(-parseInt(_0x2cb74b(0x17e))/0x8)+-parseInt(_0x2cb74b(0x146))/0x9+parseInt(_0x2cb74b(0x1d4))/0xa*(-parseInt(_0x2cb74b(0x1c9))/0xb)+parseInt(_0x2cb74b(0x1ab))/0xc;if(_0x36ecd0===_0x37d270)break;else _0xe736ec['push'](_0xe736ec['shift']());}catch(_0x158641){_0xe736ec['push'](_0xe736ec['shift']());}}}(_0x1093,0x5e99e));var label=_0x5a4ffc(0x188),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5a4ffc(0x21f)](function(_0x3d85b6){const _0x134936=_0x5a4ffc;return _0x3d85b6[_0x134936(0x133)]&&_0x3d85b6['description'][_0x134936(0x228)]('['+label+']');})[0x0];VisuMZ[label][_0x5a4ffc(0x1e8)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x5a4ffc(0x224)]=function(_0x53c04a,_0x42770c){const _0x5b8552=_0x5a4ffc;for(const _0x2d6d24 in _0x42770c){if(_0x5b8552(0x24b)==='ZfMap')this[_0x5b8552(0x25b)](_0x483430,_0x59dd23);else{if(_0x2d6d24[_0x5b8552(0x18c)](/(.*):(.*)/i)){const _0xbd1de9=String(RegExp['$1']),_0x532120=String(RegExp['$2'])[_0x5b8552(0x203)]()[_0x5b8552(0x1b1)]();let _0x564fbc,_0x3e9fcc,_0x4bed79;switch(_0x532120){case _0x5b8552(0x28d):_0x564fbc=_0x42770c[_0x2d6d24]!==''?Number(_0x42770c[_0x2d6d24]):0x0;break;case'ARRAYNUM':_0x3e9fcc=_0x42770c[_0x2d6d24]!==''?JSON['parse'](_0x42770c[_0x2d6d24]):[],_0x564fbc=_0x3e9fcc[_0x5b8552(0x281)](_0x3a6acb=>Number(_0x3a6acb));break;case _0x5b8552(0x12e):_0x564fbc=_0x42770c[_0x2d6d24]!==''?eval(_0x42770c[_0x2d6d24]):null;break;case _0x5b8552(0x201):_0x3e9fcc=_0x42770c[_0x2d6d24]!==''?JSON[_0x5b8552(0x158)](_0x42770c[_0x2d6d24]):[],_0x564fbc=_0x3e9fcc[_0x5b8552(0x281)](_0x328abb=>eval(_0x328abb));break;case _0x5b8552(0x258):_0x564fbc=_0x42770c[_0x2d6d24]!==''?JSON[_0x5b8552(0x158)](_0x42770c[_0x2d6d24]):'';break;case'ARRAYJSON':_0x3e9fcc=_0x42770c[_0x2d6d24]!==''?JSON['parse'](_0x42770c[_0x2d6d24]):[],_0x564fbc=_0x3e9fcc[_0x5b8552(0x281)](_0x4c0395=>JSON['parse'](_0x4c0395));break;case'FUNC':_0x564fbc=_0x42770c[_0x2d6d24]!==''?new Function(JSON[_0x5b8552(0x158)](_0x42770c[_0x2d6d24])):new Function(_0x5b8552(0x14a));break;case'ARRAYFUNC':_0x3e9fcc=_0x42770c[_0x2d6d24]!==''?JSON[_0x5b8552(0x158)](_0x42770c[_0x2d6d24]):[],_0x564fbc=_0x3e9fcc['map'](_0x526666=>new Function(JSON['parse'](_0x526666)));break;case'STR':_0x564fbc=_0x42770c[_0x2d6d24]!==''?String(_0x42770c[_0x2d6d24]):'';break;case'ARRAYSTR':_0x3e9fcc=_0x42770c[_0x2d6d24]!==''?JSON[_0x5b8552(0x158)](_0x42770c[_0x2d6d24]):[],_0x564fbc=_0x3e9fcc[_0x5b8552(0x281)](_0x22c5d7=>String(_0x22c5d7));break;case _0x5b8552(0x255):_0x4bed79=_0x42770c[_0x2d6d24]!==''?JSON['parse'](_0x42770c[_0x2d6d24]):{},_0x53c04a[_0xbd1de9]={},VisuMZ[_0x5b8552(0x224)](_0x53c04a[_0xbd1de9],_0x4bed79);continue;case'ARRAYSTRUCT':_0x3e9fcc=_0x42770c[_0x2d6d24]!==''?JSON[_0x5b8552(0x158)](_0x42770c[_0x2d6d24]):[],_0x564fbc=_0x3e9fcc[_0x5b8552(0x281)](_0x3d93ae=>VisuMZ['ConvertParams']({},JSON[_0x5b8552(0x158)](_0x3d93ae)));break;default:continue;}_0x53c04a[_0xbd1de9]=_0x564fbc;}}}return _0x53c04a;},(_0x2912fa=>{const _0x790ff=_0x5a4ffc,_0x4376bc=_0x2912fa['name'];for(const _0x5cc5a2 of dependencies){if(!Imported[_0x5cc5a2]){alert(_0x790ff(0x184)[_0x790ff(0x1da)](_0x4376bc,_0x5cc5a2)),SceneManager[_0x790ff(0x26f)]();break;}}const _0x2cc30f=_0x2912fa['description'];if(_0x2cc30f['match'](/\[Version[ ](.*?)\]/i)){const _0x382182=Number(RegExp['$1']);_0x382182!==VisuMZ[label]['version']&&(alert(_0x790ff(0x257)['format'](_0x4376bc,_0x382182)),SceneManager[_0x790ff(0x26f)]());}if(_0x2cc30f['match'](/\[Tier[ ](\d+)\]/i)){const _0x18bd76=Number(RegExp['$1']);_0x18bd76<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x790ff(0x1da)](_0x4376bc,_0x18bd76,tier)),SceneManager['exit']()):tier=Math[_0x790ff(0x11d)](_0x18bd76,tier);}VisuMZ[_0x790ff(0x224)](VisuMZ[label][_0x790ff(0x1e8)],_0x2912fa[_0x790ff(0x230)]);})(pluginData),PluginManager[_0x5a4ffc(0x209)](pluginData[_0x5a4ffc(0x21e)],_0x5a4ffc(0x187),_0x5f42fb=>{const _0x3713de=_0x5a4ffc;VisuMZ['ConvertParams'](_0x5f42fb,_0x5f42fb);const _0xbd1d42=_0x5f42fb['Step1'],_0x1c11da=_0x5f42fb[_0x3713de(0x16f)];for(let _0x3db830 of _0xbd1d42){if(_0x3713de(0x283)!==_0x3713de(0x1eb)){_0x3db830=parseInt(_0x3db830)||0x0;if(_0x3db830<=0x0)continue;const _0x58005d=$gameActors[_0x3713de(0x115)](_0x3db830);if(!_0x58005d)continue;_0x58005d['setMenuImage'](_0x1c11da);}else return _0x374658;}}),PluginManager['registerCommand'](pluginData[_0x5a4ffc(0x21e)],_0x5a4ffc(0x268),_0x27176d=>{const _0x4f4122=_0x5a4ffc;VisuMZ[_0x4f4122(0x224)](_0x27176d,_0x27176d);const _0x3fc4f7=_0x27176d[_0x4f4122(0x150)]>=_0x27176d[_0x4f4122(0x1ec)]?_0x27176d[_0x4f4122(0x1ec)]:_0x27176d[_0x4f4122(0x150)],_0x4975e9=_0x27176d[_0x4f4122(0x150)]>=_0x27176d[_0x4f4122(0x1ec)]?_0x27176d[_0x4f4122(0x150)]:_0x27176d['Step1Start'],_0x358a71=Array(_0x4975e9-_0x3fc4f7+0x1)[_0x4f4122(0x190)]()[_0x4f4122(0x281)]((_0x38e7f0,_0x104a66)=>_0x3fc4f7+_0x104a66),_0x2ab1b8=_0x27176d['Step2'];for(let _0x39f4dc of _0x358a71){_0x39f4dc=parseInt(_0x39f4dc)||0x0;if(_0x39f4dc<=0x0)continue;const _0x4f278e=$gameActors[_0x4f4122(0x115)](_0x39f4dc);if(!_0x4f278e)continue;_0x4f278e[_0x4f4122(0x232)](_0x2ab1b8);}}),PluginManager[_0x5a4ffc(0x209)](pluginData[_0x5a4ffc(0x21e)],_0x5a4ffc(0x16c),_0x48b959=>{const _0x442cfc=_0x5a4ffc;VisuMZ[_0x442cfc(0x224)](_0x48b959,_0x48b959);const _0x18ed6e=_0x48b959['Step1'];let _0x100459=[];while(_0x18ed6e[_0x442cfc(0x2a0)]>0x0){if('BnGqi'===_0x442cfc(0x120))_0x496fca[_0x442cfc(0x19e)](_0x5820ca[_0x442cfc(0x253)]()[0x0]),this['onPersonalOk']();else{const _0x267f82=_0x18ed6e[_0x442cfc(0x151)]();if(Array['isArray'](_0x267f82)){if('DkEtD'===_0x442cfc(0x235))return _0x7e384c['MainMenuCore'][_0x442cfc(0x1e8)][_0x442cfc(0x272)][_0x442cfc(0x1c5)][_0x442cfc(0x228)](this[_0x442cfc(0x221)][_0x442cfc(0x21e)]);else _0x100459=_0x100459[_0x442cfc(0x238)](_0x267f82);}else _0x100459[_0x442cfc(0x1c7)](_0x267f82);}}const _0x2e6ff3=_0x48b959[_0x442cfc(0x16f)];for(let _0x27f142 of _0x100459){if('sYNCo'!=='ArUIU'){_0x27f142=parseInt(_0x27f142)||0x0;if(_0x27f142<=0x0)continue;const _0x12a69f=$gameActors['actor'](_0x27f142);if(!_0x12a69f)continue;_0x12a69f[_0x442cfc(0x232)](_0x2e6ff3);}else return this[_0x442cfc(0x29b)]();}}),VisuMZ[_0x5a4ffc(0x188)]['Game_Actor_setup']=Game_Actor[_0x5a4ffc(0x239)][_0x5a4ffc(0x207)],Game_Actor['prototype'][_0x5a4ffc(0x207)]=function(_0x2e5b3d){const _0x4ec977=_0x5a4ffc;VisuMZ[_0x4ec977(0x188)]['Game_Actor_setup'][_0x4ec977(0x21d)](this,_0x2e5b3d),this['initMenuImage']();},Game_Actor[_0x5a4ffc(0x239)][_0x5a4ffc(0x296)]=function(){const _0x34f352=_0x5a4ffc;this[_0x34f352(0x136)]='';if(this[_0x34f352(0x115)]()&&this[_0x34f352(0x115)]()['note'][_0x34f352(0x18c)](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)){if(_0x34f352(0x1a8)==='SVEGr'){let _0x171dd8=_0x1e15b4[_0x34f352(0x27c)];if(['',_0x34f352(0x25f)][_0x34f352(0x228)](_0x171dd8))_0x171dd8=_0x50609b[_0x34f352(0x23b)]['call'](this);const _0xfca0f0=_0x1e80db[_0x34f352(0x138)];_0xfca0f0>0x0&&this[_0x34f352(0x284)]()!==_0x34f352(0x157)&&(_0x171dd8=_0x34f352(0x273)['format'](_0xfca0f0,_0x171dd8));const _0x1fb217=_0x39d6cb[_0x34f352(0x1bd)][_0x34f352(0x21d)](this),_0x42633a=_0x128ed3[_0x34f352(0x1bf)][_0x34f352(0x21d)](this);this[_0x34f352(0x216)](_0x171dd8,_0x1a200c,_0x1fb217,_0x42633a),this['setHandler'](_0x4d5863,_0x2ab47a['CallHandlerJS'][_0x34f352(0x199)](this,_0x42633a));}else this[_0x34f352(0x136)]=String(RegExp['$1']);}},Game_Actor['prototype'][_0x5a4ffc(0x295)]=function(){const _0x59db87=_0x5a4ffc;if(this[_0x59db87(0x136)]===undefined)this['initMenuImage']();return this[_0x59db87(0x136)];},Game_Actor[_0x5a4ffc(0x239)]['setMenuImage']=function(_0x532c41){const _0x3b8efd=_0x5a4ffc;if(this[_0x3b8efd(0x136)]===undefined)this[_0x3b8efd(0x296)]();this[_0x3b8efd(0x136)]=_0x532c41;},Game_Actor['prototype']['getMenuImageOffsetX']=function(){const _0x5a7e88=_0x5a4ffc;if(this[_0x5a7e88(0x115)]()[_0x5a7e88(0x223)][_0x5a7e88(0x18c)](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i)){if('uYCTb'!=='uYCTb'){if(_0x507fbe[_0x5a7e88(0x278)])return _0x4b37e0[_0x5a7e88(0x221)]===_0x1cf648;return!![];}else return Number(RegExp['$1']);}else{if(this[_0x5a7e88(0x115)]()[_0x5a7e88(0x223)][_0x5a7e88(0x18c)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x5a7e88(0x149)!=='aIYaP'){this[_0x5a7e88(0x1ee)](_0x2519a0)[_0x5a7e88(0x18c)](/\\I\[(\d+)\]/i);const _0x85c5b6=_0x58c2d3(_0x1ccc24['$1']),_0x567ddf=this['itemLineRect'](_0x185111),_0x1e1f55=_0x567ddf['x']+_0x2707a9['floor']((_0x567ddf[_0x5a7e88(0x27e)]-_0x2f767f[_0x5a7e88(0x1bb)])/0x2),_0x34ae7d=_0x567ddf['y']+(_0x567ddf[_0x5a7e88(0x1a9)]-_0x46e9d7['iconHeight'])/0x2;this['drawIcon'](_0x85c5b6,_0x1e1f55,_0x34ae7d);}else return Number(RegExp['$1']);}}return 0x0;},Game_Actor[_0x5a4ffc(0x239)][_0x5a4ffc(0x23f)]=function(){const _0x4f5224=_0x5a4ffc;if(this['actor']()[_0x4f5224(0x223)][_0x4f5224(0x18c)](/<MENU (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x4f5224(0x115)]()[_0x4f5224(0x223)]['match'](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x4f5224(0x125)!==_0x4f5224(0x125)){const _0x11d5e8=_0x271420[_0x4f5224(0x188)][_0x4f5224(0x1e8)][_0x4f5224(0x272)];if(_0x11d5e8[_0x4f5224(0x260)]===_0xbf7158)_0x11d5e8[_0x4f5224(0x260)]=!![];const _0x3ba252=_0x14eccf[_0x4f5224(0x16a)];if(!_0x11d5e8['ShowReserve']){if(_0x11d5e8[_0x4f5224(0x278)])return _0x3ba252[_0x4f5224(0x221)]===_0x391431;return!![];}return![];}else return Number(RegExp['$2']);}}return 0x0;},Scene_MenuBase[_0x5a4ffc(0x239)]['isDisplayActorMenuBackgroundImage']=function(){const _0x4e1a7e=_0x5a4ffc;return VisuMZ[_0x4e1a7e(0x188)]['Settings'][_0x4e1a7e(0x272)][_0x4e1a7e(0x1c5)][_0x4e1a7e(0x228)](this['constructor'][_0x4e1a7e(0x21e)]);},VisuMZ['MainMenuCore'][_0x5a4ffc(0x266)]=Scene_MenuBase['prototype'][_0x5a4ffc(0x166)],Scene_MenuBase[_0x5a4ffc(0x239)][_0x5a4ffc(0x166)]=function(){const _0x40dd03=_0x5a4ffc;VisuMZ[_0x40dd03(0x188)][_0x40dd03(0x266)][_0x40dd03(0x21d)](this),this['createActorMenuBackgroundImageSprite']();},Scene_MenuBase[_0x5a4ffc(0x239)][_0x5a4ffc(0x1d3)]=function(){const _0x4aad70=_0x5a4ffc;this[_0x4aad70(0x1d9)]=new Sprite_MenuBackgroundActor(),this['addChild'](this['_actorMenuBgSprite']);},VisuMZ[_0x5a4ffc(0x188)][_0x5a4ffc(0x139)]=Scene_MenuBase['prototype'][_0x5a4ffc(0x265)],Scene_MenuBase[_0x5a4ffc(0x239)][_0x5a4ffc(0x265)]=function(){const _0x21c47d=_0x5a4ffc;VisuMZ[_0x21c47d(0x188)][_0x21c47d(0x139)][_0x21c47d(0x21d)](this),this[_0x21c47d(0x288)]()&&this['_actorMenuBgSprite']&&(_0x21c47d(0x154)===_0x21c47d(0x121)?(_0x5c78d0['prototype'][_0x21c47d(0x24d)]['call'](this),this[_0x21c47d(0x168)]&&(this['updateOpacity'](),this[_0x21c47d(0x22f)](),this[_0x21c47d(0x16e)]())):this[_0x21c47d(0x1d9)]['setActor'](this[_0x21c47d(0x226)]));},VisuMZ['MainMenuCore'][_0x5a4ffc(0x28c)]=Scene_Menu[_0x5a4ffc(0x239)]['create'],Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x14b)]=function(){const _0x4ed6a0=_0x5a4ffc;VisuMZ['MainMenuCore'][_0x4ed6a0(0x28c)]['call'](this),this[_0x4ed6a0(0x1e7)](),this[_0x4ed6a0(0x289)](),this['createDummyWindow']();},Scene_Menu[_0x5a4ffc(0x239)]['createCommandWindow']=function(){const _0x2e55f2=_0x5a4ffc,_0x58d96b=this[_0x2e55f2(0x242)](),_0x33c54a=new Window_MenuCommand(_0x58d96b);_0x33c54a[_0x2e55f2(0x185)](_0x2e55f2(0x22a),this[_0x2e55f2(0x1e9)]['bind'](this)),this[_0x2e55f2(0x227)](_0x33c54a),this['_commandWindow']=_0x33c54a;},VisuMZ[_0x5a4ffc(0x188)][_0x5a4ffc(0x18f)]=Scene_Menu[_0x5a4ffc(0x239)]['commandWindowRect'],Scene_Menu[_0x5a4ffc(0x239)]['commandWindowRect']=function(){const _0x2896db=_0x5a4ffc,_0x4896d8=this['commandWindowStyle']();if(_0x4896d8==='top'){if(_0x2896db(0x1d1)==='tPutx')return this['commandWindowRectTopStyle']();else this[_0x2896db(0x1e5)](_0x3376d0),this[_0x2896db(0x29c)](_0x39a7c5);}else{if(_0x4896d8===_0x2896db(0x1df))return this[_0x2896db(0x287)]();else{if(_0x4896d8==='bottom')return this[_0x2896db(0x1f6)]();else{if(_0x4896d8===_0x2896db(0x11f))return _0x2896db(0x1d0)===_0x2896db(0x1d0)?this[_0x2896db(0x1fa)]():_0x351875['MainMenuCore']['Settings'][_0x2896db(0x276)];else{if(_0x4896d8==='mobile')return this[_0x2896db(0x177)]();else{const _0x43d0e2=VisuMZ[_0x2896db(0x188)][_0x2896db(0x18f)][_0x2896db(0x21d)](this);return this[_0x2896db(0x1d6)](_0x43d0e2),_0x43d0e2;}}}}}},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x1d6)]=function(_0x5cbd94){const _0x2279dc=_0x5a4ffc;if(this[_0x2279dc(0x208)]()){if('vBrnt'!==_0x2279dc(0x15e))_0x5cbd94[_0x2279dc(0x1a9)]-=this[_0x2279dc(0x20c)]()[_0x2279dc(0x1a9)];else{const _0x502a35=this[_0x2279dc(0x122)];this[_0x2279dc(0x244)]=(this[_0x2279dc(0x244)]*(_0x502a35-0x1)+0xff)/_0x502a35;}}this[_0x2279dc(0x155)]()&&(_0x5cbd94[_0x2279dc(0x1a9)]-=this['variableWindowRect']()[_0x2279dc(0x1a9)]);},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x280)]=function(){const _0x2c794f=_0x5a4ffc,_0x1641bc=VisuMZ[_0x2c794f(0x188)][_0x2c794f(0x1e8)][_0x2c794f(0x282)][_0x2c794f(0x1ef)],_0x4b3639=Graphics[_0x2c794f(0x225)],_0x58c7df=this['calcWindowHeight'](_0x1641bc,!![]),_0x1351d6=0x0,_0x245977=this['mainAreaTop']();return new Rectangle(_0x1351d6,_0x245977,_0x4b3639,_0x58c7df);},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x287)]=function(){const _0x3b68ee=_0x5a4ffc,_0x4502ed=VisuMZ[_0x3b68ee(0x188)][_0x3b68ee(0x1e8)][_0x3b68ee(0x282)][_0x3b68ee(0x1ef)],_0x362b91=Graphics[_0x3b68ee(0x225)],_0x34bed6=this[_0x3b68ee(0x22c)](0x1,!![]),_0x25f1b7=0x0,_0x18b1f6=this[_0x3b68ee(0x1cf)]();return new Rectangle(_0x25f1b7,_0x18b1f6,_0x362b91,_0x34bed6);},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x1f6)]=function(){const _0x5963c7=_0x5a4ffc,_0x308c55=VisuMZ['MainMenuCore'][_0x5963c7(0x1e8)][_0x5963c7(0x282)]['Rows'],_0x17912a=Graphics[_0x5963c7(0x225)],_0x2c93d7=this[_0x5963c7(0x22c)](_0x308c55,!![]),_0x2ae70e=0x0,_0x11bd85=this['mainAreaBottom']()-_0x2c93d7;return new Rectangle(_0x2ae70e,_0x11bd85,_0x17912a,_0x2c93d7);},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x1fa)]=function(){const _0x41a498=_0x5a4ffc,_0x52c429=VisuMZ[_0x41a498(0x188)][_0x41a498(0x1e8)]['CustomCmdWin'][_0x41a498(0x1ef)],_0x1e4fa9=Graphics[_0x41a498(0x225)],_0x5b43b0=this[_0x41a498(0x22c)](0x1,!![]),_0x416b8c=0x0,_0x58eecb=this['mainAreaBottom']()-_0x5b43b0;return new Rectangle(_0x416b8c,_0x58eecb,_0x1e4fa9,_0x5b43b0);},Scene_Menu[_0x5a4ffc(0x239)]['commandWindowRectMobileStyle']=function(){const _0x1ac618=_0x5a4ffc,_0x250712=VisuMZ['MainMenuCore']['Settings'][_0x1ac618(0x282)][_0x1ac618(0x1ef)],_0x2c4d1b=Graphics['boxWidth'],_0x3e8974=Window_MenuCommand[_0x1ac618(0x239)][_0x1ac618(0x294)](_0x250712),_0x42f284=0x0,_0x43d0ee=Math[_0x1ac618(0x1b2)]((Graphics['boxHeight']-_0x3e8974)/0x2);return new Rectangle(_0x42f284,_0x43d0ee,_0x2c4d1b,_0x3e8974);},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x264)]=function(){const _0x350bb2=_0x5a4ffc;return VisuMZ[_0x350bb2(0x188)][_0x350bb2(0x1e8)][_0x350bb2(0x1ce)];},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x110)]=function(){const _0x5e3acc=_0x5a4ffc;if(this[_0x5e3acc(0x264)]()!=='default')return!![];return VisuMZ[_0x5e3acc(0x188)]['Settings'][_0x5e3acc(0x272)][_0x5e3acc(0x130)];},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x1ac)]=function(){const _0x524aef=_0x5a4ffc,_0x481abc=this['goldWindowRect']();this['_goldWindow']=this[_0x524aef(0x110)]()?new Window_ThinGold(_0x481abc):new Window_Gold(_0x481abc),this['addWindow'](this['_goldWindow']);},VisuMZ['MainMenuCore']['Scene_Menu_goldWindowRect']=Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x159)],Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x159)]=function(){const _0x28396f=_0x5a4ffc,_0x18338a=this[_0x28396f(0x264)]();if([_0x28396f(0x211),_0x28396f(0x1df),_0x28396f(0x291)][_0x28396f(0x228)](_0x18338a))return this[_0x28396f(0x212)]();else{if(['bottom','thinBottom'][_0x28396f(0x228)](_0x18338a))return this[_0x28396f(0x29b)]();else{const _0x495360=VisuMZ['MainMenuCore']['Scene_Menu_goldWindowRect'][_0x28396f(0x21d)](this);return this[_0x28396f(0x167)](_0x495360),_0x495360;}}},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x167)]=function(_0x50ab95){const _0x4aa6b8=_0x5a4ffc;if(this[_0x4aa6b8(0x110)]()){if(_0x4aa6b8(0x179)===_0x4aa6b8(0x179)){if(VisuMZ['MainMenuCore'][_0x4aa6b8(0x1e8)][_0x4aa6b8(0x272)][_0x4aa6b8(0x299)]){const _0x45a384=_0x50ab95[_0x4aa6b8(0x1a9)]-this[_0x4aa6b8(0x22c)](0x1,![]);_0x50ab95['y']+=_0x45a384;}VisuMZ[_0x4aa6b8(0x188)][_0x4aa6b8(0x1e8)][_0x4aa6b8(0x272)][_0x4aa6b8(0x170)]&&(_0x50ab95['height']=this['calcWindowHeight'](0x1,![]));}else return this[_0x4aa6b8(0x212)]();}},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x212)]=function(){const _0x2bf0ad=_0x5a4ffc,_0x3d8c91=this[_0x2bf0ad(0x15b)](),_0x5d0634=this[_0x2bf0ad(0x22c)](0x1,![]),_0x3521a7=Graphics[_0x2bf0ad(0x225)]-_0x3d8c91,_0xfc56f9=this[_0x2bf0ad(0x1b8)]()-_0x5d0634;return new Rectangle(_0x3521a7,_0xfc56f9,_0x3d8c91,_0x5d0634);},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x29b)]=function(){const _0xa12f90=_0x5a4ffc,_0x48fe33=this[_0xa12f90(0x15b)](),_0x38726c=this[_0xa12f90(0x22c)](0x1,![]),_0x21d8b4=Graphics['boxWidth']-_0x48fe33,_0x5531c8=this['mainAreaTop']();return new Rectangle(_0x21d8b4,_0x5531c8,_0x48fe33,_0x38726c);},VisuMZ[_0x5a4ffc(0x188)][_0x5a4ffc(0x1e4)]=Scene_Menu['prototype']['createStatusWindow'],Scene_Menu['prototype']['createStatusWindow']=function(){const _0xf46248=_0x5a4ffc;VisuMZ['MainMenuCore'][_0xf46248(0x1e4)][_0xf46248(0x21d)](this),this['adjustStatusWindowMobile']();},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x134)]=function(){const _0x24c1b6=_0x5a4ffc;this[_0x24c1b6(0x264)]()===_0x24c1b6(0x291)&&(this[_0x24c1b6(0x1a2)][_0x24c1b6(0x1d5)]=0x0);},VisuMZ[_0x5a4ffc(0x188)][_0x5a4ffc(0x175)]=Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x145)],Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x145)]=function(){const _0x1aeaca=_0x5a4ffc,_0x11e244=this[_0x1aeaca(0x264)]();if([_0x1aeaca(0x211),_0x1aeaca(0x1df)]['includes'](_0x11e244))return this['statusWindowRectTopStyle']();else{if([_0x1aeaca(0x116),'thinBottom'][_0x1aeaca(0x228)](_0x11e244))return this['statusWindowRectBottomStyle']();else{if(_0x11e244===_0x1aeaca(0x291)){if(_0x1aeaca(0x27d)!==_0x1aeaca(0x1b9))return this[_0x1aeaca(0x161)]();else{const _0x5dfe2f=this['itemLineRect'](this['index']());let _0x360bb1=this[_0x1aeaca(0x1ee)](this['index']());_0x360bb1=_0x360bb1[_0x1aeaca(0x1a5)](/\\I\[(\d+)\]/gi,''),_0x540852['resetFontSettings'](),this[_0x1aeaca(0x19a)](_0x360bb1,_0x5dfe2f),this[_0x1aeaca(0x1cc)](_0x360bb1,_0x5dfe2f),this['commandNameWindowCenter'](_0x360bb1,_0x5dfe2f);}}else return VisuMZ[_0x1aeaca(0x188)][_0x1aeaca(0x175)]['call'](this);}}},Scene_Menu['prototype'][_0x5a4ffc(0x210)]=function(){const _0x513b7d=_0x5a4ffc,_0x56a4df=Graphics[_0x513b7d(0x225)],_0x14a5a6=this[_0x513b7d(0x1f3)]()-this['_commandWindow'][_0x513b7d(0x1a9)]-this[_0x513b7d(0x243)][_0x513b7d(0x1a9)],_0x1ee4c5=0x0,_0x374b25=this[_0x513b7d(0x1c2)]['y']+this[_0x513b7d(0x1c2)][_0x513b7d(0x1a9)];return new Rectangle(_0x1ee4c5,_0x374b25,_0x56a4df,_0x14a5a6);},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x24c)]=function(){const _0x1919ec=_0x5a4ffc,_0x274b01=Graphics[_0x1919ec(0x225)],_0x22988a=this[_0x1919ec(0x1f3)]()-this[_0x1919ec(0x1c2)][_0x1919ec(0x1a9)]-this[_0x1919ec(0x243)][_0x1919ec(0x1a9)],_0x176763=0x0,_0x458b0f=this['_goldWindow']['y']+this['_goldWindow'][_0x1919ec(0x1a9)];return new Rectangle(_0x176763,_0x458b0f,_0x274b01,_0x22988a);},Scene_Menu['prototype'][_0x5a4ffc(0x161)]=function(){const _0x4ce662=_0x5a4ffc,_0xf66b9c=Graphics[_0x4ce662(0x225)],_0x3b5f3c=this[_0x4ce662(0x1f3)]()-this[_0x4ce662(0x243)][_0x4ce662(0x1a9)],_0x1be734=0x0,_0x254eda=this[_0x4ce662(0x1b8)]()-this[_0x4ce662(0x243)][_0x4ce662(0x1a9)]-_0x3b5f3c;return new Rectangle(_0x1be734,_0x254eda,_0xf66b9c,_0x3b5f3c);},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x1e7)]=function(){const _0x2f0497=_0x5a4ffc;if(!this[_0x2f0497(0x20a)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x36fc33=this[_0x2f0497(0x20c)]();this[_0x2f0497(0x1c3)]=new Window_Playtime(_0x36fc33),this[_0x2f0497(0x1c3)][_0x2f0497(0x152)](VisuMZ[_0x2f0497(0x188)][_0x2f0497(0x1e8)]['Playtime']['BgType']),this[_0x2f0497(0x227)](this[_0x2f0497(0x1c3)]);},Scene_Menu['prototype'][_0x5a4ffc(0x20a)]=function(){const _0x596891=_0x5a4ffc;return VisuMZ['MainMenuCore'][_0x596891(0x1e8)][_0x596891(0x16d)]['Enable'];},Scene_Menu['prototype']['adjustCommandHeightByPlaytime']=function(){const _0x19cf0a=_0x5a4ffc;return this[_0x19cf0a(0x20a)]()&&VisuMZ[_0x19cf0a(0x188)][_0x19cf0a(0x1e8)][_0x19cf0a(0x16d)][_0x19cf0a(0x13e)];},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x20c)]=function(){const _0x305075=_0x5a4ffc,_0x4ff706=this['commandWindowStyle']();if([_0x305075(0x211),_0x305075(0x1df),_0x305075(0x291)][_0x305075(0x228)](_0x4ff706))return _0x305075(0x131)==='ntxfU'?_0x65671d[_0x305075(0x239)][_0x305075(0x267)]['call'](this):this[_0x305075(0x292)]();else{if([_0x305075(0x116),_0x305075(0x11f)]['includes'](_0x4ff706)){if(_0x305075(0x164)!==_0x305075(0x164)){this[_0x305075(0x23c)](),this['changeTextColor'](_0x3bd406[_0x305075(0x147)]());const _0x4fa505=_0x721184[_0x305075(0x188)][_0x305075(0x1e8)][_0x305075(0x16d)][_0x305075(0x1ed)];this[_0x305075(0x16b)](_0x4fa505,_0x53a91f['x'],_0x4a4a86['y'],_0x36004e['width'],_0x305075(0x140)),this[_0x305075(0x241)]();}else return this[_0x305075(0x127)]();}else return VisuMZ['MainMenuCore'][_0x305075(0x1e8)][_0x305075(0x16d)][_0x305075(0x18d)][_0x305075(0x21d)](this);}},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x292)]=function(){const _0x5b520f=_0x5a4ffc,_0x99fba1=this[_0x5b520f(0x15b)](),_0x46a3df=this[_0x5b520f(0x22c)](0x1,![]),_0x5f39f9=0x0,_0x43f3c1=this[_0x5b520f(0x1b8)]()-_0x46a3df;return new Rectangle(_0x5f39f9,_0x43f3c1,_0x99fba1,_0x46a3df);},Scene_Menu['prototype'][_0x5a4ffc(0x127)]=function(){const _0x4d50f4=_0x5a4ffc,_0x34983a=this[_0x4d50f4(0x15b)](),_0x3b5f94=this['calcWindowHeight'](0x1,![]),_0x345d62=0x0,_0x5f5956=this['mainAreaTop']();return new Rectangle(_0x345d62,_0x5f5956,_0x34983a,_0x3b5f94);},Scene_Menu[_0x5a4ffc(0x239)]['createVariableWindow']=function(){const _0x14e28b=_0x5a4ffc;if(!this['canCreateVariableWindow']())return new Rectangle(0x0,0x0,0x0,0x0);const _0x58505d=this[_0x14e28b(0x1ba)]();this[_0x14e28b(0x261)]=new Window_MenuVariables(_0x58505d),this['_variableWindow'][_0x14e28b(0x152)](VisuMZ[_0x14e28b(0x188)]['Settings'][_0x14e28b(0x182)]['BgType']),this[_0x14e28b(0x227)](this[_0x14e28b(0x261)]);},Scene_Menu[_0x5a4ffc(0x239)]['canCreateVariableWindow']=function(){const _0x1d0549=_0x5a4ffc;return VisuMZ[_0x1d0549(0x188)][_0x1d0549(0x1e8)][_0x1d0549(0x182)][_0x1d0549(0x1f1)];},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x155)]=function(){const _0xecb11e=_0x5a4ffc;return this[_0xecb11e(0x1cb)]()&&VisuMZ['MainMenuCore']['Settings'][_0xecb11e(0x182)][_0xecb11e(0x13e)];},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x1ba)]=function(){const _0x4f7014=_0x5a4ffc,_0x8767f2=this['commandWindowStyle']();if([_0x4f7014(0x211),_0x4f7014(0x1df),'mobile'][_0x4f7014(0x228)](_0x8767f2)){if('lGWPw'!==_0x4f7014(0x1d7))return this[_0x4f7014(0x124)]();else{const _0x2a4ea6=_0x21dfea['MainMenuCore'][_0x4f7014(0x1e8)][_0x4f7014(0x282)][_0x4f7014(0x1ef)],_0x419f59=_0x5dac1e[_0x4f7014(0x225)],_0x3cd024=_0x2b2af3[_0x4f7014(0x239)][_0x4f7014(0x294)](_0x2a4ea6),_0x1f4f38=0x0,_0xa212e9=_0x7de9aa[_0x4f7014(0x1b2)]((_0x41546c['boxHeight']-_0x3cd024)/0x2);return new _0x2009b7(_0x1f4f38,_0xa212e9,_0x419f59,_0x3cd024);}}else return[_0x4f7014(0x116),_0x4f7014(0x11f)][_0x4f7014(0x228)](_0x8767f2)?this['variableWindowRectBottomStyle']():VisuMZ['MainMenuCore'][_0x4f7014(0x1e8)]['Variable'][_0x4f7014(0x18d)][_0x4f7014(0x21d)](this);},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x124)]=function(){const _0x44e8da=_0x5a4ffc,_0x563328=Graphics[_0x44e8da(0x225)]-this['_goldWindow']['width']-(this[_0x44e8da(0x1c3)]?this[_0x44e8da(0x1c3)][_0x44e8da(0x27e)]:0x0),_0x5cdfc2=this[_0x44e8da(0x22c)](0x1,![]),_0x23cb72=this[_0x44e8da(0x243)]['x']-_0x563328,_0x4f9a9b=this[_0x44e8da(0x1b8)]()-_0x5cdfc2;return new Rectangle(_0x23cb72,_0x4f9a9b,_0x563328,_0x5cdfc2);},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x1db)]=function(){const _0x1d4525=_0x5a4ffc,_0x19b96e=Graphics[_0x1d4525(0x225)]-this['_goldWindow'][_0x1d4525(0x27e)]-(this[_0x1d4525(0x1c3)]?this[_0x1d4525(0x1c3)][_0x1d4525(0x27e)]:0x0),_0x2668f5=this[_0x1d4525(0x22c)](0x1,![]),_0x486263=this['_goldWindow']['x']-_0x19b96e,_0x1fe3f4=this['mainAreaTop']();return new Rectangle(_0x486263,_0x1fe3f4,_0x19b96e,_0x2668f5);},Scene_Menu['prototype'][_0x5a4ffc(0x162)]=function(){const _0x363397=_0x5a4ffc;if(!this[_0x363397(0x270)]())return;const _0x11161d=this[_0x363397(0x1ba)]();this[_0x363397(0x198)]=new Window_Base(_0x11161d),this[_0x363397(0x198)][_0x363397(0x152)](VisuMZ[_0x363397(0x188)][_0x363397(0x1e8)][_0x363397(0x182)][_0x363397(0x25a)]),this[_0x363397(0x227)](this[_0x363397(0x198)]);},Scene_Menu['prototype'][_0x5a4ffc(0x270)]=function(){const _0x4d9996=_0x5a4ffc;if(['default',_0x4d9996(0x291)][_0x4d9996(0x228)](this[_0x4d9996(0x264)]()))return![];if(this[_0x4d9996(0x261)])return![];return!![];},VisuMZ['MainMenuCore'][_0x5a4ffc(0x13b)]=Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x186)],Scene_Menu['prototype'][_0x5a4ffc(0x186)]=function(){const _0x38dbec=_0x5a4ffc;if(this[_0x38dbec(0x26e)]()&&this[_0x38dbec(0x1a2)])$gameParty[_0x38dbec(0x19e)]($gameParty[_0x38dbec(0x253)]()[0x0]),this[_0x38dbec(0x1b4)]();else{if(_0x38dbec(0x1fd)!==_0x38dbec(0x269)){if(this[_0x38dbec(0x264)]()===_0x38dbec(0x291))this[_0x38dbec(0x1a2)][_0x38dbec(0x1b7)]();VisuMZ[_0x38dbec(0x188)][_0x38dbec(0x13b)][_0x38dbec(0x21d)](this);}else this[_0x38dbec(0x226)]=_0x2b4295,this[_0x38dbec(0x2a1)]();}},Scene_Menu[_0x5a4ffc(0x239)]['isSoloQuickMode']=function(){const _0x45a86d=_0x5a4ffc;return VisuMZ[_0x45a86d(0x188)]['Settings']['General']['SoloQuick']&&$gameParty[_0x45a86d(0x253)]()[_0x45a86d(0x2a0)]<=0x1;},Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x1b4)]=function(){const _0x4494ac=_0x5a4ffc,_0x22aeb8=this['_commandWindow'][_0x4494ac(0x240)](),_0x3ab662=this[_0x4494ac(0x1c2)][_0x4494ac(0x277)]();for(const _0x33aad6 of Window_MenuCommand[_0x4494ac(0x274)]){if(_0x33aad6[_0x4494ac(0x1af)]===_0x22aeb8){if(_0x4494ac(0x197)!=='CLQvd')return 0x1;else{_0x33aad6[_0x4494ac(0x1d2)][_0x4494ac(0x21d)](this,_0x3ab662);return;}}}},VisuMZ[_0x5a4ffc(0x188)][_0x5a4ffc(0x163)]=Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x142)],Scene_Menu['prototype']['onPersonalCancel']=function(){const _0x2faba7=_0x5a4ffc;VisuMZ['MainMenuCore']['Scene_Menu_onPersonalCancel'][_0x2faba7(0x21d)](this);if(this[_0x2faba7(0x264)]()==='mobile')this[_0x2faba7(0x1a2)][_0x2faba7(0x23e)]();},Scene_Menu['prototype']['commandCommonEvent']=function(){const _0x540615=_0x5a4ffc,_0x1fb035=parseInt(this['_commandWindow'][_0x540615(0x277)]());if(_0x1fb035){if(_0x540615(0x194)!=='YsVuQ'){const _0xf060fd=_0x5b05a1[_0x540615(0x117)](_0x39a722),_0x9eb0a8=_0xf060fd['width']/_0x37dede['svActorHorzCells'],_0x47dd5c=_0xf060fd['height']/_0x2fab52[_0x540615(0x12f)],_0x4fbf63=0x0,_0x5008d7=0x0;this[_0x540615(0x1c6)]['blt'](_0xf060fd,_0x4fbf63,_0x5008d7,_0x9eb0a8,_0x47dd5c,_0x2a8e00-_0x9eb0a8/0x2,_0x1473d7-_0x47dd5c);}else $gameTemp[_0x540615(0x249)](_0x1fb035),this['popScene']();}else{if('xlZZz'!==_0x540615(0x18a))for(const _0x2cd256 of _0x303bbe['_commandList']){const _0x4005b1=_0x2cd256[_0x540615(0x1af)];if(_0x2cd256[_0x540615(0x1ca)][_0x540615(0x21d)](this)){let _0x10bdee=_0x2cd256[_0x540615(0x27c)];if(['',_0x540615(0x25f)][_0x540615(0x228)](_0x10bdee))_0x10bdee=_0x2cd256['TextJS']['call'](this);const _0x31e563=_0x2cd256[_0x540615(0x138)];_0x31e563>0x0&&this[_0x540615(0x284)]()!==_0x540615(0x157)&&(_0x10bdee=_0x540615(0x273)[_0x540615(0x1da)](_0x31e563,_0x10bdee));const _0x455f9b=_0x2cd256['EnableJS'][_0x540615(0x21d)](this),_0x53ccf3=_0x2cd256['ExtJS']['call'](this);this['addCommand'](_0x10bdee,_0x4005b1,_0x455f9b,_0x53ccf3),this[_0x540615(0x185)](_0x4005b1,_0x2cd256[_0x540615(0x219)][_0x540615(0x199)](this,_0x53ccf3));}this[_0x540615(0x15c)](_0x4005b1);}else this[_0x540615(0x1c2)]['activate']();}},VisuMZ['MainMenuCore'][_0x5a4ffc(0x156)]=Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x27f)],Scene_Menu['prototype']['commandFormation']=function(){const _0x36e026=_0x5a4ffc;VisuMZ[_0x36e026(0x188)][_0x36e026(0x156)][_0x36e026(0x21d)](this);if(this[_0x36e026(0x264)]()==='mobile')this[_0x36e026(0x1a2)]['open']();},VisuMZ[_0x5a4ffc(0x188)][_0x5a4ffc(0x181)]=Scene_Menu[_0x5a4ffc(0x239)][_0x5a4ffc(0x19f)],Scene_Menu['prototype'][_0x5a4ffc(0x19f)]=function(){const _0x5e935f=_0x5a4ffc;VisuMZ[_0x5e935f(0x188)][_0x5e935f(0x181)][_0x5e935f(0x21d)](this);if(this[_0x5e935f(0x264)]()===_0x5e935f(0x291))this['_statusWindow']['close']();},Scene_Menu['prototype'][_0x5a4ffc(0x18b)]=function(){const _0x5f3d30=_0x5a4ffc;SceneManager[_0x5f3d30(0x1c7)](Scene_Load);};function _0x21c1(_0x14fb7e,_0x3360d2){const _0x10935e=_0x1093();return _0x21c1=function(_0x21c140,_0x4d5db9){_0x21c140=_0x21c140-0x110;let _0x47e76d=_0x10935e[_0x21c140];return _0x47e76d;},_0x21c1(_0x14fb7e,_0x3360d2);}function Sprite_MenuBackgroundActor(){const _0x403a0f=_0x5a4ffc;this[_0x403a0f(0x19c)](...arguments);}Sprite_MenuBackgroundActor[_0x5a4ffc(0x239)]=Object[_0x5a4ffc(0x14b)](Sprite[_0x5a4ffc(0x239)]),Sprite_MenuBackgroundActor[_0x5a4ffc(0x239)][_0x5a4ffc(0x221)]=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0x5a4ffc(0x239)][_0x5a4ffc(0x19c)]=function(){const _0x1e48a6=_0x5a4ffc;this[_0x1e48a6(0x226)]=null,this[_0x1e48a6(0x168)]=![],Sprite[_0x1e48a6(0x239)][_0x1e48a6(0x19c)][_0x1e48a6(0x21d)](this),this['x']=Graphics[_0x1e48a6(0x27e)];},Sprite_MenuBackgroundActor[_0x5a4ffc(0x239)]['setActor']=function(_0x6b29fe){const _0x308a12=_0x5a4ffc;this[_0x308a12(0x226)]!==_0x6b29fe&&(this[_0x308a12(0x226)]=_0x6b29fe,this[_0x308a12(0x2a1)]());},Sprite_MenuBackgroundActor[_0x5a4ffc(0x239)][_0x5a4ffc(0x2a1)]=function(){const _0x3fa135=_0x5a4ffc;this['_bitmapReady']=![];if(this['_actor'])this[_0x3fa135(0x29a)]=ImageManager[_0x3fa135(0x1a7)](this['_actor'][_0x3fa135(0x295)]()),this[_0x3fa135(0x29a)]['addLoadListener'](this['onBitmapLoad'][_0x3fa135(0x199)](this));else{if(_0x3fa135(0x254)!=='SBldc')return _0xab3492[_0x3fa135(0x188)][_0x3fa135(0x1e8)][_0x3fa135(0x282)][_0x3fa135(0x248)];else this[_0x3fa135(0x29a)]=new Bitmap(0x1,0x1);}},Sprite_MenuBackgroundActor[_0x5a4ffc(0x239)][_0x5a4ffc(0x18e)]=function(){const _0xa76f98=_0x5a4ffc;this[_0xa76f98(0x168)]=!![],VisuMZ[_0xa76f98(0x188)][_0xa76f98(0x1e8)][_0xa76f98(0x272)][_0xa76f98(0x25d)][_0xa76f98(0x21d)](this);},Sprite_MenuBackgroundActor[_0x5a4ffc(0x239)]['update']=function(){const _0xc0dfdb=_0x5a4ffc;Sprite[_0xc0dfdb(0x239)][_0xc0dfdb(0x24d)][_0xc0dfdb(0x21d)](this);if(this[_0xc0dfdb(0x168)]){if(_0xc0dfdb(0x141)===_0xc0dfdb(0x1e3)){const _0x480a64=_0x2bcf16(_0x4a891c['$1']);_0x480a64!==_0x4ea972[_0x368884][_0xc0dfdb(0x1f7)]&&(_0x2c73ca(_0xc0dfdb(0x257)[_0xc0dfdb(0x1da)](_0x24673e,_0x480a64)),_0x11110c[_0xc0dfdb(0x26f)]());}else this[_0xc0dfdb(0x169)](),this[_0xc0dfdb(0x22f)](),this[_0xc0dfdb(0x16e)]();}},Sprite_MenuBackgroundActor[_0x5a4ffc(0x239)]['updateOpacity']=function(){const _0x29d0a9=_0x5a4ffc;if(this[_0x29d0a9(0x122)]>0x0){const _0x4b3d89=this[_0x29d0a9(0x122)];this[_0x29d0a9(0x244)]=(this[_0x29d0a9(0x244)]*(_0x4b3d89-0x1)+0xff)/_0x4b3d89;}},Sprite_MenuBackgroundActor[_0x5a4ffc(0x239)][_0x5a4ffc(0x22f)]=function(){const _0x2cd08b=_0x5a4ffc;if(this[_0x2cd08b(0x122)]>0x0){const _0x2d89cd=this['_duration'];this['x']=(this['x']*(_0x2d89cd-0x1)+this[_0x2cd08b(0x297)])/_0x2d89cd,this['y']=(this['y']*(_0x2d89cd-0x1)+this[_0x2cd08b(0x135)])/_0x2d89cd;}},Sprite_MenuBackgroundActor[_0x5a4ffc(0x239)][_0x5a4ffc(0x16e)]=function(){const _0x51fbf9=_0x5a4ffc;if(this[_0x51fbf9(0x122)]>0x0)this[_0x51fbf9(0x122)]--;},ImageManager[_0x5a4ffc(0x1f0)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x5a4ffc(0x12f)]=ImageManager['svActorVertCells']||0x6,Window_Base[_0x5a4ffc(0x239)]['drawSvActor']=function(_0x5acac1,_0x1983f5,_0x238350){const _0x1ee576=_0x5a4ffc,_0x578288=ImageManager[_0x1ee576(0x117)](_0x5acac1),_0x248501=_0x578288[_0x1ee576(0x27e)]/ImageManager['svActorHorzCells'],_0x48c54e=_0x578288['height']/ImageManager[_0x1ee576(0x12f)],_0x23ce36=0x0,_0xf5a1ac=0x0;this['contents'][_0x1ee576(0x251)](_0x578288,_0x23ce36,_0xf5a1ac,_0x248501,_0x48c54e,_0x1983f5-_0x248501/0x2,_0x238350-_0x48c54e);},Window_MenuCommand[_0x5a4ffc(0x274)]=VisuMZ[_0x5a4ffc(0x188)][_0x5a4ffc(0x1e8)]['CommandList'],VisuMZ[_0x5a4ffc(0x188)][_0x5a4ffc(0x1ae)]=Window_MenuCommand[_0x5a4ffc(0x239)]['initialize'],Window_MenuCommand['prototype'][_0x5a4ffc(0x19c)]=function(_0x39f4eb){const _0xba6ab5=_0x5a4ffc;VisuMZ[_0xba6ab5(0x188)]['Window_MenuCommand_initialize']['call'](this,_0x39f4eb),this[_0xba6ab5(0x25c)](_0x39f4eb);},Window_MenuCommand['prototype'][_0x5a4ffc(0x25c)]=function(_0x3b3fd4){const _0xd60a63=_0x5a4ffc,_0x545dd6=new Rectangle(0x0,0x0,_0x3b3fd4[_0xd60a63(0x27e)],_0x3b3fd4[_0xd60a63(0x1a9)]);this[_0xd60a63(0x173)]=new Window_Base(_0x545dd6),this[_0xd60a63(0x173)][_0xd60a63(0x244)]=0x0,this[_0xd60a63(0x236)](this[_0xd60a63(0x173)]),this[_0xd60a63(0x214)]();},Window_MenuCommand[_0x5a4ffc(0x239)][_0x5a4ffc(0x15f)]=function(){const _0x2e02f2=_0x5a4ffc;Window_HorzCommand[_0x2e02f2(0x239)][_0x2e02f2(0x15f)][_0x2e02f2(0x21d)](this);if(this[_0x2e02f2(0x173)])this[_0x2e02f2(0x214)]();},Window_MenuCommand[_0x5a4ffc(0x239)][_0x5a4ffc(0x214)]=function(){const _0x37f542=_0x5a4ffc,_0x3cc3e4=this['_commandNameWindow'];_0x3cc3e4[_0x37f542(0x1c6)][_0x37f542(0x176)]();const _0x4ab59b=this[_0x37f542(0x11e)](this[_0x37f542(0x24f)]());if(_0x4ab59b===_0x37f542(0x17f)){if(_0x37f542(0x22e)!=='hBSGH'){const _0x1e798a=this['itemLineRect'](this[_0x37f542(0x24f)]());let _0x20611f=this[_0x37f542(0x1ee)](this['index']());_0x20611f=_0x20611f['replace'](/\\I\[(\d+)\]/gi,''),_0x3cc3e4['resetFontSettings'](),this[_0x37f542(0x19a)](_0x20611f,_0x1e798a),this[_0x37f542(0x1cc)](_0x20611f,_0x1e798a),this[_0x37f542(0x132)](_0x20611f,_0x1e798a);}else _0x12f5ec=_0x5ef50f(_0x16bc6d['$1']),_0x4b0968=_0x344cce['replace'](/\\I\[(\d+)\]/i,'')[_0x37f542(0x1b1)]();}},Window_MenuCommand[_0x5a4ffc(0x239)][_0x5a4ffc(0x19a)]=function(_0x996e60,_0xc0dd67){},Window_MenuCommand[_0x5a4ffc(0x239)]['commandNameWindowDrawText']=function(_0x34927f,_0xfc08e0){const _0x45fc39=_0x5a4ffc,_0x53ea37=this[_0x45fc39(0x173)];_0x53ea37[_0x45fc39(0x16b)](_0x34927f,0x0,_0xfc08e0['y'],_0x53ea37[_0x45fc39(0x13c)],_0x45fc39(0x29e));},Window_MenuCommand[_0x5a4ffc(0x239)][_0x5a4ffc(0x132)]=function(_0x5082e,_0x36a236){const _0x276fe9=_0x5a4ffc,_0x395b25=this['_commandNameWindow'],_0xd1149d=$gameSystem[_0x276fe9(0x245)](),_0xd669c0=_0x36a236['x']+Math[_0x276fe9(0x279)](_0x36a236[_0x276fe9(0x27e)]/0x2)+_0xd1149d;_0x395b25['x']=_0x395b25[_0x276fe9(0x27e)]/-0x2+_0xd669c0,_0x395b25['y']=Math['floor'](_0x36a236[_0x276fe9(0x1a9)]/0x4);},Window_MenuCommand[_0x5a4ffc(0x239)][_0x5a4ffc(0x12b)]=function(){const _0x1cf4c0=_0x5a4ffc,_0x1c9176=SceneManager[_0x1cf4c0(0x16a)][_0x1cf4c0(0x264)]();if(_0x1c9176==='mobile'){if(_0x1cf4c0(0x129)!=='DaGlr')return _0x1cf4c0(0x157);else{const _0x18ce3a=VisuMZ[_0x1cf4c0(0x188)][_0x1cf4c0(0x1e8)][_0x1cf4c0(0x282)][_0x1cf4c0(0x27b)];return this[_0x1cf4c0(0x1b5)]()*_0x18ce3a+0x8;}}else{if(_0x1cf4c0(0x21b)===_0x1cf4c0(0x21b))return Window_Command['prototype'][_0x1cf4c0(0x12b)]['call'](this);else _0x30da17[_0x1cf4c0(0x188)][_0x1cf4c0(0x1e8)][_0x1cf4c0(0x17b)][_0x1cf4c0(0x17a)][_0x1cf4c0(0x21d)](this,_0x5cc47f,_0x241c10);}},Window_MenuCommand['prototype'][_0x5a4ffc(0x252)]=function(){const _0xf8bcc8=_0x5a4ffc;this[_0xf8bcc8(0x262)]();},Window_MenuCommand[_0x5a4ffc(0x239)][_0x5a4ffc(0x262)]=function(){const _0x5bf25d=_0x5a4ffc;for(const _0x44634e of Window_MenuCommand[_0x5bf25d(0x274)]){const _0x2d3fd2=_0x44634e[_0x5bf25d(0x1af)];if(_0x44634e[_0x5bf25d(0x1ca)][_0x5bf25d(0x21d)](this)){let _0x28b747=_0x44634e[_0x5bf25d(0x27c)];if(['',_0x5bf25d(0x25f)][_0x5bf25d(0x228)](_0x28b747))_0x28b747=_0x44634e[_0x5bf25d(0x23b)][_0x5bf25d(0x21d)](this);const _0x16c044=_0x44634e[_0x5bf25d(0x138)];_0x16c044>0x0&&this[_0x5bf25d(0x284)]()!==_0x5bf25d(0x157)&&(_0x5bf25d(0x14e)===_0x5bf25d(0x247)?(this[_0x5bf25d(0x136)]='',this[_0x5bf25d(0x115)]()&&this['actor']()[_0x5bf25d(0x223)][_0x5bf25d(0x18c)](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x5bf25d(0x136)]=_0x1b24a4(_0x1a1c6d['$1']))):_0x28b747=_0x5bf25d(0x273)['format'](_0x16c044,_0x28b747));const _0x19db2f=_0x44634e[_0x5bf25d(0x1bd)]['call'](this),_0x4954e4=_0x44634e['ExtJS']['call'](this);this[_0x5bf25d(0x216)](_0x28b747,_0x2d3fd2,_0x19db2f,_0x4954e4),this[_0x5bf25d(0x185)](_0x2d3fd2,_0x44634e[_0x5bf25d(0x219)][_0x5bf25d(0x199)](this,_0x4954e4));}this['addSymbolBridge'](_0x2d3fd2);}},Window_MenuCommand[_0x5a4ffc(0x239)]['addSymbolBridge']=function(_0x538b3){const _0x57b1ff=_0x5a4ffc;switch(_0x538b3){case _0x57b1ff(0x14d):this[_0x57b1ff(0x14c)]();break;case _0x57b1ff(0x293):this[_0x57b1ff(0x229)](),this[_0x57b1ff(0x20b)]();break;case _0x57b1ff(0x271):this[_0x57b1ff(0x13a)]();break;case _0x57b1ff(0x25e):this[_0x57b1ff(0x1a6)]();break;case _0x57b1ff(0x1ff):this[_0x57b1ff(0x22d)]();break;}},Window_MenuCommand['prototype']['addMainCommands']=function(){},Window_MenuCommand['prototype'][_0x5a4ffc(0x229)]=function(){},Window_MenuCommand[_0x5a4ffc(0x239)][_0x5a4ffc(0x20b)]=function(){},Window_MenuCommand['prototype']['addOptionsCommand']=function(){},Window_MenuCommand[_0x5a4ffc(0x239)]['addSaveCommand']=function(){},Window_MenuCommand[_0x5a4ffc(0x239)][_0x5a4ffc(0x22d)]=function(){},Window_MenuCommand[_0x5a4ffc(0x239)]['maxCols']=function(){const _0x38d4e7=_0x5a4ffc,_0x308e65=SceneManager[_0x38d4e7(0x16a)][_0x38d4e7(0x264)]();if([_0x38d4e7(0x1df),_0x38d4e7(0x11f)][_0x38d4e7(0x228)](_0x308e65))return this[_0x38d4e7(0x26d)]?this[_0x38d4e7(0x1b0)]():0x4;else{if(_0x308e65!=='default'){if(_0x38d4e7(0x178)!==_0x38d4e7(0x111))return VisuMZ[_0x38d4e7(0x188)][_0x38d4e7(0x1e8)][_0x38d4e7(0x282)]['Cols'];else{if(this[_0x38d4e7(0x110)]()){if(_0x42fbe9[_0x38d4e7(0x188)][_0x38d4e7(0x1e8)]['General'][_0x38d4e7(0x299)]){const _0x40c5fb=_0x37dec7[_0x38d4e7(0x1a9)]-this[_0x38d4e7(0x22c)](0x1,![]);_0x4d98cb['y']+=_0x40c5fb;}_0x1d6722['MainMenuCore']['Settings']['General'][_0x38d4e7(0x170)]&&(_0x11dec1[_0x38d4e7(0x1a9)]=this[_0x38d4e7(0x22c)](0x1,![]));}}}else return Window_Command[_0x38d4e7(0x239)][_0x38d4e7(0x267)][_0x38d4e7(0x21d)](this);}},Window_MenuCommand[_0x5a4ffc(0x239)]['itemTextAlign']=function(){const _0x541d55=_0x5a4ffc;return VisuMZ[_0x541d55(0x188)][_0x541d55(0x1e8)][_0x541d55(0x282)][_0x541d55(0x220)];},Window_MenuCommand['prototype']['drawItem']=function(_0x5818ca){const _0xb53f52=_0x5a4ffc,_0x4babc2=this[_0xb53f52(0x11e)](_0x5818ca);if(_0x4babc2===_0xb53f52(0x196))this[_0xb53f52(0x137)](_0x5818ca);else _0x4babc2===_0xb53f52(0x17f)?this['drawItemStyleIcon'](_0x5818ca):Window_Command[_0xb53f52(0x239)][_0xb53f52(0x29c)][_0xb53f52(0x21d)](this,_0x5818ca);},Window_MenuCommand[_0x5a4ffc(0x239)]['commandStyle']=function(){const _0x16c806=_0x5a4ffc;return VisuMZ[_0x16c806(0x188)]['Settings'][_0x16c806(0x282)][_0x16c806(0x248)];},Window_MenuCommand[_0x5a4ffc(0x239)][_0x5a4ffc(0x11e)]=function(_0x43d130){const _0x3d5370=_0x5a4ffc,_0x1137a4=this[_0x3d5370(0x284)]();if(_0x1137a4!==_0x3d5370(0x246))return _0x1137a4;else{if(_0x3d5370(0x1cd)!=='YKWlS')this['changePaintOpacity'](_0x1508b5[_0x3d5370(0x285)]());else{const _0x14508b=this[_0x3d5370(0x1ee)](_0x43d130);if(_0x14508b['match'](/\\I\[(\d+)\]/i)){const _0x54c68d=this[_0x3d5370(0x26b)](_0x43d130),_0x2057c7=this[_0x3d5370(0x218)](_0x14508b)[_0x3d5370(0x27e)];if(_0x2057c7<=_0x54c68d[_0x3d5370(0x27e)]){if(_0x3d5370(0x17c)!==_0x3d5370(0x205))return _0x3d5370(0x196);else _0x22e292[_0x3d5370(0x1a9)]-=this['variableWindowRect']()['height'];}else{if(_0x3d5370(0x29d)!==_0x3d5370(0x1a1))return _0x3d5370(0x17f);else{const _0x4aa7e3=this[_0x3d5370(0x264)]();if([_0x3d5370(0x211),_0x3d5370(0x1df),'mobile']['includes'](_0x4aa7e3))return this[_0x3d5370(0x212)]();else{if([_0x3d5370(0x116),_0x3d5370(0x11f)][_0x3d5370(0x228)](_0x4aa7e3))return this['goldWindowRectBottomStyle']();else{const _0x292d7f=_0xf0bade[_0x3d5370(0x188)]['Scene_Menu_goldWindowRect']['call'](this);return this[_0x3d5370(0x167)](_0x292d7f),_0x292d7f;}}}}}else{if(_0x3d5370(0x26a)==='zASfl')return'text';else _0x1ab509[_0x3d5370(0x1b6)](_0x3649e1[_0x3d5370(0x126)]());}}}},Window_MenuCommand['prototype']['drawItemStyleIconText']=function(_0x226082){const _0x28968b=_0x5a4ffc,_0xde6660=this[_0x28968b(0x26b)](_0x226082),_0x28c13b=this['commandName'](_0x226082),_0x468814=this[_0x28968b(0x218)](_0x28c13b)[_0x28968b(0x27e)];this[_0x28968b(0x256)](this[_0x28968b(0x1c0)](_0x226082));let _0x16bcbb=this[_0x28968b(0x12a)]();if(_0x16bcbb===_0x28968b(0x1aa))_0x28968b(0x11c)!==_0x28968b(0x11c)?_0x4109dd['loadPicture'](_0x1efc63[_0x28968b(0x295)]()):this['drawTextEx'](_0x28c13b,_0xde6660['x']+_0xde6660['width']-_0x468814,_0xde6660['y'],_0x468814);else{if(_0x16bcbb===_0x28968b(0x29e)){if(_0x28968b(0x118)===_0x28968b(0x1e6))_0x3de6aa[_0x28968b(0x1c7)](_0xff4691);else{const _0x154cbd=_0xde6660['x']+Math['floor']((_0xde6660['width']-_0x468814)/0x2);this['drawTextEx'](_0x28c13b,_0x154cbd,_0xde6660['y'],_0x468814);}}else{if(_0x28968b(0x1a4)!==_0x28968b(0x193))this[_0x28968b(0x234)](_0x28c13b,_0xde6660['x'],_0xde6660['y'],_0x468814);else{const _0x5259c8=_0x11cb06[_0x28968b(0x225)]-this[_0x28968b(0x243)][_0x28968b(0x27e)]-(this[_0x28968b(0x1c3)]?this[_0x28968b(0x1c3)][_0x28968b(0x27e)]:0x0),_0x3ab3fe=this[_0x28968b(0x22c)](0x1,![]),_0x36d636=this[_0x28968b(0x243)]['x']-_0x5259c8,_0x487f72=this['mainAreaBottom']()-_0x3ab3fe;return new _0x4b36b5(_0x36d636,_0x487f72,_0x5259c8,_0x3ab3fe);}}}},Window_MenuCommand[_0x5a4ffc(0x239)][_0x5a4ffc(0x202)]=function(_0x5ed93a){const _0x37f73f=_0x5a4ffc;this['commandName'](_0x5ed93a)[_0x37f73f(0x18c)](/\\I\[(\d+)\]/i);const _0x4815b7=Number(RegExp['$1']),_0x23f7cd=this[_0x37f73f(0x26b)](_0x5ed93a),_0x475df9=_0x23f7cd['x']+Math[_0x37f73f(0x279)]((_0x23f7cd[_0x37f73f(0x27e)]-ImageManager['iconWidth'])/0x2),_0x314626=_0x23f7cd['y']+(_0x23f7cd['height']-ImageManager[_0x37f73f(0x1e1)])/0x2;this[_0x37f73f(0x15d)](_0x4815b7,_0x475df9,_0x314626);},VisuMZ[_0x5a4ffc(0x188)]['Window_StatusBase_loadFaceImages']=Window_StatusBase['prototype']['loadFaceImages'],Window_StatusBase[_0x5a4ffc(0x239)][_0x5a4ffc(0x250)]=function(){const _0x35b749=_0x5a4ffc;VisuMZ[_0x35b749(0x188)]['Window_StatusBase_loadFaceImages'][_0x35b749(0x21d)](this),this['loadOtherActorImages']();},Window_StatusBase[_0x5a4ffc(0x239)][_0x5a4ffc(0x171)]=function(){const _0x8a6812=_0x5a4ffc;for(const _0x302ec3 of $gameParty[_0x8a6812(0x253)]()){if(!_0x302ec3)continue;if(_0x302ec3['characterName']()){if('Xkbag'===_0x8a6812(0x1f2)){const _0x47bb48=this[_0x8a6812(0x24e)]();switch(_0x47bb48){case _0x8a6812(0x19d):case _0x8a6812(0x148):return _0x2c5b1c[_0x8a6812(0x180)]();default:return 0x1;}}else ImageManager[_0x8a6812(0x1b6)](_0x302ec3[_0x8a6812(0x126)]());}_0x302ec3[_0x8a6812(0x1b3)]()&&(_0x8a6812(0x143)!==_0x8a6812(0x1fb)?ImageManager['loadSvActor'](_0x302ec3['battlerName']()):this[_0x8a6812(0x137)](_0x570fc2)),_0x302ec3[_0x8a6812(0x295)]()&&ImageManager[_0x8a6812(0x1a7)](_0x302ec3[_0x8a6812(0x295)]());}},Window_StatusBase[_0x5a4ffc(0x239)][_0x5a4ffc(0x28e)]=function(){const _0x3b3377=_0x5a4ffc;return VisuMZ[_0x3b3377(0x188)][_0x3b3377(0x1e8)][_0x3b3377(0x298)];},Window_StatusBase[_0x5a4ffc(0x239)][_0x5a4ffc(0x215)]=function(_0x1e5fdc,_0x32f16b,_0x2b1e1c,_0x3d1e79,_0x1a0d8e){const _0x323294=_0x5a4ffc;_0x3d1e79=_0x3d1e79||ImageManager[_0x323294(0x206)],_0x1a0d8e=_0x1a0d8e||ImageManager[_0x323294(0x153)];const _0x5cef51=ImageManager[_0x323294(0x206)],_0x3efea1=_0x1a0d8e-0x2,_0x3de278=_0x32f16b+Math[_0x323294(0x279)]((_0x3d1e79-_0x5cef51)/0x2);if(this['constructor']===Window_MenuStatus){if('TEIaa'==='Hbzbp')return _0x307e76['MainMenuCore']['Settings'][_0x323294(0x282)][_0x323294(0x29f)];else this[_0x323294(0x256)](_0x1e5fdc['isBattleMember']());}this[_0x323294(0x183)](_0x1e5fdc,_0x3de278,_0x2b1e1c,_0x5cef51,_0x3efea1),this[_0x323294(0x256)](!![]);},Window_StatusBase['prototype'][_0x5a4ffc(0x200)]=function(_0x1a868b,_0x5666c5,_0xdf7fbe,_0x3ff48b,_0x2f8044){const _0x70aef1=_0x5a4ffc;_0x3ff48b=_0x3ff48b||ImageManager[_0x70aef1(0x206)],_0x2f8044=_0x2f8044||ImageManager[_0x70aef1(0x153)];const _0x3ad7be=_0x1a868b['characterName'](),_0x5c6bee=_0x1a868b[_0x70aef1(0x165)](),_0x526c74=ImageManager['loadCharacter'](_0x3ad7be),_0x2fc9c7=ImageManager[_0x70aef1(0x23d)](_0x3ad7be),_0x319f1c=_0x526c74['width']/(_0x2fc9c7?0x3:0xc),_0x40c09d=_0x526c74[_0x70aef1(0x1a9)]/(_0x2fc9c7?0x4:0x8),_0x468186=_0x3ff48b,_0x15d138=_0x2f8044-0x2,_0x3a7a41=_0x5666c5+Math[_0x70aef1(0x279)](_0x468186/0x2),_0x39c72e=_0xdf7fbe+Math[_0x70aef1(0x20d)]((_0x2f8044+_0x40c09d)/0x2);this[_0x70aef1(0x221)]===Window_MenuStatus&&this[_0x70aef1(0x256)](_0x1a868b[_0x70aef1(0x285)]());const _0x2f3cf9=Math['min'](_0x3ff48b,_0x319f1c),_0x2b67a2=Math[_0x70aef1(0x11a)](_0x2f8044,_0x40c09d),_0xba5a56=Math[_0x70aef1(0x279)](_0x5666c5+Math['max'](_0x3ff48b-_0x319f1c,0x0)/0x2),_0x37570f=Math[_0x70aef1(0x279)](_0xdf7fbe+Math[_0x70aef1(0x11d)](_0x2f8044-_0x40c09d,0x0)/0x2),_0x2e1293=_0x2fc9c7?0x0:_0x5c6bee,_0x4572eb=(_0x2e1293%0x4*0x3+0x1)*_0x319f1c,_0x2ca73a=Math[_0x70aef1(0x279)](_0x2e1293/0x4)*0x4*_0x40c09d;this[_0x70aef1(0x1c6)]['blt'](_0x526c74,_0x4572eb,_0x2ca73a,_0x2f3cf9,_0x2b67a2,_0xba5a56,_0x37570f),this[_0x70aef1(0x256)](!![]);},Window_StatusBase[_0x5a4ffc(0x239)][_0x5a4ffc(0x1c8)]=function(_0x13c965,_0x95d55,_0x3d5336,_0x40fd66,_0x4462c2){const _0x23c9ba=_0x5a4ffc;_0x40fd66=_0x40fd66||ImageManager[_0x23c9ba(0x206)],_0x4462c2=_0x4462c2||ImageManager[_0x23c9ba(0x153)];const _0x267340=ImageManager[_0x23c9ba(0x117)](_0x13c965['battlerName']()),_0x44a40d=_0x267340['width']/ImageManager[_0x23c9ba(0x1f0)],_0xb2434c=_0x267340[_0x23c9ba(0x1a9)]/ImageManager[_0x23c9ba(0x12f)],_0x36ae4a=_0x40fd66,_0xf3926c=_0x4462c2-0x2,_0x173704=_0x95d55+Math[_0x23c9ba(0x279)](_0x36ae4a/0x2),_0x24826a=_0x3d5336+Math['ceil']((_0x4462c2+_0xb2434c)/0x2);this[_0x23c9ba(0x221)]===Window_MenuStatus&&this[_0x23c9ba(0x256)](_0x13c965[_0x23c9ba(0x285)]());const _0x21bd0b=Math['min'](_0x40fd66,_0x44a40d),_0x3ab631=Math[_0x23c9ba(0x11a)](_0x4462c2,_0xb2434c),_0x17f3c5=Math[_0x23c9ba(0x279)](_0x95d55+Math[_0x23c9ba(0x11d)](_0x40fd66-_0x44a40d,0x0)/0x2),_0x5d2e74=Math['floor'](_0x3d5336+Math[_0x23c9ba(0x11d)](_0x4462c2-_0xb2434c,0x0)/0x2),_0x39760f=0x0,_0x13505d=0x0;this[_0x23c9ba(0x1c6)][_0x23c9ba(0x251)](_0x267340,_0x39760f,_0x13505d,_0x21bd0b,_0x3ab631,_0x17f3c5,_0x5d2e74),this[_0x23c9ba(0x256)](!![]);},Window_StatusBase[_0x5a4ffc(0x239)][_0x5a4ffc(0x213)]=function(_0x291ae2,_0x4e3f07,_0x2b5118,_0x23f241,_0x41f61a){const _0x52d631=_0x5a4ffc,_0x88eafa=ImageManager[_0x52d631(0x1a7)](_0x291ae2[_0x52d631(0x295)]());_0x23f241=(_0x23f241||ImageManager['faceWidth'])-0x2,_0x41f61a=(_0x41f61a||ImageManager[_0x52d631(0x153)])-0x2;const _0x23b19b=_0x88eafa[_0x52d631(0x27e)],_0xd37f82=_0x88eafa['height'],_0x5e34a2=_0x23f241,_0x388d18=_0x41f61a-0x2,_0x3b2e76=_0x4e3f07+Math[_0x52d631(0x279)](_0x5e34a2/0x2),_0x4b7d79=_0x2b5118+Math[_0x52d631(0x20d)]((_0x41f61a+_0xd37f82)/0x2);this[_0x52d631(0x221)]===Window_MenuStatus&&this[_0x52d631(0x256)](_0x291ae2[_0x52d631(0x285)]());const _0x229ad0=Math['min'](_0x23f241,_0x23b19b),_0xd6d05=Math[_0x52d631(0x11a)](_0x41f61a,_0xd37f82),_0x4b12d0=_0x4e3f07+0x1,_0x3689e2=Math[_0x52d631(0x11d)](_0x2b5118+0x1,_0x2b5118+_0x388d18-_0xd37f82+0x3);let _0x21a6e4=Math[_0x52d631(0x1b2)]((_0x23b19b-_0x229ad0)/0x2),_0x2e8f34=Math[_0x52d631(0x1b2)]((_0xd37f82-_0xd6d05)/0x2);_0x21a6e4-=_0x291ae2[_0x52d631(0x1c4)](),_0x2e8f34-=_0x291ae2[_0x52d631(0x23f)]();if(Imported['VisuMZ_0_CoreEngine']){if(VisuMZ[_0x52d631(0x1f5)][_0x52d631(0x1e8)][_0x52d631(0x1fc)][_0x52d631(0x11b)]){}}this[_0x52d631(0x1c6)][_0x52d631(0x251)](_0x88eafa,_0x21a6e4,_0x2e8f34,_0x229ad0,_0xd6d05,_0x4b12d0,_0x3689e2),this[_0x52d631(0x256)](!![]);},VisuMZ[_0x5a4ffc(0x188)][_0x5a4ffc(0x275)]=Window_MenuStatus[_0x5a4ffc(0x239)][_0x5a4ffc(0x231)],Window_MenuStatus[_0x5a4ffc(0x239)][_0x5a4ffc(0x231)]=function(){const _0x20578c=_0x5a4ffc;if(VisuMZ[_0x20578c(0x188)][_0x20578c(0x1e8)]['General'][_0x20578c(0x28f)]){if(_0x20578c(0x128)===_0x20578c(0x128))VisuMZ['MainMenuCore'][_0x20578c(0x275)][_0x20578c(0x21d)](this);else{const _0x23a913=this[_0x20578c(0x15b)](),_0x2c9c1b=this[_0x20578c(0x22c)](0x1,![]),_0x32a2d1=0x0,_0x176eaa=this['mainAreaBottom']()-_0x2c9c1b;return new _0x4e0488(_0x32a2d1,_0x176eaa,_0x23a913,_0x2c9c1b);}}else{if(_0x20578c(0x20e)===_0x20578c(0x23a)){const _0x3c8596=this['_commandWindow'][_0x20578c(0x240)](),_0x124039=this[_0x20578c(0x1c2)][_0x20578c(0x277)]();for(const _0xc0bc78 of _0x26abb2['_commandList']){if(_0xc0bc78['Symbol']===_0x3c8596){_0xc0bc78[_0x20578c(0x1d2)][_0x20578c(0x21d)](this,_0x124039);return;}}}else this[_0x20578c(0x1e2)](0x0);}},VisuMZ['MainMenuCore']['Window_MenuStatus_maxItems']=Window_MenuStatus[_0x5a4ffc(0x239)][_0x5a4ffc(0x1b0)],Window_MenuStatus[_0x5a4ffc(0x239)][_0x5a4ffc(0x1b0)]=function(){const _0x56c466=_0x5a4ffc;return this[_0x56c466(0x1dc)]()?$gameParty[_0x56c466(0x192)]()['length']:VisuMZ[_0x56c466(0x188)][_0x56c466(0x172)][_0x56c466(0x21d)](this);},Window_MenuStatus['prototype'][_0x5a4ffc(0x1dc)]=function(){const _0x37112=_0x5a4ffc,_0x11c5d0=VisuMZ[_0x37112(0x188)][_0x37112(0x1e8)][_0x37112(0x272)];if(_0x11c5d0[_0x37112(0x260)]===undefined)_0x11c5d0['ShowReserve']=!![];const _0x1e86d6=SceneManager[_0x37112(0x16a)];if(!_0x11c5d0[_0x37112(0x260)]){if(_0x11c5d0[_0x37112(0x278)])return _0x1e86d6[_0x37112(0x221)]===Scene_Menu;return!![];}return![];},Window_MenuStatus[_0x5a4ffc(0x239)][_0x5a4ffc(0x24e)]=function(){const _0x15155f=_0x5a4ffc,_0x4d400a=SceneManager['_scene'][_0x15155f(0x221)];if(_0x4d400a===Scene_Menu){if(_0x15155f(0x113)!==_0x15155f(0x113))this['_menuImage']=_0x2066dd(_0x5c652a['$1']);else return VisuMZ['MainMenuCore'][_0x15155f(0x1e8)][_0x15155f(0x12c)];}else return VisuMZ['MainMenuCore'][_0x15155f(0x1e8)][_0x15155f(0x276)];},Window_MenuStatus[_0x5a4ffc(0x239)]['numVisibleRows']=function(){const _0x3dfa01=_0x5a4ffc,_0x395e33=this[_0x3dfa01(0x24e)]();switch(_0x395e33){case'vertical':case _0x3dfa01(0x148):return 0x1;case _0x3dfa01(0x1f4):return 0x1;default:return $gameParty['maxBattleMembers']();}},Window_MenuStatus['prototype'][_0x5a4ffc(0x267)]=function(){const _0x3eafe1=_0x5a4ffc,_0x4b9fff=this[_0x3eafe1(0x24e)]();switch(_0x4b9fff){case _0x3eafe1(0x19d):case'portrait':return $gameParty[_0x3eafe1(0x180)]();default:return 0x1;}},VisuMZ['MainMenuCore'][_0x5a4ffc(0x13d)]=Window_MenuStatus[_0x5a4ffc(0x239)][_0x5a4ffc(0x12b)],Window_MenuStatus[_0x5a4ffc(0x239)][_0x5a4ffc(0x12b)]=function(){const _0x47f019=_0x5a4ffc,_0x50b980=this['listStyle']();switch(_0x50b980){case _0x47f019(0x19d):case _0x47f019(0x148):case'solo':return this[_0x47f019(0x263)];case _0x47f019(0x14f):return Window_Selectable['prototype'][_0x47f019(0x12b)][_0x47f019(0x21d)](this);case _0x47f019(0x119):return this[_0x47f019(0x1b5)]()*0x2+0x8;default:return VisuMZ[_0x47f019(0x188)]['Window_MenuStatus_itemHeight'][_0x47f019(0x21d)](this);}},Window_MenuStatus['prototype']['drawItem']=function(_0x5deacf){const _0x4090c8=_0x5a4ffc;this[_0x4090c8(0x1f9)](_0x5deacf),this['drawItemStatus'](_0x5deacf);},VisuMZ[_0x5a4ffc(0x188)][_0x5a4ffc(0x1ea)]=Window_MenuStatus[_0x5a4ffc(0x239)][_0x5a4ffc(0x160)],Window_MenuStatus['prototype']['drawActorGraphic']=function(_0x5bce99,_0x4583c4,_0x3380bb,_0x5b686a,_0xaa6b3c){const _0x46ce34=_0x5a4ffc;switch(this[_0x46ce34(0x28e)]()){case'none':break;case _0x46ce34(0x114):this[_0x46ce34(0x200)](_0x5bce99,_0x4583c4,_0x3380bb+0x1,_0x5b686a,_0xaa6b3c-0x2);break;case _0x46ce34(0x123):this['drawItemActorSvBattler'](_0x5bce99,_0x4583c4,_0x3380bb+0x1,_0x5b686a,_0xaa6b3c-0x2);break;default:this['drawItemActorFace'](_0x5bce99,_0x4583c4,_0x3380bb,_0x5b686a,_0xaa6b3c);break;}},Window_MenuStatus[_0x5a4ffc(0x239)][_0x5a4ffc(0x12d)]=function(_0x28edec){const _0x427a30=_0x5a4ffc;this[_0x427a30(0x23c)]();const _0x40e506=this['actor'](_0x28edec),_0x33bad0=this[_0x427a30(0x13f)](_0x28edec),_0x4b0d54=this[_0x427a30(0x24e)]();switch(_0x4b0d54){case _0x427a30(0x19d):this['drawItemStatusVerticalStyle'](_0x40e506,_0x33bad0);break;case _0x427a30(0x148):this[_0x427a30(0x22b)](_0x40e506,_0x33bad0);break;case _0x427a30(0x1f4):this[_0x427a30(0x1bc)](_0x40e506,_0x33bad0);break;case'thin':this['drawItemStatusThinStyle'](_0x40e506,_0x33bad0);break;case'thicker':this[_0x427a30(0x1a3)](_0x40e506,_0x33bad0);break;default:this[_0x427a30(0x144)](_0x40e506,_0x33bad0);break;}},Window_MenuStatus['prototype'][_0x5a4ffc(0x25b)]=function(_0x484f8d,_0x3f4fa3){const _0x2fe323=_0x5a4ffc;VisuMZ[_0x2fe323(0x188)][_0x2fe323(0x1e8)][_0x2fe323(0x17b)][_0x2fe323(0x17a)][_0x2fe323(0x21d)](this,_0x484f8d,_0x3f4fa3);},Window_MenuStatus['prototype'][_0x5a4ffc(0x22b)]=function(_0x3f894a,_0x14826c){const _0x37c95a=_0x5a4ffc;if(_0x3f894a[_0x37c95a(0x295)]()!==''){const _0x445d1f=ImageManager[_0x37c95a(0x1a7)](_0x3f894a[_0x37c95a(0x295)]());_0x445d1f['addLoadListener'](this[_0x37c95a(0x21a)][_0x37c95a(0x199)](this,_0x3f894a,_0x14826c));}else this[_0x37c95a(0x25b)](_0x3f894a,_0x14826c);},Window_MenuStatus[_0x5a4ffc(0x239)][_0x5a4ffc(0x21a)]=function(_0x5cb79d,_0x407b1d){const _0x2a8eae=_0x5a4ffc;VisuMZ[_0x2a8eae(0x188)][_0x2a8eae(0x1e8)][_0x2a8eae(0x17b)][_0x2a8eae(0x1c1)][_0x2a8eae(0x21d)](this,_0x5cb79d,_0x407b1d);},Window_MenuStatus[_0x5a4ffc(0x239)]['drawItemStatusSoloStyle']=function(_0x111a65,_0xd3b318){const _0x4dbe33=_0x5a4ffc,_0x33cb10=ImageManager[_0x4dbe33(0x1a7)](_0x111a65[_0x4dbe33(0x295)]());_0x33cb10[_0x4dbe33(0x1fe)](this[_0x4dbe33(0x20f)][_0x4dbe33(0x199)](this,_0x111a65,_0xd3b318));},Window_MenuStatus[_0x5a4ffc(0x239)][_0x5a4ffc(0x20f)]=function(_0x39bba8,_0x3f3339){const _0x59ca21=_0x5a4ffc;VisuMZ['MainMenuCore'][_0x59ca21(0x1e8)][_0x59ca21(0x17b)][_0x59ca21(0x19b)][_0x59ca21(0x21d)](this,_0x39bba8,_0x3f3339);},Window_MenuStatus[_0x5a4ffc(0x239)]['drawItemStatusThinStyle']=function(_0x3b3e6a,_0x53fb4c){const _0x2a8656=_0x5a4ffc;VisuMZ[_0x2a8656(0x188)][_0x2a8656(0x1e8)][_0x2a8656(0x17b)][_0x2a8656(0x21c)][_0x2a8656(0x21d)](this,_0x3b3e6a,_0x53fb4c);},Window_MenuStatus[_0x5a4ffc(0x239)][_0x5a4ffc(0x1a3)]=function(_0x3bf934,_0x562fee){const _0xeca4a2=_0x5a4ffc;VisuMZ['MainMenuCore']['Settings']['ListStyles']['ThickerStyle'][_0xeca4a2(0x21d)](this,_0x3bf934,_0x562fee);},Window_MenuStatus[_0x5a4ffc(0x239)][_0x5a4ffc(0x259)]=function(){const _0x45c89c=_0x5a4ffc,_0x16db13=this[_0x45c89c(0x24e)]();if([_0x45c89c(0x14f),_0x45c89c(0x119)][_0x45c89c(0x228)](_0x16db13))return![];return Window_StatusBase[_0x45c89c(0x239)][_0x45c89c(0x259)][_0x45c89c(0x21d)](this);},Window_MenuStatus[_0x5a4ffc(0x239)][_0x5a4ffc(0x144)]=function(_0x17d151,_0x38f76f){const _0x30a725=_0x5a4ffc;VisuMZ[_0x30a725(0x188)][_0x30a725(0x1e8)][_0x30a725(0x17b)][_0x30a725(0x17d)][_0x30a725(0x21d)](this,_0x17d151,_0x38f76f);},Window_SkillStatus[_0x5a4ffc(0x239)][_0x5a4ffc(0x183)]=function(_0x2c14a8,_0x523050,_0x58b162,_0x52021d,_0x53f213){const _0x4610f1=_0x5a4ffc;switch(this[_0x4610f1(0x28e)]()){case _0x4610f1(0x1dd):break;case _0x4610f1(0x114):this[_0x4610f1(0x200)](_0x2c14a8,_0x523050,_0x58b162,_0x52021d,_0x53f213);break;case _0x4610f1(0x123):this[_0x4610f1(0x1c8)](_0x2c14a8,_0x523050,_0x58b162,_0x52021d,_0x53f213);break;default:Window_StatusBase[_0x4610f1(0x239)][_0x4610f1(0x183)]['call'](this,_0x2c14a8,_0x523050,_0x58b162,_0x52021d,_0x53f213);break;}},Window_EquipStatus[_0x5a4ffc(0x239)]['drawActorFace']=function(_0x304c7b,_0x518af8,_0x56ac49,_0x250a84,_0x140452){const _0x67e324=_0x5a4ffc;switch(this[_0x67e324(0x28e)]()){case _0x67e324(0x1dd):break;case _0x67e324(0x114):this[_0x67e324(0x200)](_0x304c7b,_0x518af8,_0x56ac49,_0x250a84,_0x140452);break;case _0x67e324(0x123):this[_0x67e324(0x1c8)](_0x304c7b,_0x518af8,_0x56ac49,_0x250a84,_0x140452);break;default:Window_StatusBase[_0x67e324(0x239)][_0x67e324(0x183)][_0x67e324(0x21d)](this,_0x304c7b,_0x518af8,_0x56ac49,_0x250a84,_0x140452);break;}};function Window_ThinGold(){const _0x2e994d=_0x5a4ffc;this[_0x2e994d(0x19c)](...arguments);}Window_ThinGold[_0x5a4ffc(0x239)]=Object[_0x5a4ffc(0x14b)](Window_Gold['prototype']),Window_ThinGold['prototype']['constructor']=Window_ThinGold,Window_ThinGold[_0x5a4ffc(0x239)]['itemHeight']=function(){return this['lineHeight']();},Window_ThinGold[_0x5a4ffc(0x239)][_0x5a4ffc(0x1a0)]=function(){const _0xe5adb4=_0x5a4ffc;return Window_Selectable[_0xe5adb4(0x239)][_0xe5adb4(0x1a0)][_0xe5adb4(0x21d)](this);};function Window_Playtime(){const _0xa89e66=_0x5a4ffc;this[_0xa89e66(0x19c)](...arguments);}Window_Playtime[_0x5a4ffc(0x239)]=Object[_0x5a4ffc(0x14b)](Window_Selectable[_0x5a4ffc(0x239)]),Window_Playtime[_0x5a4ffc(0x239)][_0x5a4ffc(0x221)]=Window_Playtime,Window_Playtime[_0x5a4ffc(0x239)][_0x5a4ffc(0x19c)]=function(_0x4c4cb3){const _0x53f7fe=_0x5a4ffc;this['_playtimeText']=$gameSystem[_0x53f7fe(0x189)](),this['_timer']=0x3c,Window_Selectable[_0x53f7fe(0x239)][_0x53f7fe(0x19c)][_0x53f7fe(0x21d)](this,_0x4c4cb3),this[_0x53f7fe(0x1de)]();},Window_Playtime[_0x5a4ffc(0x239)][_0x5a4ffc(0x12b)]=function(){const _0x5337c4=_0x5a4ffc;return this[_0x5337c4(0x1b5)]();},Window_Playtime['prototype'][_0x5a4ffc(0x24d)]=function(){const _0x33d31e=_0x5a4ffc;Window_Selectable['prototype'][_0x33d31e(0x24d)][_0x33d31e(0x21d)](this),this[_0x33d31e(0x1ad)]();},Window_Playtime[_0x5a4ffc(0x239)]['updateTimer']=function(){const _0x588897=_0x5a4ffc;if(this[_0x588897(0x24a)]-->0x0){if('ZioXz'===_0x588897(0x1be)){if(this[_0x588897(0x24a)]<=0x0)this[_0x588897(0x1de)]();}else this['_bitmapReady']=![],this[_0x588897(0x226)]?(this['bitmap']=_0x1f017f[_0x588897(0x1a7)](this[_0x588897(0x226)][_0x588897(0x295)]()),this[_0x588897(0x29a)][_0x588897(0x1fe)](this[_0x588897(0x18e)]['bind'](this))):this['bitmap']=new _0x53f766(0x1,0x1);}},Window_Playtime[_0x5a4ffc(0x239)]['refresh']=function(){const _0xee6813=_0x5a4ffc;this['_timer']=0x3c;const _0x8e75c4=this[_0xee6813(0x26b)](0x0),_0x507555=_0x8e75c4['x'],_0x1db0a3=_0x8e75c4['y'],_0x28464f=_0x8e75c4[_0xee6813(0x27e)];this[_0xee6813(0x1c6)][_0xee6813(0x176)](),this['drawTimeIcon'](_0x8e75c4),this['drawTimeLabel'](_0x8e75c4),this[_0xee6813(0x222)](_0x8e75c4);},Window_Playtime[_0x5a4ffc(0x239)][_0x5a4ffc(0x23c)]=function(){const _0x29e1b7=_0x5a4ffc;Window_Selectable[_0x29e1b7(0x239)][_0x29e1b7(0x23c)][_0x29e1b7(0x21d)](this),this['contents']['fontSize']=VisuMZ['MainMenuCore'][_0x29e1b7(0x1e8)][_0x29e1b7(0x16d)][_0x29e1b7(0x233)];},Window_Playtime['prototype']['drawTimeIcon']=function(_0x85b1ec){const _0x2b2742=_0x5a4ffc;if(VisuMZ[_0x2b2742(0x188)]['Settings']['Playtime'][_0x2b2742(0x138)]>0x0){const _0x4d1532=VisuMZ[_0x2b2742(0x188)][_0x2b2742(0x1e8)][_0x2b2742(0x16d)]['Icon'],_0x3e0222=_0x85b1ec['y']+(this[_0x2b2742(0x1b5)]()-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x4d1532,_0x85b1ec['x'],_0x3e0222);const _0x3e50f4=ImageManager[_0x2b2742(0x1bb)]+0x4;_0x85b1ec['x']+=_0x3e50f4,_0x85b1ec['width']-=_0x3e50f4;}},Window_Playtime['prototype']['drawTimeLabel']=function(_0x1d64d5){const _0x2be36c=_0x5a4ffc;this[_0x2be36c(0x23c)](),this[_0x2be36c(0x217)](ColorManager[_0x2be36c(0x147)]());const _0x17988e=VisuMZ['MainMenuCore'][_0x2be36c(0x1e8)][_0x2be36c(0x16d)][_0x2be36c(0x1ed)];this[_0x2be36c(0x16b)](_0x17988e,_0x1d64d5['x'],_0x1d64d5['y'],_0x1d64d5[_0x2be36c(0x27e)],_0x2be36c(0x140)),this[_0x2be36c(0x241)]();},Window_Playtime['prototype'][_0x5a4ffc(0x222)]=function(_0x4d256e){const _0x4026a0=_0x5a4ffc,_0xee6836=$gameSystem[_0x4026a0(0x189)]();this['drawText'](_0xee6836,_0x4d256e['x'],_0x4d256e['y'],_0x4d256e['width'],_0x4026a0(0x1aa));};function Window_MenuVariables(){const _0x5ea3e0=_0x5a4ffc;this[_0x5ea3e0(0x19c)](...arguments);}Window_MenuVariables[_0x5a4ffc(0x239)]=Object['create'](Window_Selectable[_0x5a4ffc(0x239)]),Window_MenuVariables[_0x5a4ffc(0x239)]['constructor']=Window_MenuVariables,Window_MenuVariables[_0x5a4ffc(0x239)][_0x5a4ffc(0x19c)]=function(_0x1322f3){const _0x4f28c2=_0x5a4ffc;Window_Selectable[_0x4f28c2(0x239)][_0x4f28c2(0x19c)][_0x4f28c2(0x21d)](this,_0x1322f3),this[_0x4f28c2(0x28b)]=VisuMZ[_0x4f28c2(0x188)][_0x4f28c2(0x1e8)][_0x4f28c2(0x182)][_0x4f28c2(0x26c)],this['refresh']();},Window_MenuVariables[_0x5a4ffc(0x239)][_0x5a4ffc(0x12b)]=function(){const _0x5cc236=_0x5a4ffc;return this[_0x5cc236(0x1b5)]();},Window_MenuVariables[_0x5a4ffc(0x239)]['maxCols']=function(){const _0x52327f=_0x5a4ffc,_0x5e444d=SceneManager[_0x52327f(0x16a)]['commandWindowStyle']();return _0x5e444d==='default'?0x1:VisuMZ[_0x52327f(0x188)][_0x52327f(0x1e8)]['Variable'][_0x52327f(0x26c)][_0x52327f(0x2a0)];},Window_MenuVariables[_0x5a4ffc(0x239)][_0x5a4ffc(0x23c)]=function(){const _0x2c9127=_0x5a4ffc;Window_Selectable[_0x2c9127(0x239)][_0x2c9127(0x23c)][_0x2c9127(0x21d)](this),this['contents']['fontSize']=VisuMZ[_0x2c9127(0x188)][_0x2c9127(0x1e8)]['Variable']['FontSize'],this[_0x2c9127(0x217)](ColorManager['systemColor']());},Window_MenuVariables[_0x5a4ffc(0x239)][_0x5a4ffc(0x1b0)]=function(){const _0x13a1dc=_0x5a4ffc;return this[_0x13a1dc(0x28b)][_0x13a1dc(0x2a0)];},Window_MenuVariables[_0x5a4ffc(0x239)][_0x5a4ffc(0x112)]=function(){const _0x380549=_0x5a4ffc,_0x57afe1=this[_0x380549(0x204)]();for(let _0x24ad1a=0x0;_0x24ad1a<this[_0x380549(0x191)]();_0x24ad1a++){const _0x23f36e=_0x57afe1+_0x24ad1a;_0x23f36e<this[_0x380549(0x1b0)]()&&(_0x380549(0x195)!=='widxz'?_0x5cb7d4[_0x380549(0x188)][_0x380549(0x275)][_0x380549(0x21d)](this):(this[_0x380549(0x1e5)](_0x23f36e),this[_0x380549(0x29c)](_0x23f36e)));}},Window_MenuVariables[_0x5a4ffc(0x239)]['drawItemBackground']=function(_0x5d6ce4){},Window_MenuVariables[_0x5a4ffc(0x239)][_0x5a4ffc(0x29c)]=function(_0x494129){const _0x2718a0=_0x5a4ffc,_0x98ee7=this[_0x2718a0(0x28b)][_0x494129];if(_0x98ee7<=0x0)return;if(!$dataSystem[_0x2718a0(0x290)][_0x98ee7])return;const _0x193606=this['itemLineRect'](_0x494129);this[_0x2718a0(0x23c)]();let _0x54955d=0x0,_0x483641=$dataSystem['variables'][_0x98ee7]['trim']();if(_0x483641[_0x2718a0(0x18c)](/\\I\[(\d+)\]/i)){if(_0x2718a0(0x237)===_0x2718a0(0x237))_0x54955d=Number(RegExp['$1']),_0x483641=_0x483641['replace'](/\\I\[(\d+)\]/i,'')[_0x2718a0(0x1b1)]();else{const _0x1d6e80=this['itemLineRect'](_0x27801f),_0x5ee1dd=this[_0x2718a0(0x218)](_0x4296f4)[_0x2718a0(0x27e)];return _0x5ee1dd<=_0x1d6e80[_0x2718a0(0x27e)]?_0x2718a0(0x196):_0x2718a0(0x17f);}}if(_0x54955d>0x0){const _0x5a2013=_0x193606['y']+(this['lineHeight']()-ImageManager[_0x2718a0(0x1e1)])/0x2;this['drawIcon'](_0x54955d,_0x193606['x'],_0x5a2013);const _0x4537e1=ImageManager[_0x2718a0(0x1bb)]+0x4;_0x193606['x']+=_0x4537e1,_0x193606['width']-=_0x4537e1;}this['drawText'](_0x483641,_0x193606['x'],_0x193606['y'],_0x193606['width'],_0x2718a0(0x140)),this['changeTextColor'](ColorManager['normalColor']()),this[_0x2718a0(0x16b)]($gameVariables[_0x2718a0(0x1d8)](_0x98ee7),_0x193606['x'],_0x193606['y'],_0x193606[_0x2718a0(0x27e)],_0x2718a0(0x1aa));};