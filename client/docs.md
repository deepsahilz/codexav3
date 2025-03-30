__<h2 style="color:#00FF61;"> 
Clicking on post's username open user's profile__</h2>
*7 dec(eve)*

*Method ( Intagram, behance params route approach)*
- ### Clicking on username will redirect to "/:username" 
- ### This route loads (Profile2) component
- ### (Profile2) Component sends axios request to "/api/:username" server route for userData
- ### The access token goes with the request, server checks 
- ### If token matches the username, it responds (self=true) with userData otherwise self ="false" 
- ### (Profile2) shows self-specefic options according to self.  
#

__<h2 style="color:#00FF61;"> 
Update bio in editprofile page__</h2>
*8 dec(eve)*

- ### not completed
- ### reason: difficulty in managing routes for edit profile, what will be server api route, form data send with the request, updating only changed values.
<br/>

#

*9 Dec: NOTHING*

*10 Dec : NOTHING*

*11 Dec : Tried to Update all details in editprofile page*
#

__<h2 style="color:#00FF61;"> 
Update profile picture in edit profile__</h2>
*krta bss*

#
__<h2 style="color:#00FF61;"> 
Follow-unfollow feature successful at backend__</h2>
*till 26 dec*
- ### created followmodel5 table with composite and foreign key
- ### created db functions.
- ### created api's at server for follow/ unfollow
- ### finally added axios request at frontend
- ### profile data includes real followers and following
- ### working beautifully
- ### problem: need to add check for whether current user is following this user or not to show follow/following button and to decide follow/unfollow api to call
 
#
__<h2 style="color:#00FF61;"> 
Follow/ following decision at client side__</h2>
*27 dec*

- ### follow/following working on client side
- ### show-followers prototype added
- ### problem: followers not getting updating dynamically,<br/>               show follower card positioning problem.

#

