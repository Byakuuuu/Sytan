
//=============================================================================
// RPG Maker MZ - CT_Bolt's Chase Player Plugin
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.00 CT_Bolt's Chase Player Plugin
 * @author CT_Bolt
 *
 * Version: 1.00
 *
 */

var CTB = CTB || {}; CTB.ChasePlayer  = CTB.ChasePlayer || {};
var Imported = Imported || {}; Imported["CTB_ChasePlayer"] = 1.00;

(($_$) => {
	$_$['Game_CharacterBase.prototype.update'] = Game_CharacterBase.prototype.update;
	Game_CharacterBase.prototype.update = function() {
		if (this.constructor.name === 'Game_Event') {
			if ($dataMap.events[this._eventId].meta.chase){
				if (eval($dataMap.events[this._eventId].meta.chase)){
					if (($gamePlayer._realX > this._realX - 4) && ($gamePlayer._realX < this._realX + 4)){
						if (($gamePlayer._realY > this._realY - 4) && ($gamePlayer._realY < this._realY + 4)){
							this.forceMoveRoute({list:[{code:10,indent:null},{code:0}],repeat:false,skippable:true,wait:true});
						}				
					}
				}
			}	
		}
		$_$['Game_CharacterBase.prototype.update'].apply(this, arguments);
	};	
})(CTB.ChasePlayer);