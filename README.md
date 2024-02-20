# Huddle - Discord/Teams/Blogger/Twitter mashup app

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
   	- db orm - ???
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
	-Home/Dashboard
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
	-Settings
		-Be able to change:
			-username
			-first name
			-surname
			-password
			-email
			-profile picture
		-Delete account
		-Leave group/s
	-Add group
		-Field for pasting an invite code
		-Accept button
	-Accept invite
		-Discord like - show name and number of users, accept button
	-Send invite
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
  - Basic db/server setup
  - Login system (oauth)
  - Groups - basic posts
  - Groups - invite to group
  - Groups - Comments/reacts
  - Group lists
  - Settings
