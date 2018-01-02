//Type your code here

// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function(comparer) { 
    for(var i=0; i < this.length; i++) { 
        if(comparer(this[i])) return true; 
    }
    return false; 
}; 

// adds an element to the array if it does not already exist using a comparer 
// function
Array.prototype.pushIfNotExist = function(element, comparer) { 
    if (!this.inArray(comparer)) {
        this.push(element);
    }
}; 

/**
 * @function getContacts
 *
 */
function getContacts () {
  kony.print ("Entering into getContacts");
  
  var KonyMain = java.import('com.konylabs.android.KonyMain');
  var Cursor = java.import('android.database.Cursor');
  var ContactsContract = java.import('android.provider.ContactsContract');
  var String = java.import('java.lang.String');
  
  var context = KonyMain.getActivityContext();
  var cursor = context.getContentResolver().query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null,null, null, ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME + " ASC");
  var segContactsData = [];
  while (cursor.moveToNext()) {
    var name = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
    var item = {lblName:name};
    //segContactsData.push(item);
    segContactsData.pushIfNotExist(item, function(e) { 
      return e.lblName === item.lblName; 
    });
    
  }
  cursor.close();
  
  frmContactsList.segContacts.setData(segContactsData);

  kony.print ("Exiting out of getContacts");
}