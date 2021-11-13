
--------------------------------------------------------------------------------
	Isle of Lore 2: Status Icons
--------------------------------------------------------------------------------

- Introduction & Contact
- Note on Different Versions
- License
- Contents
- Content Structure
- Specification
- How to Use: Source Files
- Krita
- Modifications

--------------------------------------------------------------------------------
	Introduction & Contact
--------------------------------------------------------------------------------

Hey there!

Thanks a lot for buying my set of status icons! They would work great with any
game featuring statuses, states, buffs or debuffs, like RPG, survival or rogue-
like games and given their style, they also work great with my other asset
packs from the "Isle of Lore 2" series, including "Hex Tiles Regular" and
"Strategy Figures":

https://stevencolling.itch.io/isle-of-lore-2-hex-tiles-regular
https://stevencolling.itch.io/isle-of-lore-2-strategy-figures

If you encounter any problem, got a question or have some feedback,
you can reach me easily via mail (see below).

I may update this asset pack (at no additional cost) in the future with new
status icons, while I may make completely new (and priced) icon packs with
non-status icons. If you want to keep up-to-date, get discounts on some of
my future offers and learn more about my other game-related projects,
you can subscribe to my mailing list or join my Discord.

	Mailing List: 	https://mailinglist.stevencolling.com/game_assets/
	Discord:		http://discord.stevencolling.com
	Mail:			info@stevencolling.com
	Website:		https://www.stevencolling.com

I also draw a piece of art every day and post it to my Tumblr, Instagram and Twitter:

	Tumblr:			https://stevencolling.tumblr.com/
	Instagram:		https://www.instagram.com/its.steven.colling/
	Twitter:		https://twitter.com/StevenColling

See you there!
Steven Colling

--------------------------------------------------------------------------------
	Note on Different Versions
--------------------------------------------------------------------------------

This pack is sold across multiple marketplaces and for some of them, the
contents and the directory structures had to be adapted. To avoid having to
keep multiple README files up-to-date, this file is based on the most
extensive version of the set.

--------------------------------------------------------------------------------
	License
--------------------------------------------------------------------------------

Depending on where you bought this asset, the store may provide license terms
for the assets they sell, including this one. If that's not the case, you'll
find a "License.txt" file in the topmost directory. Please refer to either the
storefront's asset license or to the license file provided with the assets.
If you think the seller's license is too restricting for your usage, or you
want the pack on another store too (with the exception of me being able to
generate keys on that platform), please reach out via mail:

	info@stevencolling.com

--------------------------------------------------------------------------------
	Contents
--------------------------------------------------------------------------------

The Status Icon Set contains...

120 Status Icons

120 Distance Icons (with numbers on them)
	24 Afoot Distance Icons
	24 Flying Distance Icons
	24 Underground Distance Icons
	24 Underwater Distance Icons
	24 Time Icons

in 1 size
	512x512 px

in 2 variants
	on white background panel
	transparent

in 2 file variants
	single files (png)
	sprite sheets (png)

The icons included:

Strength, Agility, Constitution, Charisma, Intelligence, Wisdom, Health, Mana,
Dead I, Wounded, Dead II, Undead, Dead III, Vampirism, Time, Growing,
Seeing, Not Seeing, Blinded, Speaking, Silenced, Hearing, Deaf, Smelling,
Not Hungry, Hungry, Not Thirsty, Thirsty, Bandaged, Bread, Meat, Beer,
Buffed, Debuffed, Faster, Slower, Blessed, Cursed, Heaven, Curse,
Regenerating, Bleeding, Poisoned, Poisoned Lungs, Suffocating, Sick, Gas, Acid,
Stunned, Unconscious, Exhausted, Overburdened, Sleeping, Disguised, Disappearing, Invisible,
Entangled, Tentacled, Restrained, Webbed, Hooked, Trapped, Falling, Levitating,
Scared, Raged, Stressed, Confused, Hypnotized, Charmed, Loving, Singing,
Attack, Broken Weapon, Buffed Attack, Debuffed Attack, Faster Attack, Slower Attack, Lucky, Ammunition,
Defense, Broken Defense, Buffed Defense, Debuffed Defense, Reflected, Marked, Tracked, Light,
Afoot, Flying, Underground, Underwater, Bomb, Explosion, Debris, Earthquake,
Fire, Water, Ice, Earth, Nature, Wind, Thunder, Darkness,
Burning, Drowning, Frozen, Petrified, Overgrown, Blown Away, Electrified, Darkened,
Key, Closed Lock, Open Lock, Loot, Coin, Potion, Banner, Axe

--------------------------------------------------------------------------------
	Content Structure
--------------------------------------------------------------------------------

In the topmost directory:

./Images						the icons as png files
./Images/512x512 bg				the icons on a white background panel as png files
./Images/512x512 transparent	the transparent icons as png files
./Sources						the icons' source files (kra/psd)
./Sprite Sheets					the icons as sprite sheet files
Changelog.txt					logging the asset pack's changes
License.txt						see "License" section somewhere above
README.txt						this file
Annotations.txt					special annotation file listing all icons
Showcase.kra					showcase file to show off the icons
Showcase.png					png export
Showcase.psd					psd export

--------------------------------------------------------------------------------
	Specification
--------------------------------------------------------------------------------


> File Name Structure <


The icons as single pngs have the following file names:

[id]_[name]_[format].png

	[id]		...				ongoing number, unique for every icon
	[name]		...				name of the icon
	[format]	bg				with white panels as background
				transparent		without any background

The sprite sheets are named like this:

status_icons_[format]_[tag]_[number].png

	[format]	bg				with white panels as background
				transparent		without any background
	[tag]						(optional)
				distances		containing distance icons
	[number]	...				ongoing number for every sprite sheet


> Dimensions <


512x512 px		43x43 mm with 300 DPI


> Color Palette <


Dark				#69696c
Grey				#d2d2d2
White				#efefef
Blue Dark			#748481
Blue Light			#909b97
Green Dark			#7f8a78
Green Medium		#b6bb7d
Green Light			#dfdf86
Brown Dark			#867472
Brown Light			#d3baac
Juicy Purple		#a28bd6
Juicy Blue Dark		#6d9ccd
Juicy Blue Light	#8dd5f2
Red					#ff777c
Orange				#ffa87c
Yellow				#ffda82


> Krita <


For all linework I used the "Ink-2 Fineliner" pen with a size of 36px.

--------------------------------------------------------------------------------
	How to Use: Source Files
--------------------------------------------------------------------------------

After opening the source file of one of the icons, the topmost layer group
structure looks like this:

	ICON					the icon
	BACKGROUND (HIDE)		a temporary background; hide this when exporting!

Within the ICON layer group, you'll find:

	LINEWORK				the icon's linework
	FILLING					the icon's filling/coloring
	SKETCH					a sketch I used to draw the linework from (hide this!)
	BACKGROUNDS				the white background panel; add your own backgrounds
							here or hide when exporting the transparent version

The single layer groups are self-explanatory and contain the layers to make up
the linework, filling and so on. I recommend to draw different colors on
different layers, so it's easier to make changes afterwards, like swapping out
a color!

--------------------------------------------------------------------------------
	Krita
--------------------------------------------------------------------------------

The files were originally made with the free (and amazing) painting software
Krita, available at krita.org. There are also Photoshop exports available. If
you encounter a problem with those exports, please let me know!

--------------------------------------------------------------------------------
	Modifications
--------------------------------------------------------------------------------

Warning: if you make changes to the files, please copy the files to a different
location first, before you download a new version of the assets and hence
accidentally overwrite your modifications.





Thank you!