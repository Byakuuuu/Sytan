/*
 * Official Web Page
 * <https://kagedesuworkshop.blogspot.com/p/help-in-messages.html>
 *
 * License
 * Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 * <https://creativecommons.org/licenses/by-nc-sa/4.0/>
 *
 * Copyright (c) 2020 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kagedesuworkshop.blogspot.ru/>
 *
 */

 // * CHANGELOG ===================
 //
 // v1.0 (28.08.2020)
 //    - Release
 // ===============================


/*:
 * @plugindesc (v.1.0) Allows you create mini hint messages for any word or sentence in messages
 * @author Pheonix KageDesu
 * @target MZ
 * @url https://kagedesuworkshop.blogspot.com/p/help-in-messages.html
 *
 * @help
 *
 * Use pair escape-code \TM
 *   \TM[ID]WORD\TM
 * ID - it's information ID from Help Messages Plugin Parameter
 * WORD - it's word you want show help window when hovered
 * 
 * Example Message
 * Can you bring me \TM[test]Magic Shard\TM?
 * 
 * Plugin commands:
 *   SetWrap - Activate or Deactivate Auto Wraping
 *   SetHints - Activate or Deactivate Hint windows 
 * 
 * If you like my Plugins, want more and offten updates, please support me on Patreon!
 * 
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 * 
 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 * 
 * 
 * @param Show Delay
 * @type number
 * @min 1
 * @max 1000
 * @default 20
 * @desc Delay before Help window will appear
 * 
 * 
 * @param Help Messages
 * @type struct<LinkInfo>[]
 * @default ["{\"Id\":\"test\",\"Width\":\"220\",\"Height\":\"120\",\"Background Type\":\"Window\",\"Windowskin\":\"HelpWindowSkin\",\"Text\":\"\\\"\\\\\\\\C[1]Magic Shard \\\\\\\\I[312]\\\\\\\\C[0]\\\\n\\\\\\\\}Some cool and rare item...\\\\nMagic shard used for....\\\\n\\\"\"}", "{\"Id\":\"test2\",\"Width\":\"280\",\"Height\":\"120\",\"Background Type\":\"Window\",\"Windowskin\":\"HelpWindowSkin\",\"Text\":\"\\\"\\\\\\\\C[2]Slime \\\\\\\\I[320]\\\\\\\\C[0]\\\\n\\\\\\\\}Some monster description...\\\\nBe aware of slimes water attacks\\\\n\\\\n\\\"\"}"]
 * 
 * @param Auto Wrap Sentences
 * @type struct<ExtraWrap>[]
 * @desc You can add auto wrapping for some sentance in messages
 * @default []
 * 
 * @command SetWrap
 * @text Set Wrap State
 * @desc Activate or Deactivate Auto Wraping
 * 
 * @arg active
 * @text Active
 * @desc Active Or Not
 * @type boolean
 * @default true
 * 
 * @command SetHints
 * @text Set Hints State
 * @desc Activate or Deactivate Hint windows
 * 
 * @arg active
 * @text Active
 * @desc Active Or Not
 * @type boolean
 * @default true
*/
/*~struct~LinkInfo:
 * @param Id
 * @type text
 * @default new
 * @desc Any word, but should be unique for each Help message!
 *
 * @param Width
 * @type number
 * @min 1
 * @max 1000
 * @default 320
 * @desc Text window width
 * 
 * @param Height
 * @type number
 * @min 1
 * @max 1000
 * @default 140
 * @desc Text window height
 * 
 * @param Background Type
 * @type combo
 * @option Window
 * @option Dim
 * @option Transparent
 * @default Window
 * 
 * @param Windowskin
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default HelpWindowSkin
 * 
 * @param Text
 * @type note
 * @desc Message text, support escape symbols
 * @default Some text...
 */

/*~struct~ExtraWrap:
 * @param Sentence
 * @type text
 * @default Hello World
 * @desc Sentence that be wrapped
 *
 * @param Start
 * @type text
 * @default \C[1]
 * @desc Symbol before sentence
 * 
 * @param End
 * @type text
 * @default \C[0]
 * @desc Symbol after sentence
 */

(function(){

//@[TO GLOBAL]
window.PKD = window.PKD || {};

window.Imported = window.Imported || {};
window.Imported.PKD_HelpInMsg = true;

const HIM = {};
window.PKD.HIM = HIM;

const pluginName = "PKD_HelpInMessages";
const params = PluginManager.parameters(pluginName);

let ParsePluginHelpData = () => {
    let lines = JsonEx.parse(params["Help Messages"]);
    let parsed = lines.map((l) => JsonEx.parse(l));
    parsed.forEach(element => {
        element.Text = JsonEx.parse(element.Text);
        element.Width = parseInt(element.Width);
        element.Height = parseInt(element.Height);
    });
    return parsed;
};

let ParsePluginAutoWrapData = () => {
    let lines = JsonEx.parse(params["Auto Wrap Sentences"]);
    let parsed = lines.map((l) => JsonEx.parse(l));
    return parsed;
};

HIM.HelpMessagesData = ParsePluginHelpData();
HIM.AutoWrapWords = ParsePluginAutoWrapData();
HIM.WordsCollection = HIM.AutoWrapWords.map((element) => element.Sentence);
HIM.TIME_TO_SHOW = parseInt(params["Show Delay"]) || 20;
HIM.LINK_SYMBOL = 'TM';

PluginManager.registerCommand(pluginName, 'SetWrap', args => {
    try {
        let value = eval(args.active);
        $gameSystem.him_autoWW = value;
    } catch (e) {
        console.warn(e);
    }
});

PluginManager.registerCommand(pluginName, 'SetHints', args => {
    try {
        let value = eval(args.active);
        $gameSystem.him_hints = value;
    } catch (e) {
        console.warn(e);
    }
});

HIM.getHelpMessage = function (id) {
    return PKD.getJDataById(id, HIM.HelpMessagesData);
};

HIM.getWrapSymbols = function(sentence) {
    return HIM.AutoWrapWords.find((element) => element.Sentence == sentence);
};

HIM.prepareHelpMessageSkin = function (id) {
    var data = HIM.getHelpMessage(id);
    if(data) {
        ImageManager.loadPicture(data.windowskin);
    }
};

PKD.Scene = function() {
    return SceneManager._scene;
};


// Generated by CoffeeScript 2.5.1
//?FROM KDCore
var SpriteHoverLinkZone, Window_EventHelpInfo;

PKD.toGlobalCoord = function(layer, coordSymbol = 'x') {
  var node, t;
  t = layer[coordSymbol];
  node = layer;
  while (node) {
    t -= node[coordSymbol];
    node = node.parent;
  }
  return (t * -1) + layer[coordSymbol];
};

PKD.getJDataById = function(id, source) {
  var d, i, len;
  for (i = 0, len = source.length; i < len; i++) {
    d = source[i];
    if (d.Id === id) {
      return d;
    }
  }
  return null;
};

String.prototype.replaceAll = function(search, replacement) {
  var target;
  target = this;
  return target.split(search).join(replacement);
};

PKD.processExtraWrapText = function(text) {
  var End, Start, i, len, ref, result, w;
  if (HIM.WordsCollection.length === 0) {
    return text;
  }
  if (!$gameSystem.pkdIsAutoWWEnabled()) {
    return text;
  }
  ref = HIM.WordsCollection;
  for (i = 0, len = ref.length; i < len; i++) {
    w = ref[i];
    if (text.contains(w)) {
      ({Start, End} = HIM.getWrapSymbols(w));
      if (!((Start != null) || (End != null))) {
        continue;
      }
      result = Start + w + End;
      text = text.replaceAll(w, result);
    }
  }
  return text;
};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_Message.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var ALIAS__processEscapeCharacter, ALIAS__startMessage, ALIAS__terminateMessage, ALIAS__update, _;
  //@[DEFINES]
  _ = Window_Message.prototype;
  //@[ALIAS]
  ALIAS__startMessage = _.startMessage;
  _.startMessage = function() {
    this._tLinks = [];
    this._showLInfoTimer = 0;
    return ALIAS__startMessage.call(this);
  };
  
  //@[ALIAS]
  ALIAS__processEscapeCharacter = _.processEscapeCharacter;
  _.processEscapeCharacter = function(code, textState) {
    ALIAS__processEscapeCharacter.call(this, ...arguments);
    if (code === HIM.LINK_SYMBOL) {
      this._workWithLink(textState);
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this._tLinks == null) {
      return;
    }
    if (!$gameSystem.pkdIsHintsEnabled()) {
      return;
    }
    if (this._isAnyHelpLinkUnderCursor()) {
      this._showLInfoTimer += 1;
      if (this._showLInfoTimer >= HIM.TIME_TO_SHOW) {
        return this._showHelpLinkInfo();
      }
    } else {
      this._showLInfoTimer = 0;
      return this._hideHelpLinksInfo();
    }
  };
  //@[ALIAS]
  ALIAS__terminateMessage = _.terminateMessage;
  _.terminateMessage = function() {
    ALIAS__terminateMessage.call(this);
    this._hideHelpLinksInfo();
    this.terminateHelpLinks();
    return this._tLinks = null;
  };
  _.terminateHelpLinks = function() {
    var i, l, len, ref;
    if (this._tLinks == null) {
      return;
    }
    ref = this._tLinks;
    for (i = 0, len = ref.length; i < len; i++) {
      l = ref[i];
      l.removeFromParent();
    }
  };
  _._isAnyHelpLinkUnderCursor = function() {
    if (this._tLinks == null) {
      return false;
    }
    return this._tLinks.some(function(l) {
      return l.isMouseIn();
    });
  };
  _._showHelpLinkInfo = function() {
    var e, info, infoData, underMouse;
    underMouse = this._tLinks.find(function(l) {
      return l.isMouseIn();
    });
    if (underMouse == null) {
      return;
    }
    info = underMouse != null ? underMouse.info : void 0;
    if (info == null) {
      return;
    }
    if (this.__lastLinkHelpInfo === info) {
      return;
    }
    try {
      this.__lastLinkHelpInfo = info;
      this._hideHelpLinksInfo();
      infoData = HIM.getHelpMessage(info);
      if (infoData == null) {
        return;
      }
      this.__helpLinkInfoWindow = new Window_EventHelpInfo(infoData);
      PKD.Scene().addChild(this.__helpLinkInfoWindow);
      this.__helpLinkInfoWindow.moveToCursor();
      return this.__helpLinkInfoWindow.open();
    } catch (error) {
      e = error;
      console.warn(e);
      return this._hideHelpLinksInfo();
    }
  };
  _._hideHelpLinksInfo = function() {
    if (this.__helpLinkInfoWindow == null) {
      return;
    }
    this.__helpLinkInfoWindow.close();
    this.__helpLinkInfoWindow.removeFromParent();
    this.__helpLinkInfoWindow = null;
    return this.__lastLinkHelpInfo = null;
  };
  _._workWithLink = function(textState) {
    var value;
    value = this._obtainEscapeTextCode(textState);
    if (value !== "") {
      return this._startHelpLink(value, textState);
    } else {
      return this._stopHelpLink(textState);
    }
  };
  _._startHelpLink = function(value, textState) {
    if (this.__tLink != null) {
      return;
    }
    this.__tLink = {};
    this.__tLink.startX = textState.x;
    this.__tLink.y = textState.y;
    this.__tLink.endX = 0;
    this.__tLink.StartIndex = textState.index;
    this.__tLink.value = value;
    // * Предзагрузка картинки
    HIM.prepareHelpMessageSkin(value);
  };
  _._stopHelpLink = function(textState) {
    if (this.__tLink == null) {
      return;
    }
    this.__tLink.endX = textState.x;
    this.__tLink.EndIndex = textState.index;
    this._createTLinkHoverZone();
    return this.__tLink = null;
  };
  _._createTLinkHoverZone = function() {
    var h, spr, w;
    w = this.__tLink.endX - this.__tLink.startX;
    h = this.lineHeight();
    spr = new SpriteHoverLinkZone(w, h, this.__tLink.value);
    //spr.bitmap.fillAll KDCore.Color.RED
    spr.move(this.__tLink.startX + 14, this.__tLink.y + 16);
    this.addChild(spr);
    return this._tLinks.push(spr);
  };
  //?[NEW]
  _._obtainEscapeTextCode = function(textState) {
    var arr;
    arr = /^\[(\w+)\]/.exec(textState.text.slice(textState.index));
    if (arr != null) {
      textState.index += arr[0].length;
      return arr[1];
    } else {
      return '';
    }
  };
})();

// ■ END Window_Message.coffee
//---------------------------------------------------------------------------
SpriteHoverLinkZone = class SpriteHoverLinkZone extends Sprite {
  constructor(w, h, info1) {
    super(new Bitmap(w, h));
    this.info = info1;
  }

  isContainsPoint(point) {
    var rect, rx, ry;
    rx = PKD.toGlobalCoord(this, 'x');
    ry = PKD.toGlobalCoord(this, 'y');
    rect = new Rectangle(rx, ry, this.width, this.height);
    return rect.contains(point.x, point.y);
  }

  isMouseIn() {
    if (this.visible === true) {
      return this.isContainsPoint(TouchInput);
    } else {
      return false;
    }
  }

  removeFromParent() {
    if (this.parent != null) {
      return this.parent.removeChild(this);
    }
  }

};

PKD.SpriteHoverLinkZone = SpriteHoverLinkZone;

//==========================================================================
Window_EventHelpInfo = class Window_EventHelpInfo extends Window_Base {
  constructor(infoData) {
    var backgroundType;
    super(new Rectangle(0, 0, infoData.Width, infoData.Height));
    this.infoData = infoData;
    this._windowskin;
    this.openness = 0;
    if ((this.infoData.Windowskin != null) && this.infoData.Windowskin !== "") {
      this.windowskin = ImageManager.loadPicture(this.infoData.Windowskin);
    }
    if (this.infoData.Text != null) {
      this.drawInfoText();
    }
    backgroundType = this._convertBackgroundType(this.infoData["Background Type"]);
    if (backgroundType >= 0) {
      this.setBackgroundType(backgroundType);
    }
    return;
  }

  _convertBackgroundType(string) {
    switch (string) {
      case "Window":
        return 0;
      case "Dim":
        return 1;
      default:
        return 2;
    }
  }

  moveToCursor() {
    var dx, dy;
    dx = dy = 0;
    if (this.width + TouchInput.x + 5 > Graphics.width) {
      dx = 1;
    }
    if (this.height + TouchInput.y + 5 > Graphics.height) {
      dy = 1;
    }
    this.x = TouchInput.x;
    this.y = TouchInput.y;
    return this.setStaticAnchor(dx, dy);
  }

  setStaticAnchor(vx, vy) {
    this.x -= Math.round(this.width * vx);
    return this.y -= Math.round(this.height * vy);
  }

  drawInfoText() {
    return this.drawTextEx(this.infoData.Text, 0, 0);
  }

  removeFromParent() {
    if (this.parent != null) {
      return this.parent.removeChild(this);
    }
  }

  pkdProcessExtraWrapText(text) {
    return text; // * NOT INCLUDE
  }

};

PKD.Window_EventHelpInfo = Window_EventHelpInfo;

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_Base.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var ALIAS__convertEscapeCharacters, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__convertEscapeCharacters = _.convertEscapeCharacters;
  _.convertEscapeCharacters = function(text) {
    text = ALIAS__convertEscapeCharacters.call(this, text);
    return this.pkdProcessExtraWrapText(text);
  };
  _.pkdProcessExtraWrapText = function(text) {
    text = PKD.processExtraWrapText(text);
    text = text.replace(/\\/g, "\x1b");
    text = text.replace(/\x1b\x1b/g, "\\");
    return text;
  };
})();

(function() {  // ■ END Window_Message.coffee
  //---------------------------------------------------------------------------

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Game_System.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var ALIAS__initialize, _;
  //@[DEFINES]
  _ = Game_System.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    this.him_autoWW = true;
    return this.him_hints = true;
  };
  _.pkdIsHintsEnabled = function() {
    return this.him_hints === true;
  };
  _.pkdIsAutoWWEnabled = function() {
    return this.him_autoWW === true;
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------

})();
