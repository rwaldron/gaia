requireApp('clock/js/alarmsdb.js');
requireApp('clock/js/alarm_edit.js');
requireApp('clock/js/alarm_list.js');
requireApp('clock/js/alarm_manager.js');
requireApp('clock/js/utils.js');

requireApp('clock/test/unit/mocks/mock_alarm_manager.js');
requireApp('clock/test/unit/mocks/mock_navigator_mozl10n.js');
requireApp('clock/test/unit/mocks/mock_utils.js');


suite('AlarmList', function() {
  var am, nml, u, fixture, dom;
  var id = 1;

  suiteSetup(function() {
    am = AlarmManager;
    nml = navigator.mozL10n;
    u = Utils;

    AlarmManager = MockAlarmManager;
    navigator.mozL10n = MockmozL10n;
    Utils = MockUtils;

    loadBodyHTML('/index.html');

    AlarmList.init();
  });

  suiteTeardown(function() {
    AlarmManager = am;
    navigator.mozL10n = nml;
    Utils = u;
  });

  setup(function() {
    dom = document.createElement('div');

    fixture = {
      normalAlarmId: '',
      snoozeAlarmId: '',
      label: 'FIXTURE',
      hour: 14,
      minute: 32,
      enabled: true,
      repeat: {},
      sound: 'ac_classic_clock_alarm.opus',
      vibrate: '1',
      snooze: 5,
      color: 'Darkorange',
      id: 1
    };
  });

  suite('render()', function() {

    suite('markup contains correct information', function() {

      test('id ', function() {
        dom.innerHTML = AlarmList.render(fixture);
        assert.ok(dom.querySelector('[data-id="1"]'));
      });

      test('enabled ', function() {
        dom.innerHTML = AlarmList.render(fixture);
        assert.ok(dom.querySelector('input[checked=true]'));
      });

      test('disabled ', function() {
        fixture.enabled = false;
        dom.innerHTML = AlarmList.render(fixture);
        assert.isNull(dom.querySelector('input[checked=true]'));
      });

      test('labeled ', function() {
        dom.innerHTML = AlarmList.render(fixture);
        assert.equal(dom.querySelector('.label').textContent, 'FIXTURE');
      });

      test('unlabeled ', function() {
        fixture.label = '';
        dom.innerHTML = AlarmList.render(fixture);
        assert.equal(dom.querySelector('.label').textContent, 'alarm');
      });

      test('repeat ', function() {
        fixture.repeat = { monday: true };
        dom.innerHTML = AlarmList.render(fixture);
        assert.equal(
          dom.querySelector('.repeat').textContent, '{"monday":true}'
        );
      });

      test('no repeat ', function() {
        fixture.label = '';
        dom.innerHTML = AlarmList.render(fixture);
        assert.equal(dom.querySelector('.repeat').textContent, '{}');
      });
    });
  });
});
