//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.30;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.30] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces. It does not support any Asian languages that do not utilize spaces,
 * such as Chinese, Japanese, Korean, etc.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
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
 * @param MessageCore
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
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x5bc23b=_0x1d15;(function(_0x2ce4cc,_0x1cf0f2){const _0x6f8db9=_0x1d15,_0x3f8420=_0x2ce4cc();while(!![]){try{const _0x4e3761=-parseInt(_0x6f8db9(0x281))/0x1+parseInt(_0x6f8db9(0x39e))/0x2*(parseInt(_0x6f8db9(0x357))/0x3)+-parseInt(_0x6f8db9(0x371))/0x4+parseInt(_0x6f8db9(0x26c))/0x5*(-parseInt(_0x6f8db9(0x258))/0x6)+-parseInt(_0x6f8db9(0x153))/0x7*(-parseInt(_0x6f8db9(0x1c9))/0x8)+parseInt(_0x6f8db9(0x312))/0x9*(-parseInt(_0x6f8db9(0x1d3))/0xa)+parseInt(_0x6f8db9(0x2b6))/0xb;if(_0x4e3761===_0x1cf0f2)break;else _0x3f8420['push'](_0x3f8420['shift']());}catch(_0x15d7e1){_0x3f8420['push'](_0x3f8420['shift']());}}}(_0x186b,0x43730));var label=_0x5bc23b(0x14c),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x427168){const _0x105c91=_0x5bc23b;return _0x427168[_0x105c91(0x295)]&&_0x427168[_0x105c91(0x1bb)][_0x105c91(0x26f)]('['+label+']');})[0x0];function _0x1d15(_0x5e430b,_0x171d10){const _0x186bf7=_0x186b();return _0x1d15=function(_0x1d15a6,_0x2a6370){_0x1d15a6=_0x1d15a6-0x125;let _0xe8eecb=_0x186bf7[_0x1d15a6];return _0xe8eecb;},_0x1d15(_0x5e430b,_0x171d10);}VisuMZ[label][_0x5bc23b(0x27a)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x450711,_0x219d69){const _0x1917ad=_0x5bc23b;for(const _0x39d7b3 in _0x219d69){if(_0x1917ad(0x2c4)!==_0x1917ad(0x14a)){if(_0x39d7b3[_0x1917ad(0x16e)](/(.*):(.*)/i)){if(_0x1917ad(0x2a1)!==_0x1917ad(0x2a1)){if(!_0x41a6c3)return;this['_macroBypassWordWrap']=![],_0x27dcdb[_0x1917ad(0x16a)]=this[_0x1917ad(0x152)](_0x35a6d8[_0x1917ad(0x16a)]),this[_0x1917ad(0x230)]&&(_0xeea885[_0x1917ad(0x16a)]=this[_0x1917ad(0x128)](_0x4c0bba[_0x1917ad(0x16a)]),this[_0x1917ad(0x206)]=!![]);}else{const _0x8ec013=String(RegExp['$1']),_0x2f7886=String(RegExp['$2'])[_0x1917ad(0x28b)]()[_0x1917ad(0x2e6)]();let _0xe56bcf,_0x3cee57,_0x433523;switch(_0x2f7886){case'NUM':_0xe56bcf=_0x219d69[_0x39d7b3]!==''?Number(_0x219d69[_0x39d7b3]):0x0;break;case'ARRAYNUM':_0x3cee57=_0x219d69[_0x39d7b3]!==''?JSON['parse'](_0x219d69[_0x39d7b3]):[],_0xe56bcf=_0x3cee57[_0x1917ad(0x3c1)](_0x4973ab=>Number(_0x4973ab));break;case'EVAL':_0xe56bcf=_0x219d69[_0x39d7b3]!==''?eval(_0x219d69[_0x39d7b3]):null;break;case _0x1917ad(0x2bc):_0x3cee57=_0x219d69[_0x39d7b3]!==''?JSON[_0x1917ad(0x1e5)](_0x219d69[_0x39d7b3]):[],_0xe56bcf=_0x3cee57['map'](_0x3b2afd=>eval(_0x3b2afd));break;case _0x1917ad(0x1cf):_0xe56bcf=_0x219d69[_0x39d7b3]!==''?JSON[_0x1917ad(0x1e5)](_0x219d69[_0x39d7b3]):'';break;case _0x1917ad(0x2f6):_0x3cee57=_0x219d69[_0x39d7b3]!==''?JSON[_0x1917ad(0x1e5)](_0x219d69[_0x39d7b3]):[],_0xe56bcf=_0x3cee57[_0x1917ad(0x3c1)](_0xa05bd3=>JSON['parse'](_0xa05bd3));break;case _0x1917ad(0x2dd):_0xe56bcf=_0x219d69[_0x39d7b3]!==''?new Function(JSON[_0x1917ad(0x1e5)](_0x219d69[_0x39d7b3])):new Function(_0x1917ad(0x21b));break;case _0x1917ad(0x16f):_0x3cee57=_0x219d69[_0x39d7b3]!==''?JSON[_0x1917ad(0x1e5)](_0x219d69[_0x39d7b3]):[],_0xe56bcf=_0x3cee57[_0x1917ad(0x3c1)](_0x38bcbf=>new Function(JSON[_0x1917ad(0x1e5)](_0x38bcbf)));break;case _0x1917ad(0x2e9):_0xe56bcf=_0x219d69[_0x39d7b3]!==''?String(_0x219d69[_0x39d7b3]):'';break;case _0x1917ad(0x29f):_0x3cee57=_0x219d69[_0x39d7b3]!==''?JSON[_0x1917ad(0x1e5)](_0x219d69[_0x39d7b3]):[],_0xe56bcf=_0x3cee57[_0x1917ad(0x3c1)](_0x31fa6e=>String(_0x31fa6e));break;case _0x1917ad(0x144):_0x433523=_0x219d69[_0x39d7b3]!==''?JSON[_0x1917ad(0x1e5)](_0x219d69[_0x39d7b3]):{},_0x450711[_0x8ec013]={},VisuMZ[_0x1917ad(0x18f)](_0x450711[_0x8ec013],_0x433523);continue;case'ARRAYSTRUCT':_0x3cee57=_0x219d69[_0x39d7b3]!==''?JSON['parse'](_0x219d69[_0x39d7b3]):[],_0xe56bcf=_0x3cee57['map'](_0x24177d=>VisuMZ[_0x1917ad(0x18f)]({},JSON[_0x1917ad(0x1e5)](_0x24177d)));break;default:continue;}_0x450711[_0x8ec013]=_0xe56bcf;}}}else{this[_0x1917ad(0x132)]=_0x59da07,this[_0x1917ad(0x3c0)]=_0x35a9dc,this['_moveTargetWidth']=_0x1f22d2||this[_0x1917ad(0x1f4)],this[_0x1917ad(0x15e)]=_0x10fbc4||this['height'],this[_0x1917ad(0x1b2)]=_0x228330||0x1;if(this['_moveDuration']<=0x0)this[_0x1917ad(0x1b2)]=0x1;this[_0x1917ad(0x19f)]=this[_0x1917ad(0x1b2)],this[_0x1917ad(0x332)]=_0x6194ea||0x0;if(_0x1af1bc<=0x0)this['updateMove']();}}return _0x450711;},(_0x2f9288=>{const _0x2a4ebc=_0x5bc23b,_0x5cce07=_0x2f9288['name'];for(const _0x4fa683 of dependencies){if(!Imported[_0x4fa683]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x2a4ebc(0x154)](_0x5cce07,_0x4fa683)),SceneManager['exit']();break;}}const _0x5dfb8d=_0x2f9288['description'];if(_0x5dfb8d[_0x2a4ebc(0x16e)](/\[Version[ ](.*?)\]/i)){if('xzRZX'!==_0x2a4ebc(0x207)){const _0x50081e=Number(RegExp['$1']);_0x50081e!==VisuMZ[label][_0x2a4ebc(0x1a4)]&&(alert(_0x2a4ebc(0x2d7)[_0x2a4ebc(0x154)](_0x5cce07,_0x50081e)),SceneManager[_0x2a4ebc(0x1f9)]());}else this['_interpreter']=new _0x208ddf(),this[_0x2a4ebc(0x398)][_0x2a4ebc(0x2fa)](this[_0x2a4ebc(0x27f)](),this[_0x2a4ebc(0x2bf)]);}if(_0x5dfb8d[_0x2a4ebc(0x16e)](/\[Tier[ ](\d+)\]/i)){const _0x3435fe=Number(RegExp['$1']);_0x3435fe<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x2a4ebc(0x154)](_0x5cce07,_0x3435fe,tier)),SceneManager[_0x2a4ebc(0x1f9)]()):'McRWV'!==_0x2a4ebc(0x24e)?tier=Math[_0x2a4ebc(0x1e8)](_0x3435fe,tier):(this['_textColorStack']=this[_0x2a4ebc(0x343)]||[],this[_0x2a4ebc(0x3c2)]['textColor']=this['_textColorStack']['shift']()||_0x3058bf[_0x2a4ebc(0x158)]());}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x2f9288[_0x2a4ebc(0x33d)]);})(pluginData),PluginManager[_0x5bc23b(0x3ab)](pluginData[_0x5bc23b(0x27c)],'ChoiceWindowProperties',_0x3022a4=>{const _0x1f5bfe=_0x5bc23b;VisuMZ[_0x1f5bfe(0x18f)](_0x3022a4,_0x3022a4);const _0x19556f=_0x3022a4[_0x1f5bfe(0x247)]||$gameSystem[_0x1f5bfe(0x259)]()||0x1,_0x274b06=_0x3022a4[_0x1f5bfe(0x3bd)]||$gameSystem['getChoiceListMaxRows']()||0x1,_0x47d7aa=_0x3022a4[_0x1f5bfe(0x288)]||$gameSystem[_0x1f5bfe(0x364)]()||0x1,_0x40b66d=_0x3022a4['TextAlign'][_0x1f5bfe(0x28c)]()||_0x1f5bfe(0x38f);$gameSystem[_0x1f5bfe(0x2f9)](_0x19556f),$gameSystem[_0x1f5bfe(0x1da)](_0x274b06),$gameSystem[_0x1f5bfe(0x278)](_0x47d7aa),$gameSystem[_0x1f5bfe(0x3ac)](_0x40b66d);}),PluginManager[_0x5bc23b(0x3ab)](pluginData[_0x5bc23b(0x27c)],_0x5bc23b(0x286),_0x1359fa=>{const _0x2dda64=_0x5bc23b;VisuMZ[_0x2dda64(0x18f)](_0x1359fa,_0x1359fa);const _0x359e89=_0x1359fa[_0x2dda64(0x308)]||$gameSystem[_0x2dda64(0x330)]()||0x1,_0x529f50=_0x1359fa[_0x2dda64(0x34a)]||$gameSystem[_0x2dda64(0x1de)]()||0x1;$gameTemp['_centerMessageWindow']=!![];const _0x2d4258=_0x1359fa[_0x2dda64(0x2c2)][_0x2dda64(0x28c)]();$gameSystem[_0x2dda64(0x2db)](_0x359e89),$gameSystem['setMessageWindowWidth'](_0x529f50);[_0x2dda64(0x269),_0x2dda64(0x162)]['includes'](_0x2d4258)&&$gameSystem[_0x2dda64(0x204)](eval(_0x2d4258));const _0x493768=SceneManager[_0x2dda64(0x3b7)][_0x2dda64(0x188)];if(_0x493768){if(_0x2dda64(0x379)!==_0x2dda64(0x1ad))_0x493768[_0x2dda64(0x2f2)](),_0x493768['updateDimensions'](),_0x493768[_0x2dda64(0x129)]();else{if(this['isColorLocked']())return;_0x130510=_0x1f7ac6['replace'](/\,/g,''),this[_0x2dda64(0x343)]=this[_0x2dda64(0x343)]||[],this['_textColorStack'][_0x2dda64(0x1c6)](this[_0x2dda64(0x3c2)][_0x2dda64(0x1e7)]),_0x51615d[_0x2dda64(0x14c)]['Window_Base_changeTextColor'][_0x2dda64(0x191)](this,_0x7947d5);}}}),PluginManager['registerCommand'](pluginData[_0x5bc23b(0x27c)],_0x5bc23b(0x32e),_0x19bc93=>{const _0x2ee7f4=_0x5bc23b;VisuMZ[_0x2ee7f4(0x18f)](_0x19bc93,_0x19bc93),$gameSystem[_0x2ee7f4(0x3b2)](_0x19bc93[_0x2ee7f4(0x2ff)],_0x19bc93[_0x2ee7f4(0x2a3)]);const _0x3f4f16=SceneManager['_scene'][_0x2ee7f4(0x188)];_0x3f4f16&&('xplDz'!==_0x2ee7f4(0x17f)?(_0x3f4f16['resetWordWrap'](),_0x3f4f16[_0x2ee7f4(0x21d)](),_0x3f4f16['createContents']()):this[_0x2ee7f4(0x369)]=_0x3017c4);}),VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x22c)]=Scene_Boot[_0x5bc23b(0x25d)][_0x5bc23b(0x164)],Scene_Boot[_0x5bc23b(0x25d)][_0x5bc23b(0x164)]=function(){const _0x3a17ea=_0x5bc23b;VisuMZ[_0x3a17ea(0x14c)]['Scene_Boot_onDatabaseLoaded'][_0x3a17ea(0x191)](this),this['process_VisuMZ_MessageCore_TextCodes_Action'](),this[_0x3a17ea(0x384)](),this[_0x3a17ea(0x174)](),this[_0x3a17ea(0x283)]();},VisuMZ['MessageCore'][_0x5bc23b(0x228)]=function(_0x4075e6){const _0x65619e=_0x5bc23b,_0x4fedac=VisuMZ[_0x65619e(0x14c)][_0x65619e(0x27a)][_0x4075e6];_0x4fedac[_0x65619e(0x2e4)]((_0x9e43fa,_0x17d564)=>{const _0x1ea848=_0x65619e;if(!_0x9e43fa||!_0x17d564)return-0x1;return _0x17d564[_0x1ea848(0x217)][_0x1ea848(0x1d7)]-_0x9e43fa[_0x1ea848(0x217)][_0x1ea848(0x1d7)];});},Scene_Boot[_0x5bc23b(0x25d)][_0x5bc23b(0x320)]=function(){const _0x1a0095=_0x5bc23b;VisuMZ[_0x1a0095(0x14c)][_0x1a0095(0x228)](_0x1a0095(0x18d));for(const _0x5ba432 of VisuMZ[_0x1a0095(0x14c)][_0x1a0095(0x27a)][_0x1a0095(0x18d)]){if(_0x1a0095(0x30a)===_0x1a0095(0x30a)){_0x5ba432['Match']=_0x5ba432[_0x1a0095(0x217)][_0x1a0095(0x28b)](),_0x5ba432[_0x1a0095(0x199)]=new RegExp('\x1b'+_0x5ba432[_0x1a0095(0x217)],'gi'),_0x5ba432[_0x1a0095(0x397)]='\x1b'+_0x5ba432[_0x1a0095(0x217)];if(_0x5ba432[_0x1a0095(0x135)]==='')_0x5ba432[_0x1a0095(0x397)]+='[0]';}else this[_0x1a0095(0x3ba)]();}},Scene_Boot[_0x5bc23b(0x25d)][_0x5bc23b(0x384)]=function(){const _0x3f4aa1=_0x5bc23b;VisuMZ[_0x3f4aa1(0x14c)][_0x3f4aa1(0x228)]('TextCodeReplace');for(const _0x3b6190 of VisuMZ[_0x3f4aa1(0x14c)][_0x3f4aa1(0x27a)]['TextCodeReplace']){_0x3b6190['textCodeCheck']=new RegExp('\x1b'+_0x3b6190['Match']+_0x3b6190[_0x3f4aa1(0x135)],'gi'),_0x3b6190[_0x3f4aa1(0x1c3)]!==''&&_0x3b6190[_0x3f4aa1(0x1c3)]!==_0x3f4aa1(0x24b)?_0x3b6190[_0x3f4aa1(0x397)]=new Function(_0x3f4aa1(0x2e1)+_0x3b6190[_0x3f4aa1(0x1c3)]['replace'](/\\/g,'\x1b')+'\x27'):_0x3b6190[_0x3f4aa1(0x397)]=_0x3b6190[_0x3f4aa1(0x1cd)];}},Scene_Boot[_0x5bc23b(0x25d)][_0x5bc23b(0x174)]=function(){const _0x53ac65=_0x5bc23b;for(const _0x357683 of VisuMZ['MessageCore']['Settings']['TextMacros']){_0x357683[_0x53ac65(0x199)]=new RegExp('\x5c['+_0x357683['Match']+'\x5c]','gi'),_0x357683[_0x53ac65(0x1c3)]!==''&&_0x357683[_0x53ac65(0x1c3)]!==_0x53ac65(0x24b)?_0x357683[_0x53ac65(0x397)]=new Function('return\x20\x27'+_0x357683[_0x53ac65(0x1c3)][_0x53ac65(0x26b)](/\\/g,'\x1b')+'\x27'):_0x357683[_0x53ac65(0x397)]=_0x357683[_0x53ac65(0x1cd)];}},Scene_Boot['prototype'][_0x5bc23b(0x283)]=function(){const _0x61f2d=_0x5bc23b,_0x1edf37=VisuMZ[_0x61f2d(0x14c)][_0x61f2d(0x27a)][_0x61f2d(0x1fc)];!VisuMZ[_0x61f2d(0x1a8)]&&(_0x61f2d(0x2d8)===_0x61f2d(0x2d8)?(VisuMZ['MessageCore'][_0x61f2d(0x3a1)]($dataClasses,_0x1edf37[_0x61f2d(0x13b)]),VisuMZ[_0x61f2d(0x14c)]['AddAutoColor']($dataSkills,_0x1edf37[_0x61f2d(0x227)]),VisuMZ[_0x61f2d(0x14c)]['AddAutoColor']($dataItems,_0x1edf37['Items']),VisuMZ[_0x61f2d(0x14c)]['AddAutoColor']($dataWeapons,_0x1edf37[_0x61f2d(0x3af)]),VisuMZ['MessageCore'][_0x61f2d(0x3a1)]($dataArmors,_0x1edf37['Armors']),VisuMZ[_0x61f2d(0x14c)][_0x61f2d(0x3a1)]($dataEnemies,_0x1edf37[_0x61f2d(0x15c)]),VisuMZ['MessageCore'][_0x61f2d(0x3a1)]($dataStates,_0x1edf37[_0x61f2d(0x383)])):this[_0x61f2d(0x369)]=_0x6ff32a[_0x61f2d(0x35c)]()['follower'](_0x1ace0c-0x2)),VisuMZ[_0x61f2d(0x14c)][_0x61f2d(0x1e4)]();},VisuMZ['MessageCore']['AutoColorBypassList']=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x5bc23b(0x14e),'</B>','<I>',_0x5bc23b(0x250),_0x5bc23b(0x34f),'</LEFT>','<CENTER>',_0x5bc23b(0x12c),'<RIGHT>',_0x5bc23b(0x355),'<COLORLOCK>',_0x5bc23b(0x155),_0x5bc23b(0x35a),_0x5bc23b(0x37f),_0x5bc23b(0x22b),_0x5bc23b(0x3a0),'<BR>','<LINE\x20BREAK>','PICTURE',_0x5bc23b(0x1b9),_0x5bc23b(0x148),_0x5bc23b(0x170),_0x5bc23b(0x2e5),'HIDE',_0x5bc23b(0x145),'DISABLE',_0x5bc23b(0x1b3),_0x5bc23b(0x184),_0x5bc23b(0x229),'ANY'],VisuMZ['MessageCore']['AddAutoColor']=function(_0x1b3890,_0x1e1725){const _0x476d1d=_0x5bc23b;if(_0x1e1725<=0x0)return;const _0x1b6c42=_0x1b3890;for(const _0x59ec7 of _0x1b6c42){if(!_0x59ec7)continue;VisuMZ[_0x476d1d(0x14c)][_0x476d1d(0x363)](_0x59ec7,_0x1e1725);}},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x1e4)]=function(){const _0x2f4ed3=_0x5bc23b;VisuMZ[_0x2f4ed3(0x14c)][_0x2f4ed3(0x1ee)]=[];for(let _0x5c6830=0x1;_0x5c6830<=0x1f;_0x5c6830++){if(_0x2f4ed3(0x241)===_0x2f4ed3(0x16d)){let _0x4817cf=_0x414a75[_0x2f4ed3(0x1f4)]+_0x2eb78a[_0x2f4ed3(0x12e)]()*0x2+0x6;const _0x51a4a9=_0x5ab8ee[_0x2f4ed3(0x327)]()!=='',_0x1b7093=_0x56f50d[_0x2f4ed3(0x32b)],_0x36c454=0x14;_0x4817cf+=_0x51a4a9?_0x1b7093+_0x36c454:0x4;if(_0x4817cf%0x2!==0x0)_0x4817cf+=0x1;_0x4e7972[_0x2f4ed3(0x1c8)](_0x4817cf);}else{const _0x14673f=_0x2f4ed3(0x2bd)[_0x2f4ed3(0x154)](_0x5c6830),_0x4cb918=VisuMZ[_0x2f4ed3(0x14c)][_0x2f4ed3(0x27a)][_0x2f4ed3(0x1fc)][_0x14673f];_0x4cb918[_0x2f4ed3(0x2e4)]((_0x2736e6,_0x58c78b)=>{const _0x337bc3=_0x2f4ed3;if(!_0x2736e6||!_0x58c78b)return-0x1;return _0x58c78b[_0x337bc3(0x1d7)]-_0x2736e6[_0x337bc3(0x1d7)];}),this[_0x2f4ed3(0x166)](_0x4cb918,_0x5c6830);}}},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x166)]=function(_0x14ee4a,_0x3e1f7d){const _0x3a6263=_0x5bc23b;for(const _0x5d668b of _0x14ee4a){if(_0x3a6263(0x272)==='RdqkC'){if(!_0x183a26[_0x3a6263(0x325)](_0x3abfa9))return!![];}else{if(_0x5d668b['length']<=0x0)continue;if(/^\d+$/[_0x3a6263(0x373)](_0x5d668b))continue;let _0x1343e3=VisuMZ[_0x3a6263(0x14c)][_0x3a6263(0x366)](_0x5d668b);if(_0x5d668b[_0x3a6263(0x16e)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g)){if(_0x3a6263(0x34d)!==_0x3a6263(0x183))var _0x5a4273=new RegExp(_0x1343e3,'i');else this[_0x3a6263(0x396)]()['parameters'][0x0]=_0xfa4432,_0x11c802++;}else var _0x5a4273=new RegExp('\x5cb'+_0x1343e3+'\x5cb','g');VisuMZ[_0x3a6263(0x14c)][_0x3a6263(0x1ee)]['push']([_0x5a4273,_0x3a6263(0x3be)['format'](_0x3e1f7d,_0x5d668b)]);}}},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x366)]=function(_0x545df4){const _0x28f12a=_0x5bc23b;return _0x545df4=_0x545df4[_0x28f12a(0x26b)](/(\W)/gi,(_0x28b18a,_0x3e964d)=>_0x28f12a(0x388)['format'](_0x3e964d)),_0x545df4;},VisuMZ[_0x5bc23b(0x14c)]['ParseClassNotetags']=VisuMZ['ParseClassNotetags'],VisuMZ[_0x5bc23b(0x30f)]=function(_0x53e37d){const _0x1deeea=_0x5bc23b;VisuMZ[_0x1deeea(0x14c)][_0x1deeea(0x30f)][_0x1deeea(0x191)](this,_0x53e37d);const _0x1cbd26=VisuMZ[_0x1deeea(0x14c)][_0x1deeea(0x27a)][_0x1deeea(0x1fc)];VisuMZ[_0x1deeea(0x14c)][_0x1deeea(0x363)](_0x53e37d,_0x1cbd26[_0x1deeea(0x13b)]);},VisuMZ[_0x5bc23b(0x14c)]['ParseSkillNotetags']=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x5bc23b(0x326)]=function(_0x5b7852){const _0x38dbde=_0x5bc23b;VisuMZ[_0x38dbde(0x14c)][_0x38dbde(0x326)][_0x38dbde(0x191)](this,_0x5b7852);const _0x5e6283=VisuMZ['MessageCore']['Settings'][_0x38dbde(0x1fc)];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x5b7852,_0x5e6283[_0x38dbde(0x227)]);},0x7,VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x31b)]=VisuMZ[_0x5bc23b(0x31b)],VisuMZ[_0x5bc23b(0x31b)]=function(_0x1f4502){const _0x19b5aa=_0x5bc23b;VisuMZ[_0x19b5aa(0x14c)]['ParseItemNotetags'][_0x19b5aa(0x191)](this,_0x1f4502);const _0x13a76d=VisuMZ[_0x19b5aa(0x14c)][_0x19b5aa(0x27a)]['AutoColor'];VisuMZ[_0x19b5aa(0x14c)]['CreateAutoColorFor'](_0x1f4502,_0x13a76d[_0x19b5aa(0x2fb)]);},VisuMZ['MessageCore'][_0x5bc23b(0x2cd)]=VisuMZ['ParseWeaponNotetags'],VisuMZ['ParseWeaponNotetags']=function(_0x46bb60){const _0x31b916=_0x5bc23b;VisuMZ['MessageCore']['ParseWeaponNotetags'][_0x31b916(0x191)](this,_0x46bb60);const _0x4dcd72=VisuMZ[_0x31b916(0x14c)]['Settings'][_0x31b916(0x1fc)];VisuMZ['MessageCore'][_0x31b916(0x363)](_0x46bb60,_0x4dcd72[_0x31b916(0x3af)]);},VisuMZ['MessageCore'][_0x5bc23b(0x171)]=VisuMZ[_0x5bc23b(0x171)],VisuMZ[_0x5bc23b(0x171)]=function(_0x481325){const _0xf1bbc1=_0x5bc23b;VisuMZ[_0xf1bbc1(0x14c)][_0xf1bbc1(0x171)][_0xf1bbc1(0x191)](this,_0x481325);const _0xe97837=VisuMZ[_0xf1bbc1(0x14c)][_0xf1bbc1(0x27a)]['AutoColor'];VisuMZ[_0xf1bbc1(0x14c)][_0xf1bbc1(0x363)](_0x481325,_0xe97837[_0xf1bbc1(0x2ca)]);},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x385)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x5bc23b(0x385)]=function(_0x7b90b3){const _0x21b156=_0x5bc23b;VisuMZ[_0x21b156(0x14c)][_0x21b156(0x385)][_0x21b156(0x191)](this,_0x7b90b3);const _0x36dc6b=VisuMZ[_0x21b156(0x14c)]['Settings'][_0x21b156(0x1fc)];VisuMZ[_0x21b156(0x14c)]['CreateAutoColorFor'](_0x7b90b3,_0x36dc6b[_0x21b156(0x15c)]);},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x2df)]=VisuMZ[_0x5bc23b(0x2df)],VisuMZ[_0x5bc23b(0x2df)]=function(_0x2c62ab){const _0x4bd474=_0x5bc23b;VisuMZ[_0x4bd474(0x14c)][_0x4bd474(0x2df)][_0x4bd474(0x191)](this,_0x2c62ab);const _0x8125a9=VisuMZ['MessageCore']['Settings'][_0x4bd474(0x1fc)];VisuMZ['MessageCore'][_0x4bd474(0x363)](_0x2c62ab,_0x8125a9[_0x4bd474(0x383)]);},VisuMZ[_0x5bc23b(0x14c)]['CreateAutoColorFor']=function(_0x3cbd9a,_0x9f2119){const _0x34e822=_0x5bc23b;if(_0x9f2119<=0x0)return;const _0x52b965=VisuMZ[_0x34e822(0x14c)][_0x34e822(0x27a)][_0x34e822(0x1fc)][_0x34e822(0x3bb)+_0x9f2119];let _0x1ebede=_0x3cbd9a[_0x34e822(0x27c)][_0x34e822(0x2e6)]();if(/^\d+$/[_0x34e822(0x373)](_0x1ebede))return;if(VisuMZ[_0x34e822(0x14c)]['AutoColorBypassList'][_0x34e822(0x26f)](_0x1ebede[_0x34e822(0x28b)]()))return;_0x1ebede=_0x1ebede[_0x34e822(0x26b)](/\\I\[(\d+)\]/gi,''),_0x1ebede=_0x1ebede[_0x34e822(0x26b)](/\x1bI\[(\d+)\]/gi,'');if(_0x1ebede[_0x34e822(0x1d7)]<=0x0)return;if(_0x1ebede['match'](/-----/i))return;_0x52b965['push'](_0x1ebede);},SceneManager[_0x5bc23b(0x246)]=function(){const _0x2a434d=_0x5bc23b;return this[_0x2a434d(0x3b7)]&&this[_0x2a434d(0x3b7)][_0x2a434d(0x3b0)]===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x4bc2d9=_0x5bc23b;return this['_scene']&&this[_0x4bc2d9(0x3b7)][_0x4bc2d9(0x3b0)]===Scene_Map;},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x163)]=TextManager[_0x5bc23b(0x337)],TextManager[_0x5bc23b(0x337)]=function(_0x4b2716){const _0xf8c8e4=_0x5bc23b,_0x5b0266=[_0xf8c8e4(0x138),'emerge',_0xf8c8e4(0x3bf),'surprise',_0xf8c8e4(0x180),_0xf8c8e4(0x2d5),_0xf8c8e4(0x193),'obtainExp',_0xf8c8e4(0x1ce),_0xf8c8e4(0x1df)];let _0x4164d0=VisuMZ[_0xf8c8e4(0x14c)][_0xf8c8e4(0x163)][_0xf8c8e4(0x191)](this,_0x4b2716);return _0x5b0266[_0xf8c8e4(0x26f)](_0x4b2716)&&(_0x4164d0=_0xf8c8e4(0x3a0)+_0x4164d0),_0x4164d0;},ConfigManager['textSpeed']=VisuMZ['MessageCore']['Settings'][_0x5bc23b(0x331)][_0x5bc23b(0x298)],VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x226)]=ConfigManager[_0x5bc23b(0x319)],ConfigManager[_0x5bc23b(0x319)]=function(){const _0x5e3b5b=_0x5bc23b,_0x49a1ad=VisuMZ['MessageCore'][_0x5e3b5b(0x226)][_0x5e3b5b(0x191)](this);return _0x49a1ad[_0x5e3b5b(0x2c7)]=this[_0x5e3b5b(0x2c7)],_0x49a1ad;},VisuMZ['MessageCore'][_0x5bc23b(0x14f)]=ConfigManager['applyData'],ConfigManager['applyData']=function(_0x229082){const _0x18bee6=_0x5bc23b;VisuMZ[_0x18bee6(0x14c)][_0x18bee6(0x14f)]['call'](this,_0x229082),_0x18bee6(0x2c7)in _0x229082?this['textSpeed']=Number(_0x229082[_0x18bee6(0x2c7)])[_0x18bee6(0x305)](0x1,0xb):this[_0x18bee6(0x2c7)]=VisuMZ[_0x18bee6(0x14c)]['Settings']['TextSpeed']['Default'];},TextManager[_0x5bc23b(0x255)]=VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x27a)][_0x5bc23b(0x331)][_0x5bc23b(0x309)],TextManager[_0x5bc23b(0x192)]=VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x27a)][_0x5bc23b(0x331)][_0x5bc23b(0x3aa)],VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x2e8)]=Game_System[_0x5bc23b(0x25d)]['initialize'],Game_System[_0x5bc23b(0x25d)][_0x5bc23b(0x2ae)]=function(){const _0x54bd8d=_0x5bc23b;VisuMZ[_0x54bd8d(0x14c)][_0x54bd8d(0x2e8)][_0x54bd8d(0x191)](this),this[_0x54bd8d(0x377)]();},Game_System[_0x5bc23b(0x25d)][_0x5bc23b(0x377)]=function(){const _0x390fe8=_0x5bc23b,_0xefdbe1=VisuMZ[_0x390fe8(0x14c)][_0x390fe8(0x27a)]['General'],_0xc2fb26=VisuMZ[_0x390fe8(0x14c)][_0x390fe8(0x27a)][_0x390fe8(0x2c2)];this[_0x390fe8(0x1d5)]={'messageRows':_0xefdbe1[_0x390fe8(0x149)],'messageWidth':_0xefdbe1[_0x390fe8(0x31d)],'messageWordWrap':_0xc2fb26[_0x390fe8(0x1d2)],'helpWordWrap':_0xc2fb26[_0x390fe8(0x3c4)],'choiceLineHeight':_0xefdbe1[_0x390fe8(0x2d2)],'choiceRows':_0xefdbe1[_0x390fe8(0x280)],'choiceCols':_0xefdbe1['ChoiceWindowMaxCols'],'choiceTextAlign':_0xefdbe1[_0x390fe8(0x328)]},this[_0x390fe8(0x275)]===undefined&&(this[_0x390fe8(0x275)]=_0xefdbe1[_0x390fe8(0x1a1)],this['_messageOffsetY']=_0xefdbe1[_0x390fe8(0x2b1)]);},Game_System['prototype'][_0x5bc23b(0x330)]=function(){const _0x2d49e4=_0x5bc23b;if(this[_0x2d49e4(0x1d5)]===undefined)this[_0x2d49e4(0x377)]();if(this[_0x2d49e4(0x1d5)][_0x2d49e4(0x224)]===undefined)this[_0x2d49e4(0x377)]();return this[_0x2d49e4(0x1d5)][_0x2d49e4(0x224)];},Game_System[_0x5bc23b(0x25d)][_0x5bc23b(0x2db)]=function(_0x197c58){const _0x5af1f8=_0x5bc23b;if(this[_0x5af1f8(0x1d5)]===undefined)this[_0x5af1f8(0x377)]();if(this['_MessageCoreSettings'][_0x5af1f8(0x224)]===undefined)this[_0x5af1f8(0x377)]();this['_MessageCoreSettings'][_0x5af1f8(0x224)]=_0x197c58||0x1;},Game_System[_0x5bc23b(0x25d)][_0x5bc23b(0x1de)]=function(){const _0x28f535=_0x5bc23b;if(this[_0x28f535(0x1d5)]===undefined)this[_0x28f535(0x377)]();if(this[_0x28f535(0x1d5)]['messageWidth']===undefined)this[_0x28f535(0x377)]();return this[_0x28f535(0x1d5)][_0x28f535(0x237)];},Game_System[_0x5bc23b(0x25d)][_0x5bc23b(0x1c8)]=function(_0x618a7a){const _0x52e9cf=_0x5bc23b;if(this[_0x52e9cf(0x1d5)]===undefined)this['initMessageCore']();if(this[_0x52e9cf(0x1d5)][_0x52e9cf(0x237)]===undefined)this[_0x52e9cf(0x377)]();_0x618a7a=Math[_0x52e9cf(0x2ab)](_0x618a7a);if(_0x618a7a%0x2!==0x0)_0x618a7a+=0x1;this[_0x52e9cf(0x1d5)][_0x52e9cf(0x237)]=_0x618a7a||0x2;},Game_System[_0x5bc23b(0x25d)][_0x5bc23b(0x282)]=function(){const _0x510d20=_0x5bc23b;if(this[_0x510d20(0x1d5)]===undefined)this[_0x510d20(0x377)]();if(this['_MessageCoreSettings'][_0x510d20(0x17c)]===undefined)this[_0x510d20(0x377)]();return this[_0x510d20(0x1d5)][_0x510d20(0x17c)];},Game_System[_0x5bc23b(0x25d)][_0x5bc23b(0x204)]=function(_0x319476){const _0x3028dc=_0x5bc23b;if(this[_0x3028dc(0x1d5)]===undefined)this[_0x3028dc(0x377)]();if(this[_0x3028dc(0x1d5)][_0x3028dc(0x17c)]===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0x3028dc(0x17c)]=_0x319476;},Game_System[_0x5bc23b(0x25d)][_0x5bc23b(0x2ad)]=function(){const _0x4adbc4=_0x5bc23b;if(this[_0x4adbc4(0x275)]===undefined){const _0x2d54f3=VisuMZ[_0x4adbc4(0x14c)]['Settings']['General'];this['_messageOffsetX']=_0x2d54f3['MsgWindowOffsetX'],this[_0x4adbc4(0x151)]=_0x2d54f3[_0x4adbc4(0x2b1)];}return{'x':this[_0x4adbc4(0x275)]||0x0,'y':this[_0x4adbc4(0x151)]||0x0};},Game_System[_0x5bc23b(0x25d)][_0x5bc23b(0x3b2)]=function(_0xf13833,_0x47c66a){const _0xd29888=_0x5bc23b;if(this[_0xd29888(0x1d5)]===undefined)this['initMessageCore']();this['_messageOffsetX']=_0xf13833,this[_0xd29888(0x151)]=_0x47c66a;},Game_System[_0x5bc23b(0x25d)][_0x5bc23b(0x17b)]=function(){const _0x1a39e1=_0x5bc23b;if(this[_0x1a39e1(0x1d5)]===undefined)this[_0x1a39e1(0x377)]();if(this['_MessageCoreSettings'][_0x1a39e1(0x3a9)]===undefined)this[_0x1a39e1(0x377)]();return this[_0x1a39e1(0x1d5)][_0x1a39e1(0x3a9)];},Game_System[_0x5bc23b(0x25d)][_0x5bc23b(0x231)]=function(_0x91aa87){const _0x185601=_0x5bc23b;if(this[_0x185601(0x1d5)]===undefined)this[_0x185601(0x377)]();if(this[_0x185601(0x1d5)]['helpWordWrap']===undefined)this[_0x185601(0x377)]();this[_0x185601(0x1d5)][_0x185601(0x3a9)]=_0x91aa87;},Game_System[_0x5bc23b(0x25d)][_0x5bc23b(0x259)]=function(){const _0x3abf19=_0x5bc23b;if(this['_MessageCoreSettings']===undefined)this[_0x3abf19(0x377)]();if(this[_0x3abf19(0x1d5)][_0x3abf19(0x30d)]===undefined)this[_0x3abf19(0x377)]();return this['_MessageCoreSettings'][_0x3abf19(0x30d)];},Game_System[_0x5bc23b(0x25d)][_0x5bc23b(0x2f9)]=function(_0x5b756a){const _0x46af2b=_0x5bc23b;if(this['_MessageCoreSettings']===undefined)this[_0x46af2b(0x377)]();if(this[_0x46af2b(0x1d5)][_0x46af2b(0x30d)]===undefined)this[_0x46af2b(0x377)]();this[_0x46af2b(0x1d5)][_0x46af2b(0x30d)]=_0x5b756a||0x1;},Game_System['prototype'][_0x5bc23b(0x177)]=function(){const _0x3bc008=_0x5bc23b;if(this[_0x3bc008(0x1d5)]===undefined)this[_0x3bc008(0x377)]();if(this[_0x3bc008(0x1d5)][_0x3bc008(0x222)]===undefined)this[_0x3bc008(0x377)]();return this[_0x3bc008(0x1d5)][_0x3bc008(0x222)];},Game_System['prototype'][_0x5bc23b(0x1da)]=function(_0x24fb71){const _0x215f76=_0x5bc23b;if(this['_MessageCoreSettings']===undefined)this[_0x215f76(0x377)]();if(this[_0x215f76(0x1d5)][_0x215f76(0x222)]===undefined)this[_0x215f76(0x377)]();this[_0x215f76(0x1d5)]['choiceRows']=_0x24fb71||0x1;},Game_System[_0x5bc23b(0x25d)][_0x5bc23b(0x364)]=function(){const _0x32d81a=_0x5bc23b;if(this[_0x32d81a(0x1d5)]===undefined)this['initMessageCore']();if(this[_0x32d81a(0x1d5)][_0x32d81a(0x187)]===undefined)this[_0x32d81a(0x377)]();return this['_MessageCoreSettings'][_0x32d81a(0x187)];},Game_System['prototype'][_0x5bc23b(0x278)]=function(_0x2a9e48){const _0xaa7027=_0x5bc23b;if(this[_0xaa7027(0x1d5)]===undefined)this[_0xaa7027(0x377)]();if(this[_0xaa7027(0x1d5)]['choiceCols']===undefined)this[_0xaa7027(0x377)]();this[_0xaa7027(0x1d5)][_0xaa7027(0x187)]=_0x2a9e48||0x1;},Game_System[_0x5bc23b(0x25d)][_0x5bc23b(0x361)]=function(){const _0x378f2=_0x5bc23b;if(this[_0x378f2(0x1d5)]===undefined)this[_0x378f2(0x377)]();if(this['_MessageCoreSettings'][_0x378f2(0x3a2)]===undefined)this[_0x378f2(0x377)]();return this[_0x378f2(0x1d5)]['choiceTextAlign'];},Game_System[_0x5bc23b(0x25d)][_0x5bc23b(0x3ac)]=function(_0x2eb3a7){const _0x3b5027=_0x5bc23b;if(this[_0x3b5027(0x1d5)]===undefined)this['initMessageCore']();if(this[_0x3b5027(0x1d5)][_0x3b5027(0x3a2)]===undefined)this['initMessageCore']();this['_MessageCoreSettings']['choiceTextAlign']=_0x2eb3a7['toLowerCase']();},VisuMZ[_0x5bc23b(0x14c)]['Game_Party_initialize']=Game_Party[_0x5bc23b(0x25d)]['initialize'],Game_Party[_0x5bc23b(0x25d)][_0x5bc23b(0x2ae)]=function(){const _0x4a977b=_0x5bc23b;VisuMZ[_0x4a977b(0x14c)][_0x4a977b(0x318)][_0x4a977b(0x191)](this),this[_0x4a977b(0x377)]();},Game_Party[_0x5bc23b(0x25d)][_0x5bc23b(0x377)]=function(){const _0x59c26f=_0x5bc23b;this[_0x59c26f(0x242)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party['prototype'][_0x5bc23b(0x2d1)]=function(){const _0x1e9ae7=_0x5bc23b;if(this[_0x1e9ae7(0x242)]===undefined)this[_0x1e9ae7(0x377)]();return this['_lastGainedItemData'];},Game_Party[_0x5bc23b(0x25d)]['setLastGainedItemData']=function(_0x18bc12,_0x194c86){const _0x583f2b=_0x5bc23b;if(this[_0x583f2b(0x242)]===undefined)this[_0x583f2b(0x377)]();if(!_0x18bc12)return;if(DataManager[_0x583f2b(0x3a5)](_0x18bc12))this[_0x583f2b(0x242)]['type']=0x0;else{if(DataManager[_0x583f2b(0x2a0)](_0x18bc12))this[_0x583f2b(0x242)]['type']=0x1;else DataManager[_0x583f2b(0x23a)](_0x18bc12)&&(_0x583f2b(0x354)!==_0x583f2b(0x3b1)?this[_0x583f2b(0x242)][_0x583f2b(0x1a9)]=0x2:this[_0x583f2b(0x32c)]=_0x492ba8);}this[_0x583f2b(0x242)]['id']=_0x18bc12['id'],this[_0x583f2b(0x242)][_0x583f2b(0x157)]=_0x194c86;},VisuMZ[_0x5bc23b(0x14c)]['Game_Party_gainItem']=Game_Party['prototype'][_0x5bc23b(0x215)],Game_Party[_0x5bc23b(0x25d)]['gainItem']=function(_0x4ba39f,_0x333f34,_0x25730b){const _0x7d83fc=_0x5bc23b;VisuMZ[_0x7d83fc(0x14c)]['Game_Party_gainItem'][_0x7d83fc(0x191)](this,_0x4ba39f,_0x333f34,_0x25730b),_0x333f34>0x0&&this[_0x7d83fc(0x1e2)](_0x4ba39f,_0x333f34);},VisuMZ[_0x5bc23b(0x14c)]['Game_Map_initialize']=Game_Map['prototype'][_0x5bc23b(0x2ae)],Game_Map[_0x5bc23b(0x25d)][_0x5bc23b(0x2ae)]=function(){const _0xe1dd6e=_0x5bc23b;VisuMZ[_0xe1dd6e(0x14c)][_0xe1dd6e(0x356)][_0xe1dd6e(0x191)](this),this[_0xe1dd6e(0x249)]=[];},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x2bb)]=Game_Map[_0x5bc23b(0x25d)][_0x5bc23b(0x203)],Game_Map[_0x5bc23b(0x25d)][_0x5bc23b(0x203)]=function(){const _0x5e2213=_0x5bc23b;VisuMZ['MessageCore'][_0x5e2213(0x2bb)][_0x5e2213(0x191)](this),this[_0x5e2213(0x249)]=[];},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x12b)]=Game_Map['prototype']['updateEvents'],Game_Map[_0x5bc23b(0x25d)][_0x5bc23b(0x1db)]=function(){const _0x1549c9=_0x5bc23b;VisuMZ['MessageCore'][_0x1549c9(0x12b)]['call'](this),this[_0x1549c9(0x336)]();},Game_Map[_0x5bc23b(0x25d)][_0x5bc23b(0x315)]=function(_0x359790){const _0x2d1a19=_0x5bc23b;if(!$dataCommonEvents[_0x359790])return;this[_0x2d1a19(0x249)]=this['_messageCommonEvents']||[];const _0x4d4f14=this[_0x2d1a19(0x398)]['_eventId'],_0x38b0ea=new Game_MessageCommonEvent(_0x359790,_0x4d4f14);this[_0x2d1a19(0x249)]['push'](_0x38b0ea);},Game_Map[_0x5bc23b(0x25d)]['updateMessageCommonEvents']=function(){const _0x107115=_0x5bc23b;this[_0x107115(0x249)]=this[_0x107115(0x249)]||[];for(const _0x19c264 of this['_messageCommonEvents']){if(!_0x19c264[_0x107115(0x398)])this[_0x107115(0x249)][_0x107115(0x347)](_0x19c264);else{if(_0x107115(0x12a)!==_0x107115(0x12a)){if(_0x4ab825[_0x107115(0x252)]())return;this[_0x107115(0x33c)]=this[_0x107115(0x33c)]||0x0;const _0x24c08d=this[_0x107115(0x188)],_0xe609f5=_0x51b4c7[_0x107115(0x212)](_0x24c08d['width']*this[_0x107115(0x33c)]/0xa);this['x']=_0x24c08d['x']+_0xe609f5-_0x3523a7[_0x107115(0x212)](this['width']/0x2),this['x']=this['x'][_0x107115(0x305)](_0x24c08d['x'],_0x24c08d['x']+_0x24c08d[_0x107115(0x1f4)]-this[_0x107115(0x1f4)]);}else _0x19c264[_0x107115(0x37b)]();}}},Game_Interpreter['prototype']['command101']=function(_0x4e7b0e){const _0x4e27b2=_0x5bc23b;if($gameMessage['isBusy']())return![];return this[_0x4e27b2(0x299)](_0x4e7b0e),this[_0x4e27b2(0x23c)](_0x4e7b0e),this['prepareShowTextFollowups'](_0x4e7b0e),this[_0x4e27b2(0x2e2)]('message'),!![];},Game_Interpreter[_0x5bc23b(0x25d)][_0x5bc23b(0x299)]=function(_0x27bc09){const _0x1ff7b8=_0x5bc23b;$gameMessage['setFaceImage'](_0x27bc09[0x0],_0x27bc09[0x1]),$gameMessage[_0x1ff7b8(0x200)](_0x27bc09[0x2]),$gameMessage[_0x1ff7b8(0x20d)](_0x27bc09[0x3]),$gameMessage[_0x1ff7b8(0x21c)](_0x27bc09[0x4]);},Game_Interpreter[_0x5bc23b(0x25d)][_0x5bc23b(0x23c)]=function(_0x4124e0){const _0x24b8d5=_0x5bc23b;while(this[_0x24b8d5(0x35b)]()){this['_index']++;this[_0x24b8d5(0x396)]()[_0x24b8d5(0x399)]===0x191&&$gameMessage['add'](this['currentCommand']()[_0x24b8d5(0x33d)][0x0]);if(this[_0x24b8d5(0x136)]())break;}},Game_Interpreter[_0x5bc23b(0x25d)]['isContinuePrepareShowTextCommands']=function(){const _0x577b53=_0x5bc23b;if(this[_0x577b53(0x352)]()===0x65&&$gameSystem[_0x577b53(0x330)]()>0x4){if(_0x577b53(0x17a)===_0x577b53(0x17a))return!![];else{_0x28b148[_0x577b53(0x14c)]['ParseEnemyNotetags'][_0x577b53(0x191)](this,_0x2035cb);const _0x5bc9df=_0x20dc06['MessageCore'][_0x577b53(0x27a)]['AutoColor'];_0x52eca2[_0x577b53(0x14c)]['CreateAutoColorFor'](_0x152451,_0x5bc9df[_0x577b53(0x15c)]);}}else return this[_0x577b53(0x352)]()===0x191;},Game_Interpreter[_0x5bc23b(0x25d)][_0x5bc23b(0x136)]=function(){const _0x4fe4d3=_0x5bc23b;return $gameMessage[_0x4fe4d3(0x2aa)][_0x4fe4d3(0x1d7)]>=$gameSystem['getMessageWindowRows']()&&this['nextEventCode']()!==0x191;},Game_Interpreter[_0x5bc23b(0x25d)][_0x5bc23b(0x1d0)]=function(_0x25452f){const _0x373094=_0x5bc23b;switch(this[_0x373094(0x352)]()){case 0x66:this['_index']++,this[_0x373094(0x387)](this[_0x373094(0x396)]()[_0x373094(0x33d)]);break;case 0x67:this[_0x373094(0x12f)]++,this['setupNumInput'](this[_0x373094(0x396)]()['parameters']);break;case 0x68:this[_0x373094(0x12f)]++,this[_0x373094(0x34e)](this['currentCommand']()[_0x373094(0x33d)]);break;}},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x37a)]=Game_Interpreter[_0x5bc23b(0x25d)]['setupChoices'],Game_Interpreter[_0x5bc23b(0x25d)][_0x5bc23b(0x387)]=function(_0x4b2675){const _0x51b391=_0x5bc23b;_0x4b2675=this[_0x51b391(0x1c4)](),VisuMZ[_0x51b391(0x14c)][_0x51b391(0x37a)][_0x51b391(0x191)](this,_0x4b2675);},Game_Interpreter[_0x5bc23b(0x25d)][_0x5bc23b(0x1c4)]=function(){const _0x1356fa=_0x5bc23b,_0x5a0586=this['_index'],_0x4917d4=[];let _0x52e501=0x0;this[_0x1356fa(0x12f)]++;while(this[_0x1356fa(0x12f)]<this[_0x1356fa(0x175)][_0x1356fa(0x1d7)]){if(this['currentCommand']()[_0x1356fa(0x350)]===this[_0x1356fa(0x30e)]){if('aTKWS'!==_0x1356fa(0x1b7))return this[_0x1356fa(0x188)]['x']+this[_0x1356fa(0x188)][_0x1356fa(0x1f4)]-this['windowWidth']();else{if(this['currentCommand']()[_0x1356fa(0x399)]===0x194&&this['nextEventCode']()!==0x66){if(_0x1356fa(0x146)!=='GLXkp'){if(this[_0x1356fa(0x1d5)]===_0x35903c)this[_0x1356fa(0x377)]();this['_messageOffsetX']=_0x59759c,this[_0x1356fa(0x151)]=_0x5c4749;}else break;}else{if(this[_0x1356fa(0x396)]()[_0x1356fa(0x399)]===0x66){if(_0x1356fa(0x268)==='UZikp')this['adjustShowChoiceExtension'](_0x52e501,this['currentCommand'](),_0x5a0586),this[_0x1356fa(0x12f)]-=0x2;else{if(_0x5019b6[_0x1356fa(0x33d)][0x2]<0x0)return;const _0x55311a=_0x5d55e0[_0x1356fa(0x33d)][0x2]+_0x2a2e6d;this[_0x1356fa(0x175)][_0xdb143c]['parameters'][0x2]=_0x55311a;}}else this[_0x1356fa(0x396)]()[_0x1356fa(0x399)]===0x192&&(this[_0x1356fa(0x396)]()['parameters'][0x0]=_0x52e501,_0x52e501++);}}}this[_0x1356fa(0x12f)]++;}return this[_0x1356fa(0x12f)]=_0x5a0586,this['currentCommand']()[_0x1356fa(0x33d)];},Game_Interpreter['prototype'][_0x5bc23b(0x22d)]=function(_0x39fff0,_0x4538f2,_0x2630ff){const _0x18be23=_0x5bc23b;this['adjustShowChoiceDefault'](_0x39fff0,_0x4538f2,_0x2630ff),this['adjustShowChoiceCancel'](_0x39fff0,_0x4538f2,_0x2630ff),this[_0x18be23(0x381)](_0x4538f2,_0x2630ff);},Game_Interpreter[_0x5bc23b(0x25d)][_0x5bc23b(0x167)]=function(_0xd99228,_0x45d73f,_0x5aaa18){const _0x13b0b5=_0x5bc23b;if(_0x45d73f['parameters'][0x2]<0x0)return;const _0x3ea714=_0x45d73f[_0x13b0b5(0x33d)][0x2]+_0xd99228;this[_0x13b0b5(0x175)][_0x5aaa18]['parameters'][0x2]=_0x3ea714;},Game_Interpreter[_0x5bc23b(0x25d)][_0x5bc23b(0x285)]=function(_0x46d9dd,_0x192be6,_0x23cd38){const _0x5bcb5e=_0x5bc23b;if(_0x192be6[_0x5bcb5e(0x33d)][0x1]>=0x0){if('Ywamb'==='WrEWS')return this['resetWordWrap'](),_0x5a1e63[_0x5bcb5e(0x14c)][_0x5bcb5e(0x23d)]['call'](this,_0x32184f);else{var _0x4958f3=_0x192be6['parameters'][0x1]+_0x46d9dd;this['_list'][_0x23cd38][_0x5bcb5e(0x33d)][0x1]=_0x4958f3;}}else _0x192be6[_0x5bcb5e(0x33d)][0x1]===-0x2&&(this[_0x5bcb5e(0x175)][_0x23cd38][_0x5bcb5e(0x33d)][0x1]=_0x192be6[_0x5bcb5e(0x33d)][0x1]);},Game_Interpreter['prototype'][_0x5bc23b(0x381)]=function(_0x1242a9,_0x560dbc){const _0xaa6b78=_0x5bc23b;for(const _0x502dde of _0x1242a9[_0xaa6b78(0x33d)][0x0]){this[_0xaa6b78(0x175)][_0x560dbc][_0xaa6b78(0x33d)][0x0][_0xaa6b78(0x266)](_0x502dde);}this[_0xaa6b78(0x175)][_0xaa6b78(0x181)](this[_0xaa6b78(0x12f)]-0x1,0x2);};function Game_MessageCommonEvent(){this['initialize'](...arguments);}function _0x186b(){const _0x424097=['onProcessCharacter','OffsetY','bind','index','UwwoD','\x1bTEXTALIGNMENT[2]','updateBackground','changePaintOpacity','_texts','ceil','quTwt','getMessageWindowXyOffsets','initialize','applyMoveEasing','_cancelButton','MsgWindowOffsetY','boxHeight','updateRelativePosition','Window_NameBox_updatePlacement','battle\x20enemy','10474827KfLKuj','processNewLine','Window_Base_processAllText','drawBackPicture','getTextAlignment','Game_Map_setupEvents','ARRAYEVAL','TextColor%1','_targets','_eventId','uTrDH','_autoPosRegExp','WordWrap','calcWindowHeight','wQhzy','NameBoxWindowOffsetX','resetFontSettings','textSpeed','contentsBack','calcMoveEasing','Armors','_resetRect','BblUX','ParseWeaponNotetags','UNCBH','\x1bTEXTALIGNMENT[0]','_textAlignment','getLastGainedItemData','ChoiceWindowLineHeight','processTextAlignmentX','startX','defeat','addedHeight','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ILSEP','QnPOE','blt','setMessageWindowRows','syxWs','FUNC','tZOMU','ParseStateNotetags','CommonEvent','return\x20\x27','setWaitMode','\x1bCOLORLOCK[1]','sort','SHOW','trim','cghjP','Game_System_initialize','STR','Xrgmq','preFlushTextState','scale','maxCommands','GjbPs','_nameBoxWindow','callOkHandler','easeOut','resetWordWrap','messageCoreWindowX','isPressed','YCtfh','ARRAYJSON','postConvertEscapeCharacters','left','setChoiceListLineHeight','setup','Items','cwUis','ActionJS','FontBiggerCap','OffsetX','Window_Options_addGeneralOptions','addMessageCoreTextSpeedCommand','synchronizeNameBox','battleTargetName','indexOf','clamp','exec','AddOption','Rows','Name','ZpSgF','selectDefault','isSceneMap','choiceLineHeight','_indent','ParseClassNotetags','processFontChangeBold','Actors','2443653lQeexl','processMessageCoreEscapeActions','FEmoz','addMessageCommonEvent','WRAPBREAK','obtainEscapeString','Game_Party_initialize','makeData','fTBUo','ParseItemNotetags','dVxfM','MessageWidth','Window_Options_isVolumeSymbol','addMessageCoreCommands','process_VisuMZ_MessageCore_TextCodes_Action','makeFontSmaller','changeOutlineColor','preConvertEscapeCharacters','processDrawPicture','value','ParseSkillNotetags','faceName','ChoiceWindowTextAlign','Window_Message_newPage','outputHeight','faceWidth','_colorLock','choicePositionType','MessageWindowXyOffsets','onNewPageMessageCore','getMessageWindowRows','TextSpeed','_moveEasingType','_textDelayCount','rtl','isChoiceEnabled','updateMessageCommonEvents','message','defaultColor','IEhSS','_textDelay','changeValue','_relativePosition','parameters','_autoSizeCheck','cAwOp','textSizeExWordWrap','drawBackCenteredPicture','processAutoColorWords','_textColorStack','convertTextAlignmentEscapeCharacters','convertVariableEscapeCharacters','activate','remove','updateAutoPosition','currencyUnit','Width','height','_messagePositionReset','CGPQO','setupItemChoice','<LEFT>','indent','Window_Base_initialize','nextEventCode','map\x20actor','eIYVo','</RIGHT>','Game_Map_initialize','20526mypUTW','cyudW','_positionType','(((','isContinuePrepareShowTextCommands','followers','dIMqQ','textSizeExTextAlignment','nuXxU','\x1bWrapBreak[0]','getChoiceListTextAlign','actor','CreateAutoColorFor','getChoiceListMaxColumns','addWrapBreakAfterPunctuation','ConvertTextAutoColorRegExpFriendly','setColorLock','changeVolume','_autoPositionTarget','processPreviousColor','isInputting','Window_ChoiceList_updatePlacement','NoQsW','min','setTextAlignment','follower','1500724OZaCVM','setRelativePosition','test','\x1bBOLD[0]','GyDKN','processStoredAutoColorChanges','initMessageCore','_autoSizeRegexp','VRmSg','Game_Interpreter_setupChoices','update','paintOpacity','convertBaseEscapeCharacters','tNsSl',')))','_action','addExtraShowChoices','MessageTextDelay','States','process_VisuMZ_MessageCore_TextCodes_Replace','ParseEnemyNotetags','yqrtm','setupChoices','\x5c%1','DCjJD','changeTextColor','flushTextState','setWordWrap','_commonEventId','fontFace','default','Wtfzv','XvJFb','battleActionName','right','Window_Base_update','WiirM','currentCommand','textCodeResult','_interpreter','code','windowX','VisuMZ_0_CoreEngine','processCommonEvent','map\x20event','150mhkque','zLnty','</WORDWRAP>','AddAutoColor','choiceTextAlign','_wordWrap','isColorLocked','isItem','lmobr','stretchDimmerSprite','contentsHeight','helpWordWrap','Instant','registerCommand','setChoiceListTextAlign','changeTextSpeed','refresh','Weapons','constructor','BecOq','setMessageWindowXyOffsets','RelativePXPY','Window_Base_processNewLine','setTextDelay','Window_NameBox_refresh','_scene','zxUaY','JAiEa','makeFontBigger','TextColor','addCommand','MaxRows','\x1bC[%1]%2\x1bPREVCOLOR[0]','preemptive','_moveTargetY','map','contents','processDrawCenteredPicture','HelpWindow','Window_Message_clearFlags','processWrapBreak','sjVmh','BOLD','prepareWordWrapEscapeCharacters','createContents','UCVDZ','Game_Map_updateEvents','</CENTER>','YMVoN','windowPadding','_index','registerResetRect','startY','_moveTargetX','_showFast','choices','Type','isBreakShowTextCommands','substr','levelUp','convertChoiceMacros','processPxTextCode','Classes','RvnmE','PICTURE','updatePlacement','_moveTargetWidth','updateAutoSizePosition','clampPlacementPosition','AdjustRect','gqDtr','STRUCT','ENABLE','GLXkp','easeIn','COMMONEVENT','MessageRows','PMxAd','\x1bCOLORLOCK[0]','MessageCore','_data','<B>','ConfigManager_applyData','anchor','_messageOffsetY','convertTextMacros','1164639mfoRJs','format','</COLORLOCK>','Scene_Options_maxCommands','quantity','normalColor','easeInOut','dqgBU','clearFlags','Enemies','Window_Base_processControlCharacter','_moveTargetHeight','maxFontSizeInLine','Window_Help_refresh','updateOverlappingY','false','TextManager_message','onDatabaseLoaded','\x1bBOLD[1]','CreateAutoColorRegExpListEntries','adjustShowChoiceDefault','textSpeedStatusText','substring','text','NameBoxWindowDefaultColor','tUvmn','IDyQz','match','ARRAYFUNC','WAIT','ParseArmorNotetags','oElFZ','drawing','process_VisuMZ_MessageCore_TextMacros','_list','jTrxZ','getChoiceListMaxRows','clear','Window_Message_processEscapeCharacter','vDSSQ','isHelpWindowWordWrap','messageWordWrap','bZrNv','_dimmerSprite','nBTUg','victory','splice','none','yuifa','SWITCHES','mgOgz','COLORLOCK','choiceCols','_messageWindow','NameBoxWindowOffsetY','createTextState','\x1bITALIC[0]','processEscapeCharacter','TextCodeActions','Window_Message_terminateMessage','ConvertParams','processFontChangeItalic','call','instantTextSpeed','escapeStart','rhgzr','processAutoPosition','processFsTextCode','addLoadListener','battle\x20actor','textCodeCheck','ITALIC','outlineWidth','convertLockColorsEscapeCharacters','yryjn','obtainEscapeParam','_wholeMoveDuration','partyMemberName','MsgWindowOffsetX','isVolumeSymbol','filter','version','maxChoiceWidth','loadPicture','parseChoiceText','ParseAllNotetags','type','fontSize','isTriggered','chDXl','vMwLj','split','\x1bi[%1]%2','postFlushTextState','itemPadding','_moveDuration','SWITCH','processAutoSize','_forcedPosition','newPage','aTKWS','fontBold','CENTERPICTURE','processTextAlignmentChange','description','terminateMessage','isAutoColorAffected','center','qUrKF','DlqLT','General','textWidth','TextStr','addContinuousShowChoices','statusText','unshift','canMove','setMessageWindowWidth','8uxSPoK','_autoColorActorNames','processActorNameAutoColorChanges','fontItalic','TextJS','obtainGold','JSON','prepareShowTextFollowups','itemHeight','MessageWindow','10TTmcDf','drawItem','_MessageCoreSettings','processPyTextCode','length','resetTextColor','isChoiceVisible','setChoiceListMaxRows','updateEvents','outlineColor','OjFKP','getMessageWindowWidth','obtainItem','Window_Message_updatePlacement','Window_ChoiceList_windowX','setLastGainedItemData','bjeJj','CreateAutoColorRegExpLists','parse','UNrcd','textColor','max','round','numVisibleRows','boxWidth','updateTransform','outputWidth','AutoColorRegExp','placeCancelButton','_spriteset','dbuVP','\x1bTEXTALIGNMENT[3]','FontSmallerCap','width','textSizeEx','xbQtH','battle\x20party','processControlCharacter','exit','clearCommandList','innerWidth','AutoColor','updateMove','convertHardcodedEscapeReplacements','launchMessageCommonEvent','setBackground','_target','EqhwS','setupEvents','setMessageWindowWordWrap','aoKvG','_macroBypassWordWrap','RaOiO','makeCommandList','\x1bTEXTALIGNMENT[1]','abZFW','isWordWrapEnabled','inputtingAction','setPositionType','isCommandEnabled','getPreservedFontSettings','slice','commandSymbol','floor','Window_Options_statusText','llbeB','gainItem','mainFontFace','Match','Window_Base_changeTextColor','getConfigValue','itemRectWithPadding','return\x200','setSpeakerName','updateDimensions','map\x20party','VDAlt','processAllText','processColorLock','choiceRows','QmvpU','messageRows','updateNameBoxMove','ConfigManager_makeData','Skills','SortObjectByKeyLength','ALL','inBattle','<WORDWRAP>','Scene_Boot_onDatabaseLoaded','adjustShowChoiceExtension','choice','onChoice','_textMacroFound','setHelpWindowWordWrap','battleUserName','lastGainedObjectName','prepareForcedPositionEscapeCharacters','refreshDimmerBitmap','grCfO','messageWidth','WORD_WRAP_PADDING','moveBy','isArmor','moveTo','addContinuousShowTextCommands','Window_Base_textSizeEx','EndPadding','FontChangeValue','convertNewPageTextStateMacros','kpxON','_lastGainedItemData','messagePositionReset','nRZKL','_subject','isSceneBattle','LineHeight','convertFontSettingsEscapeCharacters','_messageCommonEvents','lineHeight','Undefined','<%1>','GDSDS','RcEIl','open','</I>','SWMOg','isRTL','GXovI','initTextAlignement','messageCoreTextSpeed','members','applyDatabaseAutoColor','972oOdnGI','getChoiceListLineHeight','\x1bTEXTALIGNMENT','OVRGG','updateForcedPlacement','prototype','addGeneralOptions','convertBackslashCharacters','updateXyOffsets','messageWindowRect','item','convertMessageCoreEscapeReplacements','innerHeight','Vqetd','push','TEXTALIGNMENT','UZikp','true','findTargetSprite','replace','13995yPTMFr','_centerMessageWindow','maxLines','includes','vNrDs','clearActorNameAutoColor','xoLOw','ZJkZN','Window_Base_processEscapeCharacter','_messageOffsetX','makeDeepCopy','isRunning','setChoiceListMaxColumns','map\x20player','Settings','colSpacing','name','UTeof','windowWidth','list','ChoiceWindowMaxRows','255376PlGvJN','isMessageWindowWordWrap','process_VisuMZ_MessageCore_AutoColor','GOXuQ','adjustShowChoiceCancel','MessageWindowProperties','updateOffsetPosition','MaxCols','join','DefaultOutlineWidth','toUpperCase','toLowerCase','iconIndex','FastForwardKey','registerActorNameAutoColorChanges','lastGainedObjectQuantity','prepareAutoSizeEscapeCharacters','vbcOE','resetPositionX','PREVCOLOR','status','returnPreservedFontSettings','UhGRv','Default','prepareShowTextCommand','processCustomWait','maxCols','addedWidth','YrSQj','Window_Message_synchronizeNameBox','ARRAYSTR','isWeapon','zzlzz'];_0x186b=function(){return _0x424097;};return _0x186b();}Game_MessageCommonEvent[_0x5bc23b(0x25d)][_0x5bc23b(0x2ae)]=function(_0x1abdf3,_0x1e7082){const _0x1cfd72=_0x5bc23b;this['_commonEventId']=_0x1abdf3,this[_0x1cfd72(0x2bf)]=_0x1e7082||0x0,this['refresh']();},Game_MessageCommonEvent[_0x5bc23b(0x25d)]['event']=function(){const _0x235f49=_0x5bc23b;return $dataCommonEvents[this[_0x235f49(0x38d)]];},Game_MessageCommonEvent[_0x5bc23b(0x25d)][_0x5bc23b(0x27f)]=function(){const _0x5d570f=_0x5bc23b;return this['event']()[_0x5d570f(0x27f)];},Game_MessageCommonEvent[_0x5bc23b(0x25d)][_0x5bc23b(0x3ae)]=function(){const _0x29dcc3=_0x5bc23b;this[_0x29dcc3(0x398)]=new Game_Interpreter(),this[_0x29dcc3(0x398)][_0x29dcc3(0x2fa)](this[_0x29dcc3(0x27f)](),this[_0x29dcc3(0x2bf)]);},Game_MessageCommonEvent[_0x5bc23b(0x25d)][_0x5bc23b(0x37b)]=function(){const _0x43c6ec=_0x5bc23b;if(this[_0x43c6ec(0x398)]){if('iLpab'!=='iLpab'){this[_0x43c6ec(0x1ca)]===_0x4906a8&&this[_0x43c6ec(0x28f)]();for(_0x32e424 of this[_0x43c6ec(0x1ca)]){_0x3332a9=_0x3c5a4c['replace'](_0x3c3752[0x0],_0x4561d6[0x1]);}return _0x249839;}else this['_interpreter'][_0x43c6ec(0x277)]()?this['_interpreter'][_0x43c6ec(0x37b)]():_0x43c6ec(0x223)!==_0x43c6ec(0x223)?(_0x21e2b1[_0x43c6ec(0x2f2)](),_0x2a020d['updateDimensions'](),_0x4c53ef[_0x43c6ec(0x129)]()):this[_0x43c6ec(0x178)]();}},Game_MessageCommonEvent[_0x5bc23b(0x25d)][_0x5bc23b(0x178)]=function(){const _0x2cedf4=_0x5bc23b;this[_0x2cedf4(0x398)]=null;},Scene_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x261)]=function(){const _0x54cbe6=_0x5bc23b,_0xd93210=Math['min'](Graphics[_0x54cbe6(0x1f4)],$gameSystem[_0x54cbe6(0x1de)]()),_0x5d78e2=$gameSystem[_0x54cbe6(0x330)](),_0x529094=this[_0x54cbe6(0x2c3)](_0x5d78e2,![]),_0x1b10a0=(Graphics['boxWidth']-_0xd93210)/0x2,_0x5de5e2=0x0;return new Rectangle(_0x1b10a0,_0x5de5e2,_0xd93210,_0x529094);},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x156)]=Scene_Options[_0x5bc23b(0x25d)][_0x5bc23b(0x2ed)],Scene_Options[_0x5bc23b(0x25d)][_0x5bc23b(0x2ed)]=function(){const _0x4a2fbb=_0x5bc23b;let _0x21e413=VisuMZ[_0x4a2fbb(0x14c)]['Scene_Options_maxCommands']['call'](this);const _0xce6818=VisuMZ[_0x4a2fbb(0x14c)][_0x4a2fbb(0x27a)];if(_0xce6818[_0x4a2fbb(0x331)][_0x4a2fbb(0x307)]&&_0xce6818[_0x4a2fbb(0x331)][_0x4a2fbb(0x142)])_0x21e413++;return _0x21e413;},VisuMZ['MessageCore'][_0x5bc23b(0x351)]=Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x2ae)],Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x2ae)]=function(_0x3ecf22){const _0x2770bf=_0x5bc23b;this['initMessageCore'](_0x3ecf22),VisuMZ[_0x2770bf(0x14c)][_0x2770bf(0x351)][_0x2770bf(0x191)](this,_0x3ecf22);},Window_Base[_0x5bc23b(0x25d)]['initMessageCore']=function(_0x146ea){const _0x456ab5=_0x5bc23b;this['initTextAlignement'](),this[_0x456ab5(0x2f2)](),this[_0x456ab5(0x130)](_0x146ea);},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x254)]=function(){const _0x1beb61=_0x5bc23b;this[_0x1beb61(0x36f)]('default');},Window_Base[_0x5bc23b(0x25d)]['setTextAlignment']=function(_0x3062a1){this['_textAlignment']=_0x3062a1;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x2ba)]=function(){const _0x2c83e0=_0x5bc23b;return this[_0x2c83e0(0x2d0)];},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x23d)]=Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x1f5)],Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x1f5)]=function(_0x4bdc83){const _0xad649d=_0x5bc23b;return this['resetWordWrap'](),VisuMZ[_0xad649d(0x14c)]['Window_Base_textSizeEx']['call'](this,_0x4bdc83);},VisuMZ[_0x5bc23b(0x14c)]['Window_Base_processAllText']=Window_Base['prototype'][_0x5bc23b(0x220)],Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x220)]=function(_0x58e358){const _0x3f1e98=_0x5bc23b;VisuMZ[_0x3f1e98(0x14c)][_0x3f1e98(0x2b8)]['call'](this,_0x58e358);if(_0x58e358[_0x3f1e98(0x173)])this[_0x3f1e98(0x36f)](_0x3f1e98(0x38f));},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x2f2)]=function(){const _0x5f2573=_0x5bc23b;this[_0x5f2573(0x38c)](![]);},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x20b)]=function(){return this['_wordWrap'];},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x38c)]=function(_0x570f0b){const _0x37362f=_0x5bc23b;return this[_0x37362f(0x3a3)]=_0x570f0b,'';},Window_Base[_0x5bc23b(0x25d)]['registerResetRect']=function(_0x15ffa3){const _0x12469a=_0x5bc23b;this[_0x12469a(0x2cb)]=JsonEx['makeDeepCopy'](_0x15ffa3);},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x2c6)]=function(){const _0x3bbd2a=_0x5bc23b;this['contents'][_0x3bbd2a(0x38e)]=$gameSystem[_0x3bbd2a(0x216)](),this[_0x3bbd2a(0x3c2)][_0x3bbd2a(0x1aa)]=$gameSystem['mainFontSize'](),this[_0x3bbd2a(0x3c2)][_0x3bbd2a(0x1b8)]=![],this[_0x3bbd2a(0x3c2)][_0x3bbd2a(0x1cc)]=![],this['resetTextColor']();},Window_Base[_0x5bc23b(0x25d)]['resetTextColor']=function(){const _0x5161bc=_0x5bc23b;this[_0x5161bc(0x38a)](ColorManager['normalColor']()),this[_0x5161bc(0x322)](ColorManager[_0x5161bc(0x1dc)]());const _0x417ae0=VisuMZ['MessageCore']['Settings'][_0x5161bc(0x1c1)];_0x417ae0[_0x5161bc(0x28a)]===undefined&&(_0x417ae0[_0x5161bc(0x28a)]=0x3),this['contents'][_0x5161bc(0x19b)]=_0x417ae0[_0x5161bc(0x28a)],this[_0x5161bc(0x367)](![]);},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x367)]=function(_0x582ed1){const _0x37b80b=_0x5bc23b;this[_0x37b80b(0x32c)]=_0x582ed1;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x3a4)]=function(){const _0x1c7561=_0x5bc23b;return this[_0x1c7561(0x32c)];},Window_Base[_0x5bc23b(0x25d)]['isAutoColorAffected']=function(){return![];},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x20f)]=function(){const _0x59b712=_0x5bc23b,_0xfeeb7d=[_0x59b712(0x38e),_0x59b712(0x1aa),'fontBold',_0x59b712(0x1cc),_0x59b712(0x1e7),'outLineColor',_0x59b712(0x19b),'paintOpacity'];let _0x6e7f8c={};for(const _0x540abc of _0xfeeb7d){_0x6e7f8c[_0x540abc]=this['contents'][_0x540abc];}return _0x6e7f8c;},Window_Base[_0x5bc23b(0x25d)]['returnPreservedFontSettings']=function(_0x6aa675){const _0x3d1c35=_0x5bc23b;for(const _0x1f7b5d in _0x6aa675){this[_0x3d1c35(0x3c2)][_0x1f7b5d]=_0x6aa675[_0x1f7b5d];}},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x394)]=Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x37b)],Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x37b)]=function(){const _0x2d95e1=_0x5bc23b;VisuMZ[_0x2d95e1(0x14c)][_0x2d95e1(0x394)]['call'](this),this[_0x2d95e1(0x1fd)]();},Window_Base['prototype'][_0x5bc23b(0x1c7)]=function(){return![];},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x1fd)]=function(){const _0x2249a7=_0x5bc23b;this[_0x2249a7(0x1b2)]>0x0&&(_0x2249a7(0x205)===_0x2249a7(0x205)?(this['canMove']()&&(this['x']=this[_0x2249a7(0x2af)](this['x'],this[_0x2249a7(0x132)]),this['y']=this[_0x2249a7(0x2af)](this['y'],this[_0x2249a7(0x3c0)]),this[_0x2249a7(0x1f4)]=this[_0x2249a7(0x2af)](this[_0x2249a7(0x1f4)],this['_moveTargetWidth']),this[_0x2249a7(0x34b)]=this['applyMoveEasing'](this[_0x2249a7(0x34b)],this['_moveTargetHeight']),this[_0x2249a7(0x141)]()),this['_moveDuration']--):(this['refresh'](),this[_0x2249a7(0x30b)](),this[_0x2249a7(0x24f)](),this[_0x2249a7(0x346)]()));},Window_Base['prototype'][_0x5bc23b(0x141)]=function(_0x333387,_0xb6c354){const _0x48fe55=_0x5bc23b;!_0x333387&&(this[_0x48fe55(0x1f4)]=Math[_0x48fe55(0x36e)](this[_0x48fe55(0x1f4)],Graphics[_0x48fe55(0x1f4)]),this[_0x48fe55(0x34b)]=Math[_0x48fe55(0x36e)](this[_0x48fe55(0x34b)],Graphics[_0x48fe55(0x34b)]));if(!_0xb6c354){const _0x37453f=-(Math[_0x48fe55(0x212)](Graphics['width']-Graphics[_0x48fe55(0x1eb)])/0x2),_0x4dc04c=_0x37453f+Graphics[_0x48fe55(0x1f4)]-this['width'],_0x4d57a9=-(Math[_0x48fe55(0x212)](Graphics[_0x48fe55(0x34b)]-Graphics[_0x48fe55(0x2b2)])/0x2),_0x10b576=_0x4d57a9+Graphics[_0x48fe55(0x34b)]-this[_0x48fe55(0x34b)];this['x']=this['x']['clamp'](_0x37453f,_0x4dc04c),this['y']=this['y'][_0x48fe55(0x305)](_0x4d57a9,_0x10b576);}},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x2af)]=function(_0xd66768,_0x229add){const _0xfc243e=_0x5bc23b,_0x1a37bd=this['_moveDuration'],_0x2c685a=this[_0xfc243e(0x19f)],_0x439d1d=this[_0xfc243e(0x2c9)]((_0x2c685a-_0x1a37bd)/_0x2c685a),_0x30f30c=this[_0xfc243e(0x2c9)]((_0x2c685a-_0x1a37bd+0x1)/_0x2c685a),_0x1063ab=(_0xd66768-_0x229add*_0x439d1d)/(0x1-_0x439d1d);return _0x1063ab+(_0x229add-_0x1063ab)*_0x30f30c;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x2c9)]=function(_0x2d9646){const _0x5e50e1=_0x5bc23b,_0x5a1587=0x2;switch(this[_0x5e50e1(0x332)]){case 0x0:return _0x2d9646;case 0x1:return this[_0x5e50e1(0x147)](_0x2d9646,_0x5a1587);case 0x2:return this[_0x5e50e1(0x2f1)](_0x2d9646,_0x5a1587);case 0x3:return this[_0x5e50e1(0x159)](_0x2d9646,_0x5a1587);default:if(Imported[_0x5e50e1(0x39b)]){if('RTwjK'==='RTwjK')return VisuMZ[_0x5e50e1(0x2af)](_0x2d9646,this[_0x5e50e1(0x332)]);else this[_0x5e50e1(0x1e2)](_0x12cc3d,_0x741122);}else{if(_0x5e50e1(0x2fc)!==_0x5e50e1(0x2fc))var _0x39e009=new _0x4f8c28(_0x5a341c,'i');else return _0x2d9646;}}},Window_Base[_0x5bc23b(0x25d)]['moveTo']=function(_0x35e6cb,_0xa72243,_0x23ab02,_0x352480,_0x5ec59f,_0x254dfc){const _0x3d989c=_0x5bc23b;this[_0x3d989c(0x132)]=_0x35e6cb,this['_moveTargetY']=_0xa72243,this[_0x3d989c(0x13f)]=_0x23ab02||this[_0x3d989c(0x1f4)],this['_moveTargetHeight']=_0x352480||this[_0x3d989c(0x34b)],this[_0x3d989c(0x1b2)]=_0x5ec59f||0x1;if(this['_moveDuration']<=0x0)this[_0x3d989c(0x1b2)]=0x1;this[_0x3d989c(0x19f)]=this['_moveDuration'],this[_0x3d989c(0x332)]=_0x254dfc||0x0;if(_0x5ec59f<=0x0)this[_0x3d989c(0x1fd)]();},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x239)]=function(_0xf00967,_0x40ec94,_0x3ea1c1,_0x584957,_0x40ab73,_0x3f786b){const _0x5e47f5=_0x5bc23b;this[_0x5e47f5(0x132)]=this['x']+_0xf00967,this[_0x5e47f5(0x3c0)]=this['y']+_0x40ec94,this['_moveTargetWidth']=this[_0x5e47f5(0x1f4)]+(_0x3ea1c1||0x0),this[_0x5e47f5(0x15e)]=this[_0x5e47f5(0x34b)]+(_0x584957||0x0),this[_0x5e47f5(0x1b2)]=_0x40ab73||0x1;if(this[_0x5e47f5(0x1b2)]<=0x0)this['_moveDuration']=0x1;this[_0x5e47f5(0x19f)]=this['_moveDuration'],this[_0x5e47f5(0x332)]=_0x3f786b||0x0;if(_0x40ab73<=0x0)this[_0x5e47f5(0x1fd)]();},Window_Base[_0x5bc23b(0x25d)]['resetRect']=function(_0x445065,_0x5c9c05){const _0x7dc42e=_0x5bc23b;this[_0x7dc42e(0x23b)](this[_0x7dc42e(0x2cb)]['x'],this['_resetRect']['y'],this[_0x7dc42e(0x2cb)][_0x7dc42e(0x1f4)],this['_resetRect']['height'],_0x445065,_0x5c9c05);},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x218)]=Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x38a)],Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x38a)]=function(_0x2299c8){const _0x11f9eb=_0x5bc23b;if(this[_0x11f9eb(0x3a4)]())return;_0x2299c8=_0x2299c8[_0x11f9eb(0x26b)](/\,/g,''),this[_0x11f9eb(0x343)]=this[_0x11f9eb(0x343)]||[],this[_0x11f9eb(0x343)][_0x11f9eb(0x1c6)](this[_0x11f9eb(0x3c2)]['textColor']),VisuMZ['MessageCore'][_0x11f9eb(0x218)][_0x11f9eb(0x191)](this,_0x2299c8);},Window_Base['prototype'][_0x5bc23b(0x36a)]=function(_0x50b95f){const _0x2ce641=_0x5bc23b;this[_0x2ce641(0x19e)](_0x50b95f);if(this[_0x2ce641(0x3a4)]())return;_0x50b95f[_0x2ce641(0x173)]&&('llbeB'!==_0x2ce641(0x214)?_0x1e8cfd=_0x59706b[_0x2ce641(0x27c)]:(this[_0x2ce641(0x343)]=this[_0x2ce641(0x343)]||[],this[_0x2ce641(0x3c2)][_0x2ce641(0x1e7)]=this[_0x2ce641(0x343)]['shift']()||ColorManager[_0x2ce641(0x158)]()));},Window_Base['prototype']['convertEscapeCharacters']=function(_0x11ddd1){const _0x4bfae7=_0x5bc23b;return _0x11ddd1=this[_0x4bfae7(0x152)](_0x11ddd1),_0x11ddd1=this[_0x4bfae7(0x25f)](_0x11ddd1),_0x11ddd1=this[_0x4bfae7(0x345)](_0x11ddd1),_0x11ddd1=this[_0x4bfae7(0x323)](_0x11ddd1),_0x11ddd1=this['convertShowChoiceEscapeCodes'](_0x11ddd1),_0x11ddd1=this['convertFontSettingsEscapeCharacters'](_0x11ddd1),_0x11ddd1=this[_0x4bfae7(0x344)](_0x11ddd1),_0x11ddd1=this[_0x4bfae7(0x19c)](_0x11ddd1),_0x11ddd1=this[_0x4bfae7(0x37d)](_0x11ddd1),_0x11ddd1=this[_0x4bfae7(0x1fe)](_0x11ddd1),_0x11ddd1=this['convertMessageCoreEscapeActions'](_0x11ddd1),_0x11ddd1=this[_0x4bfae7(0x263)](_0x11ddd1),_0x11ddd1=this['postConvertEscapeCharacters'](_0x11ddd1),_0x11ddd1=this[_0x4bfae7(0x345)](_0x11ddd1),_0x11ddd1=this[_0x4bfae7(0x342)](_0x11ddd1),_0x11ddd1=this[_0x4bfae7(0x128)](_0x11ddd1),_0x11ddd1;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x152)]=function(_0x412aea){const _0x20261e=_0x5bc23b;this[_0x20261e(0x230)]=![];for(const _0x39b638 of VisuMZ[_0x20261e(0x14c)]['Settings']['TextMacros']){_0x20261e(0x19d)===_0x20261e(0x390)?(_0x674723[_0x20261e(0x14c)]['Window_ChoiceList_updatePlacement'][_0x20261e(0x191)](this),this[_0x20261e(0x141)]()):_0x412aea[_0x20261e(0x16e)](_0x39b638[_0x20261e(0x199)])&&(this['_textMacroFound']=!![],_0x412aea=_0x412aea[_0x20261e(0x26b)](_0x39b638[_0x20261e(0x199)],_0x39b638[_0x20261e(0x397)][_0x20261e(0x2a4)](this)));}return _0x412aea;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x25f)]=function(_0x5e87ea){const _0x4dc725=_0x5bc23b;return _0x5e87ea=_0x5e87ea[_0x4dc725(0x26b)](/\\/g,'\x1b'),_0x5e87ea=_0x5e87ea['replace'](/\x1b\x1b/g,'\x5c'),_0x5e87ea;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x345)]=function(_0x3e7142){const _0x156938=_0x5bc23b;for(;;){if(_0x3e7142['match'](/\\V\[(\d+)\]/gi))_0x3e7142=_0x3e7142['replace'](/\\V\[(\d+)\]/gi,(_0x145c7f,_0xc7fba1)=>this[_0x156938(0x25f)](String($gameVariables[_0x156938(0x325)](parseInt(_0xc7fba1)))));else{if(_0x3e7142[_0x156938(0x16e)](/\x1bV\[(\d+)\]/gi))_0x3e7142=_0x3e7142[_0x156938(0x26b)](/\x1bV\[(\d+)\]/gi,(_0x3ba8ec,_0x9748e)=>this[_0x156938(0x25f)](String($gameVariables[_0x156938(0x325)](parseInt(_0x9748e)))));else break;}}return _0x3e7142;},Window_Base[_0x5bc23b(0x25d)]['preConvertEscapeCharacters']=function(_0x43d643){const _0x4e42a7=_0x5bc23b;return this[_0x4e42a7(0x28f)](),_0x43d643;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x2f7)]=function(_0x4a25be){return _0x4a25be;},Window_Base[_0x5bc23b(0x25d)]['convertShowChoiceEscapeCodes']=function(_0x3b824d){const _0x26bb7d=_0x5bc23b;return _0x3b824d=_0x3b824d[_0x26bb7d(0x26b)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x3b824d=_0x3b824d['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x3b824d=_0x3b824d['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x3b824d;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x248)]=function(_0x4c2b75){const _0x4df3b9=_0x5bc23b;return _0x4c2b75=_0x4c2b75[_0x4df3b9(0x26b)](/<B>/gi,_0x4df3b9(0x165)),_0x4c2b75=_0x4c2b75[_0x4df3b9(0x26b)](/<\/B>/gi,_0x4df3b9(0x374)),_0x4c2b75=_0x4c2b75['replace'](/<I>/gi,'\x1bITALIC[1]'),_0x4c2b75=_0x4c2b75[_0x4df3b9(0x26b)](/<\/I>/gi,_0x4df3b9(0x18b)),_0x4c2b75;},Window_Base[_0x5bc23b(0x25d)]['convertTextAlignmentEscapeCharacters']=function(_0x4f1f48){const _0x3723cd=_0x5bc23b;return _0x4f1f48=_0x4f1f48[_0x3723cd(0x26b)](/<LEFT>/gi,'\x1bTEXTALIGNMENT[1]'),_0x4f1f48=_0x4f1f48[_0x3723cd(0x26b)](/<\/LEFT>/gi,_0x3723cd(0x2cf)),_0x4f1f48=_0x4f1f48[_0x3723cd(0x26b)](/<CENTER>/gi,_0x3723cd(0x2a7)),_0x4f1f48=_0x4f1f48[_0x3723cd(0x26b)](/<\/CENTER>/gi,_0x3723cd(0x2cf)),_0x4f1f48=_0x4f1f48['replace'](/<RIGHT>/gi,_0x3723cd(0x1f2)),_0x4f1f48=_0x4f1f48[_0x3723cd(0x26b)](/<\/RIGHT>/gi,_0x3723cd(0x2cf)),_0x4f1f48;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x19c)]=function(_0x280416){const _0xeae17d=_0x5bc23b;return _0x280416=_0x280416[_0xeae17d(0x26b)](/<COLORLOCK>/gi,_0xeae17d(0x2e3)),_0x280416=_0x280416[_0xeae17d(0x26b)](/<\/COLORLOCK>/gi,_0xeae17d(0x14b)),_0x280416=_0x280416[_0xeae17d(0x26b)](/\(\(\(/gi,'\x1bCOLORLOCK[1]'),_0x280416=_0x280416[_0xeae17d(0x26b)](/\)\)\)/gi,_0xeae17d(0x14b)),_0x280416;},Window_Base['prototype']['convertBaseEscapeCharacters']=function(_0x3cc9b4){const _0x2cb1bb=_0x5bc23b;return _0x3cc9b4=_0x3cc9b4['replace'](/\x1bN\[(\d+)\]/gi,(_0x292997,_0x161755)=>this['actorName'](parseInt(_0x161755))),_0x3cc9b4=_0x3cc9b4['replace'](/\x1bP\[(\d+)\]/gi,(_0x20e90d,_0x4a2b8e)=>this[_0x2cb1bb(0x1a0)](parseInt(_0x4a2b8e))),_0x3cc9b4=_0x3cc9b4[_0x2cb1bb(0x26b)](/\x1bG/gi,TextManager[_0x2cb1bb(0x349)]),_0x3cc9b4;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x1fe)]=function(_0x2619a5){const _0x10e93f=_0x5bc23b;return _0x2619a5=_0x2619a5[_0x10e93f(0x26b)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x10e93f(0x303)]()),_0x2619a5=_0x2619a5[_0x10e93f(0x26b)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x10e93f(0x232)]()),_0x2619a5=_0x2619a5[_0x10e93f(0x26b)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this['battleActionName'](!![])),_0x2619a5=_0x2619a5[_0x10e93f(0x26b)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x10e93f(0x392)](![])),_0x2619a5;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x303)]=function(){const _0x4afb51=_0x5bc23b;if(!SceneManager[_0x4afb51(0x246)]())return'';if(BattleManager[_0x4afb51(0x201)])return BattleManager['_target']['name']();if(BattleManager[_0x4afb51(0x2be)][0x0])return BattleManager['_targets'][0x0][_0x4afb51(0x27c)]();return'';},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x232)]=function(){const _0x5104d8=_0x5bc23b;if(!SceneManager[_0x5104d8(0x246)]())return'';let _0x3be003=null;return _0x3be003=BattleManager[_0x5104d8(0x245)],!_0x3be003&&BattleManager[_0x5104d8(0x36b)]()&&(_0x3be003=BattleManager[_0x5104d8(0x362)]()),_0x3be003?_0x3be003['name']():'';},Window_Base[_0x5bc23b(0x25d)]['battleActionName']=function(_0x31882a){const _0x4d0008=_0x5bc23b;if(!SceneManager['isSceneBattle']())return'';let _0x289eb7=BattleManager[_0x4d0008(0x380)]||null;!_0x289eb7&&BattleManager[_0x4d0008(0x36b)]()&&(_0x4d0008(0x126)!==_0x4d0008(0x1f1)?_0x289eb7=BattleManager[_0x4d0008(0x20c)]():this[_0x4d0008(0x249)][_0x4d0008(0x347)](_0x506c9f));if(_0x289eb7&&_0x289eb7[_0x4d0008(0x262)]()){let _0x37c487='';if(_0x31882a)_0x37c487+='\x1bI[%1]'[_0x4d0008(0x154)](_0x289eb7[_0x4d0008(0x262)]()[_0x4d0008(0x28d)]);return _0x37c487+=_0x289eb7['item']()['name'],_0x37c487;}return'';},Window_Base[_0x5bc23b(0x25d)]['convertMessageCoreEscapeActions']=function(_0x5a4850){const _0x3cf5c4=_0x5bc23b;for(const _0x51d1d7 of VisuMZ[_0x3cf5c4(0x14c)][_0x3cf5c4(0x27a)][_0x3cf5c4(0x18d)]){if(_0x5a4850[_0x3cf5c4(0x16e)](_0x51d1d7[_0x3cf5c4(0x199)])){if('xCogu'!=='xCogu'){const _0x345eb4=_0x5a14eb['choicePositionType']();if(_0x345eb4===0x1)return(_0x17419f[_0x3cf5c4(0x1eb)]-this['windowWidth']())/0x2;else return _0x345eb4===0x2?this[_0x3cf5c4(0x188)]['x']+this['_messageWindow'][_0x3cf5c4(0x1f4)]-this[_0x3cf5c4(0x27e)]():this[_0x3cf5c4(0x188)]['x'];}else _0x5a4850=_0x5a4850['replace'](_0x51d1d7[_0x3cf5c4(0x199)],_0x51d1d7[_0x3cf5c4(0x397)]),_0x5a4850=this[_0x3cf5c4(0x345)](_0x5a4850);}}return _0x5a4850;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x263)]=function(_0x51cc6e){const _0x2f0f37=_0x5bc23b;for(const _0x48a88e of VisuMZ['MessageCore'][_0x2f0f37(0x27a)]['TextCodeReplace']){_0x2f0f37(0x1e6)==='vywIW'?this['_list'][_0x584b23][_0x2f0f37(0x33d)][0x0][_0x2f0f37(0x266)](_0x8778ef):_0x51cc6e[_0x2f0f37(0x16e)](_0x48a88e[_0x2f0f37(0x199)])&&(_0x51cc6e=_0x51cc6e[_0x2f0f37(0x26b)](_0x48a88e['textCodeCheck'],_0x48a88e[_0x2f0f37(0x397)][_0x2f0f37(0x2a4)](this)),_0x51cc6e=this['convertVariableEscapeCharacters'](_0x51cc6e));}return _0x51cc6e;},Window_Base[_0x5bc23b(0x25d)]['actorName']=function(_0x338d3d){const _0x3708ce=_0x5bc23b,_0x219472=_0x338d3d>=0x1?$gameActors['actor'](_0x338d3d):null,_0x4d8817=_0x219472?_0x219472[_0x3708ce(0x27c)]():'',_0x3b3069=Number(VisuMZ['MessageCore'][_0x3708ce(0x27a)][_0x3708ce(0x1fc)][_0x3708ce(0x311)]);if(this[_0x3708ce(0x1bd)]()&&_0x3b3069!==0x0){if('IEhSS'!==_0x3708ce(0x339)){const _0x27d972=this[_0x3708ce(0x219)](_0x3708ce(0x2c7));return _0x27d972>0xa?_0x2bdf82['instantTextSpeed']:_0x27d972;}else return _0x3708ce(0x3be)[_0x3708ce(0x154)](_0x3b3069,_0x4d8817);}else{if('ovIvH'==='EwjUi'){var _0x54b859=/^\<(.*?)\>/[_0x3708ce(0x306)](_0x1ff5b0[_0x3708ce(0x16a)][_0x3708ce(0x210)](_0x47dfe4['index']));return _0x54b859?(_0x32557c[_0x3708ce(0x2a5)]+=_0x54b859[0x0][_0x3708ce(0x1d7)],_0x773c4d(_0x54b859[0x0]['slice'](0x1,_0x54b859[0x0][_0x3708ce(0x1d7)]-0x1))):'';}else return _0x4d8817;}},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x1a0)]=function(_0x4851c4){const _0x9fdc9d=_0x5bc23b,_0x28824c=_0x4851c4>=0x1?$gameParty[_0x9fdc9d(0x256)]()[_0x4851c4-0x1]:null,_0x31b711=_0x28824c?_0x28824c[_0x9fdc9d(0x27c)]():'',_0x20df62=Number(VisuMZ[_0x9fdc9d(0x14c)][_0x9fdc9d(0x27a)][_0x9fdc9d(0x1fc)][_0x9fdc9d(0x311)]);if(this['isAutoColorAffected']()&&_0x20df62!==0x0){if(_0x9fdc9d(0x20a)===_0x9fdc9d(0x35d))!_0x55cf76[_0x9fdc9d(0x173)]?_0x286a1d[_0x9fdc9d(0x25d)][_0x9fdc9d(0x18c)]['call'](this,_0x3edd8e,_0x2be7fc):_0x26573a['MessageCore']['Window_Message_processEscapeCharacter'][_0x9fdc9d(0x191)](this,_0x1996d4,_0x6a5d47);else return _0x9fdc9d(0x3be)[_0x9fdc9d(0x154)](_0x20df62,_0x31b711);}else{if(_0x9fdc9d(0x1ac)==='kIbbL'){if(this[_0x9fdc9d(0x1d5)]===_0x52d692)this['initMessageCore']();if(this[_0x9fdc9d(0x1d5)][_0x9fdc9d(0x222)]===_0x21b223)this[_0x9fdc9d(0x377)]();return this[_0x9fdc9d(0x1d5)][_0x9fdc9d(0x222)];}else return _0x31b711;}},Window_Base['prototype'][_0x5bc23b(0x342)]=function(_0x4b72cd){const _0x3b2f46=_0x5bc23b;return this[_0x3b2f46(0x1bd)]()&&(_0x4b72cd=this['processStoredAutoColorChanges'](_0x4b72cd),_0x4b72cd=this[_0x3b2f46(0x1cb)](_0x4b72cd)),_0x4b72cd;},Window_Base['prototype'][_0x5bc23b(0x376)]=function(_0x1e71b1){const _0x13d5a4=_0x5bc23b;for(autoColor of VisuMZ[_0x13d5a4(0x14c)]['AutoColorRegExp']){if('lswwG'!==_0x13d5a4(0x15a))_0x1e71b1=_0x1e71b1[_0x13d5a4(0x26b)](autoColor[0x0],autoColor[0x1]);else{const _0x3be47e=_0x4d0431[_0x13d5a4(0x2d1)]();if(_0x3be47e['id']<0x0)return'';let _0x21f0f8=null;if(_0x3be47e['type']===0x0)_0x21f0f8=_0x5bdc43[_0x3be47e['id']];if(_0x3be47e[_0x13d5a4(0x1a9)]===0x1)_0x21f0f8=_0x3d75c5[_0x3be47e['id']];if(_0x3be47e[_0x13d5a4(0x1a9)]===0x2)_0x21f0f8=_0x57cd10[_0x3be47e['id']];if(!_0x21f0f8)return'';return _0x170260?_0x13d5a4(0x1af)[_0x13d5a4(0x154)](_0x21f0f8[_0x13d5a4(0x28d)],_0x21f0f8[_0x13d5a4(0x27c)]):_0x21f0f8[_0x13d5a4(0x27c)];}}return _0x1e71b1;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x271)]=function(){const _0x28213d=_0x5bc23b;this[_0x28213d(0x1ca)]=[];},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x28f)]=function(){const _0x56efdc=_0x5bc23b;this['clearActorNameAutoColor']();const _0x2c5acb=VisuMZ[_0x56efdc(0x14c)][_0x56efdc(0x27a)][_0x56efdc(0x1fc)],_0x41e17b=_0x2c5acb[_0x56efdc(0x311)];if(_0x41e17b<=0x0)return;for(const _0x5f3ade of $gameActors[_0x56efdc(0x14d)]){if(_0x56efdc(0x3b8)==='GHpDX'){this[_0x56efdc(0x38a)](_0x134679[_0x56efdc(0x158)]()),this[_0x56efdc(0x322)](_0x5199e8[_0x56efdc(0x1dc)]());const _0x2ba1cf=_0x47f356['MessageCore']['Settings'][_0x56efdc(0x1c1)];_0x2ba1cf['DefaultOutlineWidth']===_0x2debdf&&(_0x2ba1cf[_0x56efdc(0x28a)]=0x3),this[_0x56efdc(0x3c2)]['outlineWidth']=_0x2ba1cf[_0x56efdc(0x28a)],this[_0x56efdc(0x367)](![]);}else{if(!_0x5f3ade)continue;const _0x70aecf=_0x5f3ade[_0x56efdc(0x27c)]();if(_0x70aecf[_0x56efdc(0x2e6)]()[_0x56efdc(0x1d7)]<=0x0)continue;if(/^\d+$/[_0x56efdc(0x373)](_0x70aecf))continue;if(_0x70aecf[_0x56efdc(0x16e)](/-----/i))continue;let _0x59f4c1=VisuMZ[_0x56efdc(0x14c)][_0x56efdc(0x366)](_0x70aecf);const _0x5a2de1=new RegExp('\x5cb'+_0x59f4c1+'\x5cb','g'),_0x4a7967=_0x56efdc(0x3be)[_0x56efdc(0x154)](_0x41e17b,_0x70aecf);this[_0x56efdc(0x1ca)][_0x56efdc(0x266)]([_0x5a2de1,_0x4a7967]);}}},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x1cb)]=function(_0x1a5d45){const _0x187eec=_0x5bc23b;this['_autoColorActorNames']===undefined&&this[_0x187eec(0x28f)]();for(autoColor of this['_autoColorActorNames']){if(_0x187eec(0x2ac)!==_0x187eec(0x194))_0x1a5d45=_0x1a5d45[_0x187eec(0x26b)](autoColor[0x0],autoColor[0x1]);else{_0x305cd0[_0x187eec(0x14c)]['ParseStateNotetags'][_0x187eec(0x191)](this,_0x4f470c);const _0x20f97e=_0x37de29[_0x187eec(0x14c)][_0x187eec(0x27a)][_0x187eec(0x1fc)];_0x2ecd16[_0x187eec(0x14c)][_0x187eec(0x363)](_0x382614,_0x20f97e[_0x187eec(0x383)]);}}return _0x1a5d45;},Window_Base[_0x5bc23b(0x25d)]['databaseObjectName']=function(_0x2a5127,_0x63a0a9,_0x2d78c6){const _0x12d33e=_0x5bc23b;if(!_0x2a5127)return'';const _0x1d2303=_0x2a5127[_0x63a0a9];let _0xf57bbf='';if(_0x1d2303&&_0x2d78c6&&_0x1d2303[_0x12d33e(0x28d)]){const _0x3d3a58=_0x12d33e(0x1af);_0xf57bbf=_0x3d3a58[_0x12d33e(0x154)](_0x1d2303[_0x12d33e(0x28d)],_0x1d2303[_0x12d33e(0x27c)]);}else _0x1d2303?_0xf57bbf=_0x1d2303['name']:_0xf57bbf='';if(this[_0x12d33e(0x1bd)]()){if('worDP'!==_0x12d33e(0x29d))_0xf57bbf=this[_0x12d33e(0x257)](_0xf57bbf,_0x2a5127);else{const _0x2f9ffe=_0x43202f[_0x12d33e(0x1e5)]('['+_0x114072['$1']['match'](/\d+/g)+']');for(const _0x484de4 of _0x2f9ffe){if(!_0x367d2d[_0x12d33e(0x325)](_0x484de4))return![];}return!![];}}return _0xf57bbf;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x233)]=function(_0x448550){const _0x456817=_0x5bc23b,_0x2aa8b7=$gameParty[_0x456817(0x2d1)]();if(_0x2aa8b7['id']<0x0)return'';let _0x2b2b2b=null;if(_0x2aa8b7[_0x456817(0x1a9)]===0x0)_0x2b2b2b=$dataItems[_0x2aa8b7['id']];if(_0x2aa8b7[_0x456817(0x1a9)]===0x1)_0x2b2b2b=$dataWeapons[_0x2aa8b7['id']];if(_0x2aa8b7[_0x456817(0x1a9)]===0x2)_0x2b2b2b=$dataArmors[_0x2aa8b7['id']];if(!_0x2b2b2b)return'';return _0x448550?_0x456817(0x1af)[_0x456817(0x154)](_0x2b2b2b[_0x456817(0x28d)],_0x2b2b2b[_0x456817(0x27c)]):_0x2b2b2b[_0x456817(0x27c)];},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x290)]=function(){const _0x9d2763=_0x5bc23b,_0x57d9f6=$gameParty[_0x9d2763(0x2d1)]();if(_0x57d9f6['id']<=0x0)return'';return _0x57d9f6[_0x9d2763(0x157)];},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x257)]=function(_0xeee95e,_0x394302){const _0x591f5a=_0x5bc23b,_0x31d283=VisuMZ['MessageCore'][_0x591f5a(0x27a)][_0x591f5a(0x1fc)];let _0x27c40d=0x0;if(_0x394302===$dataActors)_0x27c40d=_0x31d283[_0x591f5a(0x311)];if(_0x394302===$dataClasses)_0x27c40d=_0x31d283[_0x591f5a(0x13b)];if(_0x394302===$dataSkills)_0x27c40d=_0x31d283[_0x591f5a(0x227)];if(_0x394302===$dataItems)_0x27c40d=_0x31d283[_0x591f5a(0x2fb)];if(_0x394302===$dataWeapons)_0x27c40d=_0x31d283[_0x591f5a(0x3af)];if(_0x394302===$dataArmors)_0x27c40d=_0x31d283[_0x591f5a(0x2ca)];if(_0x394302===$dataEnemies)_0x27c40d=_0x31d283[_0x591f5a(0x15c)];if(_0x394302===$dataStates)_0x27c40d=_0x31d283[_0x591f5a(0x383)];if(_0x27c40d>0x0){if(_0x591f5a(0x2a6)===_0x591f5a(0x3b9)){if(!_0x3d64ae[_0x591f5a(0x325)](_0x33bd77))return![];}else _0xeee95e=_0x591f5a(0x3be)[_0x591f5a(0x154)](_0x27c40d,_0xeee95e);}return _0xeee95e;},Window_Base['prototype'][_0x5bc23b(0x128)]=function(_0x56eea2){const _0x1b1507=_0x5bc23b;_0x56eea2=_0x56eea2[_0x1b1507(0x26b)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x144b71,_0x55166c)=>this[_0x1b1507(0x38c)](!![])),_0x56eea2=_0x56eea2[_0x1b1507(0x26b)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x5cc6eb,_0x2c5dbf)=>this[_0x1b1507(0x38c)](![])),_0x56eea2=_0x56eea2[_0x1b1507(0x26b)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x304af9,_0x25d7ad)=>this[_0x1b1507(0x38c)](![]));if(_0x56eea2[_0x1b1507(0x16e)](Window_Message[_0x1b1507(0x378)]))_0x1b1507(0x1c0)!=='gSrud'?this[_0x1b1507(0x38c)](![]):this[_0x1b1507(0x321)]();else _0x56eea2[_0x1b1507(0x16e)](Window_Message[_0x1b1507(0x2c1)])&&this[_0x1b1507(0x38c)](![]);if(!this['isWordWrapEnabled']())return _0x56eea2;if(_0x56eea2['length']<=0x0)return _0x56eea2;return VisuMZ[_0x1b1507(0x14c)][_0x1b1507(0x27a)][_0x1b1507(0x2c2)]['LineBreakSpace']?(_0x56eea2=_0x56eea2[_0x1b1507(0x26b)](/[\n\r]+/g,'\x20'),_0x56eea2=_0x56eea2[_0x1b1507(0x26b)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):_0x1b1507(0x172)!==_0x1b1507(0x273)?(_0x56eea2=_0x56eea2['replace'](/[\n\r]+/g,''),_0x56eea2=_0x56eea2[_0x1b1507(0x26b)](/<(?:BR|LINEBREAK)>/gi,'\x0a')):this[_0x1b1507(0x178)](),_0x56eea2=this[_0x1b1507(0x365)](_0x56eea2),_0x56eea2=_0x56eea2[_0x1b1507(0x1ae)]('\x20')[_0x1b1507(0x289)]('\x1bWrapBreak[0]'),_0x56eea2=_0x56eea2[_0x1b1507(0x26b)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x56eea2=_0x56eea2[_0x1b1507(0x26b)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x56eea2;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x365)]=function(_0x32ab8e){return _0x32ab8e;},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x3b4)]=Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x2b7)],Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x2b7)]=function(_0x4dad24){const _0x27df1d=_0x5bc23b;VisuMZ[_0x27df1d(0x14c)]['Window_Base_processNewLine']['call'](this,_0x4dad24),this[_0x27df1d(0x2d3)](_0x4dad24);},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x15d)]=Window_Base['prototype'][_0x5bc23b(0x1f8)],Window_Base[_0x5bc23b(0x25d)]['processControlCharacter']=function(_0x2885c6,_0x37494b){const _0x5869bd=_0x5bc23b;VisuMZ[_0x5869bd(0x14c)][_0x5869bd(0x15d)][_0x5869bd(0x191)](this,_0x2885c6,_0x37494b);if(_0x37494b===_0x5869bd(0x360)){if('cyudW'===_0x5869bd(0x358))this['processWrapBreak'](_0x2885c6);else return!![];}},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x317)]=function(_0x4d3ab9){const _0x6bd0cb=_0x5bc23b;var _0x1e0a3f=/^\<(.*?)\>/['exec'](_0x4d3ab9[_0x6bd0cb(0x16a)]['slice'](_0x4d3ab9['index']));if(_0x1e0a3f){if('bPpLF'!=='PcbPI')return _0x4d3ab9[_0x6bd0cb(0x2a5)]+=_0x1e0a3f[0x0][_0x6bd0cb(0x1d7)],String(_0x1e0a3f[0x0]['slice'](0x1,_0x1e0a3f[0x0]['length']-0x1));else _0xaa4941[_0x6bd0cb(0x204)](_0x3427eb(_0x3d9813));}else return'lmobr'!==_0x6bd0cb(0x3a6)?(this['_relativePosition']=_0x25d971,''):'';},VisuMZ[_0x5bc23b(0x14c)]['Window_Base_processEscapeCharacter']=Window_Base[_0x5bc23b(0x25d)]['processEscapeCharacter'],Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x18c)]=function(_0x2ecb63,_0x517975){const _0x36bc9c=_0x5bc23b;switch(_0x2ecb63){case'C':_0x517975[_0x36bc9c(0x173)]?_0x36bc9c(0x1bf)===_0x36bc9c(0x37e)?_0x5209c8=_0x3bbd5f[_0x36bc9c(0x20c)]():VisuMZ['MessageCore'][_0x36bc9c(0x274)]['call'](this,_0x2ecb63,_0x517975):this[_0x36bc9c(0x19e)](_0x517975);break;case'I':case'{':case'}':VisuMZ[_0x36bc9c(0x14c)]['Window_Base_processEscapeCharacter']['call'](this,_0x2ecb63,_0x517975);break;case'FS':this[_0x36bc9c(0x196)](_0x517975);break;case'PX':this[_0x36bc9c(0x13a)](_0x517975);break;case'PY':this[_0x36bc9c(0x1d6)](_0x517975);break;case _0x36bc9c(0x127):this[_0x36bc9c(0x310)](this[_0x36bc9c(0x19e)](_0x517975));break;case _0x36bc9c(0x1b9):this[_0x36bc9c(0x3c3)](_0x517975);break;case _0x36bc9c(0x186):this['processColorLock'](_0x517975);break;case _0x36bc9c(0x148):this[_0x36bc9c(0x39c)](_0x517975);break;case _0x36bc9c(0x19a):this[_0x36bc9c(0x190)](this[_0x36bc9c(0x19e)](_0x517975));break;case _0x36bc9c(0x13d):this[_0x36bc9c(0x324)](_0x517975);break;case _0x36bc9c(0x294):this[_0x36bc9c(0x36a)](_0x517975);break;case _0x36bc9c(0x267):this[_0x36bc9c(0x1ba)](_0x517975);break;case _0x36bc9c(0x170):this[_0x36bc9c(0x29a)](_0x517975);break;case _0x36bc9c(0x316):this['processWrapBreak'](_0x517975);break;default:this[_0x36bc9c(0x313)](_0x2ecb63,_0x517975);}},Window_Base['prototype']['processMessageCoreEscapeActions']=function(_0x4d2845,_0x467b10){const _0x697291=_0x5bc23b;for(const _0x23e703 of VisuMZ[_0x697291(0x14c)][_0x697291(0x27a)][_0x697291(0x18d)]){if(_0x23e703[_0x697291(0x217)]===_0x4d2845){if(_0x23e703[_0x697291(0x135)]==='')this[_0x697291(0x19e)](_0x467b10);_0x23e703[_0x697291(0x2fd)][_0x697291(0x191)](this,_0x467b10);if(this[_0x697291(0x3b0)]===Window_Message){const _0x5ca5a6=_0x23e703[_0x697291(0x2e0)]||0x0;if(_0x5ca5a6>0x0)this[_0x697291(0x1ff)](_0x5ca5a6);}}}},Window_Base['prototype'][_0x5bc23b(0x3ba)]=function(){const _0x1f5a44=_0x5bc23b;this['contents'][_0x1f5a44(0x1aa)]+=VisuMZ['MessageCore'][_0x1f5a44(0x27a)][_0x1f5a44(0x1c1)][_0x1f5a44(0x23f)],this[_0x1f5a44(0x3c2)]['fontSize']=Math[_0x1f5a44(0x36e)](this['contents'][_0x1f5a44(0x1aa)],VisuMZ[_0x1f5a44(0x14c)]['Settings']['General'][_0x1f5a44(0x2fe)]);},Window_Base['prototype'][_0x5bc23b(0x321)]=function(){const _0x18716b=_0x5bc23b;this['contents'][_0x18716b(0x1aa)]-=VisuMZ['MessageCore'][_0x18716b(0x27a)]['General']['FontChangeValue'],this[_0x18716b(0x3c2)][_0x18716b(0x1aa)]=Math['max'](this[_0x18716b(0x3c2)][_0x18716b(0x1aa)],VisuMZ[_0x18716b(0x14c)][_0x18716b(0x27a)]['General'][_0x18716b(0x1f3)]);},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x196)]=function(_0x36e7ba){const _0x162e54=_0x5bc23b,_0x1b33d1=this[_0x162e54(0x19e)](_0x36e7ba);this[_0x162e54(0x3c2)][_0x162e54(0x1aa)]=_0x1b33d1[_0x162e54(0x305)](VisuMZ[_0x162e54(0x14c)][_0x162e54(0x27a)]['General'][_0x162e54(0x1f3)],VisuMZ['MessageCore'][_0x162e54(0x27a)][_0x162e54(0x1c1)][_0x162e54(0x2fe)]);},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x15f)]=function(_0x571df1){const _0x2d1f99=_0x5bc23b;let _0x115df9=this[_0x2d1f99(0x3c2)][_0x2d1f99(0x1aa)];const _0x16efa7=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x24faa7=_0x16efa7[_0x2d1f99(0x306)](_0x571df1);if(!_0x24faa7)break;const _0x2ab1ae=String(_0x24faa7[0x1])[_0x2d1f99(0x28b)]();if(_0x2ab1ae==='{'){if('wdXrA'!==_0x2d1f99(0x391))this['makeFontBigger']();else return this[_0x2d1f99(0x352)]()===0x191;}else{if(_0x2ab1ae==='}')this[_0x2d1f99(0x321)]();else _0x2ab1ae==='FS'&&(this[_0x2d1f99(0x3c2)][_0x2d1f99(0x1aa)]=parseInt(_0x24faa7[0x3])[_0x2d1f99(0x305)](VisuMZ[_0x2d1f99(0x14c)][_0x2d1f99(0x27a)][_0x2d1f99(0x1c1)]['FontSmallerCap'],VisuMZ['MessageCore'][_0x2d1f99(0x27a)][_0x2d1f99(0x1c1)][_0x2d1f99(0x2fe)]));}this[_0x2d1f99(0x3c2)][_0x2d1f99(0x1aa)]>_0x115df9&&(_0x115df9=this[_0x2d1f99(0x3c2)][_0x2d1f99(0x1aa)]);}return _0x115df9;},Window_Base['prototype'][_0x5bc23b(0x13a)]=function(_0x11ce2d){const _0x27497f=_0x5bc23b;_0x11ce2d['x']=this['obtainEscapeParam'](_0x11ce2d),VisuMZ['MessageCore']['Settings'][_0x27497f(0x1c1)][_0x27497f(0x3b3)]&&(_0x11ce2d['x']+=_0x11ce2d[_0x27497f(0x2d4)]);},Window_Base[_0x5bc23b(0x25d)]['processPyTextCode']=function(_0x303243){const _0x43e2da=_0x5bc23b;_0x303243['y']=this[_0x43e2da(0x19e)](_0x303243),VisuMZ['MessageCore'][_0x43e2da(0x27a)]['General']['RelativePXPY']&&(_0x303243['y']+=_0x303243['startY']);},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x310)]=function(_0x54be18){const _0x3278a6=_0x5bc23b;this[_0x3278a6(0x3c2)][_0x3278a6(0x1b8)]=!!_0x54be18;},Window_Base[_0x5bc23b(0x25d)]['processFontChangeItalic']=function(_0x2ca70f){const _0x58520e=_0x5bc23b;this[_0x58520e(0x3c2)][_0x58520e(0x1cc)]=!!_0x2ca70f;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x1ba)]=function(_0x5283a0){const _0x14c568=_0x5bc23b,_0x5d1622=this[_0x14c568(0x19e)](_0x5283a0);if(!_0x5283a0['drawing'])return;switch(_0x5d1622){case 0x0:this[_0x14c568(0x36f)](_0x14c568(0x38f));return;case 0x1:this['setTextAlignment'](_0x14c568(0x2f8));break;case 0x2:this[_0x14c568(0x36f)](_0x14c568(0x1be));break;case 0x3:this[_0x14c568(0x36f)](_0x14c568(0x393));break;}this['processTextAlignmentX'](_0x5283a0);},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x2d3)]=function(_0xda1a71){const _0x52220a=_0x5bc23b;if(!_0xda1a71[_0x52220a(0x173)])return;if(_0xda1a71[_0x52220a(0x334)])return;if(this[_0x52220a(0x2ba)]()===_0x52220a(0x38f))return;let _0x22eba0=_0xda1a71['text'][_0x52220a(0x304)](_0x52220a(0x25a),_0xda1a71[_0x52220a(0x2a5)]+0x1),_0xc7c033=_0xda1a71[_0x52220a(0x16a)][_0x52220a(0x304)]('\x0a',_0xda1a71[_0x52220a(0x2a5)]+0x1);if(_0x22eba0<0x0)_0x22eba0=_0xda1a71[_0x52220a(0x16a)][_0x52220a(0x1d7)]+0x1;if(_0xc7c033>0x0)_0x22eba0=Math[_0x52220a(0x36e)](_0x22eba0,_0xc7c033);const _0x17d3ff=_0xda1a71[_0x52220a(0x16a)][_0x52220a(0x169)](_0xda1a71[_0x52220a(0x2a5)],_0x22eba0),_0x4f7e64=this[_0x52220a(0x35e)](_0x17d3ff)[_0x52220a(0x1f4)],_0xb97587=_0xda1a71[_0x52220a(0x1f4)]||this['innerWidth']-0x8,_0x85fd39=this[_0x52220a(0x3b0)]===Window_Message&&$gameMessage[_0x52220a(0x327)]()!=='';switch(this[_0x52220a(0x2ba)]()){case _0x52220a(0x2f8):_0xda1a71['x']=_0xda1a71[_0x52220a(0x2d4)];break;case _0x52220a(0x1be):_0xda1a71['x']=_0xda1a71[_0x52220a(0x2d4)],_0xda1a71['x']+=Math[_0x52220a(0x212)]((_0xb97587-_0x4f7e64)/0x2);_0x85fd39&&(_0xda1a71['x']-=_0xda1a71[_0x52220a(0x2d4)]/0x2);break;case _0x52220a(0x393):_0xda1a71['x']=_0xb97587-_0x4f7e64+_0xda1a71[_0x52220a(0x2d4)];_0x85fd39&&(_0x52220a(0x21f)===_0x52220a(0x21f)?_0xda1a71['x']-=_0xda1a71['startX']:!_0x4e3e9f[_0x52220a(0x398)]?this[_0x52220a(0x249)]['remove'](_0x279a38):_0x59b0c0[_0x52220a(0x37b)]());break;}},Window_Base['prototype'][_0x5bc23b(0x35e)]=function(_0x58f1b2){const _0x3fd9a0=_0x5bc23b;_0x58f1b2=_0x58f1b2[_0x3fd9a0(0x26b)](/\x1b!/g,''),_0x58f1b2=_0x58f1b2['replace'](/\x1b\|/g,''),_0x58f1b2=_0x58f1b2[_0x3fd9a0(0x26b)](/\x1b\./g,'');const _0x4e5934=this['createTextState'](_0x58f1b2,0x0,0x0,0x0),_0x59e84b=this[_0x3fd9a0(0x20f)]();return _0x4e5934[_0x3fd9a0(0x173)]=![],this[_0x3fd9a0(0x220)](_0x4e5934),this[_0x3fd9a0(0x296)](_0x59e84b),{'width':_0x4e5934[_0x3fd9a0(0x1ed)],'height':_0x4e5934[_0x3fd9a0(0x32a)]};},Window_Base['WORD_WRAP_PADDING']=VisuMZ['MessageCore'][_0x5bc23b(0x27a)][_0x5bc23b(0x2c2)][_0x5bc23b(0x23e)]||0x0,Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x125)]=function(_0x4b024e){const _0x41e841=_0x5bc23b,_0x34b385=(_0x4b024e['rtl']?-0x1:0x1)*this[_0x41e841(0x1c2)]('\x20');_0x4b024e['x']+=_0x34b385;if(this['obtainEscapeParam'](_0x4b024e)>0x0)_0x4b024e['x']+=_0x34b385;if(_0x4b024e[_0x41e841(0x334)])return;let _0x1802c4=_0x4b024e[_0x41e841(0x16a)][_0x41e841(0x304)](_0x41e841(0x360),_0x4b024e[_0x41e841(0x2a5)]+0x1),_0x1aa4bb=_0x4b024e[_0x41e841(0x16a)][_0x41e841(0x304)]('\x0a',_0x4b024e[_0x41e841(0x2a5)]+0x1);if(_0x1802c4<0x0)_0x1802c4=_0x4b024e[_0x41e841(0x16a)]['length']+0x1;if(_0x1aa4bb>0x0)_0x1802c4=Math[_0x41e841(0x36e)](_0x1802c4,_0x1aa4bb);const _0x4cbd83=_0x4b024e[_0x41e841(0x16a)][_0x41e841(0x169)](_0x4b024e[_0x41e841(0x2a5)],_0x1802c4),_0x123c62=this[_0x41e841(0x340)](_0x4cbd83)[_0x41e841(0x1f4)];let _0x4d792a=_0x4b024e[_0x41e841(0x1f4)]||this['innerWidth'];_0x4d792a-=Window_Base[_0x41e841(0x238)];if(this[_0x41e841(0x3b0)]===Window_Message){if(_0x41e841(0x2d9)!=='QnPOE')return 0x0;else{const _0x711b3=$gameMessage['faceName']()===''?0x0:ImageManager['faceWidth']+0x14;_0x4d792a-=_0x711b3;if(VisuMZ[_0x41e841(0x14c)][_0x41e841(0x27a)][_0x41e841(0x2c2)]['TightWrap']){if(_0x41e841(0x12d)!==_0x41e841(0x24d))_0x4d792a-=_0x711b3;else{let _0x126f40=_0x363fd2;return _0x126f40=_0x126f40['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x126f40=_0x126f40['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x126f40;}}}}let _0x501f59=![];if(_0x4b024e['x']+_0x123c62>_0x4b024e[_0x41e841(0x2d4)]+_0x4d792a)_0x501f59=!![];if(_0x123c62===0x0)_0x501f59=!![];_0x501f59&&(_0x4b024e[_0x41e841(0x16a)]=_0x4b024e[_0x41e841(0x16a)]['slice'](0x0,_0x4b024e['index'])+'\x0a'+_0x4b024e[_0x41e841(0x16a)][_0x41e841(0x137)](_0x4b024e['index']));},Window_Base['prototype'][_0x5bc23b(0x340)]=function(_0x1eaf29){const _0x19fb5a=_0x5bc23b,_0x41c168=this[_0x19fb5a(0x18a)](_0x1eaf29,0x0,0x0,0x0),_0x148b2e=this[_0x19fb5a(0x20f)]();return _0x41c168[_0x19fb5a(0x173)]=![],this[_0x19fb5a(0x38c)](![]),this['processAllText'](_0x41c168),this[_0x19fb5a(0x38c)](!![]),this[_0x19fb5a(0x296)](_0x148b2e),{'width':_0x41c168[_0x19fb5a(0x1ed)],'height':_0x41c168[_0x19fb5a(0x32a)]};},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x39c)]=function(_0x45198b){const _0x347f2c=_0x5bc23b;return this[_0x347f2c(0x19e)](_0x45198b);},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x324)]=function(_0x1ceb52){const _0x56c14b=_0x5bc23b,_0x1cd9f9=this['obtainEscapeString'](_0x1ceb52)[_0x56c14b(0x1ae)](',');if(!_0x1ceb52['drawing'])return;const _0x192eab=_0x1cd9f9[0x0][_0x56c14b(0x2e6)](),_0x8f9cff=_0x1cd9f9[0x1]||0x0,_0x40bd18=_0x1cd9f9[0x2]||0x0,_0x57187d=ImageManager[_0x56c14b(0x1a6)](_0x192eab),_0x30fe7d=this[_0x56c14b(0x3c2)][_0x56c14b(0x37c)];_0x57187d[_0x56c14b(0x197)](this[_0x56c14b(0x2b9)][_0x56c14b(0x2a4)](this,_0x57187d,_0x1ceb52['x'],_0x1ceb52['y'],_0x8f9cff,_0x40bd18,_0x30fe7d));},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x2b9)]=function(_0x2f1e53,_0xbbd399,_0x2eec85,_0xfff3c9,_0x564f28,_0x5d30b8){const _0x459944=_0x5bc23b;_0xfff3c9=_0xfff3c9||_0x2f1e53[_0x459944(0x1f4)],_0x564f28=_0x564f28||_0x2f1e53[_0x459944(0x34b)],this[_0x459944(0x2c8)][_0x459944(0x37c)]=_0x5d30b8,this[_0x459944(0x2c8)][_0x459944(0x2da)](_0x2f1e53,0x0,0x0,_0x2f1e53['width'],_0x2f1e53[_0x459944(0x34b)],_0xbbd399,_0x2eec85,_0xfff3c9,_0x564f28),this[_0x459944(0x2c8)][_0x459944(0x37c)]=0xff;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x3c3)]=function(_0x3c3347){const _0x567805=_0x5bc23b,_0x89d813=this[_0x567805(0x317)](_0x3c3347)['split'](',');if(!_0x3c3347['drawing'])return;const _0x3662f1=_0x89d813[0x0]['trim'](),_0xcd2d4d=ImageManager[_0x567805(0x1a6)](_0x3662f1),_0x5a6339=JsonEx[_0x567805(0x276)](_0x3c3347),_0x37fd83=this[_0x567805(0x3c2)]['paintOpacity'];_0xcd2d4d[_0x567805(0x197)](this[_0x567805(0x341)]['bind'](this,_0xcd2d4d,_0x5a6339,_0x37fd83));},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x341)]=function(_0x1bbc0a,_0x3a37c1,_0x39b720){const _0x57dc89=_0x5bc23b,_0x36c62d=_0x3a37c1[_0x57dc89(0x1f4)]||this[_0x57dc89(0x1fb)],_0x4edce0=this[_0x57dc89(0x12f)]!==undefined?this[_0x57dc89(0x1d1)]():this[_0x57dc89(0x264)],_0x12f1db=_0x36c62d/_0x1bbc0a[_0x57dc89(0x1f4)],_0x34daad=_0x4edce0/_0x1bbc0a['height'],_0x536733=Math[_0x57dc89(0x36e)](_0x12f1db,_0x34daad,0x1),_0x212f7f=this['_index']!==undefined?(this['itemRectWithPadding'](0x0)['height']-this[_0x57dc89(0x24a)]())/0x2:0x0,_0x184eca=_0x1bbc0a['width']*_0x536733,_0x175e3b=_0x1bbc0a['height']*_0x536733,_0x46dbfb=Math['floor']((_0x36c62d-_0x184eca)/0x2)+_0x3a37c1[_0x57dc89(0x2d4)],_0x52e5f3=Math[_0x57dc89(0x212)]((_0x4edce0-_0x175e3b)/0x2)+_0x3a37c1[_0x57dc89(0x131)]-_0x212f7f*0x2;this['contentsBack'][_0x57dc89(0x37c)]=_0x39b720,this[_0x57dc89(0x2c8)][_0x57dc89(0x2da)](_0x1bbc0a,0x0,0x0,_0x1bbc0a[_0x57dc89(0x1f4)],_0x1bbc0a[_0x57dc89(0x34b)],_0x46dbfb,_0x52e5f3,_0x184eca,_0x175e3b),this[_0x57dc89(0x2c8)]['paintOpacity']=0xff;},Window_Base[_0x5bc23b(0x25d)][_0x5bc23b(0x221)]=function(_0x1c38b8){const _0x24a12d=_0x5bc23b,_0x3a07d1=this[_0x24a12d(0x19e)](_0x1c38b8);if(_0x1c38b8[_0x24a12d(0x173)])this[_0x24a12d(0x367)](_0x3a07d1>0x0);},Window_Base[_0x5bc23b(0x25d)]['processCustomWait']=function(_0x20a599){const _0x3ee005=_0x5bc23b,_0x297738=this[_0x3ee005(0x19e)](_0x20a599);this['constructor']===Window_Message&&_0x20a599[_0x3ee005(0x173)]&&this['startWait'](_0x297738);},Window_Help['prototype'][_0x5bc23b(0x2f2)]=function(){const _0x5339b4=_0x5bc23b;this[_0x5339b4(0x38c)]($gameSystem[_0x5339b4(0x17b)]());},Window_Help[_0x5bc23b(0x25d)][_0x5bc23b(0x1bd)]=function(){return!![];},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x160)]=Window_Help['prototype'][_0x5bc23b(0x3ae)],Window_Help['prototype'][_0x5bc23b(0x3ae)]=function(){const _0x5e1854=_0x5bc23b;this[_0x5e1854(0x271)](),VisuMZ[_0x5e1854(0x14c)][_0x5e1854(0x160)][_0x5e1854(0x191)](this),this[_0x5e1854(0x2f2)]();},VisuMZ[_0x5bc23b(0x14c)]['Window_Options_addGeneralOptions']=Window_Options[_0x5bc23b(0x25d)][_0x5bc23b(0x25e)],Window_Options[_0x5bc23b(0x25d)]['addGeneralOptions']=function(){const _0x3b1ef7=_0x5bc23b;VisuMZ[_0x3b1ef7(0x14c)][_0x3b1ef7(0x300)][_0x3b1ef7(0x191)](this),this[_0x3b1ef7(0x31f)]();},Window_Options['prototype'][_0x5bc23b(0x31f)]=function(){const _0x4e005a=_0x5bc23b;VisuMZ[_0x4e005a(0x14c)][_0x4e005a(0x27a)][_0x4e005a(0x331)][_0x4e005a(0x307)]&&this[_0x4e005a(0x301)]();},Window_Options['prototype']['addMessageCoreTextSpeedCommand']=function(){const _0x58e86b=_0x5bc23b,_0x297e72=TextManager[_0x58e86b(0x255)],_0x2f41fb='textSpeed';this[_0x58e86b(0x3bc)](_0x297e72,_0x2f41fb);},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x213)]=Window_Options['prototype']['statusText'],Window_Options[_0x5bc23b(0x25d)][_0x5bc23b(0x1c5)]=function(_0x289f40){const _0x3258b4=_0x5bc23b,_0x2b3a67=this[_0x3258b4(0x211)](_0x289f40);if(_0x2b3a67===_0x3258b4(0x2c7))return this['textSpeedStatusText']();return VisuMZ[_0x3258b4(0x14c)][_0x3258b4(0x213)][_0x3258b4(0x191)](this,_0x289f40);},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x31e)]=Window_Options[_0x5bc23b(0x25d)][_0x5bc23b(0x1a2)],Window_Options[_0x5bc23b(0x25d)][_0x5bc23b(0x1a2)]=function(_0x4719b8){const _0xca44d2=_0x5bc23b;if(_0x4719b8===_0xca44d2(0x2c7))return!![];return VisuMZ[_0xca44d2(0x14c)]['Window_Options_isVolumeSymbol'][_0xca44d2(0x191)](this,_0x4719b8);},Window_Options[_0x5bc23b(0x25d)][_0x5bc23b(0x168)]=function(){const _0x3b7240=_0x5bc23b,_0x2e5dc7=this[_0x3b7240(0x219)](_0x3b7240(0x2c7));return _0x2e5dc7>0xa?TextManager[_0x3b7240(0x192)]:_0x2e5dc7;},VisuMZ[_0x5bc23b(0x14c)]['Window_Options_changeVolume']=Window_Options['prototype'][_0x5bc23b(0x368)],Window_Options['prototype'][_0x5bc23b(0x368)]=function(_0x336025,_0xb98e1e,_0x224ce5){const _0x49ba95=_0x5bc23b;if(_0x336025===_0x49ba95(0x2c7))return this[_0x49ba95(0x3ad)](_0x336025,_0xb98e1e,_0x224ce5);VisuMZ[_0x49ba95(0x14c)]['Window_Options_changeVolume'][_0x49ba95(0x191)](this,_0x336025,_0xb98e1e,_0x224ce5);},Window_Options[_0x5bc23b(0x25d)][_0x5bc23b(0x3ad)]=function(_0x590a7d,_0x990dc3,_0x1072fe){const _0x58f2eb=_0x5bc23b,_0xe95c90=this[_0x58f2eb(0x219)](_0x590a7d),_0x53bf69=0x1,_0x2708d7=_0xe95c90+(_0x990dc3?_0x53bf69:-_0x53bf69);if(_0x2708d7>0xb&&_0x1072fe)this[_0x58f2eb(0x33b)](_0x590a7d,0x1);else{if(_0x58f2eb(0x265)!==_0x58f2eb(0x244))this[_0x58f2eb(0x33b)](_0x590a7d,_0x2708d7[_0x58f2eb(0x305)](0x1,0xb));else{if(this['_MessageCoreSettings']===_0x26e764)this[_0x58f2eb(0x377)]();if(this[_0x58f2eb(0x1d5)]['messageWordWrap']===_0x13b71b)this[_0x58f2eb(0x377)]();this[_0x58f2eb(0x1d5)][_0x58f2eb(0x17c)]=_0x170a9c;}}},Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x3a8)]=function(){const _0x377018=_0x5bc23b;let _0x1981d3=Window_Base['prototype'][_0x377018(0x3a8)][_0x377018(0x191)](this);return _0x1981d3-=this[_0x377018(0x2d6)](),_0x1981d3;},Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x235)]=function(){const _0xb20480=_0x5bc23b;Window_Base['prototype'][_0xb20480(0x235)][_0xb20480(0x191)](this),VisuMZ[_0xb20480(0x14c)]['Settings'][_0xb20480(0x1c1)]['StretchDimmedBg']&&this[_0xb20480(0x3a7)]();},Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x3a7)]=function(){const _0x222daa=_0x5bc23b;this[_0x222daa(0x17e)]['x']=Math[_0x222daa(0x1e9)](this[_0x222daa(0x1f4)]/0x2),this['_dimmerSprite'][_0x222daa(0x150)]['x']=0.5,this[_0x222daa(0x17e)][_0x222daa(0x2ec)]['x']=Graphics[_0x222daa(0x1f4)];},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x3c5)]=Window_Message[_0x5bc23b(0x25d)]['clearFlags'],Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x15b)]=function(){const _0x39c762=_0x5bc23b;VisuMZ[_0x39c762(0x14c)][_0x39c762(0x3c5)][_0x39c762(0x191)](this),this[_0x39c762(0x271)](),this[_0x39c762(0x2f2)](),this[_0x39c762(0x367)](![]),this['setTextAlignment'](_0x39c762(0x38f)),this[_0x39c762(0x3b5)](VisuMZ[_0x39c762(0x14c)]['Settings']['General'][_0x39c762(0x382)]);},Window_Message[_0x5bc23b(0x25d)]['resetWordWrap']=function(){const _0x18f85b=_0x5bc23b;this[_0x18f85b(0x38c)]($gameSystem[_0x18f85b(0x282)]());},Window_Message[_0x5bc23b(0x25d)]['isAutoColorAffected']=function(){return!![];},Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x3b5)]=function(_0x1ff306){const _0x257cd8=_0x5bc23b,_0x37389d=0xb-ConfigManager[_0x257cd8(0x2c7)];_0x1ff306=Math['round'](_0x1ff306*_0x37389d),this[_0x257cd8(0x333)]=_0x1ff306,this[_0x257cd8(0x33a)]=_0x1ff306;},VisuMZ[_0x5bc23b(0x14c)]['Window_Message_isTriggered']=Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x1ab)],Window_Message['prototype']['isTriggered']=function(){const _0x322a56=_0x5bc23b;return VisuMZ[_0x322a56(0x14c)]['Window_Message_isTriggered']['call'](this)||Input[_0x322a56(0x2f4)](VisuMZ[_0x322a56(0x14c)][_0x322a56(0x27a)][_0x322a56(0x1c1)][_0x322a56(0x28e)]);},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x1e0)]=Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x13e)],Window_Message['prototype']['updatePlacement']=function(){const _0x33b9ec=_0x5bc23b;let _0x310ec5=this['y'];this['x']=Math[_0x33b9ec(0x1e9)]((Graphics[_0x33b9ec(0x1eb)]-this[_0x33b9ec(0x1f4)])/0x2),VisuMZ['MessageCore'][_0x33b9ec(0x1e0)][_0x33b9ec(0x191)](this);if(this[_0x33b9ec(0x369)])this['y']=_0x310ec5;this[_0x33b9ec(0x260)](),this[_0x33b9ec(0x25c)](),this[_0x33b9ec(0x141)]();},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x329)]=Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x1b6)],Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x1b6)]=function(_0x189ad9){const _0x47269f=_0x5bc23b;this[_0x47269f(0x240)](_0x189ad9),this[_0x47269f(0x32f)](_0x189ad9),VisuMZ['MessageCore']['Window_Message_newPage'][_0x47269f(0x191)](this,_0x189ad9),this[_0x47269f(0x129)]();},Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x240)]=function(_0x2d974a){const _0x3512ed=_0x5bc23b;if(!_0x2d974a)return;this[_0x3512ed(0x206)]=![],_0x2d974a[_0x3512ed(0x16a)]=this[_0x3512ed(0x152)](_0x2d974a[_0x3512ed(0x16a)]),this[_0x3512ed(0x230)]&&(_0x3512ed(0x33f)===_0x3512ed(0x33f)?(_0x2d974a['text']=this[_0x3512ed(0x128)](_0x2d974a['text']),this[_0x3512ed(0x206)]=!![]):this[_0x3512ed(0x3c2)][_0x9cffe]=_0xe49b27[_0x49b1dd]);},Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x128)]=function(_0x5a9669){const _0x5d9e25=_0x5bc23b;if(this['_macroBypassWordWrap'])return _0x5a9669;return Window_Base['prototype'][_0x5d9e25(0x128)]['call'](this,_0x5a9669);},Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x32f)]=function(_0x1cdbf7){const _0x463511=_0x5bc23b;this[_0x463511(0x234)](_0x1cdbf7),this[_0x463511(0x291)](_0x1cdbf7),this['updateDimensions']();},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x18e)]=Window_Message['prototype']['terminateMessage'],Window_Message['prototype'][_0x5bc23b(0x1bc)]=function(){const _0x28a1d3=_0x5bc23b;VisuMZ['MessageCore']['Window_Message_terminateMessage']['call'](this),this['clearFlags']();if(this[_0x28a1d3(0x34c)])this['messagePositionReset']();},Window_Message['prototype']['updateDimensions']=function(){const _0x38b093=_0x5bc23b;this[_0x38b093(0x1f4)]=$gameSystem[_0x38b093(0x1de)]()+this[_0x38b093(0x29c)]();;this[_0x38b093(0x1f4)]=Math[_0x38b093(0x36e)](Graphics[_0x38b093(0x1f4)],this[_0x38b093(0x1f4)]);const _0x7f56e9=$gameSystem[_0x38b093(0x330)]();this[_0x38b093(0x34b)]=SceneManager[_0x38b093(0x3b7)][_0x38b093(0x2c3)](_0x7f56e9,![])+this[_0x38b093(0x2d6)](),this[_0x38b093(0x34b)]=Math[_0x38b093(0x36e)](Graphics['height'],this['height']);if($gameTemp[_0x38b093(0x26d)])this[_0x38b093(0x293)]();},Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x29c)]=function(){return 0x0;},Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x2d6)]=function(){return 0x0;},Window_Message[_0x5bc23b(0x25d)]['resetPositionX']=function(){const _0x4ecf99=_0x5bc23b;this['x']=(Graphics[_0x4ecf99(0x1eb)]-this[_0x4ecf99(0x1f4)])/0x2,$gameTemp['_centerMessageWindow']=undefined,this[_0x4ecf99(0x141)]();},Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x1fd)]=function(){const _0x15261b=_0x5bc23b,_0x17a8fa={'x':this['x'],'y':this['y']};Window_Base[_0x15261b(0x25d)]['updateMove'][_0x15261b(0x191)](this),this[_0x15261b(0x225)](_0x17a8fa);},Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x1c7)]=function(){return!![];},Window_Message['prototype'][_0x5bc23b(0x225)]=function(_0x1b5a4a){const _0x240945=_0x5bc23b;this[_0x240945(0x2ef)]&&(this['_nameBoxWindow']['x']+=this['x']-_0x1b5a4a['x'],this[_0x240945(0x2ef)]['y']+=this['y']-_0x1b5a4a['y']);},Window_Message['prototype']['resetRect']=function(_0x341169,_0x1372d1){const _0x595544=_0x5bc23b;this[_0x595544(0x23b)](this[_0x595544(0x2cb)]['x'],this[_0x595544(0x359)]*(Graphics[_0x595544(0x2b2)]-this[_0x595544(0x34b)])/0x2,this[_0x595544(0x2cb)][_0x595544(0x1f4)],this[_0x595544(0x2cb)][_0x595544(0x34b)],_0x341169,_0x1372d1);},Window_Message['prototype']['processCommonEvent']=function(_0x13c40a){const _0x4a50f4=_0x5bc23b,_0x4c4c7b=Window_Base[_0x4a50f4(0x25d)][_0x4a50f4(0x39c)][_0x4a50f4(0x191)](this,_0x13c40a);if(_0x13c40a[_0x4a50f4(0x173)]){if(_0x4a50f4(0x297)===_0x4a50f4(0x13c))return this[_0x4a50f4(0x2f3)]();else this[_0x4a50f4(0x1ff)](_0x4c4c7b);}},Window_Message['prototype'][_0x5bc23b(0x1ff)]=function(_0x34792d){const _0xd0ae0d=_0x5bc23b;if($gameParty[_0xd0ae0d(0x22a)]()){}else $gameMap[_0xd0ae0d(0x315)](_0x34792d);},Window_Message['prototype']['processCharacter']=function(_0xcf3897){const _0x3aefe2=_0x5bc23b;this['_textDelayCount']--;if(this['_textDelayCount']<=0x0){if(_0x3aefe2(0x2dc)!==_0x3aefe2(0x2dc)){const _0x22adb7=_0x509d09['getLastGainedItemData']();if(_0x22adb7['id']<=0x0)return'';return _0x22adb7[_0x3aefe2(0x157)];}else this[_0x3aefe2(0x2a2)](_0xcf3897),Window_Base[_0x3aefe2(0x25d)]['processCharacter']['call'](this,_0xcf3897);}},Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x2a2)]=function(_0x23b3be){const _0x1ed72f=_0x5bc23b;this[_0x1ed72f(0x333)]=this['_textDelay'];if(this['_textDelay']<=0x0)this[_0x1ed72f(0x133)]=!![];},VisuMZ['MessageCore'][_0x5bc23b(0x179)]=Window_Message['prototype'][_0x5bc23b(0x18c)],Window_Message[_0x5bc23b(0x25d)]['processEscapeCharacter']=function(_0x260eef,_0x5354b3){const _0x417b62=_0x5bc23b;!_0x5354b3[_0x417b62(0x173)]?Window_Base[_0x417b62(0x25d)]['processEscapeCharacter'][_0x417b62(0x191)](this,_0x260eef,_0x5354b3):VisuMZ['MessageCore'][_0x417b62(0x179)]['call'](this,_0x260eef,_0x5354b3);},Window_Message['prototype'][_0x5bc23b(0x234)]=function(_0x38d0e5){const _0x200915=_0x5bc23b;let _0x194cc2=_0x38d0e5[_0x200915(0x16a)];this[_0x200915(0x1b5)]={};if(this[_0x200915(0x20b)]())return _0x194cc2;_0x194cc2=_0x194cc2['replace'](/<POSITION:[ ]*(.*)>/gi,(_0x2ba35b,_0xc7515)=>{const _0x2c621a=_0x200915,_0x1c797a=_0xc7515[_0x2c621a(0x1ae)](',')[_0x2c621a(0x3c1)](_0x46bc0f=>Number(_0x46bc0f)||0x0);if(_0x1c797a[0x0]!==undefined)this[_0x2c621a(0x1b5)]['x']=Number(_0x1c797a[0x0]);if(_0x1c797a[0x1]!==undefined)this[_0x2c621a(0x1b5)]['y']=Number(_0x1c797a[0x1]);if(_0x1c797a[0x2]!==undefined)this['_forcedPosition'][_0x2c621a(0x1f4)]=Number(_0x1c797a[0x2]);if(_0x1c797a[0x3]!==undefined)this['_forcedPosition'][_0x2c621a(0x34b)]=Number(_0x1c797a[0x3]);return'';}),_0x194cc2=_0x194cc2[_0x200915(0x26b)](/<COORDINATES:[ ]*(.*)>/gi,(_0x59e55d,_0x12cd0c)=>{const _0xafa42c=_0x200915,_0x20c40d=_0x12cd0c[_0xafa42c(0x1ae)](',')[_0xafa42c(0x3c1)](_0x498b8e=>Number(_0x498b8e)||0x0);if(_0x20c40d[0x0]!==undefined)this[_0xafa42c(0x1b5)]['x']=Number(_0x20c40d[0x0]);if(_0x20c40d[0x1]!==undefined)this[_0xafa42c(0x1b5)]['y']=Number(_0x20c40d[0x1]);return'';}),_0x194cc2=_0x194cc2[_0x200915(0x26b)](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x60e636,_0x511f51)=>{const _0x3efbce=_0x200915;if(_0x3efbce(0x31a)===_0x3efbce(0x389)){_0x1e1711=_0x33a82e[_0x3efbce(0x26b)](_0x2bd28e['_autoSizeRegexp'],''),_0x2e6f88=_0x3778bd[_0x3efbce(0x26b)](_0x3a8e71[_0x3efbce(0x2c1)],''),this[_0x3efbce(0x33e)]=!![];const _0x4ad3dd=this['textSizeEx'](_0x178617);if(_0x16fe4f){let _0x3d8e13=_0x4ad3dd[_0x3efbce(0x1f4)]+_0x525afc[_0x3efbce(0x12e)]()*0x2+0x6;const _0x134b8d=_0x19ad8e['faceName']()!=='',_0x580cfb=_0x569e0f[_0x3efbce(0x32b)],_0x3b42d9=0x14;_0x3d8e13+=_0x134b8d?_0x580cfb+_0x3b42d9:0x4;if(_0x3d8e13%0x2!==0x0)_0x3d8e13+=0x1;_0x2e8017[_0x3efbce(0x1c8)](_0x3d8e13);}if(_0x31c56d){let _0x24bc76=_0x44776e['ceil'](_0x4ad3dd[_0x3efbce(0x34b)]/this[_0x3efbce(0x24a)]());_0x1206ec[_0x3efbce(0x2db)](_0x24bc76);}this[_0x3efbce(0x140)](),this[_0x3efbce(0x33e)]=![],this[_0x3efbce(0x34c)]=!![];}else{const _0x245511=_0x511f51['split'](',')[_0x3efbce(0x3c1)](_0x19e213=>Number(_0x19e213)||0x0);if(_0x245511[0x0]!==undefined)this[_0x3efbce(0x1b5)][_0x3efbce(0x1f4)]=Number(_0x245511[0x2]);if(_0x245511[0x1]!==undefined)this[_0x3efbce(0x1b5)]['height']=Number(_0x245511[0x3]);return'';}}),_0x194cc2=_0x194cc2['replace'](/<OFFSET:[ ]*(.*)>/gi,(_0x19da8c,_0x43e4b6)=>{const _0x522000=_0x200915;if(_0x522000(0x31c)==='urSvV')var _0x58458a=new _0x13d410('\x5cb'+_0x5c28d7+'\x5cb','g');else{const _0x4c7ec7=_0x43e4b6[_0x522000(0x1ae)](',')[_0x522000(0x3c1)](_0x17861a=>Number(_0x17861a)||0x0);let _0x15785d=_0x4c7ec7[0x0]||0x0,_0x42cf68=_0x4c7ec7[0x1]||0x0;return $gameSystem[_0x522000(0x3b2)](_0x15785d,_0x42cf68),'';}}),_0x38d0e5['text']=_0x194cc2;},Window_Message[_0x5bc23b(0x25d)]['updateXyOffsets']=function(){const _0x57908f=_0x5bc23b,_0x4b6c88=$gameSystem[_0x57908f(0x2ad)]();this['x']+=_0x4b6c88['x'],this['y']+=_0x4b6c88['y'];},Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x25c)]=function(){const _0x425f7f=_0x5bc23b;this[_0x425f7f(0x1b5)]=this['_forcedPosition']||{};const _0x2f8051=['x','y','width',_0x425f7f(0x34b)];for(const _0xb10a90 of _0x2f8051){this[_0x425f7f(0x1b5)][_0xb10a90]!==undefined&&(this[_0xb10a90]=Number(this[_0x425f7f(0x1b5)][_0xb10a90]));}},Window_Message['prototype'][_0x5bc23b(0x291)]=function(_0xcae8e4){const _0x5044f5=_0x5bc23b;let _0x1a8272=_0xcae8e4[_0x5044f5(0x16a)];_0x1a8272=_0x1a8272[_0x5044f5(0x26b)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x38cc60=_0x5044f5;if(_0x38cc60(0x251)!==_0x38cc60(0x251)){_0x14666c[_0x38cc60(0x14c)][_0x38cc60(0x2cd)][_0x38cc60(0x191)](this,_0x5d4db6);const _0x2e4cc0=_0x110f90['MessageCore']['Settings'][_0x38cc60(0x1fc)];_0x8e7615[_0x38cc60(0x14c)][_0x38cc60(0x363)](_0x17ffbe,_0x2e4cc0['Weapons']);}else return this[_0x38cc60(0x1b4)](_0x1a8272,!![],!![]),this[_0x38cc60(0x195)](_0x38cc60(0x182)),'';}),_0x1a8272=_0x1a8272[_0x5044f5(0x26b)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x2900d8=_0x5044f5;if(_0x2900d8(0x2ce)===_0x2900d8(0x2c0))this['prepareForcedPositionEscapeCharacters'](_0x34e104),this[_0x2900d8(0x291)](_0x24fab3),this[_0x2900d8(0x21d)]();else return this[_0x2900d8(0x1b4)](_0x1a8272,!![],![]),this['processAutoPosition'](_0x2900d8(0x182)),'';}),_0x1a8272=_0x1a8272['replace'](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x513d85=_0x5044f5;return this[_0x513d85(0x1b4)](_0x1a8272,![],!![]),this[_0x513d85(0x195)](_0x513d85(0x182)),'';});if(SceneManager['isSceneBattle']())_0x1a8272=_0x1a8272[_0x5044f5(0x26b)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x31ee18,_0x19ce7c)=>{const _0x40429e=_0x5044f5;return this['processAutoSize'](_0x1a8272,!![],!![]),this['processAutoPosition'](_0x40429e(0x198),Number(_0x19ce7c)||0x1),'';}),_0x1a8272=_0x1a8272[_0x5044f5(0x26b)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x121e02,_0x429915)=>{const _0xec755=_0x5044f5;if('mgOgz'===_0xec755(0x185))return this[_0xec755(0x1b4)](_0x1a8272,!![],!![]),this['processAutoPosition']('battle\x20party',Number(_0x429915)||0x0),'';else this[_0xec755(0x1fa)](),this[_0xec755(0x208)](),this[_0xec755(0x188)]&&(this[_0xec755(0x13e)](),this[_0xec755(0x1ef)]()),this[_0xec755(0x129)](),this[_0xec755(0x2a8)](),this['refreshDimmerBitmap'](),_0x5b13a5[_0xec755(0x25d)][_0xec755(0x3ae)]['call'](this);}),_0x1a8272=_0x1a8272[_0x5044f5(0x26b)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x5c2089,_0x582113)=>{const _0x3a3b9f=_0x5044f5;if(_0x3a3b9f(0x2ea)!==_0x3a3b9f(0x2ea))this['initTextAlignement'](),this[_0x3a3b9f(0x2f2)](),this[_0x3a3b9f(0x130)](_0x28a588);else return this['processAutoSize'](_0x1a8272,!![],!![]),this[_0x3a3b9f(0x195)](_0x3a3b9f(0x2b5),Number(_0x582113)||0x0),'';});else SceneManager[_0x5044f5(0x30c)]()&&(_0x1a8272=_0x1a8272[_0x5044f5(0x26b)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x22b53d,_0x35b577)=>{const _0x14b17a=_0x5044f5;if('vNrDs'!==_0x14b17a(0x270))_0xe88b12=_0x40d34e;else return this['processAutoSize'](_0x1a8272,!![],!![]),this[_0x14b17a(0x195)](_0x14b17a(0x279),0x0),'';}),_0x1a8272=_0x1a8272['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x2246b1,_0x13ea1a)=>{const _0x1bc6b5=_0x5044f5;if(_0x1bc6b5(0x35f)!=='VSieA')return this[_0x1bc6b5(0x1b4)](_0x1a8272,!![],!![]),this['processAutoPosition'](_0x1bc6b5(0x353),Number(_0x13ea1a)||0x1),'';else this[_0x1bc6b5(0x369)]=_0x5890dc;}),_0x1a8272=_0x1a8272[_0x5044f5(0x26b)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x2b1b7f,_0x5c7abe)=>{const _0x3bb6fb=_0x5044f5;return this[_0x3bb6fb(0x1b4)](_0x1a8272,!![],!![]),this['processAutoPosition'](_0x3bb6fb(0x21e),Number(_0x5c7abe)||0x0),'';}),_0x1a8272=_0x1a8272['replace'](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x417818,_0x548511)=>{const _0x13cb45=_0x5044f5;return this[_0x13cb45(0x1b4)](_0x1a8272,!![],!![]),this['processAutoPosition'](_0x13cb45(0x39d),Number(_0x548511)||0x0),'';}));_0xcae8e4['text']=_0x1a8272;},Window_Message[_0x5bc23b(0x378)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x5bc23b(0x2c1)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x1b4)]=function(_0xc00198,_0x4b7685,_0x568496){const _0x451997=_0x5bc23b;_0xc00198=_0xc00198[_0x451997(0x26b)](Window_Message['_autoSizeRegexp'],''),_0xc00198=_0xc00198[_0x451997(0x26b)](Window_Message[_0x451997(0x2c1)],''),this['_autoSizeCheck']=!![];const _0x28ccb5=this['textSizeEx'](_0xc00198);if(_0x4b7685){if(_0x451997(0x375)!==_0x451997(0x236)){let _0x53d1dc=_0x28ccb5[_0x451997(0x1f4)]+$gameSystem[_0x451997(0x12e)]()*0x2+0x6;const _0x106790=$gameMessage[_0x451997(0x327)]()!=='',_0x516a03=ImageManager[_0x451997(0x32b)],_0x198a79=0x14;_0x53d1dc+=_0x106790?_0x516a03+_0x198a79:0x4;if(_0x53d1dc%0x2!==0x0)_0x53d1dc+=0x1;$gameSystem['setMessageWindowWidth'](_0x53d1dc);}else return _0x1dd279=_0x4b6734[_0x451997(0x26b)](/<LEFT>/gi,_0x451997(0x209)),_0x1eed65=_0x11ff35[_0x451997(0x26b)](/<\/LEFT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x426b54=_0x22bc7e[_0x451997(0x26b)](/<CENTER>/gi,'\x1bTEXTALIGNMENT[2]'),_0x516804=_0x2649af[_0x451997(0x26b)](/<\/CENTER>/gi,_0x451997(0x2cf)),_0x5e00dc=_0x3fd81a[_0x451997(0x26b)](/<RIGHT>/gi,_0x451997(0x1f2)),_0x1a40ed=_0x3d61ff[_0x451997(0x26b)](/<\/RIGHT>/gi,_0x451997(0x2cf)),_0x4e8770;}if(_0x568496){if(_0x451997(0x253)===_0x451997(0x202))_0x5db0e5['y']+=_0x3eedb6[_0x451997(0x131)];else{let _0x38802d=Math[_0x451997(0x2ab)](_0x28ccb5[_0x451997(0x34b)]/this['lineHeight']());$gameSystem[_0x451997(0x2db)](_0x38802d);}}this['updateAutoSizePosition'](),this[_0x451997(0x33e)]=![],this[_0x451997(0x34c)]=!![];},Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x140)]=function(){const _0x2de726=_0x5bc23b;this[_0x2de726(0x21d)](),this[_0x2de726(0x13e)](),this['resetPositionX'](),this[_0x2de726(0x1ec)](),this['contents'][_0x2de726(0x178)](),this[_0x2de726(0x129)]();},Window_Message['prototype'][_0x5bc23b(0x195)]=function(_0x1c90a8,_0x17a5ab){const _0x306dcc=_0x5bc23b;switch(_0x1c90a8[_0x306dcc(0x28c)]()['trim']()){case _0x306dcc(0x198):this['_autoPositionTarget']=$gameActors['actor'](_0x17a5ab);break;case _0x306dcc(0x1f7):this[_0x306dcc(0x369)]=$gameParty[_0x306dcc(0x256)]()[_0x17a5ab-0x1];break;case _0x306dcc(0x2b5):this[_0x306dcc(0x369)]=$gameTroop[_0x306dcc(0x256)]()[_0x17a5ab-0x1];break;case _0x306dcc(0x279):this[_0x306dcc(0x369)]=$gamePlayer;break;case'map\x20actor':const _0xfb35e=$gameActors[_0x306dcc(0x362)](_0x17a5ab)[_0x306dcc(0x2a5)]();_0xfb35e===0x0?this[_0x306dcc(0x369)]=$gamePlayer:_0x306dcc(0x386)!=='XNrWo'?this[_0x306dcc(0x369)]=$gamePlayer[_0x306dcc(0x35c)]()[_0x306dcc(0x370)](_0xfb35e-0x1):(_0x38fe71[_0x306dcc(0x199)]=new _0xf36031('\x1b'+_0x6babee['Match']+_0x358819[_0x306dcc(0x135)],'gi'),_0x3e6f1f[_0x306dcc(0x1c3)]!==''&&_0x4e51b2[_0x306dcc(0x1c3)]!==_0x306dcc(0x24b)?_0xfe3dc1['textCodeResult']=new _0x178385(_0x306dcc(0x2e1)+_0x2fc8e0['TextStr'][_0x306dcc(0x26b)](/\\/g,'\x1b')+'\x27'):_0x41e437[_0x306dcc(0x397)]=_0x2a7aac[_0x306dcc(0x1cd)]);break;case _0x306dcc(0x21e):if(_0x17a5ab===0x1)this[_0x306dcc(0x369)]=$gamePlayer;else{if(_0x306dcc(0x2e7)!=='VlEil')this['_autoPositionTarget']=$gamePlayer[_0x306dcc(0x35c)]()['follower'](_0x17a5ab-0x2);else{const _0xda453=_0x46266d['split'](',')[_0x306dcc(0x3c1)](_0xd95d6d=>_0x3eaac1(_0xd95d6d)||0x0);if(_0xda453[0x0]!==_0x56f4c3)this['_forcedPosition']['x']=_0x18e6c5(_0xda453[0x0]);if(_0xda453[0x1]!==_0x25e5cf)this['_forcedPosition']['y']=_0x50bdba(_0xda453[0x1]);if(_0xda453[0x2]!==_0x51a76a)this[_0x306dcc(0x1b5)][_0x306dcc(0x1f4)]=_0x588bc8(_0xda453[0x2]);if(_0xda453[0x3]!==_0x3395c2)this['_forcedPosition'][_0x306dcc(0x34b)]=_0x3027af(_0xda453[0x3]);return'';}}break;case _0x306dcc(0x39d):this['_autoPositionTarget']=$gameMap['event'](_0x17a5ab);break;}if(this['_autoPositionTarget']){if(_0x306dcc(0x2f5)!=='YCtfh')return _0x35e9cd[_0x306dcc(0x192)];else this[_0x306dcc(0x348)]();}},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x29e)]=Window_Message[_0x5bc23b(0x25d)][_0x5bc23b(0x302)],Window_Message['prototype'][_0x5bc23b(0x302)]=function(){const _0xad1f9c=_0x5bc23b;this[_0xad1f9c(0x348)](),VisuMZ[_0xad1f9c(0x14c)][_0xad1f9c(0x29e)]['call'](this);},Window_Message[_0x5bc23b(0x25d)]['updateAutoPosition']=function(){const _0x3e560c=_0x5bc23b;if(!this[_0x3e560c(0x369)])return;const _0x1ddea8=SceneManager[_0x3e560c(0x3b7)];if(!_0x1ddea8)return;if(!_0x1ddea8[_0x3e560c(0x1f0)])return;const _0x28b329=_0x1ddea8[_0x3e560c(0x1f0)][_0x3e560c(0x26a)](this['_autoPositionTarget']);if(!_0x28b329)return;let _0x468f42=_0x28b329['x'];_0x468f42-=this['width']/0x2,_0x468f42-=(Graphics[_0x3e560c(0x1f4)]-Graphics['boxWidth'])/0x2;let _0x3b47ef=_0x28b329['y'];_0x3b47ef-=this[_0x3e560c(0x34b)],_0x3b47ef-=(Graphics[_0x3e560c(0x34b)]-Graphics[_0x3e560c(0x2b2)])/0x2,_0x3b47ef-=_0x28b329['height']+0x8;const _0x166f52=$gameSystem[_0x3e560c(0x2ad)]();_0x468f42+=_0x166f52['x'],_0x3b47ef+=_0x166f52['y'],this['x']=Math['round'](_0x468f42),this['y']=Math['round'](_0x3b47ef),this[_0x3e560c(0x141)](!![],![]),this[_0x3e560c(0x2ef)]['updatePlacement']();},Window_Message[_0x5bc23b(0x25d)]['messagePositionReset']=function(){const _0xa7184e=_0x5bc23b;this[_0xa7184e(0x34c)]=![],this[_0xa7184e(0x369)]=undefined,$gameSystem[_0xa7184e(0x377)](),this[_0xa7184e(0x140)](),this['openness']=0x0;},Window_Message[_0x5bc23b(0x25d)]['preConvertEscapeCharacters']=function(_0x3fa10e){const _0x3fa479=_0x5bc23b;return Window_Base['prototype'][_0x3fa479(0x323)][_0x3fa479(0x191)](this,_0x3fa10e);},Window_Message[_0x5bc23b(0x25d)]['postConvertEscapeCharacters']=function(_0x1ecedf){const _0xcb4b1c=_0x5bc23b;return Window_Base[_0xcb4b1c(0x25d)][_0xcb4b1c(0x2f7)][_0xcb4b1c(0x191)](this,_0x1ecedf);},Window_Message[_0x5bc23b(0x25d)]['flushTextState']=function(_0x33103e){const _0x588002=_0x5bc23b;this[_0x588002(0x2eb)](_0x33103e),Window_Base['prototype'][_0x588002(0x38b)][_0x588002(0x191)](this,_0x33103e),this[_0x588002(0x1b0)](_0x33103e);},Window_Message['prototype'][_0x5bc23b(0x2eb)]=function(_0x3a455e){},Window_Message[_0x5bc23b(0x25d)]['postFlushTextState']=function(_0x460add){},Window_NameBox[_0x5bc23b(0x25d)][_0x5bc23b(0x1bd)]=function(){return![];},Window_NameBox[_0x5bc23b(0x25d)][_0x5bc23b(0x1d8)]=function(){const _0x1596d9=_0x5bc23b;Window_Base[_0x1596d9(0x25d)][_0x1596d9(0x1d8)][_0x1596d9(0x191)](this),this[_0x1596d9(0x38a)](this[_0x1596d9(0x338)]());},Window_NameBox[_0x5bc23b(0x25d)][_0x5bc23b(0x338)]=function(){const _0x28053e=_0x5bc23b,_0x106f99=VisuMZ[_0x28053e(0x14c)][_0x28053e(0x27a)][_0x28053e(0x1c1)][_0x28053e(0x16b)];return ColorManager['textColor'](_0x106f99);},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x2b4)]=Window_NameBox[_0x5bc23b(0x25d)]['updatePlacement'],Window_NameBox[_0x5bc23b(0x25d)][_0x5bc23b(0x13e)]=function(){const _0x8dd4d=_0x5bc23b;VisuMZ[_0x8dd4d(0x14c)][_0x8dd4d(0x2b4)][_0x8dd4d(0x191)](this),this[_0x8dd4d(0x2b3)](),this[_0x8dd4d(0x287)](),this[_0x8dd4d(0x141)](),this[_0x8dd4d(0x161)]();},Window_NameBox[_0x5bc23b(0x25d)]['preConvertEscapeCharacters']=function(_0x225487){const _0x53cf5c=_0x5bc23b;return _0x225487=_0x225487[_0x53cf5c(0x26b)](/<LEFT>/gi,this[_0x53cf5c(0x372)][_0x53cf5c(0x2a4)](this,0x0)),_0x225487=_0x225487[_0x53cf5c(0x26b)](/<CENTER>/gi,this[_0x53cf5c(0x372)][_0x53cf5c(0x2a4)](this,0x5)),_0x225487=_0x225487[_0x53cf5c(0x26b)](/<RIGHT>/gi,this['setRelativePosition'][_0x53cf5c(0x2a4)](this,0xa)),_0x225487=_0x225487[_0x53cf5c(0x26b)](/<POSITION:[ ](\d+)>/gi,(_0x2d7385,_0xf8903a)=>this[_0x53cf5c(0x372)](parseInt(_0xf8903a))),_0x225487=_0x225487[_0x53cf5c(0x26b)](/<\/LEFT>/gi,''),_0x225487=_0x225487[_0x53cf5c(0x26b)](/<\/CENTER>/gi,''),_0x225487=_0x225487[_0x53cf5c(0x26b)](/<\/RIGHT>/gi,''),Window_Base['prototype'][_0x53cf5c(0x323)][_0x53cf5c(0x191)](this,_0x225487);},Window_NameBox[_0x5bc23b(0x25d)][_0x5bc23b(0x372)]=function(_0x5bbdd1){const _0x323884=_0x5bc23b;return this[_0x323884(0x33c)]=_0x5bbdd1,'';},Window_NameBox[_0x5bc23b(0x25d)][_0x5bc23b(0x2b3)]=function(){const _0x2f8bda=_0x5bc23b;if($gameMessage[_0x2f8bda(0x252)]())return;this[_0x2f8bda(0x33c)]=this['_relativePosition']||0x0;const _0x224da9=this[_0x2f8bda(0x188)],_0xc29118=Math[_0x2f8bda(0x212)](_0x224da9['width']*this[_0x2f8bda(0x33c)]/0xa);this['x']=_0x224da9['x']+_0xc29118-Math['floor'](this['width']/0x2),this['x']=this['x']['clamp'](_0x224da9['x'],_0x224da9['x']+_0x224da9['width']-this['width']);},Window_NameBox[_0x5bc23b(0x25d)][_0x5bc23b(0x287)]=function(){const _0x37cc00=_0x5bc23b;if($gameMessage[_0x37cc00(0x252)]())return;this[_0x37cc00(0x33c)]=this['_relativePosition']||0x0;const _0x25270b=VisuMZ[_0x37cc00(0x14c)][_0x37cc00(0x27a)][_0x37cc00(0x1c1)][_0x37cc00(0x2c5)],_0x3e674b=VisuMZ['MessageCore'][_0x37cc00(0x27a)][_0x37cc00(0x1c1)][_0x37cc00(0x189)],_0x18a96b=(0x5-this['_relativePosition'])/0x5;this['x']+=Math[_0x37cc00(0x212)](_0x25270b*_0x18a96b),this['y']+=_0x3e674b;},Window_NameBox[_0x5bc23b(0x25d)][_0x5bc23b(0x161)]=function(){const _0x2a3acd=_0x5bc23b,_0x51971b=this[_0x2a3acd(0x188)],_0x137c98=_0x51971b['y'],_0x31582f=VisuMZ[_0x2a3acd(0x14c)][_0x2a3acd(0x27a)][_0x2a3acd(0x1c1)]['NameBoxWindowOffsetY'];_0x137c98>this['y']&&_0x137c98<this['y']+this[_0x2a3acd(0x34b)]-_0x31582f&&(this['y']=_0x51971b['y']+_0x51971b['height']);},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x3b6)]=Window_NameBox['prototype'][_0x5bc23b(0x3ae)],Window_NameBox[_0x5bc23b(0x25d)][_0x5bc23b(0x3ae)]=function(){const _0xad0492=_0x5bc23b;this['_relativePosition']=0x0,VisuMZ[_0xad0492(0x14c)]['Window_NameBox_refresh']['call'](this);},Window_ChoiceList[_0x5bc23b(0x25d)][_0x5bc23b(0x20b)]=function(){return![];},Window_ChoiceList[_0x5bc23b(0x25d)][_0x5bc23b(0x1bd)]=function(){return!![];},Window_ChoiceList[_0x5bc23b(0x25d)]['itemHeight']=function(){return $gameSystem['getChoiceListLineHeight']()+0x8;},Window_ChoiceList['prototype'][_0x5bc23b(0x29b)]=function(){const _0x48864a=_0x5bc23b;return $gameSystem[_0x48864a(0x364)]();},Window_ChoiceList['prototype']['start']=function(){const _0x88aec1=_0x5bc23b;this[_0x88aec1(0x3ae)](),this[_0x88aec1(0x30b)](),this[_0x88aec1(0x24f)](),this[_0x88aec1(0x346)]();},Window_ChoiceList[_0x5bc23b(0x25d)][_0x5bc23b(0x3ae)]=function(){const _0x3bee66=_0x5bc23b;this[_0x3bee66(0x1fa)](),this['makeCommandList'](),this[_0x3bee66(0x188)]&&(this[_0x3bee66(0x13e)](),this[_0x3bee66(0x1ef)]()),this[_0x3bee66(0x129)](),this[_0x3bee66(0x2a8)](),this[_0x3bee66(0x235)](),Window_Selectable[_0x3bee66(0x25d)]['refresh'][_0x3bee66(0x191)](this);},Window_ChoiceList[_0x5bc23b(0x25d)][_0x5bc23b(0x208)]=function(){const _0x2cc477=_0x5bc23b,_0x115f5b=$gameMessage[_0x2cc477(0x134)]();let _0x1ce858=0x0;for(let _0x709f1 of _0x115f5b){if(_0x2cc477(0x1dd)===_0x2cc477(0x1dd)){_0x709f1=this[_0x2cc477(0x139)](_0x709f1);if(this[_0x2cc477(0x1d9)](_0x709f1)){const _0x562a4a=this[_0x2cc477(0x1a7)](_0x709f1),_0x1d4eda=this[_0x2cc477(0x335)](_0x709f1);this[_0x2cc477(0x3bc)](_0x562a4a,_0x2cc477(0x22e),_0x1d4eda,_0x1ce858);}_0x1ce858++;}else return this[_0x2cc477(0x188)]?this[_0x2cc477(0x2f3)]():_0x1d1ffd['MessageCore'][_0x2cc477(0x1e1)][_0x2cc477(0x191)](this);}},Window_ChoiceList[_0x5bc23b(0x25d)]['convertChoiceMacros']=function(_0x3e82a1){const _0x411895=_0x5bc23b;return Window_Base[_0x411895(0x25d)][_0x411895(0x152)][_0x411895(0x191)](this,_0x3e82a1);},Window_ChoiceList[_0x5bc23b(0x25d)][_0x5bc23b(0x1d9)]=function(_0xfbc7ff){const _0x1b51f5=_0x5bc23b;if(_0xfbc7ff[_0x1b51f5(0x16e)](/<HIDE>/i))return![];if(_0xfbc7ff['match'](/<SHOW>/i))return!![];if(_0xfbc7ff['match'](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4215c9=JSON[_0x1b51f5(0x1e5)]('['+RegExp['$1'][_0x1b51f5(0x16e)](/\d+/g)+']');for(const _0x3322fb of _0x4215c9){if(_0x1b51f5(0x2de)===_0x1b51f5(0x2de)){if(!$gameSwitches[_0x1b51f5(0x325)](_0x3322fb))return![];}else{const _0x1cf788=this[_0x1b51f5(0x219)](_0x1987ea),_0x3bbeaf=0x1,_0x34f4f2=_0x1cf788+(_0x5dfc33?_0x3bbeaf:-_0x3bbeaf);_0x34f4f2>0xb&&_0xc0408e?this['changeValue'](_0x4b7099,0x1):this[_0x1b51f5(0x33b)](_0x28fdfb,_0x34f4f2[_0x1b51f5(0x305)](0x1,0xb));}}return!![];}if(_0xfbc7ff[_0x1b51f5(0x16e)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1b51f5(0x27d)!=='UTeof')_0x53869a[_0x1b51f5(0x397)]=new _0x46f0a6('return\x20\x27'+_0x20f795[_0x1b51f5(0x1c3)][_0x1b51f5(0x26b)](/\\/g,'\x1b')+'\x27');else{const _0x549aea=JSON['parse']('['+RegExp['$1'][_0x1b51f5(0x16e)](/\d+/g)+']');for(const _0x5e56ba of _0x549aea){if(!$gameSwitches[_0x1b51f5(0x325)](_0x5e56ba))return![];}return!![];}}if(_0xfbc7ff[_0x1b51f5(0x16e)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xa3c45f=JSON[_0x1b51f5(0x1e5)]('['+RegExp['$1'][_0x1b51f5(0x16e)](/\d+/g)+']');for(const _0x11202d of _0xa3c45f){if($gameSwitches[_0x1b51f5(0x325)](_0x11202d))return!![];}return![];}if(_0xfbc7ff[_0x1b51f5(0x16e)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1f39e6=JSON[_0x1b51f5(0x1e5)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5c55c9 of _0x1f39e6){if(!$gameSwitches[_0x1b51f5(0x325)](_0x5c55c9))return!![];}return![];}if(_0xfbc7ff[_0x1b51f5(0x16e)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3a6f4c=JSON[_0x1b51f5(0x1e5)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1f075d of _0x3a6f4c){if(!$gameSwitches[_0x1b51f5(0x325)](_0x1f075d))return!![];}return![];}if(_0xfbc7ff[_0x1b51f5(0x16e)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1f2cde=JSON[_0x1b51f5(0x1e5)]('['+RegExp['$1'][_0x1b51f5(0x16e)](/\d+/g)+']');for(const _0x499e5a of _0x1f2cde){if($gameSwitches['value'](_0x499e5a))return![];}return!![];}return!![];},Window_ChoiceList['prototype'][_0x5bc23b(0x1a7)]=function(_0x5759ea){const _0x3f0726=_0x5bc23b;let _0x42b268=_0x5759ea;return _0x42b268=_0x42b268['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x42b268=_0x42b268[_0x3f0726(0x26b)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x42b268;},Window_ChoiceList[_0x5bc23b(0x25d)]['isChoiceEnabled']=function(_0x3d7c48){const _0x1bc242=_0x5bc23b;if(_0x3d7c48[_0x1bc242(0x16e)](/<DISABLE>/i))return![];if(_0x3d7c48[_0x1bc242(0x16e)](/<ENABLE>/i))return!![];if(_0x3d7c48[_0x1bc242(0x16e)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4b5de8=JSON[_0x1bc242(0x1e5)]('['+RegExp['$1'][_0x1bc242(0x16e)](/\d+/g)+']');for(const _0x390acc of _0x4b5de8){if(!$gameSwitches[_0x1bc242(0x325)](_0x390acc))return![];}return!![];}if(_0x3d7c48[_0x1bc242(0x16e)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2eb15a=JSON[_0x1bc242(0x1e5)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x23c90d of _0x2eb15a){if(!$gameSwitches[_0x1bc242(0x325)](_0x23c90d))return![];}return!![];}if(_0x3d7c48[_0x1bc242(0x16e)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1dbe10=JSON[_0x1bc242(0x1e5)]('['+RegExp['$1'][_0x1bc242(0x16e)](/\d+/g)+']');for(const _0x3bf9cf of _0x1dbe10){if(_0x1bc242(0x176)!==_0x1bc242(0x176))_0x3c9d59['x']-=_0x4a8345[_0x1bc242(0x2d4)];else{if($gameSwitches[_0x1bc242(0x325)](_0x3bf9cf))return!![];}}return![];}if(_0x3d7c48[_0x1bc242(0x16e)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1bc242(0x2ee)!==_0x1bc242(0x16c)){const _0x3b988d=JSON[_0x1bc242(0x1e5)]('['+RegExp['$1'][_0x1bc242(0x16e)](/\d+/g)+']');for(const _0x37f028 of _0x3b988d){if(_0x1bc242(0x143)!==_0x1bc242(0x2cc)){if(!$gameSwitches[_0x1bc242(0x325)](_0x37f028))return!![];}else for(const _0x4e225b of _0x3f99d6[_0x1bc242(0x14c)]['Settings'][_0x1bc242(0x18d)]){if(_0x4e225b[_0x1bc242(0x217)]===_0x426a17){if(_0x4e225b['Type']==='')this[_0x1bc242(0x19e)](_0x2d0b1c);_0x4e225b[_0x1bc242(0x2fd)][_0x1bc242(0x191)](this,_0x4994bf);if(this[_0x1bc242(0x3b0)]===_0xa0bf24){const _0x1ba9b4=_0x4e225b['CommonEvent']||0x0;if(_0x1ba9b4>0x0)this[_0x1bc242(0x1ff)](_0x1ba9b4);}}}}return![];}else{let _0x50b79a=_0x1a597d['prototype'][_0x1bc242(0x3a8)][_0x1bc242(0x191)](this);return _0x50b79a-=this[_0x1bc242(0x2d6)](),_0x50b79a;}}if(_0x3d7c48['match'](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1bc242(0x1f6)===_0x1bc242(0x292)){const _0xc94076=this[_0x1bc242(0x1b2)],_0x363453=this[_0x1bc242(0x19f)],_0x131c0e=this[_0x1bc242(0x2c9)]((_0x363453-_0xc94076)/_0x363453),_0x544188=this['calcMoveEasing']((_0x363453-_0xc94076+0x1)/_0x363453),_0xdaa9f=(_0x58d37f-_0x30a432*_0x131c0e)/(0x1-_0x131c0e);return _0xdaa9f+(_0x4913b1-_0xdaa9f)*_0x544188;}else{const _0x3de833=JSON[_0x1bc242(0x1e5)]('['+RegExp['$1'][_0x1bc242(0x16e)](/\d+/g)+']');for(const _0x5a5d73 of _0x3de833){if(_0x1bc242(0x39f)!==_0x1bc242(0x39f)){const _0xb71911=_0x1ab436[_0x1bc242(0x1e5)]('['+_0x26b2bd['$1'][_0x1bc242(0x16e)](/\d+/g)+']');for(const _0x3505fa of _0xb71911){if(_0x5b4362['value'](_0x3505fa))return![];}return!![];}else{if(!$gameSwitches[_0x1bc242(0x325)](_0x5a5d73))return!![];}}return![];}}if(_0x3d7c48['match'](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3d97a0=JSON['parse']('['+RegExp['$1'][_0x1bc242(0x16e)](/\d+/g)+']');for(const _0x111d66 of _0x3d97a0){if($gameSwitches[_0x1bc242(0x325)](_0x111d66))return![];}return!![];}return!![];},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x36c)]=Window_ChoiceList[_0x5bc23b(0x25d)]['updatePlacement'],Window_ChoiceList[_0x5bc23b(0x25d)][_0x5bc23b(0x13e)]=function(){const _0x117a37=_0x5bc23b;VisuMZ[_0x117a37(0x14c)]['Window_ChoiceList_updatePlacement']['call'](this),this[_0x117a37(0x141)]();},Window_ChoiceList[_0x5bc23b(0x25d)]['placeCancelButton']=function(){const _0x10e585=_0x5bc23b;if(!this[_0x10e585(0x2b0)])return;const _0x194475=0x8,_0x1a67dd=this[_0x10e585(0x2b0)],_0x3cf90e=this['x']+this[_0x10e585(0x1f4)],_0x578e8b=Math[_0x10e585(0x212)]((Graphics[_0x10e585(0x1f4)]-Graphics[_0x10e585(0x1eb)])/0x2);if(_0x3cf90e>=Graphics[_0x10e585(0x1eb)]+_0x578e8b-_0x1a67dd[_0x10e585(0x1f4)]+_0x194475)_0x1a67dd['x']=-_0x1a67dd[_0x10e585(0x1f4)]-_0x194475;else{if(_0x10e585(0x17d)===_0x10e585(0x17d))_0x1a67dd['x']=this[_0x10e585(0x1f4)]+_0x194475;else{if(this[_0x10e585(0x1d5)]===_0x79470d)this[_0x10e585(0x377)]();if(this['_MessageCoreSettings'][_0x10e585(0x3a9)]===_0x542f6f)this[_0x10e585(0x377)]();this[_0x10e585(0x1d5)]['helpWordWrap']=_0x435a83;}}_0x1a67dd['y']=this[_0x10e585(0x34b)]/0x2-_0x1a67dd[_0x10e585(0x34b)]/0x2;},VisuMZ[_0x5bc23b(0x14c)][_0x5bc23b(0x1e1)]=Window_ChoiceList[_0x5bc23b(0x25d)][_0x5bc23b(0x39a)],Window_ChoiceList[_0x5bc23b(0x25d)][_0x5bc23b(0x39a)]=function(){const _0x20c023=_0x5bc23b;if(this[_0x20c023(0x188)]){if(_0x20c023(0x25b)===_0x20c023(0x25b))return this['messageCoreWindowX']();else{if(this['_MessageCoreSettings']===_0x47609a)this[_0x20c023(0x377)]();if(this[_0x20c023(0x1d5)][_0x20c023(0x224)]===_0x144d6e)this[_0x20c023(0x377)]();return this['_MessageCoreSettings'][_0x20c023(0x224)];}}else{if(_0x20c023(0x395)===_0x20c023(0x395))return VisuMZ[_0x20c023(0x14c)]['Window_ChoiceList_windowX'][_0x20c023(0x191)](this);else _0x4fb1a1['textCodeCheck']=new _0x4bb784('\x5c['+_0x488660[_0x20c023(0x217)]+'\x5c]','gi'),_0x497c08[_0x20c023(0x1c3)]!==''&&_0x412794['TextStr']!==_0x20c023(0x24b)?_0x2481df[_0x20c023(0x397)]=new _0x2df941(_0x20c023(0x2e1)+_0x4be42d[_0x20c023(0x1c3)][_0x20c023(0x26b)](/\\/g,'\x1b')+'\x27'):_0x4e0ed5['textCodeResult']=_0x58826f[_0x20c023(0x1cd)];}},Window_ChoiceList[_0x5bc23b(0x25d)][_0x5bc23b(0x2f3)]=function(){const _0x322915=_0x5bc23b,_0x467d9e=$gameMessage[_0x322915(0x32d)]();if(_0x467d9e===0x1){if('GOXuQ'!==_0x322915(0x284)){let _0xcfd8c9=_0x7cb44b[_0x322915(0x14c)][_0x322915(0x156)][_0x322915(0x191)](this);const _0x5cbdc9=_0x23fee9[_0x322915(0x14c)]['Settings'];if(_0x5cbdc9[_0x322915(0x331)][_0x322915(0x307)]&&_0x5cbdc9['TextSpeed'][_0x322915(0x142)])_0xcfd8c9++;return _0xcfd8c9;}else return(Graphics[_0x322915(0x1eb)]-this[_0x322915(0x27e)]())/0x2;}else{if(_0x467d9e===0x2)return this[_0x322915(0x188)]['x']+this['_messageWindow']['width']-this[_0x322915(0x27e)]();else{if(_0x322915(0x36d)!=='iNvpa')return this['_messageWindow']['x'];else{_0x5f43fd[_0x322915(0x14c)]['Window_Message_terminateMessage'][_0x322915(0x191)](this),this[_0x322915(0x15b)]();if(this['_messagePositionReset'])this[_0x322915(0x243)]();}}}},Window_ChoiceList[_0x5bc23b(0x25d)][_0x5bc23b(0x27e)]=function(){const _0x3a1a59=_0x5bc23b,_0x14adb0=(this[_0x3a1a59(0x1a5)]()+this[_0x3a1a59(0x27b)]())*this[_0x3a1a59(0x29b)]()+this['padding']*0x2;return Math['min'](_0x14adb0,Graphics[_0x3a1a59(0x1f4)]);},Window_ChoiceList[_0x5bc23b(0x25d)][_0x5bc23b(0x1ea)]=function(){const _0x4f87fa=_0x5bc23b,_0x551efc=$gameMessage[_0x4f87fa(0x134)]()[_0x4f87fa(0x3c1)](_0x15542e=>this['convertChoiceMacros'](_0x15542e))[_0x4f87fa(0x1a3)](_0x267aff=>this[_0x4f87fa(0x1d9)](_0x267aff)),_0xa881c1=Math[_0x4f87fa(0x2ab)](_0x551efc[_0x4f87fa(0x1d7)]/this[_0x4f87fa(0x29b)]());return Math[_0x4f87fa(0x1e8)](0x1,Math[_0x4f87fa(0x36e)](_0xa881c1,this[_0x4f87fa(0x26e)]()));},Window_ChoiceList[_0x5bc23b(0x25d)][_0x5bc23b(0x26e)]=function(){const _0x4d8d37=_0x5bc23b,_0x3c15c7=this[_0x4d8d37(0x188)],_0x4ed19b=_0x3c15c7?_0x3c15c7['y']:0x0,_0xcfb260=_0x3c15c7?_0x3c15c7['height']:0x0,_0x4b5f90=Graphics[_0x4d8d37(0x2b2)]/0x2;if(_0x4ed19b<_0x4b5f90&&_0x4ed19b+_0xcfb260>_0x4b5f90){if('tSaEJ'==='eWEBJ'){if(!_0x4b5754[_0x4d8d37(0x246)]())return'';if(_0x5b0440['_target'])return _0x1a50c2['_target'][_0x4d8d37(0x27c)]();if(_0xabc308['_targets'][0x0])return _0x2a4e45[_0x4d8d37(0x2be)][0x0]['name']();return'';}else return 0x4;}else{if(_0x4d8d37(0x314)==='FEmoz')return $gameSystem[_0x4d8d37(0x177)]();else{this['_forcedPosition']=this[_0x4d8d37(0x1b5)]||{};const _0x4d171b=['x','y',_0x4d8d37(0x1f4),_0x4d8d37(0x34b)];for(const _0x4e2122 of _0x4d171b){this[_0x4d8d37(0x1b5)][_0x4e2122]!==_0x133366&&(this[_0x4e2122]=_0x320b05(this[_0x4d8d37(0x1b5)][_0x4e2122]));}}}},Window_ChoiceList[_0x5bc23b(0x25d)][_0x5bc23b(0x1a5)]=function(){const _0x507ca0=_0x5bc23b;let _0x34b5f9=0x60;for(const _0x5d9284 of this[_0x507ca0(0x175)]){const _0x5456b1=_0x5d9284[_0x507ca0(0x27c)],_0x3ce0bf=this['textSizeEx'](_0x5456b1)['width'],_0x51533b=Math[_0x507ca0(0x2ab)](_0x3ce0bf)+this[_0x507ca0(0x1b1)]()*0x2;if(_0x34b5f9<_0x51533b){if(_0x507ca0(0x1e3)===_0x507ca0(0x1e3))_0x34b5f9=_0x51533b;else{if(this['_MessageCoreSettings']===_0x18dd63)this[_0x507ca0(0x377)]();if(this[_0x507ca0(0x1d5)][_0x507ca0(0x3a2)]===_0x3e0f34)this['initMessageCore']();return this[_0x507ca0(0x1d5)]['choiceTextAlign'];}}}return _0x34b5f9;},Window_ChoiceList[_0x5bc23b(0x25d)][_0x5bc23b(0x1d4)]=function(_0x3bc75c){const _0x65190d=_0x5bc23b,_0x4b97cc=this[_0x65190d(0x21a)](_0x3bc75c),_0x37567c=$gameSystem['getChoiceListTextAlign']()!==_0x65190d(0x38f)?_0x65190d(0x24c)[_0x65190d(0x154)]($gameSystem[_0x65190d(0x361)]()):'',_0x501043=_0x37567c+this['commandName'](_0x3bc75c);this[_0x65190d(0x2a9)](this[_0x65190d(0x20e)](_0x3bc75c));const _0x36f00f=this[_0x65190d(0x1f5)](_0x501043)[_0x65190d(0x34b)],_0x1f4e92=Math[_0x65190d(0x1e8)](_0x4b97cc['y'],_0x4b97cc['y']+Math['round']((_0x4b97cc[_0x65190d(0x34b)]-_0x36f00f)/0x2));this['drawTextEx'](_0x501043,_0x4b97cc['x'],_0x1f4e92,_0x4b97cc[_0x65190d(0x1f4)]);},Window_ChoiceList[_0x5bc23b(0x25d)][_0x5bc23b(0x2f0)]=function(){const _0x463fea=_0x5bc23b;$gameMessage[_0x463fea(0x22f)](this['currentExt']()),this[_0x463fea(0x188)][_0x463fea(0x1bc)](),this['close']();};