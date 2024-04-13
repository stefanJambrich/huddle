# Huddle - Discord/Teams/Blogger/Twitter mashup app

# I needed to change my gitname because of work reasons, so the latest commits have the name DZCA1JH instead of my github name

# Authentication/Authorization
  - Authentication is implemented only in a very basic manner. Just a simple login, for a full fledged application it would be best to implement a system
    like OAuth2, however I did not do this, because I think this is outside of the scope for this project
  - Authorization is also a very basic, which is definetly not a great solution but without any proper login system this seemed like the only solution for this project

# Main Features:
  - You can create groups with people where you can post your project annoucments/info
  - Ability to moderate these groups
  - Users can react and comment to these posts
  - Invites by code

This is a school project

# Tech stack:
 - Backend
   	- Node - express
   	- Postgresql
   	- db orm - sequelize
 - Frontend
   	- React

# Project Info
# ROLES:
	-Group Admin
		-Delete all posts
		-Delete all comments
		-Kick user
		-Ban user
		-Change group policy
		-Invite
	-User
		-Invite - if permitted by policy
		-Read all posts
		-React to posts
		-Comment
		-Leave group

# SITES:
## Home/Dashboard
		-Logged In
			-Left side show all groups you are in - discordlike
			-Left side, on top of all groups a button to add new group
			-Center show messages/annoucments
			-Right side show all users in group
			-Right side on top of all users button for creating an invite
			-Right top profile picture with username
				-When click show settings, logout buttons
			-Top side twitter like for creating a new post
		-Not Logged In
			-Show message saying to log in
			-Google login
## Settings
		-Be able to change:
			-username
			-first name
			-surname
			-password
			-email
			-profile picture
		-Delete account
		-Leave group/s
## Add group
		-Field for pasting an invite code
		-Accept button
## Send invite
		-Modulo with invite code
			-Invite expires after 24h

# USE CASE
	-Adding group
	-Leaving group
	-Posting annoucment
	-Deleting annoucment
	-Reacting to annoucment
	-Posting comment
	-Deleting comment
	-Reacting to comment
	-Generate invite link
	-Change username/firstname etc...

 # Priorities
  1. Basic db/server setup
  2. Login system (oauth)
  3. Groups - basic posts
  4. Groups - invite to group
  5. Groups - Comments/reacts
  6. Group lists
  7. Settings
