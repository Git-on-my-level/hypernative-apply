/**
 * Plan types for the Hypernative Apply CLI
 *
 * This module defines the types used for planning changes to resources,
 * including dependency resolution, change detection, and plan serialization.
 */
// Change types for resources
export var ChangeType;
(function (ChangeType) {
    ChangeType["CREATE"] = "CREATE";
    ChangeType["UPDATE"] = "UPDATE";
    ChangeType["REPLACE"] = "REPLACE";
    ChangeType["DELETE"] = "DELETE";
    ChangeType["NO_CHANGE"] = "NO_CHANGE";
})(ChangeType || (ChangeType = {}));
//# sourceMappingURL=plan.js.map