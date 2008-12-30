/**
 * (C) Copyright 2008 John J. Foerch
 *
 * Use, modification, and distribution are subject to the terms specified in the
 * COPYING file.
**/

function assert (got) {
    if (! got)
        throw new Error("expected a true value, got <"+got+">.");
    return true;
}

function assert_equals (got, expect) {
    if (got != expect)
        throw new Error("expected <"+expect+">, got <"+got+">.");
    return true;
}

function assert_error (fn) {
    try {
        fn();
    } catch (e) {
        return true;
    }
    throw new Error("expected an error calling <"+fn+">.");
}

function assert_null (got) {
    if (got !== null)
        throw new Error("expected null, got <"+got+">.");
    return true;
}


function walnut_results () {
    this.run = 0;
    this.failed = 0;
}

function walnut_run (suite) {
    var results = new walnut_results();
    if (suite.suite_setup)
        suite.suite_setup();
    for (var k in suite) {
        if (k.substr(0,5) == 'test_') {
            if (suite.setup)
                suite.setup();
            results.run++;
            dump(k+'..');
            try {
                suite[k]();
                dumpln('ok');
            } catch (e) {
                results.failed++;
                dumpln('failed');
                dump_error(e);
            }
            if (suite.teardown)
                suite.teardown();
        }
    }
    if (suite.suite_teardown)
        suite.suite_teardown();
    dumpln(results.run+" run, "+results.failed+" failed");
    return results;
}

