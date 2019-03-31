---
sidebar: auto
---

Guide for DSEE 64 bit installation on Linux
===========================================

Install DSEE
------------

```console
# cd /opt/upload

# unzip -q ofm_odsee_linux_11.1.1.7.0_64_disk1_1of1.zip

# cd ODSEE_ZIP_Distribution

# unzip -q sun-dsee7.zip -d /opt/ldap

# cd /opt/ldap/dsee7
```

Create DSCC registry
--------------------

```console
[nodemgr\@appclustersrv25 dsee7]\$ bin/dsccsetup ads-create

Choose password for Directory Service Manager:

Confirm password for Directory Service Manager:

Creating DSCC registry...

DSCC Registry has been created successfully
```

Create DSCC War file
--------------------

```console
[nodemgr\@appclustersrv25 dsee7]\$ bin/dsccsetup war-file-create

Created /opt/ldap/dsee7/var/dscc7.war

[nodemgr\@appclustersrv25 dsee7]\$ bin/dsccsetup status

***

DSCC Registry has been created

Path of DSCC registry is /opt/ldap/dsee7/var/dcc/ads

Port of DSCC registry is 3998

***
```

Create DSCC Agent
--------------------

```console
[nodemgr\@appclustersrv25 dsee7]\$ bin/dsccagent create

DSCC agent will use the following port: 3997

Enter DSCC agent password:

Confirm the password:

Agent instance /opt/ldap/dsee7/var/dcc/agent has been created successfully

Run the following command to register the agent in the registry :
/opt/ldap/dsee7/bin/dsccreg add-agent /opt/ldap/dsee7/var/dcc/agent
```

Add Agent
--------------------
```console
[nodemgr\@appclustersrv25 dsee7]\$ bin/dsccreg add-agent
/opt/ldap/dsee7/var/dcc/agent

Agent path: /opt/ldap/dsee7/var/dcc/agent

Enter DSCC agent "/opt/ldap/dsee7/var/dcc/agent" password:

Enter DSCC administrator's password:

Agent instance has been registered in DSCC on appclustersrv25

You can now run dsccagent start to start the agent

[nodemgr\@appclustersrv25 dsee7]\$ bin/dsccagent start

The agent /opt/ldap/dsee7/var/dcc/agent has been started
```

Deploy war file
---------------

- Login DSCC, create new server

![](./media/8f14db7e9dbda38406e25f7828955585.png)

![](./media/b1db5c4439cb48fa7dff3b112eef29b2.png)

![](./media/adc7bf3d3c552728d8848ee8068e8c91.png)

![](./media/39aedf5605ecb30f09446f72346ca634.png)

![](./media/eb53c104c3fc13b3180f9aee3a47b606.png)

> Confirm server is started

![](./media/a0e4157addc444962e9715b75bb44055.png)

- Copy 99user.ldif to /opt/ldap/dsee7/dsInst/config/schema

- Then restart directory server

```console
[nodemgr\@appclustersrv25 dsee7]\$ bin/dsadm restart '/opt/ldap/dsee7/dsInst'

Directory Server instance '/opt/ldap/dsee7/dsInst' stopped

Directory Server instance '/opt/ldap/dsee7/dsInst' started: pid=27400
```

- Creating an empty suffix and populate it with data via DSCC

> Go to Directory Servers \> Suffixes \> New Suffix. Follow the screenshots, its
> self-explanatory

![](./media/049beef5ca70149cb8107b8a1a32a083.png)

![](./media/67c868a983e335077091711c391bef81.png)

![](./media/550725bb151b87ef21c4de040d9706ba.png)

![](./media/70d5c1a23a5a516ef9fbccbdfc2c5193.png)

![](./media/7523753ada5ffcca0b069238389554e7.png)

![](./media/620bffbec5298d23fe773594663d88f7.png)

![](./media/82190cb3a7a4c1c366429f7a5fe6a1f3.png)

![](./media/92caf65806784c952807360c66c044c7.png)

> Go to Directory Servers \> Suffixes and confirm that dc=isecurity,dc=com suffix
> is created

![](./media/233e5f0981d0331c9d45f96aec7e53de.png)

![](./media/da16d3f0bb3c148f966ddcbccf35d364.png)

![](./media/703831844dd54ff6aabf4700f743a18d.png)

![](./media/1dfd59c0cc07eb0eb3eca4756ce3f546.png)

![](./media/3cb83f373ed2196110ad0b9300be4109.png)

![](./media/0cc01159aafe8607d4072c21cb6ecea4.png)

![](./media/e5b129a7d64db1dcfedde996aac6981a.png)

- Add new Access Control Instruction(ACI)

> Go to Directory Servers \> appclustersrv25:1389 \> Entry Management \> Access
> Control

![](./media/137680b90990031140922c5d37360c63.png)

> Name : iPROS ACI

![](./media/cab02ed465cecb29a207cf2155eec9f9.png)

![](./media/35e6851dba82285b02a2dff26c488341.png)

![](./media/96fda9d7745560b3500ffd09d2784b83.png)

![](./media/0d0337b9d7d232c359a1a9bb2e00a11d.png)

![](./media/a57208f7a29971f2fbb40ea87447f1a2.png)

![](./media/b4e5b14252325c8f343d25fff893346c.png)

![](./media/0cf1970a7585b2244516c78a92bcd2d8.png)

![](./media/aeea8d67f556e87e003eb74f488e0df6.png)

> For Replication configuration refer to \<\< iPROS 64 linux WLS12c Installation
> Guide 2018.docx \>\> --- 14) Configure LDAP Server Replication
