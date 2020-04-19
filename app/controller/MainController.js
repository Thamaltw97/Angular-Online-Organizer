app.controller("MainController", ($scope, $filter) => {

  $scope.startDate = new Date();
  $scope.mainList = [];
  $scope.dateList = [];
  $scope.expDate = 0;
  $scope.edited = false;

  $scope.fnAddEvent = () => {
    if ($scope.eName === "" || $scope.eName === undefined || $scope.eTime === "" || $scope.eTime === undefined) {
      alert("Fill the details correctly!");
    }
    else {
      $scope.mainList.push({
        id: $scope.mainList.length + 1,
        eName: $scope.eName,
        eDate: $filter("date")($scope.startDate),
        eTime: $filter("date")($scope.eTime, "HH:mm:ss"),
      });

      fnShowEvent();
      fnNextEvent();
      $scope.edited = false;

      $scope.eName = "";
      $scope.eTime = "";

    }
  };

  $scope.fnEditEvent = (selectedId) => {
    const index = $scope.mainList.findIndex(event => event.id === selectedId);
    const selectedEvent = $scope.mainList[index];
    $scope.mainList.splice(index, 1);

    $scope.eName = selectedEvent.eName;
    $scope.eTime = new Date("1000-10-10T" + selectedEvent.eTime);
    $scope.edited = true;
    fnShowEvent();
    fnNextEvent();
  }

  $scope.fnDeleteEvent = (selectedId) => {
    const index = $scope.mainList.findIndex(event => event.id === selectedId);
    $scope.mainList.splice(index, 1);
    fnShowEvent();
    fnNextEvent();

  }

  $scope.fnHandleDate = () => {
    fnShowEvent();
  };

  const fnShowEvent = () => {
    const startDate = $filter("date")($scope.startDate);
    $scope.dateList = [];
    $scope.mainList.filter((event) => {
      if (event.eDate === startDate) {
        $scope.dateList.push(event);
      }
    });
  };

  const fnNextEvent = () => {
    let eventExpList = [];
    $scope.mainList.map(event => {
      eventExpList.push(new Date(event.eDate + " " + event.eTime).getTime());
    });
    $scope.expDate = eventExpList[eventExpList.indexOf(Math.min(...eventExpList))];
    $scope.nextEventRemainder = $filter("date")(new Date($scope.expDate)) + " " + $filter("date")(new Date($scope.expDate), "HH:mm:ss")
    $scope.expDate = $scope.expDate / 1000; //(seconds = milliseconds/1000)
  }

});
