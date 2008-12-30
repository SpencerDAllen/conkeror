
require('walnut.js');

{ let suite1 = {
      test_normalize_key_combo_1: function () {
          assert_equals(format_key_combo(unformat_key_combo("a")), "a");
      },
      test_normalize_key_combo_2: function () {
          assert_equals(format_key_combo(unformat_key_combo("C-a")), "C-a");
      },
      test_normalize_key_combo_3: function () {
          assert_equals(format_key_combo(unformat_key_combo("C-M-b")), "C-M-b");
      },
      test_normalize_key_combo_4: function () {
          assert_equals(format_key_combo(unformat_key_combo("M-C-c")), "C-M-c");
      },
      test_charcode32_is_space: function () {
          assert_equals(format_key_combo({charCode: 32}), "space");
      }
  };
  let suite2 = {
      suite_setup: function () {
          define_keymap("test_keymap");
      },
      suite_teardown: function () {
          delete test_keymap;
      },
      test_define_key_1: function () {
          define_key(test_keymap, "C-a", null);
          assert(test_keymap.bindings["C-a"]);
      },
      test_define_key_2: function () {
          define_key(test_keymap, "C-M-b", null);
          assert(test_keymap.bindings["C-M-b"]);
      },
      test_define_key_3: function () {
          define_key(test_keymap, "M-C-c", null);
          assert(test_keymap.bindings["C-M-c"], "define key 3");
      }
  };
  walnut_run(suite1);
  walnut_run(suite2);
}


